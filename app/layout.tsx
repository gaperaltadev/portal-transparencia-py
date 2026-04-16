import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Transparencia Municipal PY",
  description: "Consultá, comparé y analizá los gastos públicos de municipios de Paraguay. Datos abiertos de transferencias del gobierno central.",
  metadataBase: new URL("https://transparencia-py.vercel.app"),
  openGraph: {
    title: "Transparencia Municipal PY",
    description: "Datos abiertos de gasto municipal en Paraguay — FONACIDE, royalties, TGN.",
    siteName: "Transparencia Municipal PY",
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparencia Municipal PY",
    description: "Datos abiertos de gasto municipal en Paraguay.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>{children}</body>
    </html>
  );
}
