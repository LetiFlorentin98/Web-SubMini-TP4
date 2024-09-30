document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const logoLink = document.querySelector('.logo');
    const arrowLink = document.querySelector('.content-arrow');
    const navbar = document.getElementById('nav'); // Agregamos el navbar aquí

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú pop-up
                navbar.classList.remove('visible'); // Cierra el menú
            }
        });
    });

    // Logo
    logoLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Arrow
    arrowLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Elimina la clase 'active' de todos los enlaces
            navLinks.forEach(link => link.classList.remove('active'));

            // Agrega la clase 'active' al enlace seleccionado
            this.classList.add('active');
        });
    });

    // Detectar el cambio de sección y actualizar el enlace activo en el scroll
    window.addEventListener('scroll', () => {
        let current = '';

        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 50) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

document.querySelectorAll('.caracteristica', '.especificacion').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Posición del mouse dentro de la card
        const y = e.clientY - rect.top;

        // Calcular los valores de inclinación
        const rotateX = ((y - rect.height / 2) / rect.height) * -15; // Inclinación vertical
        const rotateY = ((x - rect.width / 2) / rect.width) * 15;  // Inclinación horizontal

        // Ajustar variables CSS para la inclinación
        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);

        // Ajustar la posición del borde en función del cursor
        const borderX = Math.max(10, Math.min(x, rect.width - 10)); // Limita entre 10px y el ancho menos 10px
        card.style.setProperty('--border-left', `${borderX}px`); // Posición de la línea borde desde el cursor
    });

    card.addEventListener('mouseleave', () => {
        // Restablecer la posición de la card y el borde al salir del hover
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
    });
});

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

let products = [
    { title: "Beam (Gen 2)", description: "Barra de sonido inteligente", image: "assets/img/dispositivos/Beam.png" },
    { title: "Ray", description: "Barra de sonido", image: "assets/img/dispositivos/Ray.png" },
    { title: "Era 100", description: "Parlante inteligente", image: "assets/img/dispositivos/Era_100.png" },
    { title: "One", description: "Parlante inteligente", image: "assets/img/dispositivos/One.png" },
    { title: "One SL", description: "Parlante", image: "assets/img/dispositivos/One_SL.png" },
    { title: "Amp", description: "Amplificador", image: "assets/img/dispositivos/Amp.png" }
];

let currentIndex = 0;

function updateSlider() {
    const sliderContainer = document.querySelector(".slider-container");
    const prevProductIndex = (currentIndex - 1 + products.length) % products.length;
    const nextProductIndex = (currentIndex + 1) % products.length;

    // Actualizar las cards con la clase `active` para el producto seleccionado
    sliderContainer.innerHTML = `
    <div class="card">
            <img src="${products[prevProductIndex].image}" alt="${products[prevProductIndex].title}">
            <h3>${products[prevProductIndex].title}</h3>
            <p>${products[prevProductIndex].description}</p>
        </div>
        <div class="card active">
            <img src="${products[currentIndex].image}" alt="${products[currentIndex].title}">
            <h3>${products[currentIndex].title}</h3>
            <p>${products[currentIndex].description}</p>
        </div>
        <div class="card">
            <img src="${products[nextProductIndex].image}" alt="${products[nextProductIndex].title}">
            <h3>${products[nextProductIndex].title}</h3>
            <p>${products[nextProductIndex].description}</p>
        </div>
    `;

    // Actualiza también los bullets si los tienes implementados
    updateBullets();
}

function updateBullets() {
    const bulletsContainer = document.querySelector(".bullets-container");
    bulletsContainer.innerHTML = ''; // Limpiar bullets previos

    products.forEach((product, index) => {
        const bullet = document.createElement("span");
        bullet.classList.add("bullet");
        if (index === currentIndex) {
            bullet.classList.add("active");
        }

        bullet.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });

        bulletsContainer.appendChild(bullet);
    });
}

function moveLeft() {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    updateSlider();
}

function moveRight() {
    currentIndex = (currentIndex + 1) % products.length;
    updateSlider();
}

window.onload = updateSlider;

/*const slider = document.querySelector('.slider-container');
let isDown = false; // Indica si el mouse está presionado
let startX; // Posición inicial del mouse
let scrollLeft; // Posición de desplazamiento inicial

slider.addEventListener('mousedown', (e) => {
    isDown = true; // El mouse está presionado
    startX = e.pageX - slider.offsetLeft; // Guardar la posición inicial
    scrollLeft = slider.scrollLeft; // Guardar la posición de desplazamiento actual
    slider.style.cursor = 'grabbing'; // Cambiar el cursor para indicar arrastre
});

slider.addEventListener('mouseleave', () => {
    isDown = false; // Detener el arrastre
    slider.style.cursor = 'grab'; // Cambiar el cursor de nuevo
});

slider.addEventListener('mouseup', () => {
    isDown = false; // Detener el arrastre
    slider.style.cursor = 'grab'; // Cambiar el cursor de nuevo
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // Si el mouse no está presionado, no hacer nada
    e.preventDefault(); // Evitar la selección de texto
    const x = e.pageX - slider.offsetLeft; // Nueva posición del mouse
    const walk = (x - startX) * 2; // Cuánto desplazarse (ajusta la velocidad aquí)
    slider.scrollLeft = scrollLeft - walk; // Mover el scroll
});*/

// Asegúrate de que este código solo se ejecute cuando estés en la sección de video

function toggleMenu(element) {
    const allTitles = document.querySelectorAll('.footer-bottom-mobile .footer-title');
    
    allTitles.forEach(title => {
        const content = title.nextElementSibling;

        if (title !== element) {
            title.classList.remove('active');
            const icon = title.querySelector('.icon');
            icon.innerHTML = '<span class="material-symbols-rounded">add</span>'; // Cambia a '+' por defecto
            content.style.maxHeight = '0';
        }
    });

    // Toggle el elemento clicado
    element.classList.toggle('active');
    const icon = element.querySelector('.icon');
    const content = element.nextElementSibling;

    if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
        icon.innerHTML = '<span class="material-symbols-rounded">remove</span>'; // Cambia a '-' al abrir
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        icon.innerHTML = '<span class="material-symbols-rounded">add</span>'; // Cambia a '+' al cerrar
        content.style.maxHeight = '0';
    }
}

  