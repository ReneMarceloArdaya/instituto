import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string }>}
) {
  try {
    
    const { userId } = await auth();
    const { courseId } = await params;
    const { list } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    
    const ownCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!ownCourse) {
      return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
    }
    
    for (const item of list) {
        await prisma.chapter.update({
            where: {
                id: item.id,
            },
            data: {
                position: item.position,
            },
        });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[Chapters] Error updating chapter", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}