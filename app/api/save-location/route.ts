import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { city, lat, lng } = await req.json();

  if (!city) return new Response("City is required", { status: 400 });
  
  const client = await clerkClient();
  await client.users.updateUser(userId, {
    publicMetadata: {
      city,
      lat,
      lng,
    },
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
