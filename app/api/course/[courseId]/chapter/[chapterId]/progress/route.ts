import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string, chapterId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId, chapterId } = await params;
        const { isCompleted } = await req.json();

        if (!userId) {
            return new NextResponse("No autenticado", { status: 401 });
        }

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
            },
            select: {
                courseId: true,
            },
        });

        if (!chapter || chapter.courseId !== courseId) {
            return new NextResponse("Chapter not found", { status: 404 });
        }

        const userProgress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId: userId,
                    chapterId: chapterId,
                },
            },
            update: {
                isCompleted: isCompleted,
            },
            create: {
                userId: userId,
                chapterId: chapterId,
                isCompleted: isCompleted,
            },
        });

        return NextResponse.json(userProgress);
        
    } catch (error) {
        console.log("[Chapters] Error updating chapter", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}