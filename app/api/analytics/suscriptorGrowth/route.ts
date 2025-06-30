import { getSuscribesGrowthInfo } from "@/actions/getSuscribesGrowthInfo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const growthInfo = await getSuscribesGrowthInfo();
    return NextResponse.json(growthInfo);
  } catch (error) {
    console.log("[getSuscribesGrowthInfo] error", error);
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
