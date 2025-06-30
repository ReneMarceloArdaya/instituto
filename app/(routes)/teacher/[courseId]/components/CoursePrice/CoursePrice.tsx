"use client";
import { DollarSign } from "lucide-react";
import { TitleBlock } from "..";
import { CoursePriceProps } from "./CoursePrice.type";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export function CoursePrice(props: CoursePriceProps) {
  const { idCourse, priceCourse } = props;
  const [type, setType] = useState<"Gratis" | "Pago">(
    priceCourse === null || priceCourse === "Gratis" ? "Gratis" : "Pago"
  );
  
  const [price, setPrice] = useState<string | null>(
    priceCourse === "Gratis" ? null : priceCourse
  );
  
  const onChansePrice = async () => {
    axios.patch(`/api/course/${idCourse}`, {
      price: price,
    });
    toast("Precio actualizado");
  }

  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <TitleBlock tittle="Precio del Curso" icon={DollarSign} />

      <div className="space-y-4">
        <Select
          value={type}
          onValueChange={(value: "Gratis" | "Pago") => {
            setType(value);
            if (value === "Gratis") setPrice("Gratis");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tipo de precio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Gratis">Gratis</SelectItem>
            <SelectItem value="Pago">Pago</SelectItem>
          </SelectContent>
        </Select>

        {type === "Pago" && (
          <div>
            <label
              htmlFor="course-price"
              className="block text-sm font-medium mb-2"
            >
              Precio del curso (Bs)
            </label>
            <Input
              id="course-price"
              type="number"
              min="1"
              step="0.01"
              placeholder="Ej. 29.99 Bs"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        )}

        <Button
          className="mt-3"
          onClick={onChansePrice}
        >
          Guardar Precio
        </Button>
      </div>
    </div>
  );
}
