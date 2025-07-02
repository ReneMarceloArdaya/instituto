import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  ChaptersBlock,
  ClassTypeSelector,
  CourseForm,
  CourseImage,
  CoursePrice,
  HeaderCourse,
} from "./components";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return <p>No tienes permisos para ver este curso. </p>;
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc"
        }
      }
    },
  });

  if (!course) {
    return <p>Curso no encontrado</p>;
  }

  return (
    <div className="m-6">
      <HeaderCourse idCourse={course.id} isPublished={course.isPublished} />
      <CourseForm course={course} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <CourseImage idCourse={course.id} imageCourse={course.imageUrl} />
        <CoursePrice idCourse={course.id} priceCourse={course.price} />
      </div>
      <div className="gap-4 my-4">
        <ClassTypeSelector idCourse={course.id} typeCourse={course.TypeCourse} latitude={course.latitud} longitude={course.longitud} />
      </div>
      <ChaptersBlock idCourse={course.id} chapters={course.chapters} />
    </div>
  );
}
