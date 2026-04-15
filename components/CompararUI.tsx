"use client";

import { useState } from "react";
import Link from "next/link";
import { Municipio, getResumen, ResumenMunicipio } from "@/lib/datos";
import { guaranies } from "@/lib/format";
import BarrasCategoria from "@/components/charts/BarrasCategoria";
import AreaHistorico from "@/components/charts/AreaHistorico";

export default function CompararUI({ municipios }: { municipios: Municipio[] }) {
  const [m1, setM1] = useState("");
  const [m2, setM2] = useState("");
  const [anio, setAnio] = useState(2024);
  const [resultado, setResultado] = useState<[ResumenMunicipio, ResumenMunicipio] | null>(null);

  function comparar() {
    if (!m1 || !m2) return;
    setResultado([getResumen(Number(m1), anio), getResumen(Number(m2), anio)]);
  }

  return (
    <main className="min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">Comparar</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Comparar municipios</h1>

        {/* Controles */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Municipio 1", value: m1, set: setM1, excluir: m2 },
              { label: "Municipio 2", value: m2, set: setM2, excluir: m1 },
            ].map(({ label, value, set, excluir }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                <select
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
              <label className="block text-sm font-medium text-gray-600 mb-1">Año</label>
              <select
                value={anio}
                onChange={(e) => setAnio(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {[2024, 2023, 2022, 2021, 2020].map((y) => (
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
        </div>

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
                  <p className="text-sm text-gray-400 mb-3">{r.municipio.departamento}</p>
                  <p className="text-2xl font-bold">{guaranies(r.total)}</p>
                  <p className="text-xs text-gray-400">Total ejecutado {r.anio}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Per cápita: {guaranies(r.perCapita)}</p>
                </div>
              ))}
            </div>

            {/* Evolución */}
            <div className="grid grid-cols-2 gap-4">
              {resultado.map((r) => (
                <div key={r.municipio.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-sm font-semibold text-gray-600 mb-3">Evolución · {r.municipio.nombre}</p>
                  <AreaHistorico data={r.historico} />
                </div>
              ))}
            </div>

            {/* Categorías */}
            <div className="grid grid-cols-2 gap-4">
              {resultado.map((r) => (
                <div key={r.municipio.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-sm font-semibold text-gray-600 mb-3">Por categoría · {r.municipio.nombre}</p>
                  <BarrasCategoria data={r.porCategoria} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
