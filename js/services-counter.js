/**
 * Controlador dedicado para el contador de servicios
 */

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initServicesCounter();
});

/**
 * Inicializa y controla el contador de servicios
 */
function initServicesCounter() {
    const servicesCountContainer = document.querySelector('.about__services-count');
    
    if (!servicesCountContainer) return;
    
    // Limpiar el contenedor
    servicesCountContainer.innerHTML = '';
    
    // Crear elementos del contador
    const numberElement = document.createElement('div');
    numberElement.className = 'services-number';
    numberElement.textContent = '0';
    
    const textElement = document.createElement('div');
    textElement.className = 'services-text';
    textElement.textContent = 'Servicios Especializados';
    
    // Ya no creamos la cinta decorativa
    
    // Agregar elementos al DOM
    servicesCountContainer.appendChild(numberElement);
    servicesCountContainer.appendChild(textElement);
    
    // Observador de intersección para iniciar la animación cuando sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir delay antes de iniciar para mejor UX
                setTimeout(() => {
                    startCounterSequence(numberElement, textElement, servicesCountContainer);
                }, 400);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(servicesCountContainer);
}

/**
 * Inicia la secuencia del contador
 */
function startCounterSequence(numberElement, textElement, container) {
    let currentCount = 0;
    const targetCount = 7;
    const interval = 850; // Tiempo entre cada número
    
    // Asegurar que el contenedor esté vacío de eventos y posicionado correctamente
    container.style.pointerEvents = 'none';
    
    // Asegurar que el número inicial esté centrado
    numberElement.style.position = 'absolute';
    numberElement.style.top = '50%';
    numberElement.style.left = '50%';
    numberElement.style.transform = 'translate(-50%, -50%)';
    numberElement.style.pointerEvents = 'none';
    
    // Función para animar la transición entre números
    function updateCounter() {
        currentCount++;
        
        // Limpiar cualquier estilo inline previo
        numberElement.removeAttribute('style');
        
        // Configurar los estilos básicos para todos los números
        Object.assign(numberElement.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            fontSize: '6rem',
            fontWeight: '800',
            color: '#666666',
            opacity: '0.75'
        });
        
        // Actualizar el número
        numberElement.textContent = currentCount;
        
        // Si llegamos al 7, completar la animación
        if (currentCount === targetCount) {
            // Quitar clase de conteo y añadir clase final
            numberElement.classList.remove('counting');
            numberElement.classList.add('final');
            
            // Configurar estilo específico para el 7
            Object.assign(numberElement.style, {
                color: '#1A7D36',
                fontSize: '7rem',
                opacity: '0.95',
                transform: 'translate(-50%, -60%)'
            });
            
            // Completar con efectos adicionales
            setTimeout(() => {
                completeCounterAnimation(numberElement, textElement, container);
            }, 300);
            
            return;
        }
        
        // Continuar la secuencia
        setTimeout(updateCounter, interval);
    }
    
    // Iniciar la secuencia
    setTimeout(updateCounter, interval);
}

/**
 * Efectos finales cuando el contador llega a 7
 */
function completeCounterAnimation(numberElement, textElement, container) {
    // Asegurar que el texto tenga el estilo correcto
    Object.assign(textElement.style, {
        pointerEvents: 'none',
        color: '#1A7D36'
    });
    
    // Mostrar el texto "Servicios Especializados"
    setTimeout(() => {
        textElement.classList.add('visible');
        createParticles(container);
    }, 400);
}

/**
 * Crea partículas suaves alrededor del número 7
 */
function createParticles(container) {
    // Crear 8 partículas en posiciones distribuidas alrededor del 7
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'counter-particle';
        particle.style.pointerEvents = 'none'; // Evitar eventos del mouse
        
        // Colocar en el centro inicialmente
        particle.style.top = '40%';
        particle.style.left = '50%';
        
        // Ángulo distribuido en círculo
        const angle = (i / 8) * Math.PI * 2;
        const distance = 30 + Math.random() * 30;
        
        // Dirección de movimiento
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;
        
        // Establecer variables CSS para la animación
        particle.style.setProperty('--x', `${moveX}px`);
        particle.style.setProperty('--y', `${moveY}px`);
        
        // Tamaño aleatorio
        const size = 4 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Añadir animación
        particle.style.animation = `floatParticle ${1000 + Math.random() * 500}ms ${Math.random() * 300}ms forwards ease-out`;
        
        // Añadir al contenedor
        container.appendChild(particle);
        
        // Limpiar después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}
