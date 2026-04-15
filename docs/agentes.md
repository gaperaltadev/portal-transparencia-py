# Agentes del Proyecto — Portal de Transparencia Fiscal Paraguay
**Proyecto:** Portal Transparencia Fiscal Paraguay
**Fecha de constitución del equipo:** 15 de abril de 2026

---

## Equipo asignado

### Martín Solis — Consultor Estratégico
**Rol en el proyecto:** Responsable de visión de producto, roadmap y posicionamiento estratégico.

- Define el por qué y el para quién del producto
- Toma decisiones de priorización a nivel de negocio y valor público
- Produce el documento de Visión de Producto (ver `vision-producto.md`)
- Punto de contacto con organismos y aliados externos

**Entregable semana 1:** Documento de visión de producto v1 ✅

---

### Laura Méndez — Tech Lead / Arquitecta de Software
**Rol en el proyecto:** Responsable de la arquitectura técnica, estándares de calidad y decisiones de stack.

- Define el diagrama de capas, el modelo de datos y las decisiones técnicas clave
- Aprueba PRs antes de que el código llegue a main
- Responsable del mentoring técnico al equipo de desarrollo
- Vela por la consistencia, escalabilidad y mantenibilidad del sistema

**Entregable semana 1:** Diagrama de arquitectura + modelo de datos ✅ (ver `arquitectura.md`)

---

### Diego Herrera — Engineering Manager
**Rol en el proyecto:** Responsable del delivery, la planificación de sprints y la coordinación del equipo técnico.

- Mantiene el backlog priorizado y el cronograma semanal
- Gestiona la deuda técnica y los bloqueos del equipo
- Reporta el estado del proyecto al fundador
- Coordina con Laura el criterio de aceptación técnica y con Sebastián el de negocio

**Entregable semana 1:** Backlog priorizado del MVP ✅ (ver `backlog-mvp.md`)

---

### Sebastián Ríos — Business Analyst / PM
**Rol en el proyecto:** Responsable del relevamiento de datos, definición de alcance y comunicación con el fundador.

- Mapea fuentes de datos disponibles y sus limitaciones
- Escribe historias de usuario y criterios de aceptación
- Puente entre la visión del producto (Martín) y la implementación (Diego + Laura)
- Documenta decisiones de alcance y supuestos del negocio

**Entregable semana 1:** Inventario de datasets (SIAF, datos.gov.py, DGEEC) ✅ (ver `inventario-datasets.md`)

---

### Valeria Castro — Account Manager
**Rol en el proyecto:** Gestión de relaciones externas, alianzas y comunicación institucional.

- Identifica y gestiona potenciales aliados (ONGs, medios, organismos)
- Coordina acciones de difusión al momento del lanzamiento
- No tiene rol técnico en el MVP — su participación activa comienza en la fase de lanzamiento (semana 6)

**Nota:** La búsqueda de financiadores externos queda fuera del alcance de la semana 1. El proyecto se financia con recursos propios de OrgSim S.A. durante el MVP.

---

## Matriz de responsabilidades (RACI — MVP)

| Actividad | Martín | Laura | Diego | Sebastián | Valeria |
|---|---|---|---|---|---|
| Visión y roadmap | R | C | C | C | I |
| Arquitectura técnica | I | R | C | I | — |
| Backlog y sprints | I | C | R | C | — |
| Inventario de datos | C | I | I | R | — |
| Implementación ETL | I | A | R | C | — |
| Implementación API | I | A | R | I | — |
| Implementación Frontend | I | A | R | I | — |
| Comunicación y alianzas | C | — | — | — | R |
| Aprobación de PRs | — | R | I | — | — |

**R** = Responsable, **A** = Aprobador, **C** = Consultado, **I** = Informado
