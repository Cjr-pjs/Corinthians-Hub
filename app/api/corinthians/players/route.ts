import { NextResponse } from "next/server";
import { getCorinthiansPlayers } from "@/lib/corinthians-players-cache";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const players = await getCorinthiansPlayers();

    return NextResponse.json({ players });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro inesperado ao buscar os jogadores do Corinthians.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}