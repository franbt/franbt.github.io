document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORES DE ELEMENTOS
    const sliderWrapper = document.getElementById('slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const slideIndicator = document.getElementById('slide-indicator');
    const currentNumSpan = slideIndicator ? slideIndicator.querySelector('.current-slide-num') : null;
    const totalNumSpan = slideIndicator ? slideIndicator.querySelector('.total-slides-num') : null;
    const progressBarFill = document.getElementById('progress-bar-fill');
    const navButtons = document.querySelectorAll('.nav-link');
    const nextSlideCoverBtn = document.querySelector('.btn-next-slide');

    // 2. CONFIGURACIÓN DEL ESTADO
    let currentSlide = 0;
    const totalSlides = slides.length; // 6 slides (0 a 5)
    let isTransitioning = false;
    const transitionDuration = 800; // ms (coincide con el CSS)

    // Inicializar indicador del total
    if (totalNumSpan) {
        totalNumSpan.textContent = String(totalSlides - 1).padStart(2, '0'); // Muestra 05
    }

    // 3. FUNCIÓN DE ACTUALIZACIÓN DEL CONTENEDOR (CAMBIO DE SLIDE)
    function goToSlide(index) {
        if (isTransitioning) return;
        if (index < 0 || index >= totalSlides) return;

        isTransitioning = true;
        currentSlide = index;

        // Desplazamiento horizontal
        sliderWrapper.style.transform = `translate3d(-${currentSlide * 100}vw, 0, 0)`;

        // Actualizar clases activas en los slides
        slides.forEach((slide, idx) => {
            if (idx === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Actualizar barra de progreso y números
        updateControls();

        // Bloquear transiciones rápidas consecutivas
        setTimeout(() => {
            isTransitioning = false;
        }, transitionDuration);
    }

    // 4. ACTUALIZACIÓN DE INTERFAZ Y CONTROLES
    function updateControls() {
        // Habilitar/Deshabilitar botones de navegación inferior
        if (prevBtn) prevBtn.disabled = (currentSlide === 0);
        if (nextBtn) nextBtn.disabled = (currentSlide === totalSlides - 1);

        // Actualizar números de indicador (00 para portada, 01-05 para categorías)
        if (currentNumSpan) {
            currentNumSpan.textContent = String(currentSlide).padStart(2, '0');
        }

        // Actualizar barra de progreso (de 0% en portada a 100% en el último slide)
        if (progressBarFill) {
            const progressPercentage = (currentSlide / (totalSlides - 1)) * 100;
            progressBarFill.style.width = `${progressPercentage}%`;

            // Actualizar color dinámico de la barra de progreso basándonos en el acento activo
            const activeSlide = slides[currentSlide];
            const accentColor = getComputedStyle(activeSlide).getPropertyValue('--slide-accent');
            progressBarFill.style.background = accentColor;
        }

        // Actualizar botones de navegación en la cabecera
        navButtons.forEach(btn => {
            const targetSlide = parseInt(btn.getAttribute('data-slide'), 10);
            if (targetSlide === currentSlide) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 5. EVENT LISTENERS: CONTROLES DIRECTOS
    // Botones de navegación inferior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }

    // Enlaces de la cabecera
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSlide = parseInt(btn.getAttribute('data-slide'), 10);
            goToSlide(targetSlide);
        });
    });

    // Botón de la portada ("Iniciar Recorrido")
    if (nextSlideCoverBtn) {
        nextSlideCoverBtn.addEventListener('click', () => {
            goToSlide(1);
        });
    }

    // 6. EVENT LISTENERS: TECLADO (ACCESIBILIDAD)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'Home') {
            goToSlide(0);
        } else if (e.key === 'End') {
            goToSlide(totalSlides - 1);
        }
    });

    // 7. EVENT LISTENERS: RUEDA DEL MOUSE (SCROLL INTEGRADO CON DEBOUNCE)
    let lastWheelTime = 0;
    const wheelCooldown = 1200; // Cooldown largo para evitar saltos accidentales

    window.addEventListener('wheel', (e) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastWheelTime < wheelCooldown) return;

        // Comprobar dirección del scroll
        if (e.deltaY > 30 || e.deltaX > 30) {
            goToSlide(currentSlide + 1);
            lastWheelTime = currentTime;
        } else if (e.deltaY < -30 || e.deltaX < -30) {
            goToSlide(currentSlide - 1);
            lastWheelTime = currentTime;
        }
    }, { passive: true });

    // 8. SOPORTE DE DESLIZAMIENTO EN DISPOSITIVOS MÓVILES (SWIPE)
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Mínima distancia en px para considerar swipe

    window.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance < 0) {
                // Swipe hacia la izquierda (siguiente)
                goToSlide(currentSlide + 1);
            } else {
                // Swipe hacia la derecha (anterior)
                goToSlide(currentSlide - 1);
            }
        }
    }

    // Inicializar el estado inicial
    goToSlide(0);
});
