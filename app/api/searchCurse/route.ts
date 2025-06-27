import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { query } = await request.json();
  
    // Aquí puedes procesar 'query' como necesites
    console.log("Búsqueda recibida:", query);
  
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }