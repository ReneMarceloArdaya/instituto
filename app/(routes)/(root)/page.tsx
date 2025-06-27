
import { getHomeCourses } from "@/actions/getHomeCourses";
import { ExploreCourse } from "./Components";
import { ListCourses } from "@/components/Shared";

export default async function Home() {
    const listCourses = await getHomeCourses();

  return (
    <div>
        <ExploreCourse/>
        <ListCourses title="Cursos" courses={listCourses} />
    </div>
)
}
