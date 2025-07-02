"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { StaticMapProps } from "./StaticMap.type";

// Fix icon issue with Leaflet in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export function StaticMap(props: StaticMapProps) {
  const { position } = props;

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet");
    }
  }, []);

  if (!position) return null;

  const openGoogleMaps = () => {
    const [lat, lng] = position;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative h-[400px] w-[400px] rounded-xl border shadow-md overflow-hidden">
      <MapContainer
        center={position as [number, number]}
        zoom={18}
        doubleClickZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position as [number, number]} />
      </MapContainer>

      <div className="absolute top-2 right-2 z-[1000]">
        <Button
          variant="outline"
          size="icon"
          onClick={openGoogleMaps}
          className="shadow-sm bg-white hover:bg-muted"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
