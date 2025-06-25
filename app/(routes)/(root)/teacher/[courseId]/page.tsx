import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CourseForm, CourseImage, HeaderCourse } from "./components";

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
      chapters: true,
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
      </div>
    </div>
  );
}
