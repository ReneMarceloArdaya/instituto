"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TitleBlock } from "..";
import { MapPin } from "lucide-react";
import { ClassTypeSelectorProps } from "./ClassTypeSelector.type";
import axios from "axios";
import { toast } from "sonner";
import { MapComponent } from "./MapComponent";

export function ClassTypeSelector(props: ClassTypeSelectorProps) {
  const { idCourse, typeCourse, latitude, longitude } = props;
  const { user } = useUser();
  const [mode, setMode] = useState<"virtual" | "presencial">(
    typeCourse === "presencial" ? "presencial" : "virtual"
  );
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (!latitude || !longitude) {
      const lat =
        typeof user.publicMetadata.lat === "number"
          ? user.publicMetadata.lat
          : null;
      const lng =
        typeof user.publicMetadata.lng === "number"
          ? user.publicMetadata.lng
          : null;
      if (lat && lng) {
        setMarkerPos([lat, lng]);
        setLoading(false);
      }
    }
    if (latitude && longitude) {
      setMarkerPos([latitude, longitude]);
      setLoading(false);
    }
  }, [latitude, longitude, user]);

  const handleSave = async () => {
    if (!markerPos) return;
    axios.patch(`/api/course/${idCourse}`, {
      latitud: markerPos[0],
      longitud: markerPos[1],
      TypeCourse: mode,
    });
    if (mode === "presencial") {
      toast("Ubicación guardada correctamente");
    } else {
      toast("Tipo de clase guardado correctamente");
    }
  };

  if (loading)
    return (
      <p className="text-sm text-muted-foreground">Detectando ubicación...</p>
    );

  return (
    <div className="p-6 bg-white rounded-md space-y-8">
      <div>
        <TitleBlock tittle="Tipo de clase" icon={MapPin} />
        <Select
          value={mode}
          onValueChange={(value) => setMode(value as "virtual" | "presencial")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tipo de clase" />
          </SelectTrigger>
          <SelectContent className="z-[50]">
            <SelectItem value="virtual">Virtual</SelectItem>
            <SelectItem value="presencial">Presencial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {mode === "presencial" && markerPos && (
        <div className="h-[400px] w-full rounded-md border shadow p-4">
          <p className="mb-2 text-sm font-medium text-gray-700">
            📍 Ubicación seleccionada:&nbsp;
            <span className="font-semibold text-blue-600">
              {markerPos[0].toFixed(5)}, {markerPos[1].toFixed(5)}
            </span>
          </p>
          <MapComponent
            center={markerPos}
            onLocationChange={(newPos) => setMarkerPos(newPos)}
          />
        </div>
      )}

      <Button onClick={handleSave} className="mt-3">
        {mode === "presencial"
          ? "Guardar ubicación y tipo de clase"
          : "Guardar tipo de clase"}
      </Button>
    </div>
  );
}
