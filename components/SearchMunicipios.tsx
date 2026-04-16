"use client";

import { useState } from "react";
import Link from "next/link";
import type { Municipio } from "@/lib/datos";

export default function SearchMunicipios({ municipios }: { municipios: Municipio[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? municipios.filter(
        (m) =>
          m.nombre.toLowerCase().includes(query.toLowerCase()) ||
          m.departamento.toLowerCase().includes(query.toLowerCase())
      )
    : municipios;

  return (
    <>
      <div className="relative mb-6">
        <input
          type="search"
          placeholder="Buscar municipio..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:max-w-sm border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition-colors"
          aria-label="Buscar municipio por nombre o departamento"
        />
        {query && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 sm:right-auto sm:left-[calc(theme(maxWidth.sm)+0.75rem)]">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((m) => (
          <Link
            key={m.id}
            href={`/municipios/${m.id}`}
            className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center justify-between hover:border-teal-400 hover:shadow-sm transition-all group"
          >
            <div>
              <p className="font-semibold group-hover:text-teal-700 transition-colors">
                {m.nombre}
              </p>
              <p className="text-sm text-gray-500">
                {m.departamento} · {m.poblacion.toLocaleString("es-PY")} hab.
              </p>
            </div>
            <span
              className="text-gray-300 group-hover:text-teal-400 text-xl transition-colors"
              aria-hidden="true"
            >
              ›
            </span>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center py-8 text-gray-400 text-sm">
            No se encontraron municipios para &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </>
  );
}
