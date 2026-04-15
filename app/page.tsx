import Link from "next/link";
import { MUNICIPIOS } from "@/lib/datos";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-md" />
          <div>
            <p className="font-bold text-gray-900 leading-tight">Transparencia Municipal PY</p>
            <p className="text-xs text-gray-400">Gastos públicos de municipios de Paraguay</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">¿Cuánto gasta tu municipio?</h1>
        <p className="text-gray-500 mb-6 max-w-xl">
          Consultá, comparé y analizá los gastos públicos de los 10 municipios piloto.
          Datos de transferencias del gobierno central (FONACIDE, TGN, royalties).
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800 mb-8">
          Los montos representan <strong>transferencias del gobierno central</strong> a los municipios,
          no la totalidad del presupuesto municipal.
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">Municipios piloto</h2>
          <Link href="/comparar" className="text-sm text-blue-600 hover:underline font-medium">
            Comparar →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MUNICIPIOS.map((m) => (
            <Link
              key={m.id}
              href={`/municipios/${m.id}`}
              className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center justify-between hover:border-blue-400 hover:shadow-sm transition-all group"
            >
              <div>
                <p className="font-semibold group-hover:text-blue-600 transition-colors">{m.nombre}</p>
                <p className="text-sm text-gray-400">{m.departamento} · {m.poblacion.toLocaleString("es-PY")} hab.</p>
              </div>
              <span className="text-gray-300 group-hover:text-blue-400 text-xl transition-colors">›</span>
            </Link>
          ))}
        </div>
      </div>

      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-5 text-xs text-gray-400 flex justify-between flex-wrap gap-2">
          <span>Transparencia Municipal PY · OrgSim S.A.</span>
          <span>Fuentes: datos.gov.py · FONACIDE · Hacienda PY</span>
        </div>
      </footer>
    </main>
  );
}
