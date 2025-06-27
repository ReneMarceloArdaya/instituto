import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
        const {userId} = await auth();
        const {courseName, slug} = await req.json();

        if(!userId){
            return NextResponse.json({error: "No se ha autenticado el usuario"}, {status: 401})
        }

        const course = await prisma.course.create({
            data: {
                userId,
                title: courseName,
                slug,
            }
        })

        return NextResponse.json(course)

    }catch(error){
        console.log(error)
        return NextResponse.json({error: error}, {status: 500})
    }
    
}