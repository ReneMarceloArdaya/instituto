import { getPurchasedCourse } from "@/actions/getPurchasedCourse";
import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse";
import { currentUser } from "@clerk/nextjs/server";
import { Award } from "lucide-react";
import { CoursesList } from "./components";

export default async function CertificatesPage() {
  const courses = await getPurchasedCourse();

  const user = await currentUser();

  if (!user) {
    return <p>Not logged in</p>;
  }

  const userName = `${user.firstName} ${user.lastName? user.lastName : ""}`;

  if (!courses) {
    return null;
  }

  const coursesWithProgress = await Promise.all(
    courses.map(async (courses) => {
      const progress = await getUserProgressByCourse(user.id, courses.id);
      return {
        ...courses,
        progress: progress,
      };
    })
  );

  return <div className="m-6 p-6 border bg-white rounded-md">
    <div className="flex items-center gap-1 mb-4">
        <div className="p-2 rounded-full bg-violet-400">
            <Award className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold">Certificados de los Cursos</h3>
    </div>

    <CoursesList 
      courses={coursesWithProgress}
      userName={userName}
    />
  </div>;
}
