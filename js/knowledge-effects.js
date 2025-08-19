/**
 * Efectos avanzados para la sección de Proyectos
 */

document.addEventListener('DOMContentLoaded', function() {
    initProjectsSection();
});

/**
 * Inicializa todas las funcionalidades de la sección de proyectos
 */
function initProjectsSection() {
    // Actualizar estructura HTML
    updateProjectsHTML();
    
    // Inicializar observador para animaciones
    initProjectsObserver();
    
    // Inicializar lightbox
    initProjectLightbox();
    
    // Inicializar efecto de perspectiva sutil
    initPerspectiveEffect();
    
    // Inicializar filtros si existen
    initProjectFilters();
}

/**
 * Actualiza la estructura HTML para ajustarse al nuevo diseño
 */
function updateProjectsHTML() {
    const container = document.querySelector('.knowledge__container');
    if (!container) return;
    
    // Crear contenedor interior
    const innerContainer = document.createElement('div');
    innerContainer.className = 'knowledge__inner-container';
    
    // Mover el contenido existente al contenedor interior
    const textsSection = container.querySelector('.knowledge__texts');
    const pictureSection = container.querySelector('.knowledge__picture');
    
    if (textsSection && pictureSection) {
        container.innerHTML = '';
        innerContainer.appendChild(textsSection);
        innerContainer.appendChild(pictureSection);
        
        // Añadir categorías a cada proyecto
        const projects = pictureSection.querySelectorAll('.knowledge__item');
        const categories = ['Seguridad', 'Industrial', 'Consultoría', 'Ambiente', 'Corporativo', 'Capacitación'];
        
        projects.forEach((project, index) => {
            // Añadir categoría
            const category = document.createElement('div');
            category.className = 'knowledge__category';
            category.textContent = categories[index % categories.length];
            project.appendChild(category);
            
            // Añadir indicador de "Ver Más"
            const viewIndicator = document.createElement('div');
            viewIndicator.className = 'knowledge__view-indicator';
            project.appendChild(viewIndicator);
            
            // Asegurar que la caption está visible
            const caption = project.querySelector('.knowledge__caption');
            if (caption) {
                caption.style.opacity = '0';
            }
        });
        
        // Añadir botón "Ver todos los proyectos"
        const viewAllDiv = document.createElement('div');
        viewAllDiv.className = 'knowledge__view-all';
        
        const viewAllBtn = document.createElement('button');
        viewAllBtn.className = 'knowledge__btn';
        viewAllBtn.textContent = 'Ver todos los proyectos';
        viewAllBtn.addEventListener('click', function() {
            // Implementar funcionalidad para ver todos los proyectos
            // Por ahora solo mostraremos un mensaje
            alert('Esta funcionalidad se implementará en una futura actualización');
        });
        
        viewAllDiv.appendChild(viewAllBtn);
        innerContainer.appendChild(viewAllDiv);
        
        container.appendChild(innerContainer);
    }
}

/**
 * Inicializa el observador de intersección para las animaciones
 */
