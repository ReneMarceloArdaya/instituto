import { Chapter, UserProgress } from "@prisma/client"

export type ChaptersCoursesProps = {
    chapters: Chapter[] | null
    courseSlug: string
    chapterCourse: string
    userProgress: UserProgress[]
}