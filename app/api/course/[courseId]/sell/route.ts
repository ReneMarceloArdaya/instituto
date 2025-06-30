import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }:
    { params: Promise<{ courseId: string }> }
    ) {
        try {
            const { userId } = await auth();
            const { courseId } = await params;

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
                return new NextResponse("Already enrolled", { status: 400 });
            }
            
            await prisma.purchase.create({
                data: {
                    userId: userId,
                    courseId: courseId,
                    price: 0,
                },
            });

            return new NextResponse("Enrolled successfully", { status: 200 });
        } catch (error) {
            console.error("Error enrolling:", error);
            return new NextResponse("Internal Error", { status: 500 });
        }
    }