/**
 * NOIRÉ PERFUMES — TIENDA.JS
 * Lógica de cliente para la tienda principal:
 * 1. Menú hamburguesa accesible en móvil (Grupo A - DOM).
 * 2. Filtrado dinámico del catálogo por categoría y tipo (Grupo A - DOM).
 * 3. Búsqueda en tiempo real por nombre, marca o notas.
 * 4. Carrito demostrativo con contador dinámico (Grupo C - Eventos).
 * 5. Alternador de Modo Claro / Oscuro con persistencia en localStorage (+4 pts Bonificación).
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. ALTERNADOR DE TEMA (MODO OSCURO / MODO CLARO)
    // --------------------------------------------------------------------------
    const btnTema = document.getElementById('btn-tema');
    const temaGuardado = localStorage.getItem('noire-theme') || 'dark';

    // Aplicar tema inicial
    if (temaGuardado === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const esModoClaro = document.documentElement.getAttribute('data-theme') === 'light';
            if (esModoClaro) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('noire-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('noire-theme', 'light');
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2. MENÚ HAMBURGUESA ACCESIBLE (MÓVIL)
    // --------------------------------------------------------------------------
    const btnHamburguesa = document.getElementById('btn-hamburguesa');
    const menuCategorias = document.getElementById('menu-categorias');

    if (btnHamburguesa && menuCategorias) {
        btnHamburguesa.addEventListener('click', () => {
            const expandido = btnHamburguesa.getAttribute('aria-expanded') === 'true';
            btnHamburguesa.setAttribute('aria-expanded', !expandido);
            menuCategorias.classList.toggle('activo');
        });

        // Cerrar el menú al hacer clic en un enlace de navegación
        menuCategorias.querySelectorAll('a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                btnHamburguesa.setAttribute('aria-expanded', 'false');
                menuCategorias.classList.remove('activo');
            });
        });
    }

    // --------------------------------------------------------------------------
    // 3. FILTRADO INTERACTIVO DEL CATÁLOGO
    // --------------------------------------------------------------------------
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const enlacesCategorias = document.querySelectorAll('.enlace-categoria[data-filtro]');
    const tarjetasProductos = document.querySelectorAll('.tarjeta-producto');

    /**
     * Aplica el filtro seleccionado a la cuadrícula de productos
     * @param {string} filtro - 'todos', 'hombres', 'mujeres', 'unisex', 'nicho', 'disenador'
     */
    function aplicarFiltro(filtro) {
        // Actualizar estado visual de los botones de la barra de filtros
        botonesFiltro.forEach(btn => {
            const activo = btn.dataset.filtro === filtro;
            btn.classList.toggle('activo', activo);
            btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
        });

        // Actualizar estado de los enlaces en la navegación superior
        enlacesCategorias.forEach(enlace => {
            enlace.classList.toggle('activo', enlace.dataset.filtro === filtro);
        });

        // Filtrar tarjetas en el DOM
        tarjetasProductos.forEach(tarjeta => {
            const categoria = tarjeta.dataset.categoria;
            const tipo = tarjeta.dataset.tipo;

            let coincide = false;

            if (filtro === 'todos') {
                coincide = true;
            } else if (filtro === 'hombres' || filtro === 'mujeres' || filtro === 'unisex') {
                coincide = categoria === filtro;
            } else if (filtro === 'nicho' || filtro === 'disenador') {
                coincide = tipo === filtro;
            }

            // Mostrar u ocultar la tarjeta con suavidad
            if (coincide) {
                tarjeta.style.display = 'flex';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    }

    // Eventos en botones de filtro de la sección catálogo
    botonesFiltro.forEach(btn => {
        btn.addEventListener('click', () => {
            aplicarFiltro(btn.dataset.filtro);
        });
    });

    // Eventos en enlaces de categorías del menú superior
    enlacesCategorias.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const filtro = enlace.dataset.filtro;
            if (filtro) {
                aplicarFiltro(filtro);
            }
        });
    });

    // --------------------------------------------------------------------------
    // 4. BÚSQUEDA RÁPIDA EN VIVO (DOM)
    // --------------------------------------------------------------------------
    const inputBusqueda = document.getElementById('input-busqueda');
    const formBusqueda = document.getElementById('form-busqueda');

    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', () => {
            const texto = inputBusqueda.value.trim().toLowerCase();

            tarjetasProductos.forEach(tarjeta => {
                const nombre = tarjeta.querySelector('.nombre-producto')?.textContent.toLowerCase() || '';
                const marca = tarjeta.querySelector('.marca-producto')?.textContent.toLowerCase() || '';
                const familia = tarjeta.querySelector('.familia-producto')?.textContent.toLowerCase() || '';
                const notas = tarjeta.querySelector('.notas-producto')?.textContent.toLowerCase() || '';

                const coincide = nombre.includes(texto) || marca.includes(texto) || familia.includes(texto) || notas.includes(texto);
                tarjeta.style.display = coincide ? 'flex' : 'none';
            });
        });

        if (formBusqueda) {
            formBusqueda.addEventListener('submit', (e) => {
                e.preventDefault();
                const seccionCatalogo = document.getElementById('catalogo');
                if (seccionCatalogo) {
                    seccionCatalogo.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // --------------------------------------------------------------------------
    // 5. BOLSA / CARRITO DEMOSTRATIVO (FEEDBACK VISUAL)
    // --------------------------------------------------------------------------
    const contadorCarrito = document.getElementById('contador-carrito');
    const botonesAnadir = document.querySelectorAll('.btn-anadir-bolsa');
    let totalItems = 0;

    botonesAnadir.forEach(btn => {
        btn.addEventListener('click', () => {
            totalItems++;
            if (contadorCarrito) {
                contadorCarrito.textContent = totalItems;
                // Efecto de pulso en el contador
                contadorCarrito.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.4)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 300
                });
            }

            // Cambiar temporalmente el texto del botón
            const textoOriginal = btn.textContent;
            btn.textContent = '✓ Añadido';
            btn.style.backgroundColor = 'var(--color-rojo-profundo)';
            btn.style.color = '#FFFFFF';

            setTimeout(() => {
                btn.textContent = textoOriginal;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 1200);
        });
    });
});
