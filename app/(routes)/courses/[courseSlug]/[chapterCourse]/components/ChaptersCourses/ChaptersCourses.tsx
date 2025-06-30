import { ChaptersCoursesProps } from "./ChaptersCourses.type";
import { ChaptersList } from "./ChaptersList";


export function ChaptersCourses(props: ChaptersCoursesProps) {
    const { chapters, courseSlug, chapterCourse, userProgress } = props;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 h-fit">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Capítulos del Curso
        </h2>
        <ChaptersList
            chapters={chapters}
            courseSlug={courseSlug}
            currentChapter={chapterCourse}
            userProgress={userProgress}
        />
    </div>
  )
}
