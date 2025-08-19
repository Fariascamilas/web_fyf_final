/**
 * F&F Consultores - Archivo principal
 * Inicializa todos los módulos de la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Inicialización de la navegación
    initNavigation();
    
    // Inicialización del logo flotante
    initFloatingLogo();
    
    // Inicialización de sliders
    initHeroSlider();
    
    // Inicialización de modales
    initModals();
    
    // Inicialización de interacciones
    initQuestions();
    
    // Inicialización de formularios
    initContactForm();
    
    console.log('F&F Consultores - Inicialización completada');
});

// Función para inicializar la navegación
function initNavigation() {
    const header = document.querySelector('.header');
    const openButton = document.querySelector('.nav__menu');
    const menu = document.querySelector('.nav__link');
    const closeMenu = document.querySelector('.nav__close');
    const navLinks = document.querySelectorAll('.header__nav a.header__text, .nav__link a.header__text');
    const sections = document.querySelectorAll('section[id]');
    let lastScrollTop = 0;
    
    // Crear elemento para mostrar la sección actual en móviles
    const currentSectionEl = document.createElement('span');
    currentSectionEl.className = 'current-section';
    currentSectionEl.textContent = 'Inicio'; // Valor por defecto
    
    // Insertar el elemento después del título
    const headerTitle = document.querySelector('.header__icon_and_tittle');
    if (headerTitle && headerTitle.nextElementSibling) {
        header.insertBefore(currentSectionEl, headerTitle.nextElementSibling);
    } else if (headerTitle) {
        header.appendChild(currentSectionEl);
    }
    
    // Modificar el título para dispositivos móviles pequeños
    const title = document.querySelector('.header__tittle');
    if (title) {
        const fullText = title.textContent;
        title.innerHTML = `<span class="full-title">${fullText}</span>`;
        
        // Para móviles, mostrar solo "F&F"
        if (window.innerWidth <= 480) {
            title.textContent = "F&F";
        }
        
        // Actualizar al cambiar el tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 480) {
                title.textContent = "F&F";
            } else {
                title.innerHTML = `<span class="full-title">${fullText}</span>`;
            }
        });
    }
    
    // Menú móvil
    if (openButton && menu) {
        openButton.addEventListener('click', function() {
            menu.classList.add('nav__link--show');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    }
    
    if (closeMenu && menu) {
        closeMenu.addEventListener('click', function() {
            closeMenuMobile();
        });
    }
    
    function closeMenuMobile() {
        if (!menu) return;
        
        menu.classList.remove('nav__link--show');
        document.body.style.overflow = ''; // Restaurar scroll
    }
    
    if (menu) {
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                closeMenuMobile();
            });
        });
    }
    
    // Función para activar el enlace de menú correspondiente a la sección visible
    function activateMenuAtCurrentSection() {
        const scrollY = window.scrollY;
        
        // Efecto de header al hacer scroll
        if (scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        // Detectar sección activa
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        // Actualizar el texto de la sección actual para móviles
                        currentSectionEl.textContent = link.textContent;
                    }
                });
            }
        });
        
        // Si estamos al inicio de la página, activar "Inicio"
        if (scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#inicio') {
                    link.classList.add('active');
                    currentSectionEl.textContent = 'Inicio';
                }
            });
        }
    }
    
    // Inicializar sección activa al cargar la página
    activateMenuAtCurrentSection();
    
    // Actualizar sección activa al hacer scroll
    window.addEventListener('scroll', activateMenuAtCurrentSection);
    
    // Efecto suave al hacer click en enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Ajustar el margen del hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.marginTop = header.offsetHeight + 'px';
    }
}

// Función para inicializar los modales
function initModals() {
    const cards = document.querySelectorAll('.about__card');
    const header = document.querySelector('.header');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const modal = card.querySelector('.modal-overlay');
            if (!modal) return;
            
            // Ocultar el header al mostrar el modal
            if (header) {
                header.classList.add('header--hidden');
            }
            
            modal.parentElement.removeChild(modal);
            document.body.appendChild(modal);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            function hideModal(e) {
                if (
                    e.target === modal ||
                    e.target.closest('.modal-close') ||
                    e.target.closest('.modal-contact')
                ) {
                    modal.style.display = 'none';
                    document.body.removeChild(modal);
                    card.appendChild(modal);
                    document.body.style.overflow = '';
                    
                    // Mostrar el header al cerrar el modal
                    if (header) {
                        header.classList.remove('header--hidden');
                    }
                    
                    modal.removeEventListener('click', hideModal);
                }
            }
            
            modal.addEventListener('click', hideModal);
        });
    });
}

// Función para inicializar el slider hero
function initHeroSlider() {
    const heroContainer = document.querySelector('.hero__img');
    if (!heroContainer) return;
    
    const images = [
        './images/hero1.png',
        './images/hero2.png',
        './images/hero3.png',
        './images/hero4.png',
        './images/hero5.png',
        './images/hero6.png',
        './images/hero7.png'
    ];
    
    let currentIndex = 0;
    let currentDiv = document.createElement('div');
    
    currentDiv.style.backgroundImage = `url(${images[currentIndex]})`;
    currentDiv.style.position = 'absolute';
    currentDiv.style.top = '0';
    currentDiv.style.left = '0';
    currentDiv.style.width = '100%';
    currentDiv.style.height = '100%';
    currentDiv.style.backgroundSize = 'cover';
    currentDiv.style.backgroundPosition = 'center';
    currentDiv.style.transition = 'left 1s ease-in-out';
    currentDiv.style.zIndex = '0';
    
    heroContainer.appendChild(currentDiv);
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        
        let newDiv = document.createElement('div');
        newDiv.style.backgroundImage = `url(${images[currentIndex]})`;
        newDiv.style.position = 'absolute';
        newDiv.style.top = '0';
        newDiv.style.left = '100%';
        newDiv.style.width = '100%';
        newDiv.style.height = '100%';
        newDiv.style.backgroundSize = 'cover';
        newDiv.style.backgroundPosition = 'center';
        newDiv.style.transition = 'left 1s ease-in-out';
        newDiv.style.zIndex = '0';
        
        heroContainer.appendChild(newDiv);
        
        setTimeout(() => {
            newDiv.style.left = '0';
            currentDiv.style.left = '-100%';
        }, 10);
        
        setTimeout(() => {
            heroContainer.removeChild(currentDiv);
            currentDiv = newDiv;
        }, 1010);
    }, 5000);
}

// Función para inicializar el logo flotante
function initFloatingLogo() {
    const floatingCircle = document.getElementById('floatingCircle');
    const heroSection = document.querySelector('.hero');
    const securitySection = document.querySelector('.security');
    const footerSection = document.querySelector('.footer');
    
    if (!floatingCircle) return;
    
    // Función para verificar si una sección está visible en la ventana
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom >= 0
        );
    }
    
    // Función para actualizar la visibilidad del logo flotante
    function updateLogoVisibility() {
        if (
            isElementInViewport(heroSection) || 
            isElementInViewport(securitySection) || 
            isElementInViewport(footerSection)
        ) {
            floatingCircle.classList.remove('active');
        } else {
            floatingCircle.classList.add('active');
        }
    }
    
    // Verificar la visibilidad al cargar la página
    updateLogoVisibility();
    
    // Actualizar la visibilidad al hacer scroll
    window.addEventListener('scroll', updateLogoVisibility);
    
    // Hacer que el logo flotante lleve al inicio de la página al hacer clic
    floatingCircle.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Función para inicializar las preguntas frecuentes
function initQuestions() {
    const titleQuestions = document.querySelectorAll('.questions__title');
    
    titleQuestions.forEach(question => {
        question.addEventListener('click', () => {
            let height = 0;
            let answer = question.nextElementSibling;
            let addPadding = question.parentElement.parentElement;
            
            addPadding.classList.toggle('questions__padding--add');
            question.querySelector('.questions__arrow').classList.toggle('questions__arrow--rotate');
            
            if (answer.clientHeight === 0) {
                height = answer.scrollHeight;
            }
            
            answer.style.height = `${height}px`;
        });
    });
}

// Función para inicializar el formulario de contacto
function initContactForm() {
    const form = document.querySelector('.contacto__form form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const asunto = document.getElementById('asunto')?.value || '';
            const nombre = document.getElementById('nombre')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const mensaje = document.getElementById('mensaje')?.value || '';
            
            const subject = encodeURIComponent(`Consulta: ${asunto}`);
            const body = encodeURIComponent(
                `Hola F&F Consultores,\n\n` +
                `Mi nombre es ${nombre}, mi correo es ${email}.\n\n` +
                `Consulta: ${asunto}\n\n` +
                `Mensaje: ${mensaje}\n\n` +
                `Gracias por su atención.`
            );
            
            window.location.href = `mailto:consulting_she@yahoo.com.ar?subject=${subject}&body=${body}`;
        });
    }
}
