# Backlog MVP — Portal de Transparencia Fiscal Paraguay
**Responsable:** Diego Herrera (Engineering Manager)
**Fecha:** 15 de abril de 2026

---

## Épicas del MVP

### E1 — ETL y datos
| ID | Historia | Puntos | Prioridad |
|---|---|---|---|
| E1-1 | Como sistema, quiero conectarme a la API CKAN de datos.gov.py y descargar datasets de transferencias municipales | 5 | Alta |
| E1-2 | Como sistema, quiero parsear y normalizar archivos XLSX del FONACIDE por municipio | 3 | Alta |
| E1-3 | Como sistema, quiero cargar los 10 municipios piloto con datos históricos 2020–2024 | 5 | Alta |
| E1-4 | Como sistema, quiero ejecutar el ETL automáticamente cada semana y detectar nuevos datos | 3 | Media |
| E1-5 | Como sistema, quiero loguear errores de ingesta y alertar al equipo técnico | 2 | Media |

### E2 — API Backend
| ID | Historia | Puntos | Prioridad |
|---|---|---|---|
| E2-1 | Como frontend, quiero listar todos los municipios disponibles con nombre y departamento | 2 | Alta |
| E2-2 | Como frontend, quiero obtener gastos de un municipio filtrados por año y categoría | 3 | Alta |
| E2-3 | Como frontend, quiero comparar gastos de dos municipios en el mismo período | 3 | Alta |
| E2-4 | Como frontend, quiero obtener el resumen ejecutivo de un municipio (totales, top categorías) | 2 | Alta |
| E2-5 | Como sistema, quiero documentación automática de la API (Swagger) | 1 | Media |

### E3 — Frontend
| ID | Historia | Puntos | Prioridad |
|---|---|---|---|
| E3-1 | Como ciudadano, quiero buscar mi municipio por nombre y llegar a su página | 3 | Alta |
| E3-2 | Como ciudadano, quiero ver el total de gastos de mi municipio por año con gráfico de barras | 3 | Alta |
| E3-3 | Como ciudadano, quiero ver el desglose de gastos por categoría (torta o barras apiladas) | 3 | Alta |
| E3-4 | Como ciudadano, quiero comparar dos municipios lado a lado | 3 | Alta |
| E3-5 | Como ciudadano, quiero ver una nota de contexto que explique qué datos estoy viendo y sus limitaciones | 1 | Alta |
| E3-6 | Como ciudadano, quiero que el portal funcione bien en mi celular | 2 | Alta |
| E3-7 | Como ciudadano, quiero ver la fecha de última actualización de los datos | 1 | Media |

### E4 — Infraestructura
| ID | Historia | Puntos | Prioridad |
|---|---|---|---|
| E4-1 | Como equipo, quiero el proyecto desplegado en Railway con CI/CD básico desde GitHub | 3 | Alta |
| E4-2 | Como equipo, quiero la base de datos PostgreSQL provisionada con backups automáticos | 2 | Alta |
| E4-3 | Como equipo, quiero un dominio y HTTPS configurado para el portal | 1 | Alta |

---

## Cronograma por semana

| Semana | Foco | Historias |
|---|---|---|
| 1 | Setup + ETL base | E4-1, E4-2, E1-1, E1-2 |
| 2 | ETL completo + carga de datos | E1-3, E1-4, E1-5 |
| 3 | API backend | E2-1, E2-2, E2-3, E2-4, E2-5 |
| 4 | Frontend — búsqueda y página de municipio | E3-1, E3-2, E3-3 |
| 5 | Frontend — comparador + mobile | E3-4, E3-5, E3-6, E3-7 |
| 6 | QA, ajustes, dominio, lanzamiento | E4-3 + bugs + pulido |

---

## Municipios piloto (10)

| # | Municipio | Departamento | Prioridad datos |
|---|---|---|---|
| 1 | Asunción | Capital | Alta — datos más completos |
| 2 | Ciudad del Este | Alto Paraná | Alta |
| 3 | Encarnación | Itapúa | Alta |
| 4 | Luque | Central | Alta |
| 5 | San Lorenzo | Central | Alta |
| 6 | Caaguazú | Caaguazú | Media |
| 7 | Concepción | Concepción | Media |
| 8 | Pedro Juan Caballero | Amambay | Media |
| 9 | Coronel Oviedo | Caaguazú | Media |
| 10 | Villarrica | Guairá | Media |

---

## Definición de Done (DoD)

- Código en main con PR aprobado por Laura Méndez
- Tests unitarios para lógica de negocio crítica (ETL transformations, cálculos de totales)
- Funciona en mobile (375px mínimo)
- Sin errores en consola del navegador
- Dato mostrado en UI coincide con dato en base de datos
