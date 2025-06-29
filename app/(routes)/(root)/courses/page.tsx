
import { searchCourses } from "@/actions/searchCourses";
import { ListCourses } from "@/components/Shared";

export default async function CoursesPage() {
    const courses = await searchCourses("");

  return <div>
        <ListCourses title="Todos los Cursos" courses={courses} />
  </div>;
}
