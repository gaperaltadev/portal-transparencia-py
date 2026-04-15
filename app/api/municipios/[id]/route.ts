import { NextResponse } from "next/server";
import { getResumen } from "@/lib/datos";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const anio = new URL(_req.url).searchParams.get("anio");
  try {
    const resumen = getResumen(Number(id), anio ? Number(anio) : 2024);
    return NextResponse.json(resumen);
  } catch {
    return NextResponse.json({ error: "Municipio no encontrado" }, { status: 404 });
  }
}
