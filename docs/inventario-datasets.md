# Inventario de Datasets — Portal Transparencia Paraguay
**Responsable:** Sebastián Ríos (BA/PM)
**Fecha:** 15 de abril de 2026

---

## Resumen ejecutivo

Paraguay no tiene un sistema centralizado de presupuestos municipales propios. El SIAF del gobierno central no consolida los 254 municipios. La estrategia del portal en MVP es usar **transferencias desde el gobierno central a municipios** como proxy del gasto — son datos estructurados, confiables y disponibles.

---

## Fuentes priorizadas

### ALTA PRIORIDAD — Usar en MVP

| Fuente | URL | Datos | Formato | Cobertura temporal | Municipios | API |
|---|---|---|---|---|---|---|
| datos.gov.py | https://www.datos.gov.py | Transferencias municipales, FONACIDE, royalties | CSV, XLSX | ~2015–presente | Todos (transferencias) | Sí — CKAN REST |
| FONACIDE | https://www.fonacide.gov.py | Inversión pública por municipio | XLSX | 2013–presente | Todos los receptores | No — descarga manual |
| Hacienda / Presupuesto | https://www.hacienda.gov.py | Transferencias TGN a municipios, ejecución presupuestaria | CSV, XLSX | ~2010–presente | Parcial | No — descarga manual |

**API CKAN de datos.gov.py — endpoints útiles:**
```
GET https://www.datos.gov.py/api/3/action/package_search?q=municipio+presupuesto
GET https://www.datos.gov.py/api/3/action/package_search?q=gastos+municipal
GET https://www.datos.gov.py/api/3/action/package_search?q=fonacide
GET https://www.datos.gov.py/api/3/action/package_list
```

---

### MEDIA PRIORIDAD — Usar como contexto / normalización

| Fuente | URL | Datos | Formato | Uso en portal |
|---|---|---|---|---|
| DGEEC / INE | https://www.ine.gov.py | Población por municipio (Censo 2022), pobreza | XLSX, PDF | Normalizar gasto per cápita |
| SIAF Transparencia | https://www.transparencia.gov.py | Gastos gobierno central (no municipal directo) | Web / XLSX | Contexto nacional |
| STP | https://www.stp.gov.py | Inversión pública, proyectos por municipio | XLSX | V1 — proyectos de inversión |

---

### BAJA PRIORIDAD — Post-MVP

| Fuente | URL | Datos | Limitación |
|---|---|---|---|
| CGR | https://www.contraloria.gov.py | Rendiciones de cuentas municipales | PDF no estructurado — requiere parser |
| Portales municipales | Variable | Presupuesto propio de cada municipio | Heterogéneo, parcial, bajo cumplimiento |
| MOPC | https://www.mopc.gov.py | Obras con impacto municipal | Requiere integración adicional |

---

## Gap crítico — documentar en el portal

> Los presupuestos de ejecución propios de los municipios (gastos que financian con sus propios ingresos) **no están disponibles en formato estructurado** en ningún sistema centralizado paraguayo. Los datos del MVP representan transferencias del gobierno central a los municipios, no la totalidad del presupuesto municipal.

Esta limitación debe comunicarse claramente en la UI del portal para no generar desinformación.

---

## Plan de ingesta por fuente (MVP)

| Paso | Fuente | Método | Responsable técnico |
|---|---|---|---|
| 1 | datos.gov.py (CKAN API) | Script Python — `requests` + CKAN API | ETL Engineer |
| 2 | FONACIDE (XLSX) | Descarga manual + script Pandas | ETL Engineer |
| 3 | Hacienda transferencias (XLSX) | Descarga manual + script Pandas | ETL Engineer |
| 4 | DGEEC población (XLSX) | Descarga única (censo estable) | ETL Engineer |

**Frecuencia de actualización:**
- datos.gov.py API: semanal (Airflow cron)
- XLSX manuales: mensual (alerta al equipo)
