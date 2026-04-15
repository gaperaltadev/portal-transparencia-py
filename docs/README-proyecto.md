# Portal de Transparencia Fiscal — Paraguay

Portal web de acceso libre para consultar, visualizar y comparar gastos públicos de municipios de Paraguay.

**Estado:** MVP en desarrollo — Semana 1 (desde 15/04/2026)  
**Equipo:** OrgSim S.A.

---

## Estructura del proyecto

```
portal-transparencia-py/
├── frontend/          # Next.js 14 + Tailwind + Recharts
├── backend/           # FastAPI + SQLAlchemy + PostgreSQL
├── etl/               # Python ETL (datos.gov.py, FONACIDE, Hacienda)
├── docs/              # Documentación del proyecto
│   ├── vision-producto.md
│   ├── arquitectura.md
│   ├── backlog-mvp.md
│   ├── inventario-datasets.md
│   ├── agentes.md
│   └── reuniones/
└── docker-compose.yml
```

---

## Inicio rápido

### Con Docker (recomendado)

```bash
docker compose up
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Docs API (Swagger): http://localhost:8000/docs

### Sin Docker

**Base de datos**
```bash
# Necesitás PostgreSQL corriendo localmente
createdb transparencia_py
```

**Backend**
```bash
cd backend
cp .env.example .env
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**ETL**
```bash
cd etl
cp .env.example .env
pip install -r requirements.txt

# Extracción automática desde datos.gov.py
python run.py

# Carga manual de XLSX del FONACIDE
python run.py --fonacide ruta/al/archivo.xlsx
```

---

## Municipios piloto (MVP)

Asunción · Ciudad del Este · Encarnación · Luque · San Lorenzo  
Caaguazú · Concepción · Pedro Juan Caballero · Coronel Oviedo · Villarrica

---

## Fuentes de datos

| Fuente | Tipo | Método |
|---|---|---|
| datos.gov.py | API CKAN | Automático (semanal) |
| FONACIDE | XLSX | Descarga manual + ETL |
| Hacienda PY | XLSX | Descarga manual + ETL |
| DGEEC (población) | XLSX | Carga única (Censo 2022) |

**Nota:** Los datos representan transferencias del gobierno central a los municipios, no la totalidad del presupuesto municipal.

---

## Documentación

- [Visión de producto](docs/vision-producto.md)
- [Arquitectura técnica](docs/arquitectura.md)
- [Backlog MVP](docs/backlog-mvp.md)
- [Inventario de datasets](docs/inventario-datasets.md)
- [Equipo y responsabilidades](docs/agentes.md)
- [Reuniones](docs/reuniones/)
