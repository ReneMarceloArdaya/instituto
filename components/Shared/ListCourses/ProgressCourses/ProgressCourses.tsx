// ProgressCourses.tsx
"use client";

import { useEffect, useState } from "react";
import { ProgressCoursesProps } from "./ProgressCourses.type";
import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse";
import { useUserStore } from "@/lib/store/UserStore";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/formarPrice";

export function ProgressCourses(props: ProgressCoursesProps) {
  const { courseId, totalChapters, price } = props;
  const userId = useUserStore((state) => state.userId);

  const [progressCourse, setProgressCourse] = useState<number | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProgress = async () => {
      const progress = await getUserProgressByCourse(courseId, userId);
      setProgressCourse(progress);
    };

    fetchProgress();
  }, [userId, courseId]);

  if (!userId) {
    return <p>Not logged in</p>;
  }

  if (progressCourse === null) {
    return <p>Cargando progreso...</p>;
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
