/**
 * NOIRÉ PERFUMES — AUTH.JS
 * Lógica de validación del formulario de inicio de sesión (login.html)
 * Cumple Grupo B (Validación propia sin alert) y Grupo C (Eventos) de la Rúbrica.
 */

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const campoUsuario = document.getElementById('campo-usuario');
    const campoPassword = document.getElementById('campo-password');
    const errorUsuario = document.getElementById('error-usuario');
    const errorPassword = document.getElementById('error-password');
    const mensajeEstado = document.getElementById('mensaje-login-estado');

    // Expresión regular para validación de formato de correo electrónico
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Valida el campo de usuario/correo
     * @returns {boolean} true si es válido
     */
    function validarUsuario() {
        const valor = campoUsuario.value.trim();
        if (!valor) {
            errorUsuario.textContent = 'Por favor ingresa tu correo electrónico.';
            campoUsuario.setAttribute('aria-invalid', 'true');
            return false;
        }

        if (!regexEmail.test(valor)) {
            errorUsuario.textContent = 'Ingresa un formato de correo válido (ej. usuario@dominio.com).';
            campoUsuario.setAttribute('aria-invalid', 'true');
            return false;
        }

        errorUsuario.textContent = '';
        campoUsuario.removeAttribute('aria-invalid');
        return true;
    }

    /**
     * Valida el campo de contraseña
     * @returns {boolean} true si es válido
     */
    function validarPassword() {
        const valor = campoPassword.value;
        if (!valor) {
            errorPassword.textContent = 'Por favor ingresa tu contraseña.';
            campoPassword.setAttribute('aria-invalid', 'true');
            return false;
        }

        if (valor.length < 6) {
            errorPassword.textContent = 'La contraseña debe contener mínimo 6 caracteres.';
            campoPassword.setAttribute('aria-invalid', 'true');
            return false;
        }

        errorPassword.textContent = '';
        campoPassword.removeAttribute('aria-invalid');
        return true;
    }

    // Validación interactiva en tiempo real al escribir o salir del campo (input / blur)
    if (campoUsuario) {
        campoUsuario.addEventListener('input', () => {
            if (errorUsuario.textContent) validarUsuario();
        });
        campoUsuario.addEventListener('blur', validarUsuario);
    }

    if (campoPassword) {
        campoPassword.addEventListener('input', () => {
            if (errorPassword.textContent) validarPassword();
        });
        campoPassword.addEventListener('blur', validarPassword);
    }

    // Validación al enviar el formulario (submit)
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const usuarioValido = validarUsuario();
            const passwordValido = validarPassword();

            if (!usuarioValido || !passwordValido) {
                // Enfocar el primer campo con error para accesibilidad
                if (!usuarioValido) {
                    campoUsuario.focus();
                } else {
                    campoPassword.focus();
                }
                return;
            }

            // Simulación de autenticación (Credenciales de demostración)
            const correo = campoUsuario.value.trim().toLowerCase();
            const pass = campoPassword.value;

            if (mensajeEstado) {
                mensajeEstado.style.display = 'block';
                mensajeEstado.style.padding = '0.8rem';
                mensajeEstado.style.borderRadius = '6px';
                mensajeEstado.style.marginTop = '1rem';
                mensajeEstado.style.fontSize = '0.85rem';
                mensajeEstado.style.textAlign = 'center';

                if (correo === 'admin@noireperfumes.co' && pass === 'admin123') {
                    mensajeEstado.style.backgroundColor = 'rgba(46, 125, 50, 0.2)';
                    mensajeEstado.style.border = '1px solid #4CAF50';
                    mensajeEstado.style.color = '#A5D6A7';
                    mensajeEstado.textContent = '✓ Acceso concedido como Administrador. Redirigiendo a la tienda...';

                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 1800);
                } else {
                    mensajeEstado.style.backgroundColor = 'rgba(106, 27, 154, 0.25)';
                    mensajeEstado.style.border = '1px solid var(--color-morado-intenso)';
                    mensajeEstado.style.color = 'var(--color-blanco-lavanda)';
                    mensajeEstado.textContent = '✓ Sesión iniciada correctamente en modo cliente. Redirigiendo...';

                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 1800);
                }
            }
        });
    }
});
