/**
 * F&F Consultores - Componente de Navegación
 * Maneja el comportamiento del menú y la navegación
 */

window.FFComponents.Navigation = (function() {
    'use strict';
    
    // Variables privadas
    let header;
    let openButton;
    let menu;
    let closeMenu;
    let lastScrollTop = 0;
    
    // Inicialización
    function init() {
        cacheDOM();
        bindEvents();
        setupHeader();
    }
    
    // Cachear elementos DOM
    function cacheDOM() {
        header = document.querySelector('.header');
        openButton = document.querySelector('.nav__menu');
        menu = document.querySelector('.nav__link');
        closeMenu = document.querySelector('.nav__close');
    }
    
    // Vincular eventos
    function bindEvents() {
        if (openButton) {
            openButton.addEventListener('click', openMobileMenu);
        }
        
        if (closeMenu) {
            closeMenu.addEventListener('click', closeMobileMenu);
        }
        
        // Cerrar menú al hacer click en cualquier opción
        if (menu) {
            const links = menu.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
        }
        
        // Evento de scroll para ocultar/mostrar header
        window.addEventListener('scroll', handleScroll);
    }
    
    // Configurar header fijo
    function setupHeader() {
        if (!header) return;
        
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.width = '100%';
        header.style.zIndex = '9999';
        header.style.transition = 'transform 0.3s ease';
        
        // Ajustar el margen del hero para que no se superponga con el header
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.marginTop = header.offsetHeight + 'px';
        }
    }
    
    // Abrir menú móvil
    function openMobileMenu() {
        if (!menu) return;
        
        menu.classList.add('nav__link--show');
        menu.style.position = 'fixed';
        menu.style.top = '0';
        menu.style.left = '0';
        menu.style.width = '100%';
        menu.style.height = '100vh';
        menu.style.zIndex = '10000';
    }
    
    // Cerrar menú móvil
    function closeMobileMenu() {
        if (!menu) return;
        
        menu.classList.remove('nav__link--show');
        menu.removeAttribute('style');
    }
    
    // Manejar evento de scroll
    function handleScroll() {
        if (!header || (menu && menu.classList.contains('nav__link--show'))) return;
        
        const currentScroll = window.scrollY;
        
        if (currentScroll < lastScrollTop) {
            header.style.transform = 'translateY(0)';
        } else {
            header.style.transform = 'translateY(-100%)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
    
    // API pública
    return {
        init: init
    };
})();
