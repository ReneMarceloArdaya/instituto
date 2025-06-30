import prisma from "@/lib/prisma";
export const getPurchaseCourseById = async (courseId: string, userId: string): Promise<boolean> => {
    try {
        const purchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: courseId,
                },
            },
            include: {
                course: true,
            },
        });

        if (!purchase) {
            return false;
        }

        return !!purchase;
    } catch (error) {
        console.error("Error checking purchase:", error);
        return false;
    }
}