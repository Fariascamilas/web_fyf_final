/**
 * Efectos visuales para la sección Hero
 * Añade animaciones interactivas al logo y círculo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos
    const heroCircle = document.querySelector('.hero__circle');
    const heroLogo = document.querySelector('.hero__logo');
    const heroSection = document.querySelector('.hero');
    
    if (!heroCircle || !heroLogo || !heroSection) return;
    
    // Efecto de brillo aleatorio
    function addGlowEffect() {
        // Crear elemento para el brillo
        const glowEffect = document.createElement('div');
        glowEffect.classList.add('glow-effect');
        
        // Establecer estilos
        glowEffect.style.position = 'absolute';
        glowEffect.style.width = '10px';
        glowEffect.style.height = '10px';
        glowEffect.style.background = 'rgba(255, 255, 255, 0.8)';
        glowEffect.style.borderRadius = '50%';
        glowEffect.style.filter = 'blur(5px)';
        glowEffect.style.pointerEvents = 'none';
        
        // Posición aleatoria dentro del círculo
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (heroCircle.offsetWidth / 2) * 0.8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        glowEffect.style.left = `calc(50% + ${x}px)`;
        glowEffect.style.top = `calc(50% + ${y}px)`;
        
        // Añadir al círculo
        heroCircle.appendChild(glowEffect);
        
        // Animación de desvanecimiento
        setTimeout(() => {
            glowEffect.style.transition = 'all 1s ease';
            glowEffect.style.opacity = '0';
            glowEffect.style.transform = 'scale(2)';
            
            // Eliminar después de la animación
            setTimeout(() => {
                heroCircle.removeChild(glowEffect);
            }, 1000);
        }, 50);
    }
    
    // Crear destellos periódicamente
    setInterval(addGlowEffect, 300);
    
    // Efecto de movimiento 3D en hover
    heroCircle.addEventListener('mousemove', function(e) {
        // Obtener posición relativa del ratón
        const rect = heroCircle.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Calcular ángulo de rotación (limitado a 10 grados)
        const rotateX = -y * 0.1;
        const rotateY = x * 0.1;
        
        // Aplicar transformación
        heroCircle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        heroLogo.style.transform = `rotate(-10deg) translateZ(20px)`;
    });
    
    // Restaurar al salir
    heroCircle.addEventListener('mouseleave', function() {
        heroCircle.style.transform = '';
        heroLogo.style.transform = 'rotate(-10deg)';
        
        // Volver a la animación original
        void heroCircle.offsetWidth; // Forzar reflow
        heroCircle.style.animation = 'pulseCircle 3s infinite alternate';
    });
    
    // Detener animación en hover
    heroCircle.addEventListener('mouseenter', function() {
        heroCircle.style.animation = 'none';
    });
    
    // Efecto de scroll parallax
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            const offset = scrollPosition * 0.15;
            heroCircle.style.transform = `translateY(${offset}px)`;
        }
    });
    
    // Efecto de clic
    heroCircle.addEventListener('click', function() {
        heroCircle.classList.add('clicked');
        heroCircle.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            heroCircle.classList.remove('clicked');
            heroCircle.style.transform = '';
        }, 200);
    });
});

/**
 * Efectos avanzados para la sección Hero
 */
document.addEventListener('DOMContentLoaded', function() {
    initHeroEffects();
});

