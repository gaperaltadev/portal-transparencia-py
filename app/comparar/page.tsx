import CompararUI from "@/components/CompararUI";
import { MUNICIPIOS } from "@/lib/datos";

export default function CompararPage() {
  return <CompararUI municipios={MUNICIPIOS} />;
}
