import { getPurchasedCourse } from "@/actions/getPurchasedCourse";
import { ListCourses } from "@/components/Shared";

export default async function MyCoursesPage() {
    const courses = await getPurchasedCourse();

  return (
    <div>
        <ListCourses title="Mis Cursos" courses={courses} />
    </div>
  )
}
