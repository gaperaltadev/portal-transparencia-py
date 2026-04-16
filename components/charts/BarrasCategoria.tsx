"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { millones } from "@/lib/format";

const COLORES = ["#1d4ed8","#2563eb","#3b82f6","#60a5fa","#93c5fd","#1e40af","#1e3a8a","#172554"];

export default function BarrasCategoria({ data }: { data: { categoria: string; monto: number }[] }) {
  const top = [...data].sort((a, b) => b.monto - a.monto).slice(0, 8);
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={top} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
        <XAxis type="number" tickFormatter={millones} tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="categoria" width={148} tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v) => [millones(Number(v)), "Monto"]} />
        <Bar dataKey="monto" radius={[0, 4, 4, 0]}>
          {top.map((entry, i) => <Cell key={entry.categoria} fill={COLORES[i % COLORES.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
