"use client";
import { FileImage, Pencil } from "lucide-react";
import { TitleBlock } from "..";
import { CourseImageProps } from "./CourseImage.type";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import axios from "axios";

export function CourseImage(props: CourseImageProps) {
  const { idCourse, imageCourse } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [image, setimage] = useState(imageCourse);

  const onChangeImage = async (imageUrl: string) => {
    try {
      axios.patch(`/api/course/${idCourse}`, {
        imageUrl,
      });
      toast.success("Imagen editada");
    } catch {
      toast.error("Error al editar la imagen");
    }

  };
  return (
    <div className="p-4 rounded-lg bg-white h-fit flex flex-col items-center justify-center">
      <TitleBlock tittle="Imagen del curso" icon={FileImage} />

      {isEditing ? (
        <div className="bg-slate-300 p-4 mt-3 rounded-lg">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            onChangeImage(res[0]?.ufsUrl);
            setimage(res[0]?.ufsUrl);
            setIsEditing(false);
          }}
          onUploadError={() => {
            toast.error("Error al subir la imagen");
          }}
        />
        </div>
      ) : (
        <Image
          src={image || "/Defaul_Img.png"}
          alt="Imagen del curso"
          className="rounded-md"
          width={300}
          height={150}
        />
      )}

      <Button
        className="w-full mt-4"
        variant="outline"
        size="sm"
        onClick={() => setIsEditing(!isEditing)}
      >
        <Pencil className="w-4 h-4" />
        Editar Imagen
      </Button>
    </div>
  );
}
