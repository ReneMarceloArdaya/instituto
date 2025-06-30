"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";


const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div>Cargando editor...</div>,
});

export type EditorDescriptionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const EditorDescription = ({ value, onChange }: EditorDescriptionProps) => {

  const handleChange = (content: string) => {
    onChange(content);
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
    </div>
  );
};
