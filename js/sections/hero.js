/**
 * Módulo para la sección Hero
 * Controla el slider de imágenes de fondo
 */
FF.Sections.Hero = (function() {
    'use strict';
    
    // Variables privadas
    let heroContainer;
    let currentDiv;
    let currentIndex = 0;
    const images = [
        './images/hero1.png',
        './images/hero2.png',
        './images/hero3.png',
        './images/hero4.png',
        './images/hero5.png',
        './images/hero6.png',
        './images/hero7.png'
    ];
    
    // Inicialización del slider
    function initSlider() {
        heroContainer = document.querySelector('.hero__img');
        if (!heroContainer) return;
        
        setupInitialImage();
        startSliderInterval();
    }
    
    // Configurar imagen inicial
    function setupInitialImage() {
        currentDiv = document.createElement('div');
        setBackgroundStyles(currentDiv, images[currentIndex]);
        heroContainer.appendChild(currentDiv);
    }
    
    // Aplicar estilos de fondo
    function setBackgroundStyles(element, imageUrl) {
        element.style.backgroundImage = `url(${imageUrl})`;
        element.style.position = 'absolute';
        element.style.top = '0';
        element.style.left = '0';
        element.style.width = '100%';
        element.style.height = '100%';
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';
        element.style.transition = 'left 1s ease-in-out';
        element.style.zIndex = '0';
    }
    
    // Iniciar intervalo del slider
    function startSliderInterval() {
        setInterval(() => {
            // Actualizar índice
            currentIndex = (currentIndex + 1) % images.length;
            
            // Crear nuevo div para la siguiente imagen
            let newDiv = document.createElement('div');
            setBackgroundStyles(newDiv, images[currentIndex]);
            newDiv.style.left = '100%'; // Inicialmente fuera de la vista
            heroContainer.appendChild(newDiv);
            
            // Forzar reflow y luego animar
            setTimeout(() => {
                newDiv.style.left = '0'; // Deslizar a la vista
                currentDiv.style.left = '-100%'; // Deslizar fuera de la vista
            }, 10);
            
            // Limpiar después de la transición
            setTimeout(() => {
                heroContainer.removeChild(currentDiv);
                currentDiv = newDiv;
            }, 1010);
        }, 5000);
    }
    
    // API pública
    return {
        initSlider: initSlider
    };
})();
