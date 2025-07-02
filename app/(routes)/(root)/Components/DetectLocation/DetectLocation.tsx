"use client";

import { useEffect, useState } from "react";

export function DetectLocation() {
  const [location, setLocation] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );
      const data = await res.json();
      const city =
        data?.results?.[0]?.components?.city ||
        data?.results?.[0]?.components?.town ||
        data?.results?.[0]?.components?.village;
      const lat = data?.results?.[0]?.geometry?.lat;
      const lng = data?.results?.[0]?.geometry?.lng;

      setLocation(city);
      
      await fetch("/api/save-location", {
        method: "POST",
        body: JSON.stringify({
          city,
          lat,
          lng,
         }),
      });
    });
  }, []);

  if (!location) return null;
}
