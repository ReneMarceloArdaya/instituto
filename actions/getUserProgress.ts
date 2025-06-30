import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getUserProgress = async () => {
    try {
        const user = await currentUser();

        if(!user?.id){
            throw new Error("No autenticado");
        }

        const progress = await prisma.userProgress.findMany({
            where: {
                userId: user.id,
            },
        });
        
        return progress;
    } catch (error) {
        console.log("Error fetching user progress:", error);
        return [];
    }
}