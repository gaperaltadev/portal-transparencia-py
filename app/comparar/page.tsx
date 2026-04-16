import CompararUI from "@/components/CompararUI";
import { MUNICIPIOS } from "@/lib/datos";

interface Props {
  searchParams: Promise<{ m1?: string; m2?: string }>;
}

// Server Component: lee searchParams y pasa datos estáticos. CompararUI maneja estado interactivo.
export default async function CompararPage({ searchParams }: Props) {
  const { m1, m2 } = await searchParams;
  return <CompararUI municipios={MUNICIPIOS} defaultM1={m1 ?? ""} defaultM2={m2 ?? ""} />;
}
