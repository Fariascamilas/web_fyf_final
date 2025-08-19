/**
 * Módulo de modales
 * Maneja la visualización y comportamiento de modales
 */
FF.Components.Modal = (function() {
    'use strict';
    
    // Mostrar modal
    function show(modalElement) {
        if (!modalElement) return;
        
        // Mover el modal al final del body para evitar problemas de z-index
        const originalParent = modalElement.parentElement;
        document.body.appendChild(modalElement);
        
        // Mostrar el modal
        modalElement.style.display = 'flex';
        
        // Deshabilitar scroll
        document.body.style.overflow = 'hidden';
        
        // Guardar referencia al padre original para restaurar después
        modalElement.dataset.originalParent = originalParent;
        
        // Configurar evento para cerrar
        modalElement.addEventListener('click', function(e) {
            if (
                e.target === modalElement || 
                e.target.closest('.modal-close') ||
                e.target.closest('.modal-contact')
            ) {
                hide(modalElement);
            }
        });
        
        return modalElement;
    }
    
    // Ocultar modal
    function hide(modalElement) {
        if (!modalElement) return;
        
        // Ocultar modal
        modalElement.style.display = 'none';
        
        // Restaurar scroll
        document.body.style.overflow = '';
        
        // Restaurar posición original en el DOM
        const originalParent = modalElement.dataset.originalParent;
        if (originalParent && typeof originalParent !== 'string') {
            originalParent.appendChild(modalElement);
        }
        
        return modalElement;
    }
    
    // API pública
    return {
        show: show,
        hide: hide
    };
})();