function initHeroEffects() {
    const heroContent = document.querySelector('.hero__content');
    const heroTitle = document.querySelector('.hero__title');
    const heroText = document.querySelector('.hero__text');
    
    if (!heroContent || !heroTitle || !heroText) return;
    
    // Efecto parallax más sutil y profesional
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Aplicar un movimiento más suave y limitado
        window.requestAnimationFrame(() => {
            // Movimiento sutil del contenido - solo traslación horizontal
            heroContent.style.transform = `translateY(-50%) translateX(${mouseX * -8}px)`;
            
            // Efecto de profundidad más sutil para el título
            heroTitle.style.transform = `translateX(${mouseX * -12}px)`;
            
            // Movimiento ligero para el texto con retraso respecto al título
            heroText.style.transform = `translateX(${mouseX * -5}px)`;
        });
    });
    
    // Efecto de escritura más profesional para el título
    if (heroTitle.textContent.includes('Aliado Estratégico')) {
        const originalText = heroTitle.textContent;
        const emoji = originalText.includes('🚀') ? '🚀' : '';
        const textWithoutEmoji = emoji ? originalText.replace('🚀', '') : originalText;
        
        heroTitle.innerHTML = '<span class="typing-text"></span>' + (emoji ? `<span class="emoji">${emoji}</span>` : '');
        const typingElement = heroTitle.querySelector('.typing-text');
        
        let i = 0;
        const typeSpeed = 60; // velocidad más profesional
        
        function typeWriter() {
            if (i < textWithoutEmoji.length) {
                typingElement.textContent += textWithoutEmoji.charAt(i);
                i++;
                setTimeout(typeWriter, Math.random() * 30 + typeSpeed);
            } else {
                // Revelar el texto con animación suave
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
                
                // Añadir animación de cursor
                const cursor = document.createElement('span');
                cursor.className = 'hero__cursor';
                cursor.innerHTML = '|';
                cursor.style.opacity = '1';
                cursor.style.animation = 'blink 1s infinite';
                cursor.style.marginLeft = '5px';
                heroTitle.appendChild(cursor);
                
                // Eliminarlo después de 5 segundos
                setTimeout(() => {
                    cursor.style.opacity = '0';
                    setTimeout(() => {
                        if (cursor.parentNode) {
                            cursor.parentNode.removeChild(cursor);
                        }
                    }, 500);
                }, 5000);
            }
        }
        
        // Añadir CSS para el cursor
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .emoji {
                display: inline-block;
                transform-origin: 70% 70%;
                animation: floatEmoji 3s ease-in-out infinite;
            }
            @keyframes floatEmoji {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
        
        // Iniciar animación con un retraso
        setTimeout(typeWriter, 800);
    }
    
    // Efecto de revelación en scroll
    function revealOnScroll() {
        const scrollTop = window.pageYOffset;
        const heroBottom = document.querySelector('.hero').getBoundingClientRect().bottom + scrollTop;
        
        if (scrollTop < heroBottom) {
            const progress = 1 - (scrollTop / heroBottom) * 2;
            if (progress > 0) {
                heroContent.style.opacity = progress;
                heroContent.style.transform = `translateY(calc(-50% + ${(1-progress) * 30}px))`;
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Efecto de subrayado dinámico
    heroTitle.addEventListener('mouseenter', function() {
        const bar = heroTitle.querySelector('::after');
        heroTitle.style.setProperty('--underline-width', '120px');
    });
    
    heroTitle.addEventListener('mouseleave', function() {
        heroTitle.style.setProperty('--underline-width', '80px');
    });
    
    // Iniciar las partículas si está disponible la función
    const heroImg = document.querySelector('.hero__img');
    if (heroImg && typeof createParticles === 'function') {
        createParticles(heroImg, true); // Con true para crear menos partículas, más minimalista
    }
}

// Modificar la función createParticles para que sea más minimalista
function createParticles(container, minimal = false) {
    // Crear contenedor de partículas
    const particleContainer = document.createElement('div');
    particleContainer.className = 'hero__particles';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.zIndex = '2';
    particleContainer.style.pointerEvents = 'none';
    container.appendChild(particleContainer);
    
    // Crear menos partículas para estilo minimalista
    const particleCount = minimal ? 15 : 30;
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer, minimal);
    }
}

function createParticle(container, minimal = false) {
    const particle = document.createElement('div');
    // Partículas más pequeñas y sutiles para estilo minimalista
    const size = minimal ? Math.random() * 3 + 0.5 : Math.random() * 5 + 1;
    const duration = Math.random() * 20 + 15;
    const xStart = Math.random() * 100;
    const yStart = Math.random() * 100;
    const delay = Math.random() * 5;
    
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = minimal ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.top = `${yStart}%`;
    particle.style.left = `${xStart}%`;
    particle.style.animation = `float ${duration}s infinite ease-in-out`;
    particle.style.animationDelay = `-${delay}s`;
    particle.style.opacity = minimal ? Math.random() * 0.15 + 0.05 : Math.random() * 0.3 + 0.1;
    
    if (!minimal) {
        particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    }
    
    // Añadir estilos para la animación
    if (!document.querySelector('style[data-particles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-particles', 'true');
        style.innerHTML = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                }
                50% {
                    transform: translateY(-${minimal ? 20 : 40}px) translateX(${minimal ? 10 : 20}px);
                    opacity: ${minimal ? 0.2 : 0.3};
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.appendChild(particle);
}
