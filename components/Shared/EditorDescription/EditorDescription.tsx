"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div>Cargando editor...</div>,
});

export type EditorDescriptionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const EditorDescription = ({ value, onChange }: EditorDescriptionProps) => {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  useEffect(() => {
    setCharCount(value.length); // cuenta caracteres incluyendo etiquetas HTML
  }, [value]);

  const handleChange = (content: string) => {
    if (content.length <= maxChars) {
      onChange(content);
    }
    else {
      toast.error("El texto supera los 500 caracteres permitidos");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder="Escribe aquí tu descripción"
        style={{ minHeight: "200px", backgroundColor: "white" }}
      />
      <p
        style={{
          fontSize: "12px",
          color: charCount >= maxChars ? "red" : "gray",
          textAlign: "right",
          marginTop: "4px",
        }}
      >
        {charCount} / {maxChars} caracteres
      </p>
    </div>
  );
};
