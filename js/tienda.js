/**
 * NOIRÉ PERFUMES — TIENDA.JS
 * Lógica de cliente para la tienda principal:
 * 1. Alternador de Modo Claro / Oscuro con persistencia en localStorage (+4 pts Bonificación).
 * 2. Filtrado dinámico del catálogo por categoría y tipo (Grupo A - Manipulación del DOM).
 * 3. Búsqueda en tiempo real por nombre, marca o notas olfativas.
 * 4. Carrito demostrativo con contador dinámico y micro-animaciones (Grupo C - Eventos).
 */

// --------------------------------------------------------------------------
// 1. APLICACIÓN INMEDIATA DEL TEMA (Previene parpadeo visual / FOUC)
// --------------------------------------------------------------------------
(function inicializarTema() {
    const temaGuardado = localStorage.getItem('noire-theme') || 'dark';
    if (temaGuardado === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. ALTERNADOR DE TEMA (MODO OSCURO / MODO CLARO)
    // --------------------------------------------------------------------------
    const btnTema = document.getElementById('btn-tema');

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
    // 2. FILTRADO INTERACTIVO DEL CATÁLOGO (GRUPO A - DOM)
    // --------------------------------------------------------------------------
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const tarjetasProductos = document.querySelectorAll('.tarjeta-producto');

    /**
     * Aplica el filtro seleccionado a la cuadrícula de productos
     * @param {string} filtro - 'todos', 'hombres', 'mujeres', 'unisex', 'nicho', 'disenador'
     */
    function aplicarFiltro(filtro) {
        // Actualizar estado visual accesible de los botones de filtro
        botonesFiltro.forEach(btn => {
            const activo = btn.dataset.filtro === filtro;
            btn.classList.toggle('activo', activo);
            btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
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

            // Mostrar u ocultar la tarjeta de producto
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

    // --------------------------------------------------------------------------
    // 3. BÚSQUEDA RÁPIDA EN VIVO (DOM)
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
    // 4. BOLSA / CARRITO DEMOSTRATIVO (GRUPO C - EVENTOS)
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

            // Feedback visual temporal en el botón
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
