import { NextResponse } from "next/server";
import { getMunicipios } from "@/lib/datos";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(getMunicipios());
}
