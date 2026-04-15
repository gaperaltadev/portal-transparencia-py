import Link from "next/link";
import { notFound } from "next/navigation";
import { getResumen, MUNICIPIOS } from "@/lib/datos";
import { guaranies, millones } from "@/lib/format";
import BarrasCategoria from "@/components/charts/BarrasCategoria";
import AreaHistorico from "@/components/charts/AreaHistorico";

export function generateStaticParams() {
  return MUNICIPIOS.map((m) => ({ id: String(m.id) }));
}

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ anio?: string }>;
}

export default async function MunicipioPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { anio: anioStr } = await searchParams;
  const anio = anioStr ? Number(anioStr) : 2024;

  let resumen;
  try {
    resumen = getResumen(Number(id), anio);
  } catch {
    notFound();
  }

  const { municipio, total, perCapita, porCategoria, historico } = resumen;

  return (
    <main className="min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{municipio.nombre}</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">{municipio.nombre}</h1>
        <p className="text-gray-400 mt-1 mb-6">{municipio.departamento}</p>

        {/* Selector de año */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[2020, 2021, 2022, 2023, 2024].map((y) => (
            <Link
              key={y}
              href={`/municipios/${id}?anio=${y}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                y === anio
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-blue-400"
              }`}
            >
              {y}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total ejecutado", value: guaranies(total), sub: `Año ${anio}` },
            { label: "Gasto per cápita", value: guaranies(perCapita), sub: `${municipio.poblacion.toLocaleString("es-PY")} habitantes` },
            { label: "Categorías", value: String(porCategoria.length), sub: "rubros de gasto" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-400 mb-1">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-700 mb-4">Gasto por categoría</h2>
            <BarrasCategoria data={porCategoria} />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-700 mb-4">Evolución histórica</h2>
            <AreaHistorico data={historico} />
          </div>
        </div>

        <Link href={`/comparar?m1=${id}`} className="text-sm text-blue-600 hover:underline font-medium">
          Comparar con otro municipio →
        </Link>

        <p className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400">
          Datos: transferencias del gobierno central (FONACIDE, TGN, royalties). Fuente: datos.gov.py · Hacienda PY.
        </p>
      </div>
    </main>
  );
}
