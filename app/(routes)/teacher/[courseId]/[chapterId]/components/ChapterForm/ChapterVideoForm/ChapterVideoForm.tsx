"use client";
import { Pencil, Video } from "lucide-react";
import { TitleBlock } from "../../../../components";
import { ChapterVideoFormProps } from "./ChapterVideoForm.type";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function ChapterVideoForm(props: ChapterVideoFormProps) {
  const { courseId, chapterId, videoUrl } = props;
  const [onEditVideo, setOnEditVideo] = useState(false)

  const router = useRouter();
  const onSubmit = async(url: string) => {
    try {
        await axios.patch(`/api/course/${courseId}/chapter/${chapterId}`, {
            videoUrl: url,
          });
          router.refresh();
          toast("Video actualizado");
          setOnEditVideo(false);
    } catch {
        toast.error("Error al actualizar el video");
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-md">
      <TitleBlock
        tittle="Añade o modifica el video del capítulo"
        icon={Video}
      />

      {videoUrl ? (
        <video src={videoUrl} controls className="rounded-md" />
      ) : (
        <p>No hay video para este capítulo</p>
      )}

      <div className="mt-4 p-2 rounded-md border">
        <Button variant="secondary" onClick={() => setOnEditVideo(true)} className="cursor-pointer">
            {onEditVideo ? "Arrastra o selecciona el video" : "Editar Video"}
            <Pencil className="w-4 h-4"/>
        </Button>
        {onEditVideo && (
            <UploadButton
            className="m-full bg-slate-200 rounded-md p-2 mt-2"
            endpoint="chapterVideo"
            onClientUploadComplete={(url) => {
                if (url) {
                    onSubmit(url[0].serverData.url);
                }
            }}
            />
        )}
      </div>
    </div>
  );
}
