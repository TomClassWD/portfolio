// Animación de texto
const typed = new Typed('#typed-text', {
    strings: ['Desarrollador Web', 'Diseñador UI/UX', 'Apasionado por la tecnología'],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true
});

// Animación de aparición al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cursor personalizado
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor-personalizado');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    const cursor = document.getElementById('cursor-personalizado');
    cursor.style.transform = 'scale(0.9)';
});

document.addEventListener('mouseup', () => {
    const cursor = document.getElementById('cursor-personalizado');
    cursor.style.transform = 'scale(1)';
});

// Efecto de fade al hacer scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario-contacto');
    const alertaMsg = document.getElementById('alerta-mensaje');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                mostrarAlerta('¡Correo enviado!', 'exito');
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        mostrarAlerta(data['errors'].map(error => error['message']).join(', '), 'error');
                    } else {
                        mostrarAlerta('Oops! Hubo un problema al enviar el formulario', 'error');
                    }
                })
            }
        }).catch(error => {
            mostrarAlerta('Oops! Hubo un problema al enviar el formulario', 'error');
        });
    });

    function mostrarAlerta(mensaje, tipo) {
        alertaMsg.textContent = mensaje;
        alertaMsg.className = 'alerta';
        alertaMsg.classList.add(`alerta-${tipo}`);
        alertaMsg.style.display = 'block';

        setTimeout(() => {
            alertaMsg.style.display = 'none';
        }, 5000);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        // Opcional: animar las barras del botón de menú
        this.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
});