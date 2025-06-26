"use client";
import { Button } from "@/components/ui/button";
import { ChapterFormProps } from "./ChapterForm.type";
import { ArrowLeft, Cog, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { TitleBlock } from "../../../components";
import axios from "axios";
import { toast } from "sonner";
import { ChapterTitleForm } from "./ChapterTitleForm";
import { ChapterVideoForm } from "./ChapterVideoForm";

export function ChapterForm(props : ChapterFormProps) {
  const { chapter, courseId } = props;
  const router = useRouter();

  if (!chapter) {
    return null;
  }

  const onPublish = async (state: boolean) => {
   try {
      axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
         isPublished: state
      });
      toast("Capítulo publicado");
      router.refresh();
   } catch{
    toast.error("Error al publicar el capítulo");
   }
  };

  const removeChapter = async () => {
    try {
      await axios.delete(`/api/course/${courseId}/chapter/${chapter.id}`);
      router.push("/teacher/[courseId]");
      toast("Capítulo eliminado");
    } catch {
      toast.error("Error al eliminar el capítulo");
    }
  };

  return <div>
    <div className="p-6 bg-white rounded-md">
      <Button className="mb-4" variant="outline" onClick={() => router.back()}>
        <ArrowLeft/>
        Volver a la edición del curso
      </Button>
    </div>

    <div className="py-6 mt-6 px-4 bg-white rounded-md flex justify-between items-center">
      <TitleBlock tittle="Configuración del capítulo" icon={Cog}/>

      <div className="gap-2 flex items-center">
        {chapter.isPublished ? (
          <Button variant={"outline"}
          onClick={() => onPublish(false)}
          >Ocultar</Button>
        ) : (
          <Button
            onClick={() => onPublish(true)}
          >Publicar</Button>
        )} 
        <Button variant={"destructive"}
          onClick={() => removeChapter}
        >
          <Trash/>
        </Button>
      </div>
    </div>

    <ChapterTitleForm courseId={courseId} chapter={chapter}/>
    <ChapterVideoForm courseId={courseId} chapterId={chapter.id} videoUrl={chapter.videoUrl}/>

  </div>;
}
