# AGENT_.MD — PROYECTO PARTE 1: PERFUMERÍA DE AUTOR ("NOIRÉ PERFUMES")

> **Instrucciones maestras para Agentes de IA y Desarrollador**  
> **Curso:** Desarrollo Web · Semestre 2026-2  
> **Entrega actual:** Entrega 1 — Sitio Web del Proyecto (15 % de la nota final)  
> **Evolución del proyecto:** Entrega 1 (HTML/CSS/JS puro + Supabase/Mock) ➔ Actividad (Next.js / Tailwind) ➔ Entrega 2 (API REST con Java + Supabase / PostgreSQL).

---

## 1. Contexto y Directrices de Operación del Agente

Este archivo define las reglas de negocio, directrices técnicas, restricciones estrictas y plan de ejecución para el desarrollo de la **Entrega 1**, incorporando el esquema de arquitectura multi-página (Tienda pública, Login y Panel de Administración) conectado conceptualmente y funcionalmente a Supabase y proyectado a Java en la Entrega 2.

### ⚠️ REGLA DE ORO — Cero Frameworks en Entrega 1
* **PROHIBIDO:** React, Vue, Angular, Next.js, Bootstrap, Tailwind CSS o librerías pesadas de componentes en la Entrega 1.
* **PENALIZACIÓN DEL DOCENTE:** **-20 puntos** inmediatos si se detecta un framework en esta entrega.
* **TECNOLOGÍAS OBLIGATORIAS EN ENTREGA 1:** HTML5 semántico puro, CSS3 puro (variables, Flexbox y Grid en `estilos.css`) y JavaScript Vanilla (ES6+ modular).
* **CONEXIÓN A SUPABASE:** Se puede usar el cliente JS ligero de Supabase (vía CDN o fetch directo) con un fallback local para que la página funcione siempre, incluso sin credenciales activas o sin internet.

---

## 2. Definición del Dominio y Modelo de Negocio

* **Nombre comercial del proyecto:** *Noiré Perfumes*.
* **Propósito:** Plataforma web integral para la exploración olfativa, exhibición de fragancias de diseñador y perfumería nicho, y panel administrativo para la gestión de catálogo.
* **Roles de usuario:**
  1. **Cliente / Visitante:** Explora el catálogo, filtra por familias olfativas, ve pirámides olfativas y solicita muestras o perfumes.
  2. **Administrador:** Inicia sesión (`login.html`) y gestiona el inventario (`admin.html`) dando de alta nuevas fragancias con validaciones estrictas.

### Cumplimiento Riguroso de las 3 Reglas de Dominio del Profesor:
1. **Dos o más tipos de cosas relacionables:**
   * **Entidad A: Perfumes / Fragancias** (`id`, `nombre`, `casa_id`, `familia_olfativa`, `concentracion`, `precio`, `imagen_url`, `notas`, `descripcion`, `stock`).
   * **Entidad B: Casas Perfumeras / Marcas** (`id`, `nombre`, `pais`, `historia`) y **Familias Olfativas** (Amaderada, Oriental, Cítrica, Floral, Gourmand).
   * *Relación:* Una Casa perfumera tiene muchos Perfumes; cada Perfume pertenece a una Familia Olfativa y a una Casa.
2. **Catálogo mostrable en cuadrícula:**
   * Cuadrícula de tarjetas responsiva generada dinámicamente mediante JavaScript (`tienda.js`), con fotos reales, badges de concentración (EDP/Parfum), notas olfativas y precios.
3. **Formularios con sentido real de negocio:**
   * **Formulario 1 (Público - en `index.html`):** Solicitud de *Discovery Set* y Asesoría Olfativa personalizada (con validación de requeridos, email y teléfono).
   * **Formulario 2 (Administración - en `admin.html`):** Alta de nuevo perfume en el catálogo (valida nombre, precio numérico positivo, categoría, URL de imagen y notas).

---

## 2.1 Identidad Visual Oficial — NOIRÉ Perfumes

