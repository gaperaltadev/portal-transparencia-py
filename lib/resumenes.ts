import { getResumen, getPromedioPerCapita, MUNICIPIOS, ANOS_DISPONIBLES, TOTAL_NACIONAL } from "./datos";
import { guaranies } from "./format";

/**
 * Genera un resumen en lenguaje ciudadano para un municipio en un año dado.
 * Template-based: construye narrativa desde los datos estructurados sin llamadas a API.
 */
export function getResumenCiudadano(municipioId: number, anio = 2024): string {
  const r = getResumen(municipioId, anio);
  const promedio = getPromedioPerCapita(anio);
  const diffPct = Math.round(((r.perCapita - promedio) / promedio) * 100);
  const absDiff = Math.abs(diffPct);

  // Top 2 categorías
  const top1 = r.porCategoria[0];
  const top2 = r.porCategoria[1];
  const pctTop1 = Math.round((top1.monto / r.total) * 100);
  const pctTop2 = Math.round((top2.monto / r.total) * 100);

  // Variación interanual
  let variacionTexto = "";
  if (ANOS_DISPONIBLES.includes(anio - 1)) {
    const anterior = getResumen(municipioId, anio - 1);
    const variacion = Math.round(((r.total - anterior.total) / anterior.total) * 100);
    if (variacion > 0) {
      variacionTexto = `, un ${variacion}% más que en ${anio - 1}`;
    } else if (variacion < 0) {
      variacionTexto = `, un ${Math.abs(variacion)}% menos que en ${anio - 1}`;
    } else {
      variacionTexto = `, sin variación respecto a ${anio - 1}`;
    }
  }

  // Comparación con promedio
  let comparacionTexto: string;
  if (absDiff <= 3) {
    comparacionTexto = "está en línea con el promedio de los municipios piloto";
  } else if (diffPct > 0) {
    comparacionTexto = `recibe ${absDiff}% más per cápita que el promedio de los municipios piloto`;
  } else {
    comparacionTexto = `recibe ${absDiff}% menos per cápita que el promedio de los municipios piloto`;
  }

  // Contexto especial por municipio
  const contextos: Record<number, string> = {
    1: " Asunción no recibe fondos FONACIDE desde 2018 por incumplimiento en la transferencia del impuesto inmobiliario al MEF.",
    2: " Ciudad del Este arrastra una deuda de G. 108.000 millones según la Contraloría.",
    3: " Encarnación invirtió más de G. 3.200 millones en obras escolares vía FONACIDE.",
  };

  const contextoEspecial = contextos[municipioId] ?? "";

  return (
    `${r.municipio.nombre} recibió ${guaranies(r.total)} en transferencias del gobierno central en ${anio}${variacionTexto}. ` +
    `La mayor parte del gasto (${pctTop1}%) se destinó a ${top1.categoria.toLowerCase()}, ` +
    `seguido de ${top2.categoria.toLowerCase()} (${pctTop2}%). ` +
    `Con ${guaranies(r.perCapita)} por habitante, ${r.municipio.nombre} ${comparacionTexto}.` +
    contextoEspecial
  );
}
