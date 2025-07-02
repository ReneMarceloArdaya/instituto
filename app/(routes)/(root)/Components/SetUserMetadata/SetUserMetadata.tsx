"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export function SetUserMetadata() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    const setMetadata = async () => {
      try {
        await axios.post("/api/set-user-metadata");
      } catch (error) {
        console.error("Error al asignar metadata:", error);
      }
    };

    setMetadata();
  }, [isLoaded, user?.id]);

  return null;
}
