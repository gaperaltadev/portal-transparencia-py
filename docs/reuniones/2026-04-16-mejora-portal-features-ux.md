# Reunión: Mejora del Portal de Transparencia — Features viables, UI/UX y Mobile
**Fecha:** 2026-04-16 14:00
**Participantes:** Martín Solís (Consultor Estratégico), Carolina Méndez (PM), Diego Fernández (Dev Fullstack), Marcos Ruiz (Backend & Data), Santiago Reyes (IA & Prompts)
**Moderador:** Carolina Méndez
**Proyecto:** Portal de Transparencia Fiscal Paraguay
**Contexto previo:** Kickoff de semana 1 (2026-04-15). El portal está live con datos estáticos de 10 municipios piloto. El fundador reporta que "de momento no aporta casi nada", la UI es funcional pero básica, y falta adaptación mobile.

---

## Contexto

El portal fue lanzado como MVP con datos hardcodeados en `lib/datos.ts`. Tiene 3 páginas funcionales: home con lista de municipios, página de detalle por municipio con gráficos de Recharts (barras por categoría + área histórica), y un comparador client-side de dos municipios. El stack es Next.js 14, Tailwind CSS 3, Recharts, sin backend real — toda la data es estática.

El problema es que el portal, como está, no genera valor diferencial suficiente. Es esencialmente una tabla bonita de datos que un ciudadano podría encontrar en un PDF de Hacienda. No hay features que generen engagement, retorno de visitas ni utilidad práctica para los usuarios target (ciudadanos, periodistas, ONGs). La UI es limpia pero genérica, sin identidad visual fuerte, y los charts no se ven bien en mobile.

La reunión busca definir qué features agregar que sean viables con el equipo actual, cómo mejorar la UI/UX para que el portal se sienta como un producto serio, y qué ajustes de mobile son urgentes.

---

## Preparación de cada participante

**Martín** revisó la visión de producto y el roadmap de valor (V1 y V2). Llega con la postura de que el portal necesita al menos 2 features "wow" que lo diferencien de un simple dump de datos — las alertas de anomalías y el mapa interactivo que estaban en el roadmap V1 son candidatos fuertes.

**Carolina** revisó el backlog MVP, la estructura del código actual y las dependencias. Está enfocada en qué se puede hacer sin agregar complejidad de infraestructura innecesaria — el portal es frontend-only hoy y cada feature backend agrega costo operativo.

**Diego** revisó todo el código frontend: `page.tsx`, `[id]/page.tsx`, `CompararUI.tsx`, los charts, el Header, Footer y el CSS. Identificó problemas concretos de mobile (charts cortados, grids que no colapsan bien, selects pequeños) y tiene ideas de mejora de UI con lo que ya hay.

**Marcos** revisó la arquitectura planificada (FastAPI + PostgreSQL) y el inventario de datasets. Llega pensando en qué datos nuevos se pueden incorporar sin un ETL complejo y qué requiere backend real vs. lo que se puede hacer con datos estáticos expandidos.

**Santiago** revisó el portal desde la perspectiva de features de IA. Viene con ideas de cómo usar LLMs para generar resúmenes en lenguaje ciudadano y cómo detectar anomalías sin un backend complejo.

---

## Desarrollo de la reunión

**Carolina:** Bien, arrancamos. El feedback del fundador es claro: el portal como está no aporta casi nada. Necesitamos tres cosas: features que generen valor real, mejorar la UI/UX, y que funcione bien en celular. Diego, empezá vos que tenés los problemas concretos de mobile mapeados.

**Diego:** Sí, revisé todo. Los problemas de mobile son bastante claros. Primero, los charts de Recharts con `ResponsiveContainer` se ven aceptables en desktop pero en `375px` el `BarrasCategoria` con el YAxis de 148px de width se come la mitad de la pantalla — las barras quedan microscópicas. Segundo, el grid de stats en la página de municipio usa `grid-cols-2 sm:grid-cols-3` pero las tarjetas tienen padding `p-5` que en 375px hace que el texto "Total ejecutado" y el número grande se aprieten. Tercero, el `CompararUI` con dos selects + select de año en una fila funciona en desktop pero en mobile son tres inputs apilados sin suficiente spacing, y el botón "Comparar" queda pegado. Son cosas arreglables, no son refactors.

**Carolina:** ¿Estimación para arreglar esos problemas mobile?

**Diego:** Media jornada. Es CSS, reducir el width del YAxis en mobile a unos 80-100px con un media query o un breakpoint, ajustar los paddings en las cards de stats, y darle más breathing room al comparador. No es complejo.

