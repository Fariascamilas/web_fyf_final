/**
 * Efectos para la sección About
 */

document.addEventListener('DOMContentLoaded', function() {
    // Animación mejorada para el título de servicios
    animateServiceTitle();
    
    // Animación del contador numérico para servicios
    initServiceCounter();
    
    // Eliminar los contadores de tarjetas que ya no son útiles
    removeCardCounters();
    
    // Nota: El contador de servicios ahora se gestiona en services-counter.js
});

function removeCardCounters() {
    // Ocultar o eliminar los contadores de tarjetas que ya no son útiles
    const oldCounters = document.querySelectorAll('.about__card-count');
    oldCounters.forEach(counter => {
        counter.style.display = 'none';
    });
}

function initServiceCounter() {
    const servicesCountContainer = document.querySelector('.about__services-count');
    
    if (!servicesCountContainer) return;
    
    // Limpiar el contenedor
    servicesCountContainer.innerHTML = '';
    
    // Crear el elemento para el número
    const numberElement = document.createElement('div');
    numberElement.className = 'services-number';
    numberElement.textContent = '0';
    
    // Crear el elemento para el texto
    const textElement = document.createElement('div');
    textElement.className = 'services-text';
    textElement.textContent = 'Servicios Especializados';
    
    // Agregar elementos al DOM
    servicesCountContainer.appendChild(numberElement);
    servicesCountContainer.appendChild(textElement);
    
    // Iniciar la secuencia del contador cuando el elemento esté visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounterSequence(numberElement, textElement);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(servicesCountContainer);
}

