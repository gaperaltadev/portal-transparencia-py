import { NextResponse } from "next/server";
import { getMunicipios } from "@/lib/datos";

export async function GET() {
  return NextResponse.json(getMunicipios());
}
