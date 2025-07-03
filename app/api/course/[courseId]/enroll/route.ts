import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    const { courseId } = context.params;
    const body = await req.json();
    const { price } = body;

    if (!userId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
    });

    if (existingPurchase) {
      return new NextResponse("Ya inscrito", { status: 400 });
    }

    await prisma.purchase.create({
      data: {
        userId: userId,
        courseId: courseId,
        price: price ?? 0,
      },
    });

    return new NextResponse("Inscripción exitosa", { status: 200 });
  } catch (error) {
    console.error("Error al inscribir:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