function startCounterSequence(numberElement, textElement) {
    let currentCount = 0;
    const targetCount = 7;
    const interval = 1000; // 1 segundo entre cada número
    
    // Iniciar la secuencia del contador
    const countInterval = setInterval(() => {
        currentCount++;
        
        // Actualizar el número
        numberElement.textContent = currentCount;
        
        // Agregar efecto de rebote sutil al cambiar números
        numberElement.style.transform = 'translate(-50%, -50%) scale(1.1)';
        setTimeout(() => {
            numberElement.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
        
        // Si llegamos al 7, completar la animación
        if (currentCount === targetCount) {
            clearInterval(countInterval);
            
            // Animar el número 7 moviéndolo hacia arriba y cambiando color
            numberElement.classList.add('final');
            
            // Mostrar el texto "Servicios Especializados"
            setTimeout(() => {
                textElement.classList.add('visible');
            }, 500);
        }
    }, interval);
}

function animateServiceTitle() {
    const titleContainer = document.querySelector('.about__title-container');
    const servicesCount = document.querySelector('.about__services-count');
    const mainTitle = document.querySelector('.about__title');
    const description = document.querySelector('.about__description-main');
    
    if (!servicesCount) return;
    
    // Observador de intersección para activar la animación cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clases para animar los elementos
                if (mainTitle) mainTitle.classList.add('animate-title');
                if (description) description.classList.add('animate-description');
                
                // Efecto de escritura progresiva del texto
                const textSpan = servicesCount.querySelector('span');
                if (textSpan) {
                    // Aseguramos que el texto sea "servicios especializados"
                    textSpan.textContent = "servicios especializados";
                    
                    // Añadir efecto de aparición con un poco de retraso
                    setTimeout(() => {
                        servicesCount.classList.add('highlight-number');
                        
                        // Añadir partículas profesionales
                        addParticleEffects(servicesCount);
                        
                        // Añadir efecto de escaneo
                        addScanEffect(servicesCount);
                    }, 800);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (titleContainer) observer.observe(titleContainer);
}

function addParticleEffects(element) {
    // Crear contenedor para partículas
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    element.appendChild(particleContainer);
    
    // Crear partículas profesionales
    for (let i = 0; i < 8; i++) {
        createParticle(particleContainer, i);
    }
    
    // Añadir destello central
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '50%';
    flash.style.left = '18px'; // Posición del número 7
    flash.style.transform = 'translateY(-50%)';
    flash.style.width = '26px';
    flash.style.height = '26px';
    flash.style.borderRadius = '50%';
    flash.style.background = 'radial-gradient(circle, rgba(26,125,54,0.6) 0%, rgba(255,255,255,0) 70%)';
    flash.style.animation = 'flashEffect 1s forwards';
    flash.style.zIndex = '2';
    
    element.appendChild(flash);
    
    // Añadir keyframe para la animación de destello
    if (!document.querySelector('#flashKeyframe')) {
        const style = document.createElement('style');
        style.id = 'flashKeyframe';
        style.innerHTML = `
            @keyframes flashEffect {
                0% { opacity: 0; transform: translateY(-50%) scale(0.5); }
                50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
                100% { opacity: 0; transform: translateY(-50%) scale(1.5); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Eliminar destello después de la animación
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 1000);
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    
    // Estilos profesionales para las partículas
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = '#1A7D36';
    particle.style.opacity = '0';
    
    // Posición inicial alrededor del número 7
    const angle = (index / 8) * Math.PI * 2;
    const x = 18 + Math.cos(angle) * 15; // 18px es la posición del número 7
    const y = 50 + Math.sin(angle) * 15; // 50% es el centro vertical
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}%`;
    
    // Animación profesional
    particle.style.animation = `particle${index} 1.5s forwards ease-out`;
    
    // Crear keyframes para cada partícula
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes particle${index} {
            0% { 
                opacity: 0;
                transform: scale(0.5);
            }
            20% { 
                opacity: 0.8;
                transform: scale(1);
            }
            100% { 
                opacity: 0;
                transform: translate(
                    ${Math.cos(angle) * 40}px, 
                    ${Math.sin(angle) * 40}px
                ) scale(0.5);
            }
        }
    `;
    document.head.appendChild(style);
    
    container.appendChild(particle);
    
    // Eliminar partícula y estilo después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 1500);
}

function addScanEffect(element) {
    const scan = document.createElement('div');
    scan.className = 'scan-effect';
    scan.style.position = 'absolute';
    scan.style.top = '0';
    scan.style.left = '0';
    scan.style.width = '100%';
    scan.style.height = '2px';
    scan.style.background = 'linear-gradient(90deg, rgba(26,125,54,0), rgba(26,125,54,0.8), rgba(26,125,54,0))';
    scan.style.zIndex = '3';
    scan.style.opacity = '0';
    scan.style.animation = 'scanAnimation 1.5s 0.5s forwards';
    
    element.appendChild(scan);
    
    // Añadir keyframe para la animación de escaneo
    if (!document.querySelector('#scanKeyframe')) {
        const style = document.createElement('style');
        style.id = 'scanKeyframe';
        style.innerHTML = `
            @keyframes scanAnimation {
                0% { 
                    opacity: 0;
                    top: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% { 
                    opacity: 0;
                    top: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Eliminar efecto después de la animación
    setTimeout(() => {
        if (scan.parentNode) {
            scan.parentNode.removeChild(scan);
        }
    }, 2000);
}


function addParticleEffects(element) {
    // Crear contenedor para partículas
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    element.appendChild(particleContainer);
    
    // Crear partículas profesionales
    for (let i = 0; i < 8; i++) {
        createParticle(particleContainer, i);
    }
    
    // Añadir destello central
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '50%';
    flash.style.left = '18px'; // Posición del número 7
    flash.style.transform = 'translateY(-50%)';
    flash.style.width = '26px';
    flash.style.height = '26px';
    flash.style.borderRadius = '50%';
    flash.style.background = 'radial-gradient(circle, rgba(26,125,54,0.6) 0%, rgba(255,255,255,0) 70%)';
    flash.style.animation = 'flashEffect 1s forwards';
    flash.style.zIndex = '2';
    
    element.appendChild(flash);
    
    // Añadir keyframe para la animación de destello
    if (!document.querySelector('#flashKeyframe')) {
        const style = document.createElement('style');
        style.id = 'flashKeyframe';
        style.innerHTML = `
            @keyframes flashEffect {
                0% { opacity: 0; transform: translateY(-50%) scale(0.5); }
                50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
                100% { opacity: 0; transform: translateY(-50%) scale(1.5); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Eliminar destello después de la animación
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 1000);
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    
    // Estilos profesionales para las partículas
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = '#1A7D36';
    particle.style.opacity = '0';
    
    // Posición inicial alrededor del número 7
    const angle = (index / 8) * Math.PI * 2;
    const x = 18 + Math.cos(angle) * 15; // 18px es la posición del número 7
    const y = 50 + Math.sin(angle) * 15; // 50% es el centro vertical
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}%`;
    
    // Animación profesional
    particle.style.animation = `particle${index} 1.5s forwards ease-out`;
    
    // Crear keyframes para cada partícula
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes particle${index} {
            0% { 
                opacity: 0;
                transform: scale(0.5);
            }
            20% { 
                opacity: 0.8;
                transform: scale(1);
            }
            100% { 
                opacity: 0;
                transform: translate(
                    ${Math.cos(angle) * 40}px, 
                    ${Math.sin(angle) * 40}px
                ) scale(0.5);
            }
        }
    `;
    document.head.appendChild(style);
    
    container.appendChild(particle);
    
    // Eliminar partícula y estilo después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 1500);
}

function addScanEffect(element) {
    const scan = document.createElement('div');
    scan.className = 'scan-effect';
    scan.style.position = 'absolute';
    scan.style.top = '0';
    scan.style.left = '0';
    scan.style.width = '100%';
    scan.style.height = '2px';
    scan.style.background = 'linear-gradient(90deg, rgba(26,125,54,0), rgba(26,125,54,0.8), rgba(26,125,54,0))';
    scan.style.zIndex = '3';
    scan.style.opacity = '0';
    scan.style.animation = 'scanAnimation 1.5s 0.5s forwards';
    
    element.appendChild(scan);
    
    // Añadir keyframe para la animación de escaneo
    if (!document.querySelector('#scanKeyframe')) {
        const style = document.createElement('style');
        style.id = 'scanKeyframe';
        style.innerHTML = `
            @keyframes scanAnimation {
                0% { 
                    opacity: 0;
                    top: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% { 
                    opacity: 0;
                    top: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Eliminar efecto después de la animación
    setTimeout(() => {
        if (scan.parentNode) {
            scan.parentNode.removeChild(scan);
        }
    }, 2000);
}
