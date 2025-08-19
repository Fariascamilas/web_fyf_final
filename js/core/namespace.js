/**
 * F&F Consultores - Namespace
 * Define los espacios de nombres para la aplicación
 */

// Inicializar los namespaces
window.FF = window.FF || {};
window.FFComponents = window.FFComponents || {};
window.FFSections = window.FFSections || {};
window.FFUtils = window.FFUtils || {};

// Configuración global
window.FF.config = {
    // Tiempos de transición (en ms)
    transitions: {
        slider: 5000,
        sliderAnimation: 1000
    },
    
    // Breakpoints (en px)
    breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        wide: 1200
    }
};

// Utilidades comunes
window.FFUtils.isMobile = () => window.innerWidth < window.FF.config.breakpoints.tablet;
window.FFUtils.debounce = (func, wait = 100) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
};
