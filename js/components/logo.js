/**
 * F&F Consultores - Componente de Logo
 * Maneja el comportamiento del logo flotante
 */

window.FFComponents.Logo = (function() {
    function initFloating() {
        const hero = document.querySelector('.hero__content');
        const floatingCircle = document.getElementById('floatingCircle');
        const securityBlock = document.querySelector('.security');
        const headerLogo = document.querySelector('.header__circle');
        const header = document.querySelector('.header__button-nav');
        
        if (!floatingCircle) return;

        // Crear y configurar observers para diferentes elementos
        setupObserver(hero, floatingCircle);
        setupObserver(header, floatingCircle);
        setupObserver(headerLogo, floatingCircle);
        setupSecurityObserver(securityBlock, floatingCircle);
        setupModalObservers(floatingCircle);
    }
    
    function setupObserver(element, floatingCircle) {
        if (!element || !floatingCircle) return;
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    floatingCircle.classList.add('active');
                } else {
                    floatingCircle.classList.remove('active');
                }
            });
        });
        
        observer.observe(element);
    }
    
    function setupSecurityObserver(securityBlock, floatingCircle) {
        if (!securityBlock || !floatingCircle) return;
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    floatingCircle.style.display = 'flex';
                    floatingCircle.style.opacity = window.FF.config?.opacityOverlay || 0.7;
                } else {
                    floatingCircle.style.opacity = '0';
                }
            });
        });
        
        observer.observe(securityBlock);
    }
    
    function setupModalObservers(floatingCircle) {
        const modalOverlayDisplays = document.querySelectorAll('.modal-overlay');
        const opacityOverlay = document.getElementById('opacityOverlay');
        
        modalOverlayDisplays.forEach(modalOverlayDisplay => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        floatingCircle.style.display = 'flex';
                        floatingCircle.style.opacity = opacityOverlay?.value || 0.7;
                    } else {
                        floatingCircle.style.opacity = '0.2';
                    }
                });
            });
            
            observer.observe(modalOverlayDisplay);
        });
    }
    
    return {
        initFloating
    };
})();
