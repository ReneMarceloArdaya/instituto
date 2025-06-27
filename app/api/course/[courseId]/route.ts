import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export	async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const { userId } = await auth();
    const {courseId} = await params;
    const values = await req.json();

		if (!userId) {
			return NextResponse.json({ error: "No autenticado" }, { status: 401 });
		}

    const course = await prisma.course.update({
			where: {
				id: courseId,
				userId: userId,
			},
			data: values
		});

		return NextResponse.json(course);

	} catch (error) {
		console.log("[Courses] Error updating course", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { courseId } = await params;
    const course = await prisma.course.delete({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[Courses] Error deleting course", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
