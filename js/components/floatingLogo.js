/**
 * Módulo del logo flotante
 * Controla la visibilidad del logo flotante basado en el scroll
 */
FF.Components.FloatingLogo = (function() {
    'use strict';
    
    // Variables privadas
    let floatingCircle;
    let heroContent;
    let securityBlock;
    let headerLogo;
    
    // Inicialización
    function init() {
        cacheDOM();
        if (!floatingCircle) return;
        
        setupObservers();
    }
    
    // Cachear elementos DOM
    function cacheDOM() {
        floatingCircle = document.getElementById('floatingCircle');
        heroContent = document.querySelector('.hero__content');
        securityBlock = document.querySelector('.security');
        headerLogo = document.querySelector('.header__circle');
    }
    
    // Configurar observers para controlar visibilidad
    function setupObservers() {
        // Observer para el hero
        if (heroContent) {
            const heroObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        showLogo();
                    } else {
                        hideLogo();
                    }
                });
            });
            heroObserver.observe(heroContent);
        }
        
        // Observer para el logo del header
        if (headerLogo) {
            const headerObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        showLogo();
                    } else {
                        hideLogo();
                    }
                });
            });
            headerObserver.observe(headerLogo);
        }
        
        // Observer para la sección de seguridad
        if (securityBlock) {
            const securityObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        floatingCircle.style.opacity = '0';
                    } else {
                        // Restaurar opacidad normal si no está en sección de seguridad
                        floatingCircle.style.opacity = '';
                    }
                });
            });
            securityObserver.observe(securityBlock);
        }
        
        // Observer para modales
        const modalOverlays = document.querySelectorAll('.modal-overlay');
        modalOverlays.forEach(overlay => {
            const modalObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        floatingCircle.style.opacity = '0.2';
                    } else {
                        floatingCircle.style.display = 'flex';
                        floatingCircle.style.opacity = '';
                    }
                });
            });
            modalObserver.observe(overlay);
        });
    }
    
    // Mostrar logo flotante
    function showLogo() {
        if (!floatingCircle) return;
        floatingCircle.classList.add('active');
    }
    
    // Ocultar logo flotante
    function hideLogo() {
        if (!floatingCircle) return;
        floatingCircle.classList.remove('active');
    }
    
    // API pública
    return {
        init: init,
        show: showLogo,
        hide: hideLogo
    };
})();
