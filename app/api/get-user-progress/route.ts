import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseId, userId } = body;

    if (!userId || !courseId) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const userProgress = await prisma.purchase.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });

    if (!userProgress) {
      return NextResponse.json({ progress: 0 });
    }

    const totalChapters = await prisma.chapter.count({
      where: {
        courseId: courseId,
      },
    });

    if (totalChapters === 0) {
      return NextResponse.json({ progress: 0 });
    }

    const completedChapters = await prisma.userProgress.count({
      where: {
        userId: userId,
        isCompleted: true,
        chapter: {
          courseId: courseId,
        },
      },
    });

    const progressPercentage = Math.round(
      (completedChapters / totalChapters) * 100
    );

    return NextResponse.json({ progress: progressPercentage });
  } catch (error) {
    console.log("[User Progress] Error fetching user progress", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
