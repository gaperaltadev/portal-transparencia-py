"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { millones } from "@/lib/format";

export default function AreaHistorico({ data }: { data: { anio: number; monto: number }[] }) {
  const sorted = [...data].sort((a, b) => a.anio - b.anio);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={sorted} margin={{ left: 8, right: 8, top: 4, bottom: 4 }}>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="anio" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={millones} tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v: number) => [millones(v), "Ejecutado"]} />
        <Area type="monotone" dataKey="monto" stroke="#2563eb" strokeWidth={2} fill="url(#grad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
