/**
 * Efectos avanzados para modales
 */

document.addEventListener('DOMContentLoaded', function() {
    initEnhancedModals();
});

function initEnhancedModals() {
    const cards = document.querySelectorAll('.about__card');
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('main');
    
    if (!cards.length) return;
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // No abrir el modal si se hace clic en el botón "+"
            if (e.target.closest('.about__more')) return;
            
            const modal = this.querySelector('.modal-overlay');
            if (!modal) return;
            
            // Mostrar el modal con animación
            openModal(modal, card, header, mainContent);
        });
    });
    
    // Cerrar modales con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-overlay[style*="display: flex"]');
            if (openModal) {
                const parentCard = findParentCard(openModal);
                closeModal(openModal, parentCard, header, mainContent);
            }
        }
    });
    
    // Aplicar efectos de texto a los títulos
    applyTextEffects();
}

function openModal(modal, card, header, mainContent) {
    // Preparar el modal antes de añadirlo al body
    modal.parentElement.removeChild(modal);
    document.body.appendChild(modal);
    
    // Añadir clase de carga
    modal.classList.add('modal-loading');
    
    // Ocultar header con animación
    if (header) {
        header.classList.add('header--hidden');
    }
    
    // Aplicar desenfoque al contenido principal
    if (mainContent) {
        mainContent.classList.add('modal-blur');
    }
    
    // Prevenir scroll del body
    document.body.classList.add('modal-open');
    
    // Mostrar modal con animación
    setTimeout(() => {
        modal.style.display = 'flex';
        modal.classList.add('active');
        modal.classList.remove('modal-loading');
        
        // Añadir efecto de entrada a los bloques
        animateBlocks(modal);
        
        // Aplicar efectos visuales adicionales
        enhanceVisualElements(modal);
    }, 100);
    
    // Añadir oyentes de eventos para cerrar
    setupModalClosing(modal, card, header, mainContent);
}

function closeModal(modal, card, header, mainContent) {
    // Quitar clases de animación
    modal.classList.remove('active');
    
    // Animar salida
    setTimeout(() => {
        modal.style.display = 'none';
        
        // Devolver el modal a su lugar original
        if (card) {
            document.body.removeChild(modal);
            card.appendChild(modal);
        }
        
        // Restaurar scroll
        document.body.classList.remove('modal-open');
        
        // Mostrar header
        if (header) {
            header.classList.remove('header--hidden');
        }
        
        // Quitar desenfoque
        if (mainContent) {
            mainContent.classList.remove('modal-blur');
        }
    }, 300);
}

function findParentCard(modal) {
    // Buscar la tarjeta que originalmente contenía este modal
    const allCards = document.querySelectorAll('.about__card');
    const cardTitle = modal.querySelector('.modal__header-title').textContent.trim();
    
    for (let card of allCards) {
        const title = card.querySelector('.about__card-title').textContent.trim();
        if (title === cardTitle) {
            return card;
        }
    }
    return null;
}

function setupModalClosing(modal, card, header, mainContent) {
    // Configurar cierre al hacer clic en el overlay o botón de cierre
    const closeButton = modal.querySelector('.modal-close');
    const contactButton = modal.querySelector('.modal-contact');
    
    const closeHandler = function(e) {
        if (
            e.target === modal || 
            e.target === closeButton || 
            e.target.closest('.modal-close')
        ) {
            e.preventDefault();
            closeModal(modal, card, header, mainContent);
        }
    };
    
    modal.addEventListener('click', closeHandler);
    
    // Si hay botón de contacto, cerrar modal al hacer clic
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            setTimeout(() => {
                closeModal(modal, card, header, mainContent);
            }, 100);
        });
    }
}

function animateBlocks(modal) {
    // Animar los bloques de contenido con delay
    const blocks = modal.querySelectorAll('.modal-block');
    blocks.forEach((block, index) => {
        setTimeout(() => {
            block.style.opacity = '0';
            block.style.transform = 'translateY(20px)';
            block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100); // Delay escalonado
    });
}

// Añadir efecto parallax en scroll dentro del modal
document.addEventListener('scroll', function(e) {
    const openModal = document.querySelector('.modal-overlay[style*="display: flex"]');
    if (!openModal) return;
    
    const modalMain = openModal.querySelector('.modal-main');
    if (!modalMain) return;
    
    const scrollTop = modalMain.scrollTop;
    const blocks = modalMain.querySelectorAll('.modal-block');
    
    blocks.forEach((block, index) => {
        const speed = 0.05 + (index % 3) * 0.01; // Diferentes velocidades
        const yPos = -scrollTop * speed;
        block.style.transform = `translateY(${yPos}px)`;
    });
}, { passive: true });

function applyTextEffects() {
    // Añadir efecto de brillo al texto del título del modal
    const modalTitles = document.querySelectorAll('.modal__header-title');
    
    modalTitles.forEach(title => {
        // Agregar efecto de sombra para mejorar legibilidad
        title.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)';
        
        // Agregar un efecto de transición suave
        title.style.transition = 'text-shadow 0.3s ease';
        
        // Añadir eventos para efectos interactivos
        title.addEventListener('mouseover', function() {
            this.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.4)';
        });
        
        title.addEventListener('mouseout', function() {
            this.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)';
        });
    });
}

function enhanceVisualElements(modal) {
    // Destacar visualmente el título del modal
    const headerTitle = modal.querySelector('.modal__header-title');
    if (headerTitle) {
        headerTitle.animate([
            { opacity: 0.7, transform: 'translateY(-5px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }
    
    // Añadir efecto de onda al header
    const header = modal.querySelector('.modal-header');
    if (header) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)';
        ripple.style.opacity = '0';
        
        header.style.position = 'relative';
        header.style.overflow = 'hidden';
        header.appendChild(ripple);
        
        ripple.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 0.5, transform: 'scale(1.5)' },
            { opacity: 0, transform: 'scale(2)' }
        ], {
            duration: 1200,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1200);
    }
}
