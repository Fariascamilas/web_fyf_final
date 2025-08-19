/**
 * Módulo para la sección Questions
 * Maneja el comportamiento acordeón de las preguntas frecuentes
 */
FF.Sections.Questions = (function() {
    'use strict';
    
    // Inicialización
    function init() {
        const questionTitles = document.querySelectorAll('.questions__title');
        if (!questionTitles.length) return;
        
        // Vincular evento de click a cada título
        questionTitles.forEach(title => {
            title.addEventListener('click', () => toggleQuestion(title));
        });
    }
    
    // Alternar estado de pregunta (abierta/cerrada)
    function toggleQuestion(titleElement) {
        const answer = titleElement.nextElementSibling;
        const parentPadding = titleElement.parentElement.parentElement;
        
        // Alternar clases para el padding y la flecha
        parentPadding.classList.toggle('questions__padding--add');
        titleElement.querySelector('.questions__arrow').classList.toggle('questions__arrow--rotate');
        
        // Ajustar altura de la respuesta
        let height = 0;
        if (answer.clientHeight === 0) {
            height = answer.scrollHeight;
        }
        
        answer.style.height = `${height}px`;
    }
    
    // API pública
    return {
        init: init
    };
})();
