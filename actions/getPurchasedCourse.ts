import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Course, Chapter } from "@prisma/client";

export const getPurchasedCourse = async (): Promise<
  (Course & { chapters: Chapter[] })[] | null
> => {
    const user = await currentUser();
    if (!user) {
        throw new Error("No user found");
    }

    try {
        const purchasedCourses = await prisma.course.findMany({
            where: {
                purchases: {
                    some: {
                        userId: user.id,
                    },
                },
                isPublished: true,
            },
            include: {
                chapters: {
                    where: {
                        isPublished: true,
                    },
                }
            },
        });

        return purchasedCourses;
    } catch (error) {
        console.log(error);
        return [];
    }
};
