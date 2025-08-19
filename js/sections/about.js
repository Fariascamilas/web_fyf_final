/**
 * Módulo para la sección About
 * Maneja los modales de las tarjetas de servicios
 */
FF.Sections.About = (function() {
    'use strict';
    
    // Variables privadas
    let cards = [];
    
    // Inicialización
    function init() {
        cacheDOM();
        bindEvents();
    }
    
    // Cachear elementos DOM
    function cacheDOM() {
        cards = document.querySelectorAll('.about__card');
    }
    
    // Vincular eventos
    function bindEvents() {
        if (!cards.length) return;
        
        // Vincular evento de click a cada tarjeta
        cards.forEach(card => {
            card.addEventListener('click', () => showCardModal(card));
            
            // También vincular evento al botón "+" específicamente
            const moreButton = card.querySelector('.about__more');
            if (moreButton) {
                moreButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evitar doble activación
                    showCardModal(card);
                });
            }
        });
    }
    
    // Mostrar modal de tarjeta
    function showCardModal(card) {
        const modal = card.querySelector('.modal-overlay');
        if (!modal) return;
        
        // Usar el componente Modal para mostrar el modal
        if (FF.Components.Modal && typeof FF.Components.Modal.show === 'function') {
            FF.Components.Modal.show(modal);
        } else {
            // Fallback en caso de que el componente Modal no esté disponible
            showModalLegacy(card, modal);
        }
    }
    
    // Método de respaldo para mostrar modal (si el componente Modal no está disponible)
    function showModalLegacy(card, modal) {
        // Extraer modal del DOM y moverlo al final del body
        modal.parentElement.removeChild(modal);
        document.body.appendChild(modal);
        
        // Mostrar modal
        modal.style.display = 'flex';
        
        // Deshabilitar scroll
        document.body.style.overflow = 'hidden';
        
        // Manejar cierre del modal
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
                modal.removeEventListener('click', hideModal);
            }
        }
        
        modal.addEventListener('click', hideModal);
    }
    
    // API pública
    return {
        init: init
    };
})();
