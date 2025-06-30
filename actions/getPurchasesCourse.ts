import prisma from "@/lib/prisma";

export const getIsPurchasesCourse = async (
  userId: string,
  courseId: string
): Promise<boolean> => {
    try {
        const purchase = await prisma.purchase.findMany({
            where: {
                userId: userId,
                courseId: courseId,
            },
        });

        return !!purchase;
    } catch (error) {
        console.error("Error checking purchase:", error);
        return false;
    }
};