* **Concepto de marca:** Lujo, misterio, sensualidad y exclusividad. La paleta combina negro profundo, morado y acentos en rojo para reflejar sofisticación e intensidad.
* **Eslogan oficial:** *"Esencia que te define."*
* **Headline Hero:** *"Más que fragancias, historias en tu piel."*

### Paleta de Colores y Tokens de Diseño:
* **🌑 Modo Oscuro (Principal / Sofisticado):**
  * Fondo principal: `#0A0A0A` (Negro profundo)
  * Secciones y tarjetas: `#1B0B1F` (Morado muy oscuro)
  * Elementos destacados: `#6A1B9A` (Morado intenso)
  * Botones y CTAs: `#8B0E1A` (Rojo profundo)
  * Textos destacados / acentos: `#E5C6F0` (Blanco lavanda)
  * Texto general: `#FFFFFF` / `#CBB4D4`
* **☀️ Modo Claro (Secundario / Elegante y Limpio):**
  * Fondo principal: `#F9F6FB` (Blanco lavanda)
  * Secciones: `#EAD7F0` (Lavanda claro)
  * Elementos destacados: `#B48ACB` (Morado suave)
  * Botones: `#A1132B` (Rojo elegante)
  * Textos: `#222222` (Negro suave) y `#5A4763`

### Tipografía Oficial:
* **Títulos, Marca y Prestigio:** `Playfair Display` (serif elegante, transmite exclusividad).
* **Textos, Menús, Precios y Formularios:** `Montserrat` (sans-serif moderna y limpia).

---

## 3. Arquitectura del Proyecto (Estructura de Archivos)

Siguiendo la visión modular del proyecto:

```text
proyecto_parte_1/
├── index.html              # Tienda pública: catálogo de perfumes, filtros, hero
├── pages/
│   ├── login.html          # Pantalla de acceso a cuenta / administrador
│   └── admin.html          # Panel de administración (proyectado para gestión de catálogo)
├── css/
│   └── estilos.css         # Sistema de diseño unificado: variables, Flexbox, Grid, dark mode y responsive
├── js/
│   ├── supabase-client.js  # Cliente de conexión a Supabase con datos locales por defecto (fallback)
│   ├── tienda.js           # Lógica cliente: carga perfumes, renderiza catálogo, filtra y valida pedido
│   ├── admin.js            # Lógica admin: formulario de nuevo perfume, validación estricta y guardado
│   └── auth.js             # Lógica de login: validación de credenciales de admin y control de sesión
├── assets/
│   ├── images/             # Imágenes optimizadas de perfumes y portadas
│   └── icons/              # Íconos vectoriales SVG limpios
├── .gitignore              # Ignora .DS_Store, Thumbs.db, node_modules, .env
├── README.md               # Documento con justificaciones técnicas y capturas
└── agent_.md               # Guía central de instrucciones y arquitectura
```

---

## 4. Proyección de Datos y Backend (Supabase / PostgreSQL & Java)

### 4.1 Esquema Relacional en PostgreSQL (Supabase)
Tanto la aplicación actual como la Entrega 2 comparten este esquema de datos:

