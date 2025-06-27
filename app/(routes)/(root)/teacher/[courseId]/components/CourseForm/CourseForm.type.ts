import { Chapter, Course } from "@prisma/client";


export type CourseFormProps = {
    course: CourseWithChapters;
};

type CourseWithChapters = Course & {
    chapters: Chapter[];
};