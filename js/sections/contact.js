/**
 * F&F Consultores - Sección Contacto
 * Maneja el formulario de contacto y su envío
 */

window.FFSections.Contact = (function() {
    'use strict';
    
    // Inicialización
    function init() {
        const form = document.querySelector('.contacto__form form');
        if (!form) return;
        
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Manejar envío del formulario
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const asunto = document.getElementById('asunto')?.value || '';
        const nombre = document.getElementById('nombre')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const mensaje = document.getElementById('mensaje')?.value || '';
        
        // Crear asunto y cuerpo para el correo
        const subject = encodeURIComponent(`Consulta: ${asunto}`);
        const body = encodeURIComponent(
            `Hola F&F Consultores,\n\n` +
            `Mi nombre es ${nombre}, mi correo es ${email}.\n\n` +
            `Consulta: ${asunto}\n\n` +
            `Mensaje: ${mensaje}\n\n` +
            `Gracias por su atención.`
        );
        
        // Redirigir a cliente de correo
        window.location.href = `mailto:consulting_she@yahoo.com.ar?subject=${subject}&body=${body}`;
    }
    
    // API pública
    return {
        init: init
    };
})();
