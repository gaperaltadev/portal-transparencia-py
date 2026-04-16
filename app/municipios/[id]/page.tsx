import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResumen, getPromedioPerCapita, MUNICIPIOS, ANOS_DISPONIBLES, EJECUCION } from "@/lib/datos";
import { getResumenCiudadano } from "@/lib/resumenes";
import { guaranies, millones } from "@/lib/format";
import BarrasCategoria from "@/components/charts/BarrasCategoria";
import AreaHistorico from "@/components/charts/AreaHistorico";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return MUNICIPIOS.map((m) => ({ id: String(m.id) }));
}

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ anio?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const municipio = MUNICIPIOS.find((m) => m.id === Number(id));
  if (!municipio) return {};
  return {
    title: `${municipio.nombre} — Transparencia Municipal PY`,
    description: `Gastos públicos de ${municipio.nombre}, departamento ${municipio.departamento}. Datos de transferencias del gobierno central 2020–2024.`,
    openGraph: {
      title: `${municipio.nombre} — Transparencia Municipal PY`,
      description: `Gastos públicos de ${municipio.nombre}, ${municipio.departamento}.`,
    },
  };
}

export default async function MunicipioPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { anio: anioStr } = await searchParams;
  const anioSolicitado = anioStr ? Number(anioStr) : 2024;

  // Validar que el año esté en el rango permitido
  const anio = ANOS_DISPONIBLES.includes(anioSolicitado) ? anioSolicitado : 2024;

  let resumen;
  try {
    resumen = getResumen(Number(id), anio);
  } catch {
    notFound();
  }

  const { municipio, total, perCapita, porCategoria, historico } = resumen;
  const promedio = getPromedioPerCapita(anio);
  const diffPct = Math.round(((perCapita - promedio) / promedio) * 100);
  const ejecucion = EJECUCION[Number(id)]?.[anio] ?? null;
  const resumenCiudadano = getResumenCiudadano(Number(id), anio);

  return (
    <main className="min-h-screen">
      <Header breadcrumb={[{ label: "Inicio", href: "/" }, { label: municipio.nombre }]} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h1 className="text-3xl font-extrabold">{municipio.nombre}</h1>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              diffPct >= 0
                ? "bg-teal-50 text-teal-700 border border-teal-200"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
            title={`Promedio de municipios piloto: ${guaranies(promedio)} per cápita`}
          >
            {diffPct >= 0 ? "↑" : "↓"} {Math.abs(diffPct)}% vs promedio
          </span>
        </div>
        <p className="text-gray-500 mt-1 mb-6">{municipio.departamento} · {municipio.poblacion.toLocaleString("es-PY")} hab.</p>

        {/* Selector de año */}
        <div className="flex gap-2 mb-8 flex-wrap" role="group" aria-label="Seleccionar año">
          {ANOS_DISPONIBLES.map((y) => (
            <Link
              key={y}
              href={`/municipios/${id}?anio=${y}`}
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

        {/* Resumen en lenguaje ciudadano */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl px-5 py-4 mb-8">
          <p className="text-sm text-teal-900 leading-relaxed">{resumenCiudadano}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total transferido", value: guaranies(total), sub: `Año ${anio}` },
            { label: "Gasto per cápita", value: guaranies(perCapita), sub: `${municipio.poblacion.toLocaleString("es-PY")} habitantes` },
            { label: "Categorías", value: String(porCategoria.length), sub: "rubros de gasto" },
            { label: "Ejecución estimada", value: ejecucion !== null ? `${ejecucion}%` : "—", sub: ejecucion !== null ? "del presupuesto transferido" : `Sin dato para ${anio}` },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-700 mb-4">Gasto por categoría</h2>
            <div role="img" aria-label={`Gráfico de gasto por categoría — ${municipio.nombre} ${anio}`}>
              <BarrasCategoria data={porCategoria} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-700 mb-4">Evolución histórica</h2>
            <div role="img" aria-label={`Gráfico de evolución histórica — ${municipio.nombre}`}>
              <AreaHistorico data={historico} gradientId={`grad-${id}`} />
            </div>
          </div>
        </div>

        <Link href={`/comparar?m1=${id}`} className="text-sm text-teal-600 hover:underline font-medium">
          Comparar con otro municipio →
        </Link>

        <p className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-500">
          Datos: transferencias del gobierno central (FONACIDE, TGN, royalties). Fuente: datos.gov.py · Hacienda PY.
        </p>
      </div>

      <Footer />
    </main>
  );
}
