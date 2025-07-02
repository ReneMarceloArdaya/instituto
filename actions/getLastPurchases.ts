import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function getLastPurchases(limit: number = 20) {
    const {userId} = await auth();
    if(!userId){
        return []
    }

    const purchase = await prisma.purchase.findMany({
        where: {
            course: {
                userId: userId,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: limit,
        include: {
            course: {
                select: {
                    title: true,
                    slug: true,
                    imageUrl: true,
                    price: true,
                }
            },
        },
    });

    const clerk = await clerkClient();

    const purchasesWithEmail = await Promise.all(purchase.map(async (purchase) => {
        const user = await clerk.users.getUser(purchase.userId);
        return {
            ...purchase,
            userEmail: user.emailAddresses[0].emailAddress || "No email",
        }
    }));
    
    return purchasesWithEmail;
}