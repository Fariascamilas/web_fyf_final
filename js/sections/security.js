/**
 * Módulo para la sección Security
 * Controla el slider de elementos de seguridad
 */
FF.Sections.Security = (function() {
    'use strict';
    
    // Variables privadas
    let section;
    let items;
    let currentIndex = 0;
    
    // Inicialización del slider
    function initSlider() {
        // Solo ejecutar en pantallas pequeñas
        if (window.innerWidth >= 768) return;
        
        section = document.querySelector('.security');
        if (!section) return;
        
        items = Array.from(section.querySelectorAll('.security__element'));
        if (!items.length) return;
        
        setupSlider();
        startSliderInterval();
    }
    
    // Configurar slider
    function setupSlider() {
        // Inicialización: mostrar primer elemento y ocultar los demás
        items.forEach((item, index) => {
            item.style.left = index === 0 ? '0' : '100%';
        });
        items[0].classList.add('active');
    }
    
    // Iniciar intervalo del slider
    function startSliderInterval() {
        setInterval(() => {
            const currentItem = items[currentIndex];
            currentIndex = (currentIndex + 1) % items.length;
            const nextItem = items[currentIndex];
            
            // Animar salida del item actual
            currentItem.style.left = '-100%';
            currentItem.classList.remove('active');
            currentItem.classList.add('prev');
            
            // Preparar y animar entrada del siguiente item
            nextItem.style.left = '100%';
            void nextItem.offsetWidth; // Forzar reflow
            nextItem.style.left = '0';
            nextItem.classList.add('active');
            
            // Limpiar después de la transición
            setTimeout(() => {
                currentItem.classList.remove('prev');
                currentItem.style.left = '100%';
            }, 1010);
        }, 5000);
    }
    
    // API pública
    return {
        initSlider: initSlider
    };
})();