**Martín:** Antes de que nos metamos en el CSS, quiero plantear algo más de fondo. El portal tiene un problema de propuesta de valor, no solo de UI. Hoy muestra datos que nadie busca activamente. ¿Quién va a googlear "transferencias FONACIDE a Encarnación 2023"? Nadie. Lo que la gente quiere saber es: "¿mi municipio gasta más o menos que el promedio?", "¿dónde se fue la plata del FONACIDE este año?", "¿por qué Asunción no recibe FONACIDE?". El portal necesita **narrativa**, no solo gráficos.

**Santiago:** Estoy de acuerdo con Martín. Y ahí es donde entra IA. Yo propongo una feature que es relativamente simple de implementar y que cambia completamente la experiencia: un **resumen generado por IA para cada municipio**. En vez de que el ciudadano tenga que interpretar un gráfico de barras horizontales con categorías presupuestarias como "gastos de capital" o "transferencias corrientes", el portal le presenta un párrafo como: "Encarnación recibió G. 38.200 millones del gobierno central en 2024, un 12% más que en 2023. La mayor parte (42%) fue a infraestructura vial, seguido de educación (28%). Comparado con municipios similares de Itapúa, Encarnación gasta 15% más per cápita en infraestructura." Eso es lo que hace que un ciudadano entienda y vuelva.

**Diego:** Me gusta, pero ¿cómo lo implementamos sin backend? ¿Llamamos a OpenAI desde el frontend?

**Santiago:** No, eso sería lento y caro. Los datos son estáticos y conocidos — son 10 municipios, 5 años, categorías fijas. Podemos pre-generar los resúmenes con un script que corra offline, guardarlos como texto en `datos.ts` o en archivos JSON separados, y servirlos estáticamente. Zero costo de API en runtime. Si los datos cambian, re-generamos. Es un script de Node o Python que itera sobre los datos y llama a la API de Claude o GPT una vez por municipio-año.

**Marcos:** Eso funciona para MVP, pero no escala. Cuando tengamos 254 municipios con datos mensuales, 254 × 12 × 5 años son 15.000 resúmenes. Ahí necesitás templates, no generación individual.

**Santiago:** Correcto, pero ahora tenemos 10 municipios × 5 años = 50 resúmenes. Es una llamada de API que cuesta menos de un dólar. Para V1 con 254 municipios podemos pasar a templates dinámicos con placeholders, pero no over-engineer ahora.

**Carolina:** Me convence. Low cost, high impact. ¿Qué más?

**Martín:** La segunda feature que considero imprescindible es un **ranking de municipios**. Un page que muestre los 10 municipios ordenados por gasto per cápita, con variación interanual. Esto genera comparabilidad instantánea — el ciudadano no tiene que ir municipio por municipio. Además, es contenido compartible. "Mi municipio está 3ro en gasto per cápita" es algo que la gente comparte en Twitter.

**Diego:** Eso es pure frontend. Ya tenemos todos los datos en `datos.ts`. Es una tabla ordenable con un par de chips de variación. Lo hago en una tarde.

**Marcos:** Si hacemos el ranking, agregaría una columna de "ejecución presupuestaria" — qué porcentaje del presupuesto asignado se ejecutó realmente. Es un dato que tenemos en el inventario de datasets (FONACIDE de Itapúa ejecutó 57% en 2022) y que genera mucha tracción pública. La gente se indigna cuando ve que su municipio recibió G. 40.000 millones y ejecutó solo el 60%.

**Martín:** Excelente punto, Marcos. Eso sí genera engagement cívico real.

**Carolina:** ¿Tenemos esos datos de ejecución para los 10 municipios piloto?

**Marcos:** Parcialmente. Para FONACIDE tenemos datos de ejecución de algunos departamentos vía noticias y reportes de la CGR. No son perfectos pero son usables como indicador. Puedo armar un dataset complementario con lo que hay y marcar claramente cuáles son datos verificados vs. estimados. Eso sí, necesito medio día para recopilar y normalizar.

**Santiago:** Ojo con poner datos estimados de ejecución — si un municipio sale con 40% de ejecución y el intendente lo ve, nos llaman diciendo que el dato está mal. Hay que ser muy transparente sobre la fuente y el margen de error.

**Martín:** De acuerdo, pero eso se resuelve con un disclaimer visible, no evitando mostrar el dato. El portal se llama "Transparencia" — ser transparente sobre las limitaciones de los datos es parte del producto.

