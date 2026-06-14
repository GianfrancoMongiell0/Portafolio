# Ficha Técnica — Portafolio Web
**Gianfranco Mongiello Flores · Caracas, Venezuela 🇻🇪 · Junio 2025**

---

## URLs y Repositorios

| Recurso | URL |
|---------|-----|
| Portafolio live | https://portafolio-omega-ecru.vercel.app |
| Repo portafolio | https://github.com/GianfrancoMongiell0/Portafolio |
| GitHub perfil | https://github.com/GianfrancoMongiell0 |
| LinkedIn | https://www.linkedin.com/in/gianfranco-mongiello |

---

## Arquitectura del Portafolio

3 archivos separados desplegados en **Vercel** (rama `main`, auto-deploy en cada push):

- `index.html` — estructura HTML completa (~50 KB)
- `style.css` — estilos con CSS variables dark/light mode (~21 KB)
- `script.js` — toda la lógica JS (~22 KB)
- `404.html` — página de error personalizada con partículas
- `CV_Gianfranco_Mongiello.pdf` — CV descargable bilingüe (ES/EN)

---

## Stack Técnico del Portafolio

- HTML5 semántico · CSS3 con variables (sin frameworks)
- JavaScript vanilla — sin React, sin jQuery, sin dependencias
- Chart.js 4.4.1 — gráfica de barras (Quiniela) y radar (skills) via CDN
- Google Fonts — Inter + JetBrains Mono
- Vercel — deploy automático desde GitHub, dominio gratuito

---

## Features Implementadas

- Partículas animadas en canvas con conexiones entre nodos (85 partículas)
- Efecto glitch en nombre hero (CSS animations con clip-path)
- Typewriter animado con 5 roles rotativos
- Cursor personalizado con dot cian + ring que sigue con lag (requestAnimationFrame)
- Scroll progress bar con gradiente cian→violeta→naranja
- Dark/light mode toggle con transición suave (CSS variables)
- Skill cards con efecto tilt 3D (perspective + rotateX/Y en mousemove)
- Barras de nivel animadas (IntersectionObserver + transition cubic-bezier)
- Heatmap de actividad GitHub (26 semanas × 7 días, estilo GitHub)
- Stats de GitHub en tiempo real via API pública
- Modales de proyectos con descripción técnica, stack y links a repos
- Radar chart de skills (SAP ABAP, SAP Build, React, Java, Flutter, Node.js)
- Bar chart de la Quiniela WC 2026 (aciertos vs jugadores por fase)
- Formulario de contacto con fallback a WhatsApp
- CV descargable en PDF (bilingüe ES/EN, generado con ReportLab)
- Easter egg Matrix con caracteres ABAP + japoneses (botón `</>` esquina)
- Favicon SVG inline con iniciales GM en cian sobre fondo cian
- Animación de entrada del hero (fadeSlideUp escalonado con delays)
- Nav activo dinámico con IntersectionObserver por sección
- Contadores animados en About (8m exp, 5 módulos, 10+ proyectos)
- Iconos SVG con `currentColor` — se adaptan a dark/light mode automáticamente
- Responsive mobile (grid de 12 columnas colapsa a 1 en <768px)
- Reveal on scroll para todas las cards (fade + translateY)
- Página 404 personalizada con partículas y terminal

---

## Proyectos en el Portafolio

### Quiniela WC 2026 ⚽
- **Categoría:** Personal · En producción
- **Stack:** React 18, Vite 5, Tailwind CSS, Supabase, PostgreSQL, PWA, Vercel
- **Live:** https://qwc-2026.vercel.app
- **Repo:** https://github.com/GianfrancoMongiell0/QWC2026

### FinVE — Finanzas Multi-Divisa 💱
- **Categoría:** Personal · Android
- **Stack:** Flutter 3.44, Dart 3.12, Riverpod, SQLite, local_auth, fl_chart
- **Repo:** https://github.com/GianfrancoMongiell0/FinVE

### Task Manager API
- **Categoría:** Universidad — Base de Datos
- **Stack:** Node.js, Express, MongoDB, Mongoose, JWT, Zod, bcryptjs, Docker
- **Repo:** https://github.com/GianfrancoMongiell0/todo-backend

### Proyectos de Sistemas (004–006)
- **Categoría:** Universidad — Java · Python · MIPS
- **Stack:** Java Threads, Semaphore, Gson, Python, NumPy, MIPS Assembly
- **Repos:** cpu-scheduler-simulator · file-system-simulator · linear-systems-solver

