import { getCourseBySlug } from "@/actions/getCourseBySlug";
import { BreadCrumbCourse } from "./components";
import { redirect } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const infoCourse = await getCourseBySlug(courseSlug);

  if (!infoCourse) {
    redirect("/");
  }

  return (
    <div className="max-w6xl mx-auto">
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        <BreadCrumbCourse title={infoCourse.title} />
      </div>
    </div>
  );
}
