"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ActionsProps } from "./Actions.type";
import { Edit, Trash } from "lucide-react";

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
import axios from "axios";
import { toast } from "sonner";

export function Actions(props: ActionsProps) {
  const { courseId } = props;
  const router = useRouter();

  const onEdit = () => {
    router.push(`/teacher/${courseId}`);
  };

  const onDelete = () => {
    axios.delete(`/api/course/${courseId}`);
    toast.success("Curso eliminado");
    router.refresh();
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full lg:max-w-42">
      <Button className="w-full" onClick={onEdit}>
        Editar <Edit className="w-4 h-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="text-red-500 w-full border-red-500 hover:bg-red-100 hover:text-red-500">
            Eliminar <Trash className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estas Seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto borrara el curso de forma permanente junto a todos sus datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