```sql
-- 1. Tabla de Casas Perfumeras (Marcas)
CREATE TABLE casas_perfumeras (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    pais VARCHAR(60),
    descripcion TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Perfumes
CREATE TABLE perfumes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    casa_id BIGINT REFERENCES casas_perfumeras(id) ON DELETE SET NULL,
    familia_olfativa VARCHAR(50) NOT NULL, -- Amaderada, Cítrica, Oriental, Floral, Gourmand
    concentracion VARCHAR(40) NOT NULL,   -- Eau de Parfum, Extrait de Parfum, Eau de Toilette
    notas_salida VARCHAR(150),
    notas_corazon VARCHAR(150),
    notas_fondo VARCHAR(150),
    precio NUMERIC(10, 2) NOT NULL CHECK (precio > 0),
    imagen_url TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    en_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Solicitudes de Discovery Sets / Pedidos
CREATE TABLE solicitudes_pedidos (
    id BIGSERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL,
    telefono VARCHAR(30),
    perfume_interes_id BIGINT REFERENCES perfumes(id),
    direccion_envio TEXT NOT NULL,
    mensaje TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.2 Proyección a Entrega 2 (API REST en Java con Spring Boot)
En la Entrega 2, el frontend consumirá endpoints REST construidos en Java:
* `GET /api/perfumes` ➔ Lista de perfumes (reemplaza o complementa el cliente Supabase directo).
* `POST /api/perfumes` ➔ Creación de un perfume desde `admin.js`.
* `GET /api/perfumes/{id}` ➔ Detalle de perfume.
* `POST /api/solicitudes` ➔ Registro de solicitudes desde `tienda.js`.

---

## 5. Especificación Técnica de Requisitos por Rúbrica (Entrega 1)

### 5.1 HTML Semántico y Válido (15 pts)
* **`index.html`:**
  * `<header>` con `<nav>` (logo, enlaces a secciones, botón admin/login y toggle dark mode).
  * `<main>` dividido en:
    * `<section class="hero">` (un solo `<h1>` con mensaje principal y call-to-action).
    * `<section id="catalogo">` con `<h2>Catálogo de Fragancias</h2>`, barra de filtros y contenedor de cuadrícula.
    * `<section id="atelier">` con `<h2>El Arte de la Perfumería</h2>` (historia, notas olfativas).
    * `<section id="solicitud">` con `<h2>Solicita tu Discovery Set</h2>` (formulario).
  * `<footer>` con créditos, horario y enlaces.
* **`login.html` & `admin.html`:**
  * Maquetación semántica sin depender de librerías CSS externas.
  * Jerarquía clara: `<h1>`, `<h2>`, formularios con sus correspondientes `<label>` asociados con `for` e `id`.
* **Validación:** Supera [validator.w3.org](https://validator.w3.org/) con 0 errores.

### 5.2 CSS Externo: Variables, Flexbox y Grid (`estilos.css`) (15 pts + 15 pts)
* **Design Tokens (Variables CSS en `:root`):**
  * Paleta de alta perfumería (fondos claros marfil/blanco, acentos dorados/ámbar, textos oscuros grafito y estados de error/éxito).
  * Modo oscuro con variables redefinidas en `[data-theme="dark"]` o `.dark-mode`.
* **Flexbox (1D):**
  * Barra de navegación (distribución de logo y links con `justify-content: space-between`).
  * Barra de filtros de categorías (`display: flex; gap: 10px; flex-wrap: wrap`).
  * Encabezados de tarjetas, inputs con íconos y pie de página.
* **CSS Grid (2D):**
  * **Catálogo:** `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;`.
  * **Dashboard de Admin:** Layout con grid para el panel lateral de estadísticas y el formulario de creación.
* **Responsive Design:**
  * **Móvil (< 640px):** 1 columna en catálogo, menú móvil accesible, formulario a pantalla completa sin desbordes.
  * **Tablet (640px - 1024px):** 2 columnas en catálogo.
  * **Escritorio (> 1024px):** 3 a 4 columnas en catálogo con espaciado amplio y tipografía refinada.

### 5.3 JavaScript: Interacciones en el DOM (20 pts)
* **Grupo A — Manipulación Dinámica del DOM:**
  * En `tienda.js`: Carga el catálogo iterando el listado de perfumes e insertando tarjetas dinámicas (`document.createElement` o `innerHTML` estructurado).
  * Filtros por familia olfativa ("Todas", "Amaderadas", "Orientales", "Cítricas", "Florales") que actualizan el DOM instantáneamente.
* **Grupo B — Formularios y Validación en Tiempo Real (10 pts):**
  * **En `index.html` (Formulario de Discovery Set):**
    * Valida campos obligatorios, formato de email (`Regex`) y teléfono.
    * **Regla estricta:** Errores mostrados en elementos `<span>` específicos al lado/debajo del input. **Cero uso de `alert()`**.
  * **En `admin.html` (Formulario de Nuevo Perfume):**
    * Valida que el nombre no esté vacío, precio sea mayor a 0, familia seleccionada válida y URL de imagen con formato web.
* **Grupo C — Eventos:**
  * Eventos `click` en filtros y botones de detalle/compra.
  * Eventos `input` y `blur` para validación en tiempo real.
  * Evento `submit` controlado con `e.preventDefault()`.

### 5.4 Bonificaciones Incorporadas (+10 pts extra)
1. **Modo Oscuro Funcional (+4 pts):** Toggle Sol/Luna con persistencia en `localStorage`.
2. **Micro-interacciones y Animaciones (+3 pts):** Efectos hover en tarjetas de perfume con elevación y sombras suaves.
3. **Accesibilidad Web (+3 pts):** Atributos ARIA (`aria-expanded`, `aria-live`, `aria-label`), contraste WCAG AA y navegación por tabulador.

---

## 6. Estrategia de Git (Mínimo 6 Commits Progresivos)

> ⚠️ **PENALIZACIÓN:** **-15 puntos** si se sube todo en un solo commit. Los commits deben mostrar el progreso de construcción.

### Historial de Commits Recomendado:
1. `chore: estructura base del proyecto y configuracion de .gitignore`
2. `feat(html): maquetacion semantica de tienda (index.html), login y panel admin`
3. `feat(css): sistema de diseno en estilos.css con variables, flexbox y grid responsive`
4. `feat(js): modulo supabase-client con catalogo inicial y persistencia local`
5. `feat(js): renderizado dinamico del catalogo y filtros por familia olfativa en tienda.js`
6. `feat(js): validacion inline en tiempo real de formularios sin alertas`
7. `feat(admin): gestion de nuevo perfume desde panel admin y control de sesion`
8. `feat(ui): toggle de modo oscuro con persistencia en localStorage y accesibilidad`
9. `docs: redaccion de README.md con decisiones tecnicas justificadas y enlaces de Vercel`

---

## 7. Despliegue en Vercel

* Subir a repositorio público en GitHub.
* Desplegar en **Vercel** con framework preset **Other**.
* Verificar que `index.html`, `login.html` y `admin.html` naveguen correctamente sin rutas rotas.
* Copiar la URL pública (ej. `https://aura-parfums.vercel.app`) en el `README.md` y en la descripción del repo.

