# Visión de Producto v1.0 — Portal de Transparencia Fiscal Paraguay
**Responsable:** Martín Solis (Consultor Estratégico)
**Fecha:** 15 de abril de 2026

---

## El problema

Paraguay tiene datos de gastos públicos municipales dispersos en portales gubernamentales de difícil acceso, formatos inconsistentes y baja cobertura. El ciudadano promedio no puede saber cuánto gasta su municipio ni en qué lo gasta. Los periodistas y ONGs que quieren fiscalizar invierten días en recopilar datos que deberían estar a un clic.

---

## La solución

Un portal web de acceso libre que centralice, normalice y visualice los datos de gasto público municipal de Paraguay — con foco en **simplicidad**, **comprensibilidad** y **comparabilidad**.

---

## Para quién

| Usuario | Necesidad principal |
|---|---|
| Ciudadano común | "¿Cuánto gasta mi municipio y en qué?" |
| Periodista de datos | "Dame los datos estructurados para mi investigación" |
| ONG de transparencia | "Quiero monitorear anomalías de gasto en varios municipios" |
| Funcionario municipal | "Quiero ver cómo me comparo con otros municipios similares" |
| Organismo internacional | "Necesito datos de gobernanza fiscal subnacional en Paraguay" |

---

## Propuesta de valor

**Core:** El portal más accesible y completo de datos de gasto municipal en Paraguay.

**Diferencial:**
1. **Alertas de anomalías** — detecta automáticamente gastos estadísticamente inusuales y los señala. Nadie más hace esto en Paraguay.
2. **Comparador entre municipios** — permite benchmarking entre pares geográficos y demográficos.
3. **API pública** — convierte el portal en infraestructura cívica reutilizable.
4. **Lenguaje ciudadano** — los datos se explican en términos simples, no solo en jerga presupuestaria.

---

## Principios de diseño

1. **Datos sobre opinión** — el portal presenta hechos, no juicios.
2. **Transparencia sobre los datos** — siempre mostrar la fuente, fecha y limitaciones de cada dato.
3. **Mobile first** — la mayoría del tráfico esperado vendrá de celular.
4. **Accesibilidad** — fuentes legibles, contraste adecuado, sin barreras de idioma técnico.
5. **Velocidad** — la página de municipio debe cargar en menos de 2 segundos.

---

## Roadmap de valor

### MVP — Semana 6 (10 municipios piloto)
- Página por municipio: total de gastos, desglose por categoría, evolución anual
- Buscador por nombre de municipio
- Comparador simple entre dos municipios
- Fuente de datos: transferencias gobierno central (FONACIDE, TGN, royalties)

### V1 — Semana 10
- Mapa interactivo de Paraguay — visualizar datos por región
- Alertas de anomalías por categoría y municipio
- Suscripción ciudadana — notificación cuando se actualicen datos del municipio
- Expansión a los 254 municipios

### V2 — Semana 16
- API pública documentada (para periodistas, ONGs, investigadores)
- Exportación de datos en CSV y JSON
- Dashboard B2G para municipios (versión interna con más detalle)
- Ranking de transparencia por municipio (score de completitud y consistencia de datos)

---

## Métricas de éxito (MVP)

| Métrica | Meta a 30 días del lanzamiento |
|---|---|
| Visitas únicas | 1,000 |
| Municipios consultados | Los 10 piloto al menos 1 vez/día |
| Cobertura de prensa | 2 medios digitales paraguayos |
| Tiempo en página | > 1 minuto promedio |
| Errores de datos reportados | < 5 |

---

## Modelo de sostenibilidad

| Horizonte | Fuente | Monto estimado |
|---|---|---|
| 0–6 meses | Recursos propios / OrgSim S.A. | — |
| 6–18 meses | Grants (NED, KAS, CIRD) | USD 30K–150K |
| 18–48 meses | BID Lab, UE, Open Society | USD 150K–1M+ |
| Largo plazo | Licenciamiento B2G + API como servicio | Recurring revenue |

---

## Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Calidad de datos insuficiente | Alta | Alto | Documentar limitaciones claramente en el portal; empezar con 10 municipios con mejores datos |
| Datos municipales no centralizados | Muy alta | Medio | Usar transferencias como proxy; comunicarlo explícitamente |
| Resistencia política de municipios | Media | Medio | Portal usa datos ya públicos — no requiere cooperación municipal |
| Bajo tráfico al lanzamiento | Media | Bajo | Coordinación con ONGs y medios desde la semana 1 (Valeria) |
| Cambios en APIs de fuentes | Baja | Alto | Monitoreo de cambios + ETL con manejo de errores robusto |
