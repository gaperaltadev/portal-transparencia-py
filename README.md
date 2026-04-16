# Portal de Transparencia Fiscal — Paraguay

Portal web de acceso libre para consultar, visualizar y comparar gastos públicos de municipios de Paraguay.

**Estado:** MVP — en desarrollo desde 15/04/2026  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Recharts  
**Demo:** _(próximamente en Vercel)_

---

## ¿Qué es?

Plataforma que expone datos reales de transferencias del gobierno central a municipios paraguayos (FONACIDE, royalties, TGN). Permite:

- Consultar el gasto por categoría presupuestaria de cada municipio
- Ver la evolución histórica 2020–2024
- Comparar dos municipios lado a lado

Los datos están basados en fuentes públicas oficiales (Hacienda PY, datos.gov.py, INE) y metodología documentada.

---

## Inicio rápido

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

---

## Municipios piloto (MVP)

Asunción · Ciudad del Este · Encarnación · Luque · San Lorenzo  
Caaguazú · Concepción · Pedro Juan Caballero · Coronel Oviedo · Villarrica

---

## Estructura del proyecto

```
portal-transparencia-py/
├── app/
│   ├── page.tsx                   # Home — lista de municipios
│   ├── municipios/[id]/page.tsx   # Detalle de municipio con charts
│   ├── comparar/page.tsx          # Comparativa entre dos municipios
│   └── api/municipios/route.ts    # API REST de municipios
├── components/
│   ├── charts/
│   │   ├── AreaHistorico.tsx      # Gráfico de evolución histórica
│   │   └── BarrasCategoria.tsx    # Gráfico de gasto por categoría
│   ├── Header.tsx                 # Header compartido con breadcrumb
│   └── Footer.tsx                 # Footer con fuentes de datos
├── lib/
│   ├── datos.ts                   # Datos, interfaces y lógica de cálculo
│   └── format.ts                  # Formateadores de guaraníes
└── docs/                          # Documentación del proyecto
```

---

## Fuentes de datos

| Fuente | Tipo | Contenido |
|--------|------|-----------|
| datos.gov.py | API CKAN | Transferencias oficiales |
| FONACIDE (Hacienda PY) | XLSX | Distribución por municipio |
| Hacienda PY | Reportes anuales | Totales nacionales 2020–2024 |
| INE Paraguay | Censo 2022 | Población municipal |

> Los montos representan **transferencias del gobierno central** a los municipios, no la totalidad del presupuesto municipal.

---

## Documentación

- [Visión de producto](docs/vision-producto.md)
- [Arquitectura técnica](docs/arquitectura.md)
- [Backlog MVP](docs/backlog-mvp.md)
- [Inventario de datasets](docs/inventario-datasets.md)
- [Reuniones](docs/reuniones/)
