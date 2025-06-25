import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export	async function POST(
    req: Request, 
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;
        const { title } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "No autenticado" }, { status: 401 });
        }

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId: userId,
            },
        });

        if (!course) {
            return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
        }

        const chapterCount = await prisma.chapter.count({
            where: {
                courseId: courseId,
            },
        });

        const chapter = await prisma.chapter.create({
            data: {
                title,
                courseId,
                position: chapterCount + 1,
            },
        });

        return NextResponse.json(chapter);
    } catch (error) {
        console.log("[Chapters] Error creating chapter", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
