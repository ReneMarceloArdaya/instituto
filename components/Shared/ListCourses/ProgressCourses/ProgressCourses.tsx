// ProgressCourses.tsx
"use client";

import { useEffect, useState } from "react";
import { ProgressCoursesProps } from "./ProgressCourses.type";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/formarPrice";
import { useUser } from "@clerk/nextjs";
import { Loader2, AlertTriangle } from "lucide-react";
import axios from "axios";

export function ProgressCourses(props: ProgressCoursesProps) {
  const { courseId, totalChapters, price } = props;
  const { user} = useUser();

  const [progressCourse, setProgressCourse] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if(!user?.id) return setLoading(false);
      try {
        const { data } = await axios.post("/api/get-user-progress",
          {
            courseId: courseId,
            userId: user.id,
          });
          setProgressCourse(data.progress);
      } catch (error) {
        console.log("Error al obtener el progreso:", error);
      }finally{
        setLoading(false);
      }
    }

    fetchProgress();
  }, [user?.id, courseId]);

  if (!user?.id) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
        <AlertTriangle className="w-4 h-4" />
        Usuario no autenticado
      </div>
    );
  }

  if(loading){
    return (
      <div className="flex items-center gap-2 text-sm text-violet-500 mt-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        Cargando progreso...
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      {totalChapters > 0 && progressCourse > 0 ? (
        <div>
          <Progress value={progressCourse} className="[&>*]:bg-violet-300" />
          <p className="text-xs ml-1">{progressCourse}% Completado</p>
        </div>
      ) : (
        <h4>{formatPrice(price)}</h4>
      )}
    </div>
  );
}