**Diego:** Puedo agregar un tooltip o un ícono de info al lado de cada dato de ejecución que diga "Fuente: [x]. Dato estimado / verificado." como hacen los buenos dashboards.

**Carolina:** OK, tenemos dos features de producto definidas: resúmenes IA y ranking con ejecución. ¿Algo más viable para esta iteración?

**Santiago:** Una más que es gratis: un **buscador con autocompletado**. Ahora en la home los municipios están listados en una grilla. Si expandimos a 254, nadie va a scrollear. Un input con autocompletado simple — sin Algolia ni nada, es un filter sobre el array de `MUNICIPIOS` — resuelve la navegación. Y da sensación de producto real.

**Diego:** Literal son 20 líneas de React. Un `useState` con un input y un `filter`. Lo puedo hacer en 15 minutos.

**Carolina:** Perfecto. Ahora vamos con UI/UX. Diego, ¿qué proponés para que el portal se vea como un producto serio y no como un proyecto de fin de semana?

**Diego:** Varios puntos. Primero, **la paleta de colores es aburrida**. Es azul genérico de Tailwind (`blue-600`) en todo. Un portal de transparencia cívica necesita una identidad más fuerte. Propongo una paleta con un verde institucional como primario — transmite confianza y seriedad cívica — con un accent en amarillo o naranja para highlights y alertas. Segundo, el **Header es demasiado minimalista** — el cuadrado azul de 32px como logo no comunica nada. Necesitamos al menos un ícono SVG simbólico (puede ser un escudo, un edificio público, o el contorno de Paraguay). Tercero, la **home necesita un hero section**. Ahora arranca directo con "¿Cuánto gasta tu municipio?" en text-3xl y debajo la lista. Falta un hero con fondo, un dato impactante ("G. 5 billones en transferencias municipales 2020-2024") y un call to action al buscador. Eso sube el perceived value inmediatamente.

**Martín:** El hero con el dato agregado es muy bueno. "G. 5,2 billones transferidos a municipios en 5 años. ¿Sabés a dónde fue la plata de tu ciudad?" — eso engancha.

**Santiago:** Sumale un dato de contexto comparativo: "El equivalente a X hospitales" o "X guaraníes por habitante". La gente no entiende billones — necesita referencias concretas.

**Diego:** Puedo calcular eso desde los datos que ya tenemos. El total nacional de transferencias / población total de los 10 municipios piloto da un per cápita fácil de mostrar.

**Carolina:** ¿Y la tipografía?

**Diego:** La tipografía actual (Inter) está bien, es funcional. Pero le falta jerarquía. Los títulos deberían ser más bold (font-black o font-extrabold en vez de font-bold), y los números grandes en los stats necesitan ser monospace o con tabular-nums para que se alineen bien. También los gráficos necesitan labels más grandes — en mobile el `fontSize: 11` de Recharts es ilegible.

**Marcos:** Desde los datos, quiero proponer que agreguemos **datos de contexto por municipio**: población, departamento, superficie, y sobre todo el dato de **gasto per cápita comparado con el promedio**. Un indicador visual simple — arriba o abajo del promedio, con porcentaje — que le dé al ciudadano una referencia inmediata sin tener que ir al comparador.

**Diego:** Un badge de color. Verde "12% debajo del promedio", rojo "23% arriba del promedio". Fácil.

**Martín:** No usaría rojo/verde porque implica juicio de valor. "Arriba del promedio" no es necesariamente malo — puede ser que el municipio invierte más en educación. Mejor usar neutro: azul arriba, gris abajo, y que el ciudadano interprete.

**Santiago:** Bien pensado. Los colores de juicio en datos cívicos son peligrosos.

**Carolina:** Bien, último tema: mobile. Diego ya mencionó los problemas puntuales. ¿Hay algo estructural?

**Diego:** Lo estructural es que el portal no fue diseñado mobile-first a pesar de que la visión de producto lo exige. La grilla de municipios en la home es `grid-cols-1 sm:grid-cols-2` que está bien, pero las cards son horizontales con flex y el `›` al final se ve raro en una card tan estrecha en 375px. Propongo que en mobile las cards sean verticales — nombre arriba, departamento y población abajo, sin el `›`. También la página de municipio debería mostrar los stats en una sola columna en mobile (ahora es 2 columnas que se aprietan) y los gráficos deberían tener height adaptativo — 260px de altura fija en `BarrasCategoria` es mucho para un iPhone SE.

**Carolina:** Resumo lo que tenemos. Voy a cerrar.

