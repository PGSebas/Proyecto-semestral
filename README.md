# NOIRÉ PERFUMES — Plataforma Web de Alta Perfumería

> **Curso:** Desarrollo Web · Semestre 2026-2  
> **Entrega:** Entrega 1 — Sitio Web del Proyecto (15 % de la nota final)  
> **Despliegue en Vercel:** [https://proyecto-semestral.vercel.app](https://proyecto-semestral.vercel.app)  
> **Repositorio en GitHub:** [https://github.com/PGSebas/Proyecto-semestral](https://github.com/PGSebas/Proyecto-semestral)

---

## 1. Descripción del Proyecto

**NOIRÉ Perfumes** es una plataforma web orientada a la exhibición y exploración olfativa de fragancias selectas de diseñador y perfumería de autor (nicho). Su propósito es ofrecer una experiencia digital inmersiva, elegante y organizada que permita a los amantes de la perfumería descubrir aromas para hombres, mujeres o creaciones unisex, clasificados por sus casas perfumeras, familias olfativas, notas y concentraciones.

El proyecto resuelve la necesidad de centralizar fragancias exclusivas en una interfaz moderna y rápida, sin sobrecargar al usuario con pasos de compra innecesarios, funcionando como vitrina interactiva y base para la evolución hacia una aplicación con backend en las siguientes entregas del semestre.

---

## 2. Estructura del Proyecto

El código está organizado de manera modular por carpetas técnicas para facilitar el mantenimiento y la escalabilidad:

```text
proyecto-semestral/
├── index.html              # Tienda pública: cabecera, hero, marcas, catálogo con filtros y pie
├── pages/
│   └── login.html          # Pantalla de acceso a la cuenta con soporte de modo claro/oscuro
├── css/
│   └── estilos.css         # Sistema de diseño: variables CSS, modo oscuro/claro, Flexbox y Grid
├── js/
│   ├── tienda.js           # Interacciones: catálogo, filtros en DOM, búsqueda y bolsa interactiva
│   └── auth.js             # Validación estricta en tiempo real y sincronización de tema
├── assets/
│   └── images/             # Fotografías oficiales de fragancias y logotipos en alta resolución
├── docs/
│   └── entrega_1.txt       # Guía de requerimientos y rúbrica del curso
├── Screenshots/            # Evidencias visuales de la interfaz en escritorio y móvil
├── .gitignore              # Exclusiones de archivos del sistema, editores y temporales
├── README.md               # Documentación y justificación técnica del proyecto
└── agent_.md               # Bitácora maestra de arquitectura y directrices de desarrollo
```

---

## 3. Decisiones Técnicas

### ¿Dónde usé Flexbox y dónde Grid, y por qué en cada caso?
* **CSS Grid:** Se implementó en el catálogo principal de fragancias (`.cuadricula-productos`) y en las columnas del pie de página (`.cuadricula-pie`). Se eligió Grid porque permite controlar una distribución bidimensional (filas y columnas simultáneamente), logrando que las tarjetas de perfume se adapten de forma fluida a pantallas anchas mediante `repeat(auto-fill, minmax(270px, 1fr))` y colapsen a una sola columna en móviles sin romper la alineación vertical ni requerir cálculos manuales.
* **Flexbox:** Se utilizó en la cabecera principal (`.contenedor-cabecera`), la barra de búsqueda, las acciones del usuario, el menú de navegación por categorías (`.lista-categorias`), la botonera de filtros (`.barra-filtros`) y el interior de las tarjetas (`.cuerpo-tarjeta`). Flexbox es ideal para estos componentes porque maneja relaciones unidimensionales: alinear elementos horizontalmente, centrar iconos y empujar los precios o botones hacia la parte inferior de la tarjeta con `margin-top: auto`.

### ¿Qué hace el JavaScript y cómo funciona la validación?
* **Manipulación del DOM y Eventos:** En `tienda.js`, el script escucha eventos de clic en los botones de filtro y en los enlaces de la barra superior para mostrar u ocultar dinámicamente las tarjetas según el género (`hombres`, `mujeres`, `unisex`) o tipo de casa (`nicho`, `diseñador`). También gestiona búsqueda en tiempo real que filtra por texto en el DOM (nombre, casa o notas olfativas) y actualiza el contador de la bolsa de compras con una micro-animación de pulso.
* **Modo Oscuro / Claro:** Un botón conmutador presente tanto en la tienda como en el login cambia las variables del tema aplicando el atributo `data-theme="light"` en la raíz del documento y persistiendo la preferencia en `localStorage` para conservarla fluidamente en toda la navegación.
* **Validación de Formularios:** En `auth.js`, el formulario de inicio de sesión valida en tiempo real (eventos `blur` e `input`) y en el evento `submit`. Verifica que el campo de correo no esté vacío y cumpla el formato de email mediante una expresión regular, y que la contraseña tenga mínimo 6 caracteres. Los mensajes de error se inyectan en etiquetas `<span>` dedicadas junto a cada campo y se resaltan visualmente, impidiendo el envío si hay fallos y sin recurrir en ningún caso a ventanas emergentes de tipo `alert()`.

### Si usé IA, ¿para qué la usé y qué cambié yo del resultado?
La IA se utilizó como un asistente de apoyo para estructurar rápidamente el archivo `.gitignore`, definir la plantilla semántica base de HTML y organizar los tokens de color según la paleta solicitada. Durante el proceso, descarté secciones predeterminadas (como atención telefónica o garantías excesivas) para centrar el sitio en un catálogo minimalista, personalicé el nombre de marca a **NOIRÉ Perfumes**, unifiqué las imágenes de fragancias reales en alta resolución y ajusté la jerarquía de los encabezados para garantizar que el validador W3C y la rúbrica del docente se cumplieran a cabalidad.

### ¿Qué fue lo más difícil y cómo lo resolví?
Lo más desafiante fue lograr que la cuadrícula de productos y la barra de filtros funcionaran de forma completamente responsiva y accesible sin utilizar frameworks externos como Bootstrap o Tailwind. Se resolvió creando un sistema de variables CSS bien estructurado en `:root`, aplicando `grid-template-columns` con valores relativos y testeando diferentes resoluciones para asegurar que en pantallas menores a 768px ningún texto o tarjeta sufriera desbordamiento horizontal.

---

## 4. Capturas de Pantalla

### Versión Escritorio — Modo Oscuro
![Vista Escritorio Modo Oscuro](Screenshots/escritorio_modo_oscuro.png)

### Versión Escritorio — Modo Claro
![Vista Escritorio Modo Claro](Screenshots/escritorio_modo_claro.png)

### Versión Móvil
![Vista Móvil Responsiva](Screenshots/mobile.jpeg)