function initProjectsObserver() {
    const projects = document.querySelectorAll('.knowledge__item');
    if (!projects.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Retrasar la aparición de cada elemento secuencialmente
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // 150ms de retraso entre cada elemento
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    projects.forEach(project => {
        observer.observe(project);
    });
}

/**
 * Inicializa el efecto de perspectiva sutil al pasar el cursor
 */
function initPerspectiveEffect() {
    const projects = document.querySelectorAll('.knowledge__item');
    if (!projects.length) return;
    
    projects.forEach(project => {
        project.addEventListener('mousemove', function(e) {
            // Solo aplicar si la pantalla es lo suficientemente grande
            if (window.innerWidth < 992) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posición X del cursor dentro del elemento
            const y = e.clientY - rect.top; // Posición Y del cursor dentro del elemento
            
            // Calcular la rotación basada en la posición del cursor
            // Valores pequeños para mantener el efecto sutil
            const rotateY = ((x / rect.width) - 0.5) * 5; // -2.5 a 2.5 grados
            const rotateX = ((y / rect.height) - 0.5) * -5; // -2.5 a 2.5 grados
            
            // Aplicar la transformación
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        // Restablecer al salir
        project.addEventListener('mouseleave', function() {
            this.style.transform = '';
            // Asegurarse de que se mantiene visible si ya se ha revelado
            if (this.classList.contains('visible')) {
                this.style.transform = 'translateY(0)';
                this.style.opacity = '1';
            }
        });
    });
}

/**
 * Inicializa el lightbox para ver los proyectos en detalle
 */
function initProjectLightbox() {
    const projects = document.querySelectorAll('.knowledge__item');
    if (!projects.length) return;
    
    // Crear el lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'project-lightbox';
    lightbox.innerHTML = `
        <div class="project-lightbox__content">
            <div class="project-lightbox__header">
                <h3 class="project-lightbox__title">Título del Proyecto</h3>
                <button class="project-lightbox__close">&times;</button>
            </div>
            <div class="project-lightbox__image-container">
                <img class="project-lightbox__image" src="" alt="Imagen del proyecto">
                <div class="project-lightbox__controls">
                    <div class="project-lightbox__nav project-lightbox__nav--prev">&#10094;</div>
                    <div class="project-lightbox__nav project-lightbox__nav--next">&#10095;</div>
                </div>
                <div class="project-lightbox__dots"></div>
            </div>
            <div class="project-lightbox__details">
                <p class="project-lightbox__description">Descripción detallada del proyecto.</p>
                <div class="project-lightbox__meta">
                    <div class="project-lightbox__meta-item">
                        <span class="project-lightbox__meta-icon">&#128197;</span>
                        <span>Fecha: <strong>2023</strong></span>
                    </div>
                    <div class="project-lightbox__meta-item">
                        <span class="project-lightbox__meta-icon">&#127760;</span>
                        <span>Categoría: <strong>Industrial</strong></span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Variables para el control del lightbox
    let currentProjectIndex = 0;
    const projectsData = Array.from(projects).map((project, index) => {
        const imgSrc = project.querySelector('.knowledge__photo').style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
        const title = project.querySelector('.knowledge__caption').textContent;
        const category = project.querySelector('.knowledge__category')?.textContent || 'Proyecto';
        
        return {
            id: index,
            imgSrc,
            title,
            category,
            description: `Este proyecto de ${category.toLowerCase()} demuestra nuestro compromiso con la excelencia y la calidad en cada aspecto del trabajo realizado.`
        };
    });
    
    // Crear dots para navegación
    const dotsContainer = lightbox.querySelector('.project-lightbox__dots');
    projectsData.forEach((project, index) => {
        const dot = document.createElement('div');
        dot.className = 'project-lightbox__dot';
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    
    // Funciones para el lightbox
    function openLightbox(index) {
        currentProjectIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateLightboxContent() {
        const project = projectsData[currentProjectIndex];
        
        lightbox.querySelector('.project-lightbox__title').textContent = project.title;
        lightbox.querySelector('.project-lightbox__image').src = project.imgSrc;
        lightbox.querySelector('.project-lightbox__description').textContent = project.description;
        
        // Actualizar categoría
        const categorySpan = lightbox.querySelector('.project-lightbox__meta-item:nth-child(2) strong');
        if (categorySpan) {
            categorySpan.textContent = project.category;
        }
        
        // Actualizar dots
        lightbox.querySelectorAll('.project-lightbox__dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentProjectIndex);
        });
    }
    
    function prevProject() {
        currentProjectIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
        updateLightboxContent();
    }
    
    function nextProject() {
        currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
        updateLightboxContent();
    }
    
    // Eventos del lightbox
    lightbox.querySelector('.project-lightbox__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.project-lightbox__nav--prev').addEventListener('click', prevProject);
    lightbox.querySelector('.project-lightbox__nav--next').addEventListener('click', nextProject);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navegación por dots
    lightbox.querySelectorAll('.project-lightbox__dot').forEach(dot => {
        dot.addEventListener('click', function() {
            currentProjectIndex = parseInt(this.dataset.index);
            updateLightboxContent();
        });
    });
    
    // Abrir lightbox al hacer clic en un proyecto
    projects.forEach((project, index) => {
        project.addEventListener('click', () => openLightbox(index));
    });
    
    // Teclas de navegación
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevProject();
        } else if (e.key === 'ArrowRight') {
            nextProject();
        }
    });
}

/**
 * Inicializa filtros de proyectos (versión básica)
 */
function initProjectFilters() {
    // Esta funcionalidad se implementará en una futura actualización
    // Por ahora dejamos el código preparado
    
    const container = document.querySelector('.knowledge__texts');
    if (!container) return;
    
    // En una versión futura, aquí se agregarán filtros interactivos
}

/**
 * Aplica efecto parallax sutil a los elementos cuando se hace scroll
 */
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        document.querySelectorAll('.knowledge__item').forEach((item, index) => {
            // Solo aplicar si es visible
            if (item.classList.contains('visible')) {
                const speed = 0.05;
                const yPos = -(scrolled * speed * (index % 3 + 1) * 0.1);
                item.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}