En features nuevas: (1) resúmenes generados por IA para cada municipio, (2) ranking de municipios con gasto per cápita y ejecución presupuestaria, (3) buscador con autocompletado. En UI/UX: (4) nueva paleta de colores con identidad cívica, (5) hero section con dato impactante, (6) logo/ícono SVG real, (7) badges de comparación con promedio, (8) tipografía con más jerarquía. En mobile: (9) fix de charts responsivos, (10) cards verticales en mobile, (11) stats en 1 columna en mobile, (12) heights adaptativos en gráficos. ¿Estamos todos de acuerdo con esta lista?

**Diego:** Sí. Agregaría que el comparador también necesita love en mobile — los selects se ven mal.

**Marcos:** Del lado de datos, necesito confirmar cuántos datos de ejecución presupuestaria puedo conseguir antes de comprometer el ranking con esa columna. Sugiero que el ranking se lance con gasto total y per cápita, y la ejecución se agregue en un segundo paso si consigo datos confiables.

**Martín:** De acuerdo con Marcos. Mejor lanzar el ranking sin ejecución que atrasar todo por un dato parcial.

**Carolina:** Cerrado. El ranking sale con total y per cápita, ejecución se agrega cuando haya datos verificados.

---

## Decisiones tomadas

1. Se implementará un sistema de resúmenes generados por IA pre-computados (script offline), almacenados en datos estáticos, para cada municipio-año.
2. Se creará una página de ranking de municipios ordenable por gasto total y gasto per cápita, con variación interanual.
3. El dato de ejecución presupuestaria se incorpora al ranking solo cuando Marcos valide datos confiables de al menos 8 de los 10 municipios piloto.
4. Se agregará un buscador con autocompletado en la home (filter client-side sobre el array de municipios).
5. Se adoptará una nueva paleta de colores con identidad cívica (verde institucional + accent cálido), reemplazando el azul genérico actual.
6. Se diseñará un hero section en la home con dato agregado impactante y call to action.
7. Los badges de comparación con el promedio usarán colores neutros (azul/gris), no rojo/verde, para evitar juicios de valor implícitos.
8. Todos los fixes de mobile se priorizan como bloque — no es refactor, es requisito de producto.

---

## Propuestas para análisis

- **Resúmenes IA por municipio** — Script offline que genera párrafos explicativos en lenguaje ciudadano para cada combinación municipio-año usando LLM. Se almacena como dato estático. — Propuesto por: @santiago
- **Página de ranking comparativo** — Tabla ordenable de los 10 municipios por gasto total, per cápita y variación interanual, con link a cada municipio. — Propuesto por: @consultor
- **Buscador con autocompletado** — Input con filter reactivo sobre el array de municipios en la home. Preparación para 254 municipios. — Propuesto por: @santiago
- **Redesign de identidad visual** — Nueva paleta cívica (verde + accent cálido), hero section con dato impactante, ícono SVG propio, tipografía con más jerarquía. — Propuesto por: @dev
- **Badge de comparación con promedio** — Indicador visual en la página de municipio que muestre si el gasto per cápita está arriba o abajo del promedio, con porcentaje. — Propuesto por: @backend
- **Bloque de fixes mobile** — Charts responsivos (YAxis adaptativo), cards verticales en mobile, stats 1 columna, heights adaptativos en gráficos, comparador mejorado en mobile. — Propuesto por: @dev
- **Datos de ejecución presupuestaria** — Recopilar y normalizar datos de % de ejecución de transferencias por municipio de fuentes de CGR y prensa. — Propuesto por: @backend

---

## Acciones pendientes

- [ ] Armar script de generación de resúmenes IA (definir prompt, modelo, formato de output) — @santiago — Plazo: 2 días
- [ ] Crear página `/ranking` con tabla ordenable (total, per cápita, variación) — @dev — Plazo: 1 día
- [ ] Implementar buscador con autocompletado en home — @dev — Plazo: 0.5 días
- [ ] Diseñar nueva paleta de colores y proponer 2-3 opciones al fundador — @dev — Plazo: 1 día
- [ ] Crear hero section con dato agregado — @dev — Plazo: 0.5 días
- [ ] Fix de todos los problemas de mobile identificados — @dev — Plazo: 1 día
- [ ] Recopilar datos de ejecución presupuestaria de al menos 8 municipios — @backend — Plazo: 3 días
- [ ] Agregar badges de comparación con promedio en página de municipio — @dev — Plazo: 0.5 días
- [ ] Analizar propuestas y priorizar con /propuesta — @pm — Plazo: inmediato
