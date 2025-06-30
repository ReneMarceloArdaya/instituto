"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeaderCourseProps } from "./HeaderCourse.type";
import { Button } from "@/components/ui/button";
import { EyeOff, MoveLeft, Eye, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function HeaderCourse(proms: HeaderCourseProps) {
  const { idCourse, isPublished } = proms;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onPublish = async (state: boolean) => {
    setIsLoading(true);
    try {
      axios.patch(`/api/course/${idCourse}`, {
        isPublished: state,
      });
      toast(state ? "Curso Publicado" : "Curso Oculto");
      router.refresh();
    } catch (error) {
      toast.error("Error al publicar el curso");
      console.log(error);
    }
    setIsLoading(false);
  };

  const onDelete = async () => {
    axios.delete(`/api/course/${idCourse}`);
    toast.success("Curso eliminado");

    router.push("/teacher");
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Button onClick={() => router.push("/teacher") /* router.back() */}>
          <MoveLeft />
          Volver a todos los cursos
        </Button>
        <div className="gap-2 flex items-center">
          {isPublished ? (
            <Button
              variant="outline"
              onClick={() => onPublish(false)}
              disabled={isLoading}
            >
              Despublicar
              <EyeOff />
            </Button>
          ) : (
            <Button disabled={isLoading} onClick={() => onPublish(true)}>
              Publicar <Eye />
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Estas Seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esto borrara el curso de forma permanente junto a todos sus
                  datos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
