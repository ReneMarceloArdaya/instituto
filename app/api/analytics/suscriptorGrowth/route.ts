import { getSuscribesGrowthInfo } from "@/actions/getSuscribesGrowthInfo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getSuscribesGrowthInfo();
    return NextResponse.json(data);
  } catch (error) {
    console.log("[getSuscribesGrowthInfo] error", error);
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
