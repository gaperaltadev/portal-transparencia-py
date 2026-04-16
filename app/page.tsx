import Link from "next/link";
import { MUNICIPIOS, TOTAL_NACIONAL } from "@/lib/datos";
import { guaranies } from "@/lib/format";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchMunicipios from "@/components/SearchMunicipios";

// Calculate aggregate stats for hero
const totalTransferido = Object.values(TOTAL_NACIONAL).reduce((s, v) => s + v, 0);
const anosCount = Object.keys(TOTAL_NACIONAL).length;
const totalPoblacion = MUNICIPIOS.reduce((s, m) => s + m.poblacion, 0);

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <p className="text-teal-300 text-sm font-semibold tracking-wide uppercase mb-3">
            Portal de Transparencia Fiscal
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
            ¿Sabés a dónde va la plata de tu ciudad?
          </h1>
          <p className="text-teal-100 text-lg max-w-xl mb-8">
            Consultá, compará y analizá cómo se distribuyen las transferencias
            del gobierno central a los municipios de Paraguay.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <p className="text-2xl font-extrabold">{guaranies(totalTransferido)}</p>
              <p className="text-teal-200 text-xs mt-0.5">transferidos en {anosCount} años</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <p className="text-2xl font-extrabold">{MUNICIPIOS.length}</p>
              <p className="text-teal-200 text-xs mt-0.5">municipios piloto</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <p className="text-2xl font-extrabold">{(totalPoblacion / 1_000_000).toFixed(1)}M</p>
              <p className="text-teal-200 text-xs mt-0.5">habitantes cubiertos</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800 mb-8">
          Los montos representan <strong>transferencias del gobierno central</strong> a los municipios,
          no la totalidad del presupuesto municipal.
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h2 className="font-bold text-gray-900 text-xl">Municipios piloto</h2>
          <div className="flex gap-3 text-sm font-medium">
            <Link href="/ranking" className="text-teal-600 hover:underline">
              Ranking →
            </Link>
            <Link href="/comparar" className="text-teal-600 hover:underline">
              Comparar →
            </Link>
          </div>
        </div>

        <SearchMunicipios municipios={MUNICIPIOS} />
      </div>

      <Footer />
    </main>
  );
}
