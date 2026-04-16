import Link from "next/link";
import { MUNICIPIOS } from "@/lib/datos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

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
                <p className="text-sm text-gray-500">{m.departamento} · {m.poblacion.toLocaleString("es-PY")} hab.</p>
              </div>
              <span className="text-gray-300 group-hover:text-blue-400 text-xl transition-colors" aria-hidden="true">›</span>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
