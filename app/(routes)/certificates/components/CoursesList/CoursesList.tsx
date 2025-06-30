import Image from "next/image";
import { CoursesListProps } from "./CoursesList.type";
import { CourseProgressDisplay } from "./CourseProgressDisplay";

export function CoursesList(props: CoursesListProps) {
  const { courses, userName } = props;
  return (
    <div className="grid grid-cols-1 gap-5">
      {courses.map((course) => (
        <div
          key={course.id}
          className="border rounded-md p-4 flex gap-4 justify-between shadow-sm"
        >
          <div className="flex gap-4 items-center justify-center">
            <div>
              <Image
                src={course.imageUrl || "/Defaut_Img.png"}
                alt={course.title}
                width={100}
                height={100}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="max-w-sm text-gray-600 text-xs line-clamp-2">
                {course.description}
              </p>
            </div>
          </div>

          <div>
            <CourseProgressDisplay 
                progress={course.progress}
                titleCourse={course.title}
                userName={userName}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
