"use client";
import { Progress } from "@/components/ui/progress";
import { ProgressCourseProps } from "./ProgressCourse.type";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ProgressCourse(props: ProgressCourseProps) {
  const { userProgress, chapterCourseId, infoCourse } = props;
  const { id, slug, chapters } = infoCourse;

  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const progress = userProgress.find(
        (progress) => progress.chapterId === chapterCourseId
    );
    if (progress) {
      setIsCompleted(progress.isCompleted);
    }
  }, [chapterCourseId, userProgress]);

  const handleViewChapter = async (isCompleted: boolean) => {
    try {
      await axios.patch(
        `/api/course/${id}/chapter/${chapterCourseId}/progress`,
        JSON.stringify({
          isCompleted: isCompleted,
        })
      );
      toast(isCompleted ? "Capítulo completado" : "Capítulo no completado");

      if (isCompleted) {
        const currentIndex = chapters.findIndex(
          (chapter) => chapter.id === chapterCourseId
        );
        const nextChapter = chapters[currentIndex + 1];
        if (nextChapter) {
          router.push(`/courses/${slug}/${nextChapter.id}`);
        }
      }
      router.refresh();
    } catch (error) {
      console.log("Error al marcar como completado:", error);
      toast.error("Error al marcar como completado");
    }
  };

  const totalChapters = chapters.length;
  const completedChapters = chapters.filter((chapter) =>
    userProgress.some(
      (progress) => progress.chapterId === chapter.id && progress.isCompleted
    )
  ).length;

  const progressPorcentage =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0;

  return (
    <div>
      <div
        className="my-4 w-full flex items-center gap-2 flex-col p-2
        border rounded-md shadow-md bg-white"
      >
        <span className="text-sm">
          Progreso del Curso | {progressPorcentage}%
        </span>
        <Progress value={progressPorcentage} className="[&>*]:bg-violet-300" />
      </div>

      <div className="my-4 w-full">
        <Button
          className="w-full"
          onClick={() => handleViewChapter(!isCompleted)}
          variant={isCompleted ? "outline" : "default"}
        >
          {isCompleted ? "Marcar como no completado" : "Marcar como completado"}
        </Button>
      </div>
    </div>
  );
}
