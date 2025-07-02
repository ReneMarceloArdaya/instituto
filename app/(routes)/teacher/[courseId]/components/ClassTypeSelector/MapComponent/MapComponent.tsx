"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import { useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapComponentProps } from "./MapComponent.type";

// Configuración del ícono por defecto
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Subcomponente ClickableMarker embebido
function ClickableMarker({
  position,
  onPositionChange,
  onZoomChange,
}: {
  position: [number, number];
  onPositionChange: (position: [number, number]) => void;
  onZoomChange: (zoom: number) => void;
}) {
  useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      const zoom = e.target.getZoom();
      onPositionChange(newPos);
      onZoomChange(zoom);
    },
  });

  return <Marker position={position} />;
}

// Componente principal MapComponent
export function MapComponent(props: MapComponentProps) {
  const { center, onLocationChange } = props;
  const [markerPos, setMarkerPos] = useState<[number, number]>(center);
  const [zoomMap, setZoomMap] = useState(15);
  const hasInitialized = useRef(false);
  const mapRef = useRef<LeafletMap | null>(null);

  return (
    <MapContainer
      center={center}
      zoom={zoomMap}
      className="h-full w-full z-0"
      scrollWheelZoom={true}
      ref={mapRef}
      whenReady={() => {
        if (!hasInitialized.current) {
          mapRef.current?.setView(center, zoomMap);
          hasInitialized.current = true;
        }
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickableMarker
        position={markerPos}
        onPositionChange={(newPos) => {
          setMarkerPos(newPos);
          onLocationChange(newPos);
        }}
        onZoomChange={(zoom) => {
          setZoomMap(zoom);
        }}
      />
    </MapContainer>
  );
}
