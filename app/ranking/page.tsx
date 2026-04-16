import type { Metadata } from "next";
import Link from "next/link";
import { getRanking, ANOS_DISPONIBLES } from "@/lib/datos";
import { guaranies } from "@/lib/format";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ranking de Municipios — Transparencia Municipal PY",
  description: "Ranking comparativo de gasto per cápita de los municipios piloto de Paraguay.",
};

interface Props {
  searchParams: Promise<{ anio?: string }>;
}

export default async function RankingPage({ searchParams }: Props) {
  const { anio: anioStr } = await searchParams;
  const anioSolicitado = anioStr ? Number(anioStr) : 2024;
  const anio = ANOS_DISPONIBLES.includes(anioSolicitado) ? anioSolicitado : 2024;

  const ranking = getRanking(anio);

  return (
    <main className="min-h-screen">
      <Header breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Ranking" }]} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-2">Ranking de municipios</h1>
        <p className="text-gray-500 mb-6">
          Municipios piloto ordenados por gasto per cápita — transferencias del gobierno central {anio}.
        </p>

        {/* Selector de año */}
        <div className="flex gap-2 mb-8 flex-wrap" role="group" aria-label="Seleccionar año">
          {ANOS_DISPONIBLES.map((y) => (
            <Link
              key={y}
              href={`/ranking?anio=${y}`}
              aria-current={y === anio ? "page" : undefined}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                y === anio
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-white text-gray-500 border-gray-200 hover:border-teal-400"
              }`}
            >
              {y}
            </Link>
          ))}
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 w-10">#</th>
                  <th className="px-4 py-3">Municipio</th>
                  <th className="px-4 py-3 text-right">Total transferido</th>
                  <th className="px-4 py-3 text-right">Per cápita</th>
                  <th className="px-4 py-3 text-right">Variación interanual</th>
                  <th className="px-4 py-3 text-right">Ejecución</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ranking.map((r, i) => (
                  <tr key={r.municipio.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 font-mono">{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/municipios/${r.municipio.id}`}
                        className="font-semibold text-gray-900 hover:text-teal-700 transition-colors"
                      >
                        {r.municipio.nombre}
                      </Link>
                      <span className="text-gray-400 text-xs ml-2 hidden sm:inline">
                        {r.municipio.departamento}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums">
                      {guaranies(r.total)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums">
                      {guaranies(r.perCapita)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r.variacion !== null ? (
                        <span
                          className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                            r.variacion >= 0
                              ? "bg-teal-50 text-teal-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {r.variacion >= 0 ? "↑" : "↓"} {Math.abs(r.variacion)}%
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r.ejecucion !== null ? (
                        <span
                          className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                            r.ejecucion >= 75
                              ? "bg-teal-50 text-teal-700"
                              : r.ejecucion >= 65
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                          title="Estimado — fuentes: CGR, Hacienda, CADEP"
                        >
                          {r.ejecucion}%
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Datos: transferencias del gobierno central (FONACIDE, TGN, royalties). Fuente: datos.gov.py · Hacienda PY.
          El gasto per cápita se calcula dividiendo el total transferido por la población del municipio (Censo 2022, INE).
          Los porcentajes de ejecución son <strong>estimados</strong> basados en reportes de la CGR, Hacienda y CADEP — no son datos oficiales auditados por municipio.
        </p>
      </div>

      <Footer />
    </main>
  );
}
