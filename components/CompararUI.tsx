"use client";

import { useState } from "react";
import Link from "next/link";
import { Municipio, getResumen, ResumenMunicipio, ANOS_DISPONIBLES } from "@/lib/datos";
import { guaranies } from "@/lib/format";
import BarrasCategoria from "@/components/charts/BarrasCategoria";
import AreaHistorico from "@/components/charts/AreaHistorico";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CompararUIProps {
  municipios: Municipio[];
  defaultM1?: string;
  defaultM2?: string;
}

export default function CompararUI({ municipios, defaultM1 = "", defaultM2 = "" }: CompararUIProps) {
  const [m1, setM1] = useState(defaultM1);
  const [m2, setM2] = useState(defaultM2);
  const [anio, setAnio] = useState(ANOS_DISPONIBLES[ANOS_DISPONIBLES.length - 1]);
  const [resultado, setResultado] = useState<[ResumenMunicipio, ResumenMunicipio] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function comparar() {
    if (!m1 || !m2) return;
    setError(null);
    try {
      setResultado([getResumen(Number(m1), anio), getResumen(Number(m2), anio)]);
    } catch {
      setError("No se pudieron cargar los datos. Intentá de nuevo.");
      setResultado(null);
    }
  }

  const anosDescendente = [...ANOS_DISPONIBLES].reverse();

  return (
    <main className="min-h-screen">
      <Header breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Comparar" }]} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Comparar municipios</h1>

        {/* Controles */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Municipio 1", id: "municipio-1", value: m1, set: setM1, excluir: m2 },
              { label: "Municipio 2", id: "municipio-2", value: m2, set: setM2, excluir: m1 },
            ].map(({ label, id, value, set, excluir }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
                  {label}
                </label>
                <select
                  id={id}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Seleccioná...</option>
                  {municipios
                    .filter((m) => String(m.id) !== excluir)
                    .map((m) => (
                      <option key={m.id} value={m.id}>{m.nombre}</option>
                    ))}
                </select>
              </div>
            ))}

            <div>
              <label htmlFor="anio-comparar" className="block text-sm font-medium text-gray-600 mb-1">
                Año
              </label>
              <select
                id="anio-comparar"
                value={anio}
                onChange={(e) => setAnio(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {anosDescendente.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={comparar}
            disabled={!m1 || !m2}
            className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Comparar
          </button>

          {error && (
            <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Empty state */}
        {!resultado && !error && (
          <div className="text-center py-20 text-gray-500">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-400 text-xl" aria-hidden="true">⇄</span>
            </div>
            <p className="font-medium text-gray-700 mb-1">Seleccioná dos municipios para comparar</p>
            <p className="text-sm">Elegí un municipio en cada selector y presioná Comparar.</p>
          </div>
        )}

        {/* Resultado */}
        {resultado && (
          <div className="space-y-6">
            {/* Totales */}
            <div className="grid grid-cols-2 gap-4">
              {resultado.map((r) => (
                <div key={r.municipio.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <Link href={`/municipios/${r.municipio.id}`} className="font-bold text-lg text-blue-600 hover:underline">
                    {r.municipio.nombre}
                  </Link>
                  <p className="text-sm text-gray-500 mb-3">{r.municipio.departamento}</p>
                  <p className="text-2xl font-bold">{guaranies(r.total)}</p>
                  <p className="text-xs text-gray-500">Total ejecutado {r.anio}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Per cápita: {guaranies(r.perCapita)}</p>
                </div>
              ))}
            </div>

            {/* Evolución */}
            <div className="grid grid-cols-2 gap-4">
              {resultado.map((r) => (
                <div key={r.municipio.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-sm font-semibold text-gray-600 mb-3">Evolución · {r.municipio.nombre}</p>
                  <div role="img" aria-label={`Evolución histórica de ${r.municipio.nombre}`}>
                    <AreaHistorico data={r.historico} gradientId={`grad-comparar-${r.municipio.id}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Categorías */}
            <div className="grid grid-cols-2 gap-4">
              {resultado.map((r) => (
                <div key={r.municipio.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-sm font-semibold text-gray-600 mb-3">Por categoría · {r.municipio.nombre}</p>
                  <div role="img" aria-label={`Gasto por categoría de ${r.municipio.nombre}`}>
                    <BarrasCategoria data={r.porCategoria} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