---

## 8. Guía para el `README.md` (Respuestas Técnicas Obligatorias)

* **¿Por qué Flexbox y por qué Grid?**
  * *Grid:* Utilizado en el catálogo de productos (`#catalogo-grid`) porque es un diseño bidimensional (filas y columnas) que requiere reorganizarse fluidamente con `repeat(auto-fit, minmax(280px, 1fr))`.
  * *Flexbox:* Utilizado en la barra de navegación, el selector de filtros de categorías y la botonera de acciones porque maneja distribuciones unidimensionales de alineación vertical y espaciado entre elementos.
* **¿Qué hace el JavaScript y cómo funciona la validación?**
  * `tienda.js` lee los datos (de Supabase o del array de respaldo), genera las tarjetas en el DOM y filtra según la categoría seleccionada sin recargar la página.
  * La validación escucha eventos `blur` e `input`, verifica expresiones regulares y longitud, inyecta el texto del error en un `<span>` con clase `.error-msg` y bloquea el envío si existen fallos, brindando feedback visual inmediato.
* **Uso de IA:** La IA sirvió como asistente de consulta conceptual y depuración de selectores, mientras que la arquitectura, el diseño visual de la perfumería y la lógica de validación fueron implementados y personalizados por el estudiante.
* **Reto técnico resuelto:** Mantener la sincronización entre el catálogo público y el panel administrativo sin usar frameworks pesados, resuelto mediante modularización de scripts y almacenamiento sincronizado.
