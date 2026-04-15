# Arquitectura Técnica — Portal de Transparencia Fiscal Paraguay
**Responsable:** Laura Méndez (Tech Lead)
**Fecha:** 15 de abril de 2026

---

## Diagrama de capas

```
┌─────────────────────────────────────────────────────┐
│                  CAPA DE PRESENTACIÓN                │
│   Next.js 14 + Tailwind CSS + Recharts / Leaflet    │
│   • Página por municipio                             │
│   • Comparador (2 municipios)                        │
│   • Mapa interactivo (V1)                            │
│   • Buscador global                                  │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────┐
│                    CAPA DE API                       │
│              Python FastAPI                          │
│   GET /municipios                                    │
│   GET /municipios/{id}/gastos                        │
│   GET /municipios/{id}/gastos?año=2024&categoria=... │
│   GET /comparar?m1={id}&m2={id}                      │
│   GET /anomalias/{id}  (V1)                          │
└──────────────────────┬──────────────────────────────┘
                       │ SQL
┌──────────────────────▼──────────────────────────────┐
│                 CAPA DE DATOS                        │
│         PostgreSQL 15 + PostGIS (V1)                 │
│   • Modelo dimensional (ver abajo)                   │
│   • Índices por municipio + año + categoría          │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                   CAPA DE ETL                        │
│           Python (Pandas + Airflow)                  │
│   Fuentes:                                           │
│   • datos.gov.py (API CKAN)                          │
│   • Hacienda / SIAF (XLSX)                           │
│   • FONACIDE (XLSX)                                  │
│   • Portales municipales piloto (scraping controlado)│
│   Frecuencia: diaria para fuentes API, semanal XLSX  │
└─────────────────────────────────────────────────────┘
```

---

## Modelo de datos

```sql
-- Municipios
CREATE TABLE municipios (
  id            SERIAL PRIMARY KEY,
  codigo_dgeec  VARCHAR(6) UNIQUE NOT NULL,  -- código oficial DGEEC
  nombre        VARCHAR(100) NOT NULL,
  departamento  VARCHAR(100) NOT NULL,
  poblacion     INTEGER,                      -- DGEEC 2022
  geom          GEOMETRY(POLYGON, 4326)       -- PostGIS (V1)
);

-- Categorías de gasto (clasificación presupuestaria)
CREATE TABLE categorias_gasto (
  id       SERIAL PRIMARY KEY,
  codigo   VARCHAR(10) UNIQUE NOT NULL,
  nombre   VARCHAR(200) NOT NULL,
  tipo     VARCHAR(50)  -- 'corriente' | 'capital' | 'transferencia'
);

-- Hechos de gasto (tabla central)
CREATE TABLE gastos (
  id             SERIAL PRIMARY KEY,
  municipio_id   INTEGER REFERENCES municipios(id),
  categoria_id   INTEGER REFERENCES categorias_gasto(id),
  anio           SMALLINT NOT NULL,
  mes            SMALLINT,                   -- NULL si es anual
  monto_presup   NUMERIC(18,2),              -- presupuestado
  monto_ejec     NUMERIC(18,2),              -- ejecutado
  fuente         VARCHAR(100) NOT NULL,      -- 'FONACIDE' | 'TGN' | 'SIAF' | 'propio'
  fecha_carga    TIMESTAMP DEFAULT NOW(),
  UNIQUE(municipio_id, categoria_id, anio, mes, fuente)
);

-- Índices para performance
CREATE INDEX idx_gastos_municipio_anio ON gastos(municipio_id, anio);
CREATE INDEX idx_gastos_categoria ON gastos(categoria_id);

-- Anomalías detectadas (V1)
CREATE TABLE anomalias (
  id             SERIAL PRIMARY KEY,
  gasto_id       INTEGER REFERENCES gastos(id),
  zscore         NUMERIC(8,4),
  descripcion    TEXT,
  detectada_en   TIMESTAMP DEFAULT NOW()
);

-- Suscripciones ciudadanas (V1)
CREATE TABLE suscripciones (
  id             SERIAL PRIMARY KEY,
  email          VARCHAR(255) NOT NULL,
  municipio_id   INTEGER REFERENCES municipios(id),
  activa         BOOLEAN DEFAULT TRUE,
  created_at     TIMESTAMP DEFAULT NOW(),
  UNIQUE(email, municipio_id)
);
```

---

## Stack completo

| Capa | Tecnología | Justificación |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR para SEO, buen ecosistema de visualización |
| UI | Tailwind CSS | Rápido de implementar, responsive por defecto |
| Gráficos | Recharts | Simple, integra bien con React |
| Mapa | Leaflet + React-Leaflet | Open source, sin límites de uso (vs Mapbox) |
| API | FastAPI (Python) | Comparte ecosistema con el ETL, tipado, docs auto |
| Base de datos | PostgreSQL 15 | Robusto, PostGIS para geo (V1), soporta JSON |
| ETL | Python + Pandas + Airflow | Flexible para distintos formatos de fuente |
| Infra MVP | Railway o Render | Deploy simple, sin overhead de AWS para MVP |
| Infra V1+ | AWS (ECS + RDS) | Escalabilidad cuando el tráfico lo justifique |

---

## Decisiones técnicas clave

1. **Sin ML para anomalías en V1** — Z-score estadístico por categoría/municipio es suficiente para el primer lanzamiento y no requiere datos de entrenamiento.
2. **PostGIS en V1, no MVP** — El mapa interactivo queda para V1; el MVP usa solo texto/gráficos para simplificar el deploy inicial.
3. **Transferencias como proxy principal** — Dado que los presupuestos municipales propios no están centralizados en Paraguay, el MVP usa transferencias desde gobierno central (FONACIDE, TGN, royalties) como proxy del gasto. Se documenta esta limitación claramente en el portal.
4. **API CKAN de datos.gov.py como fuente primaria** — Endpoint: `https://www.datos.gov.py/api/3/action/package_search`
