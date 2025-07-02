import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST() {
  const { userId } = await auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const client = await clerkClient();

    const user = await client.users.getUser(userId);
    const curremtMetadata = user.privateMetadata;

    await client.users.updateUser(userId,{
      privateMetadata: {
        ...curremtMetadata,
        isAlumno: true,
      },
    }); 

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error al asignar metadata privada:", error);
    return new Response("Error interno", { status: 500 });
  }
}
