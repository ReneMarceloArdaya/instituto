"use client";

import { Marker, useMapEvents } from "react-leaflet";

interface ClickableMarkerProps {
  position: [number, number];
  onPositionChange: (position: [number, number]) => void;
  onZoomChange: (zoom: number) => void;
}

export function ClickableMarker({
  position,
  onPositionChange,
  onZoomChange,
}: ClickableMarkerProps) {
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
