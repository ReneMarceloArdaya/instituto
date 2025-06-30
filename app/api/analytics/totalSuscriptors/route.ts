
import { NextResponse } from "next/server";
import { getSuscribesByMonth } from "@/actions/getSuscribesByMonth";

export async function GET() {
    try {
        const data = await getSuscribesByMonth();
        return NextResponse.json(data);
    } catch (error) {
        console.log("[getSuscribesByMonth] error", error);
        return new NextResponse("Internal server error", {
            status: 500,
        });
    }
}