### Cifrado Playfair — MIPS Assembly 🔐
- **Categoría:** Universidad — Org. del Computador
- **Stack:** MIPS Assembly, MARS/SPIM
- **Repo:** https://github.com/GianfrancoMongiell0/Playfair-MIPS

---

## GitHub — Repositorios Renombrados y Configurados

| Nombre actual | Nombre anterior | Descripción |
|---------------|-----------------|-------------|
| `QWC2026` | `QWC2026` | SPA + PWA para pronosticar el FIFA World Cup 2026 |
| `FinVE` | `FinVE` | App Android de finanzas personales para Venezuela |
| `todo-backend` | `VFinalBD` | REST API fullstack con JWT, Zod y Docker |
| `cpu-scheduler-simulator` | `ProyectoSO` | Simulador de planificación de CPU con 5 algoritmos Java |
| `file-system-simulator` | `SimuladorVirtualSO` | Simulador de sistema de archivos jerárquico con JSON |
| `linear-systems-solver` | `Proyecto-Algebra` | Solucionador Ax=b: PALU, Jacobi, Gauss-Jordan |
| `Playfair-MIPS` | *(repo nuevo)* | Cifrado Playfair completo en MIPS Assembly |
| `Portafolio` | `Portafolio` | Portafolio personal desplegado en Vercel |

**Perfil configurado:** bio, empresa C2S, URL portafolio, 6 repos pinneados, topics en cada repo.

---

## LinkedIn — Optimizaciones Aplicadas

- **URL personalizada:** `linkedin.com/in/gianfranco-mongiello`
- **Headline:** Junior ABAP Consultant @ C2S · SAP Certified · SAP Build Developer · React · Estudiante de Ing. Sistemas UNIMET · Open to Remote
- **About/Información** completo con stack técnico y módulos SAP
- **3 proyectos agregados:** Quiniela WC 2026, FinVE y Portafolio Personal con URLs
- **17 aptitudes** incluyendo SAP ABAP, React.js, Flutter, Node.js, MongoDB
- **Certificaciones:** SAP Build Developer (Credly) + EF SET A2
- Experiencia C2S con descripción técnica y educación UNIMET visibles

---

## CV — Características

- **Formato:** PDF generado con Python ReportLab
- **Páginas:** 2 — Español (pág. 1) + English (pág. 2)
- **Estilo:** Minimalista blanco y negro, tipografía Helvetica
- **Secciones:** Perfil · Experiencia · Educación · Certificaciones · Stack Técnico · Proyectos
- **Descarga:** botón `⬇ CV` del portafolio

---

## Iconos SVG — currentColor (dark/light adaptativo)

Todos los iconos usan `fill="currentColor"` — blancos en dark mode, negros en light mode automáticamente.

| Icono | Origen |
|-------|--------|
| SAP ABAP | svgrepo oficial |
| SAP Build | hexágono con rayo, hand-crafted |
| React | svgrepo oficial |
| Java | svgrepo oficial |
| Flutter | svgrepo oficial (v2 — sin colores originales) |
| Node.js | svgrepo oficial |
| Gmail, LinkedIn, GitHub, Instagram, WhatsApp | svgrepo oficiales |
| Certs (badge, code brackets, graduation) | hand-crafted |

---

## READMEs Generados

- **README_Playfair-MIPS.md** — explicación del algoritmo Playfair, los 3 casos, código MIPS anotado, instrucciones MARS/SPIM
- **README_ProyectoSO.md** — CPU scheduler con 5 algoritmos, hilos Java, preemption real con Semaphore
- **README_SimuladorVirtualSO.md** — file system jerárquico, bloques encadenados, Gson TypeAdapters custom
- **README_VFinalBD.md** — REST API, HOF middleware Zod, cookies httpOnly JWT, Docker Compose
- **README_Proyecto-Algebra.md** — PALU pivoteo parcial, Jacobi, Gauss-Jordan con tracking de permutaciones de columnas

---

## Decisiones de Diseño

- **Paleta:** dark `#05080f` · cian `#00e5c8` · violeta `#7c3aed` · naranja `#f97316` · rojo `#e11d48`
- **Fuentes:** Inter (sans) + JetBrains Mono (código/labels)
- **Sin Angular** — removido por no tener repo público que lo respalde
- **Sin Python tag** — removido del hero (no tiene card dedicada)
- **Proyectos mostrados:** solo los 5 con repo GitHub real y contexto verificable
- **CV en PDF** — reemplazó el anterior `.txt` generado en JS

---

*Generado el 14 de junio de 2025*