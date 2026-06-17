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

    // 2.1 ESTADO DE LAS GALERÍAS
    let activeGallery = null; // 'visual-identity', 'plaza-mayor', o null
    
    // GALERÍA: IDENTIDAD VISUAL
    let currentMotifIndex = 0;
    const motifs = [
        'assets/id_vis/motivo_1.png',
        'assets/id_vis/motivo_2.png',
        'assets/id_vis/motivo_3.png',
        'assets/id_vis/motivo_4.png'
    ];

    // SELECTORES DE LA GALERÍA IDENTIDAD VISUAL
    const galleryModal = document.getElementById('gallery-modal');
    const btnOpenGallery = document.getElementById('btn-open-gallery');
    const btnCloseGallery = document.getElementById('modal-close');
    const galleryMainImg = document.getElementById('gallery-main-img');
    const btnPrevMotif = document.getElementById('gallery-prev');
    const btnNextMotif = document.getElementById('gallery-next');
    const thumbButtons = document.querySelectorAll('#gallery-thumbnails .thumb-btn');

    // GALERÍA: PLAZA MAYOR
    let currentPlazaIndex = 0;
    const plazaItems = [
        'assets/plaza_mayor/item_1.png',
        'assets/plaza_mayor/item_2.png',
        'assets/plaza_mayor/item_3.png',
        'assets/plaza_mayor/item_4.png'
    ];

    // SELECTORES DE LA GALERÍA PLAZA MAYOR
    const plazaModal = document.getElementById('plaza-modal');
    const btnOpenPlaza = document.getElementById('btn-plaza-mayor');
    const btnClosePlaza = document.getElementById('plaza-close');
    const plazaMainImg = document.getElementById('plaza-main-img');
    const btnPrevPlaza = document.getElementById('plaza-prev');
    const btnNextPlaza = document.getElementById('plaza-next');
    const plazaThumbButtons = document.querySelectorAll('#plaza-thumbnails .thumb-btn');

    // GALERÍA: FORO DE LOS BALBOS
    let currentForoIndex = 0;
    const foroItems = [
        'assets/foro_balbos/item_1.png',
        'assets/foro_balbos/item_2.png',
        'assets/foro_balbos/item_3.png',
        'assets/foro_balbos/item_4.png'
    ];

    // SELECTORES DE LA GALERÍA FORO DE LOS BALBOS
    const foroModal = document.getElementById('foro-modal');
    const btnOpenForo = document.getElementById('btn-foro-balbos');
    const btnCloseForo = document.getElementById('foro-close');
    const foroMainImg = document.getElementById('foro-main-img');
    const btnPrevForo = document.getElementById('foro-prev');
    const btnNextForo = document.getElementById('foro-next');
    const foroThumbButtons = document.querySelectorAll('#foro-thumbnails .thumb-btn');

    // GALERÍA: PLAZA DE LAS VELETAS
    let currentVeletasIndex = 0;
    const veletasItems = [
        'assets/plaza_veletas/item_1.png',
        'assets/plaza_veletas/item_2.png',
        'assets/plaza_veletas/item_3.png',
        'assets/plaza_veletas/item_4.png'
    ];

    // SELECTORES DE LA GALERÍA PLAZA DE LAS VELETAS
    const veletasModal = document.getElementById('veletas-modal');
    const btnOpenVeletas = document.getElementById('btn-plaza-veletas');
    const btnCloseVeletas = document.getElementById('veletas-close');
    const veletasMainImg = document.getElementById('veletas-main-img');
    const btnPrevVeletas = document.getElementById('veletas-prev');
    const btnNextVeletas = document.getElementById('veletas-next');
    const veletasThumbButtons = document.querySelectorAll('#veletas-thumbnails .thumb-btn');

    // GALERÍA: COMUNICACIÓN AUDIOVISUAL
    let currentCommIndex = 0;
    const commItems = [
        'assets/comm/item_1.png',
        'assets/comm/item_2.png',
        'assets/comm/item_3.png',
        'assets/comm/item_4.png',
        'assets/comm/item_5.png'
    ];

    // SELECTORES DE LA GALERÍA COMUNICACIÓN AUDIOVISUAL
    const commModal = document.getElementById('comm-modal');
    const btnOpenComm = document.getElementById('btn-comm-audiovisual');
    const btnCloseComm = document.getElementById('comm-close');
    const commMainImg = document.getElementById('comm-main-img');
    const btnPrevComm = document.getElementById('comm-prev');
    const btnNextComm = document.getElementById('comm-next');
    const commThumbButtons = document.querySelectorAll('#comm-thumbnails .thumb-btn');

    // GALERÍA: PROPUESTA GRÁFICA
    let currentPropuestaIndex = 0;
    const propuestaItems = [
        'assets/propuesta/cereza.jpg',
        'assets/propuesta/escaleras.jpg',
        'assets/propuesta/gorros.jpg',
        'assets/propuesta/jarram.jpg',
        'assets/propuesta/robot.jpg'
    ];

    // SELECTORES DE LA GALERÍA PROPUESTA GRÁFICA
    const propuestaModal = document.getElementById('propuesta-modal');
    const btnOpenPropuesta = document.getElementById('btn-propuesta-grafica');
    const btnClosePropuesta = document.getElementById('propuesta-close');
    const propuestaMainImg = document.getElementById('propuesta-main-img');
    const btnPrevPropuesta = document.getElementById('propuesta-prev');
    const btnNextPropuesta = document.getElementById('propuesta-next');
    const propuestaThumbButtons = document.querySelectorAll('#propuesta-thumbnails .thumb-btn');

    // GALERÍA: DESFILE JATO 2026
    let currentDesfileIndex = 0;
    const desfileItems = [
        'assets/desfile/item_1.jpg',
        'assets/desfile/item_2.jpg',
        'assets/desfile/item_3.jpg',
        'assets/desfile/item_4.jpg',
        'assets/desfile/item_5.jpg',
        'assets/desfile/item_6.jpg',
        'assets/desfile/item_7.jpg',
        'assets/desfile/item_8.jpg',
        'assets/desfile/item_9.jpg',
        'assets/desfile/item_10.jpg'
    ];

    // SELECTORES DE LA GALERÍA DESFILE JATO 2026
    const desfileModal = document.getElementById('desfile-modal');
    const btnOpenDesfile = document.getElementById('btn-desfile');
    const btnCloseDesfile = document.getElementById('desfile-close');
    const desfileMainImg = document.getElementById('desfile-main-img');
    const btnPrevDesfile = document.getElementById('desfile-prev');
    const btnNextDesfile = document.getElementById('desfile-next');
    const desfileThumbButtons = document.querySelectorAll('#desfile-thumbnails .thumb-btn');

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

    // 6. EVENT LISTENERS: TECLADO (ACCESIBILIDAD Y GALERÍA)
    window.addEventListener('keydown', (e) => {
        // Si hay una galería abierta, interceptar teclado
        if (activeGallery) {
            if (e.key === 'ArrowRight') {
                if (activeGallery === 'visual-identity') {
                    showMotif(currentMotifIndex + 1);
                } else if (activeGallery === 'plaza-mayor') {
                    showPlazaItem(currentPlazaIndex + 1);
                } else if (activeGallery === 'foro-balbos') {
                    showForoItem(currentForoIndex + 1);
                } else if (activeGallery === 'plaza-veletas') {
                    showVeletasItem(currentVeletasIndex + 1);
                } else if (activeGallery === 'comm-audiovisual') {
                    showCommItem(currentCommIndex + 1);
                } else if (activeGallery === 'propuesta-grafica') {
                    showPropuestaItem(currentPropuestaIndex + 1);
                } else if (activeGallery === 'desfile') {
                    showDesfileItem(currentDesfileIndex + 1);
                }
            } else if (e.key === 'ArrowLeft') {
                if (activeGallery === 'visual-identity') {
                    showMotif(currentMotifIndex - 1);
                } else if (activeGallery === 'plaza-mayor') {
                    showPlazaItem(currentPlazaIndex - 1);
                } else if (activeGallery === 'foro-balbos') {
                    showForoItem(currentForoIndex - 1);
                } else if (activeGallery === 'plaza-veletas') {
                    showVeletasItem(currentVeletasIndex - 1);
                } else if (activeGallery === 'comm-audiovisual') {
                    showCommItem(currentCommIndex - 1);
                } else if (activeGallery === 'propuesta-grafica') {
                    showPropuestaItem(currentPropuestaIndex - 1);
                } else if (activeGallery === 'desfile') {
                    showDesfileItem(currentDesfileIndex - 1);
                }
            } else if (e.key === 'Escape') {
                if (activeGallery === 'visual-identity') {
                    closeGallery();
                } else if (activeGallery === 'plaza-mayor') {
                    closePlaza();
                } else if (activeGallery === 'foro-balbos') {
                    closeForo();
                } else if (activeGallery === 'plaza-veletas') {
                    closeVeletas();
                } else if (activeGallery === 'comm-audiovisual') {
                    closeComm();
                } else if (activeGallery === 'propuesta-grafica') {
                    closePropuesta();
                } else if (activeGallery === 'desfile') {
                    closeDesfile();
                }
            }
            return; // Bloquea la navegación de diapositivas de fondo
        }

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
        if (activeGallery) return;
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
        if (activeGallery) return;
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

    // FUNCIONES DE LA GALERÍA: IDENTIDAD VISUAL
    function openGallery() {
        if (!galleryModal) return;
        galleryModal.classList.add('active');
        galleryModal.setAttribute('aria-hidden', 'false');
        activeGallery = 'visual-identity';
        showMotif(0);
    }

    function closeGallery() {
        if (!galleryModal) return;
        galleryModal.classList.remove('active');
        galleryModal.setAttribute('aria-hidden', 'true');
        activeGallery = null;
    }

    function showMotif(index) {
        if (!galleryMainImg) return;
        
        // Enlazar índice circularmente
        if (index < 0) index = motifs.length - 1;
        if (index >= motifs.length) index = 0;
        
        currentMotifIndex = index;
        const motifSrc = motifs[currentMotifIndex];
        
        // Efecto visual de transición
        galleryMainImg.classList.add('changing');
        
        setTimeout(() => {
            galleryMainImg.src = motifSrc;
            galleryMainImg.alt = `Motivo de Identidad Visual ${currentMotifIndex + 1}`;
            galleryMainImg.classList.remove('changing');
        }, 150);

        // Actualizar miniaturas
        thumbButtons.forEach((btn, idx) => {
            if (idx === currentMotifIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // EVENT LISTENERS DE LA GALERÍA
    if (btnOpenGallery) {
        btnOpenGallery.addEventListener('click', openGallery);
    }

    if (btnCloseGallery) {
        btnCloseGallery.addEventListener('click', closeGallery);
    }

    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeGallery();
            }
        });
    }

    if (btnPrevMotif) {
        btnPrevMotif.addEventListener('click', () => {
            showMotif(currentMotifIndex - 1);
        });
    }

    if (btnNextMotif) {
        btnNextMotif.addEventListener('click', () => {
            showMotif(currentMotifIndex + 1);
        });
    }

    thumbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            showMotif(index);
        });
    });

    // FUNCIONES DE LA GALERÍA: PLAZA MAYOR
    function openPlaza() {
        if (!plazaModal) return;
        plazaModal.classList.add('active');
        plazaModal.setAttribute('aria-hidden', 'false');
        activeGallery = 'plaza-mayor';
        showPlazaItem(0);
    }

    function closePlaza() {
        if (!plazaModal) return;
        plazaModal.classList.remove('active');
        plazaModal.setAttribute('aria-hidden', 'true');
        activeGallery = null;
    }

    function showPlazaItem(index) {
        if (!plazaMainImg) return;
        
        // Enlazar índice circularmente
        if (index < 0) index = plazaItems.length - 1;
        if (index >= plazaItems.length) index = 0;
        
        currentPlazaIndex = index;
        const itemSrc = plazaItems[currentPlazaIndex];
        
        // Efecto visual de transición
        plazaMainImg.classList.add('changing');
        
        setTimeout(() => {
            plazaMainImg.src = itemSrc;
            plazaMainImg.alt = `Plaza Mayor Item ${currentPlazaIndex + 1}`;
            plazaMainImg.classList.remove('changing');
        }, 150);

        // Actualizar miniaturas
        plazaThumbButtons.forEach((btn, idx) => {
            if (idx === currentPlazaIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // EVENT LISTENERS DE LA GALERÍA: PLAZA MAYOR
    if (btnOpenPlaza) {
        btnOpenPlaza.addEventListener('click', openPlaza);
    }

    if (btnClosePlaza) {
        btnClosePlaza.addEventListener('click', closePlaza);
    }

    if (plazaModal) {
        plazaModal.addEventListener('click', (e) => {
            if (e.target === plazaModal) {
                closePlaza();
            }
        });
    }

    if (btnPrevPlaza) {
        btnPrevPlaza.addEventListener('click', () => {
            showPlazaItem(currentPlazaIndex - 1);
        });
    }

    if (btnNextPlaza) {
        btnNextPlaza.addEventListener('click', () => {
            showPlazaItem(currentPlazaIndex + 1);
        });
    }

    plazaThumbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            showPlazaItem(index);
        });
    });

    // FUNCIONES DE LA GALERÍA: FORO DE LOS BALBOS
    function openForo() {
        if (!foroModal) return;
        foroModal.classList.add('active');
        foroModal.setAttribute('aria-hidden', 'false');
        activeGallery = 'foro-balbos';
        showForoItem(0);
    }

    function closeForo() {
        if (!foroModal) return;
        foroModal.classList.remove('active');
        foroModal.setAttribute('aria-hidden', 'true');
        activeGallery = null;
    }

    function showForoItem(index) {
        if (!foroMainImg) return;
        
        // Enlazar índice circularmente
        if (index < 0) index = foroItems.length - 1;
        if (index >= foroItems.length) index = 0;
        
        currentForoIndex = index;
        const itemSrc = foroItems[currentForoIndex];
        
        // Efecto visual de transición
        foroMainImg.classList.add('changing');
        
        setTimeout(() => {
            foroMainImg.src = itemSrc;
            foroMainImg.alt = `Foro de los Balbos Item ${currentForoIndex + 1}`;
            foroMainImg.classList.remove('changing');
        }, 150);

        // Actualizar miniaturas
        foroThumbButtons.forEach((btn, idx) => {
            if (idx === currentForoIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // EVENT LISTENERS DE LA GALERÍA: FORO DE LOS BALBOS
    if (btnOpenForo) {
        btnOpenForo.addEventListener('click', openForo);
    }

    if (btnCloseForo) {
        btnCloseForo.addEventListener('click', closeForo);
    }

    if (foroModal) {
        foroModal.addEventListener('click', (e) => {
            if (e.target === foroModal) {
                closeForo();
            }
        });
    }

    if (btnPrevForo) {
        btnPrevForo.addEventListener('click', () => {
            showForoItem(currentForoIndex - 1);
        });
    }

    if (btnNextForo) {
        btnNextForo.addEventListener('click', () => {
            showForoItem(currentForoIndex + 1);
        });
    }

    foroThumbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            showForoItem(index);
        });
    });

    // FUNCIONES DE LA GALERÍA: PLAZA DE LAS VELETAS
    function openVeletas() {
        if (!veletasModal) return;
        veletasModal.classList.add('active');
        veletasModal.setAttribute('aria-hidden', 'false');
        activeGallery = 'plaza-veletas';
        showVeletasItem(0);
    }

    function closeVeletas() {
        if (!veletasModal) return;
        veletasModal.classList.remove('active');
        veletasModal.setAttribute('aria-hidden', 'true');
        activeGallery = null;
    }

    function showVeletasItem(index) {
        if (!veletasMainImg) return;
        
        // Enlazar índice circularmente
        if (index < 0) index = veletasItems.length - 1;
        if (index >= veletasItems.length) index = 0;
        
        currentVeletasIndex = index;
        const itemSrc = veletasItems[currentVeletasIndex];
        
        // Efecto visual de transición
        veletasMainImg.classList.add('changing');
        
        setTimeout(() => {
            veletasMainImg.src = itemSrc;
            veletasMainImg.alt = `Plaza de las Veletas Item ${currentVeletasIndex + 1}`;
            veletasMainImg.classList.remove('changing');
        }, 150);

        // Actualizar miniaturas
        veletasThumbButtons.forEach((btn, idx) => {
            if (idx === currentVeletasIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // EVENT LISTENERS DE LA GALERÍA: PLAZA DE LAS VELETAS
    if (btnOpenVeletas) {
        btnOpenVeletas.addEventListener('click', openVeletas);
    }

    if (btnCloseVeletas) {
        btnCloseVeletas.addEventListener('click', closeVeletas);
    }

    if (veletasModal) {
        veletasModal.addEventListener('click', (e) => {
            if (e.target === veletasModal) {
                closeVeletas();
            }
        });
    }

    if (btnPrevVeletas) {
        btnPrevVeletas.addEventListener('click', () => {
            showVeletasItem(currentVeletasIndex - 1);
        });
    }

    if (btnNextVeletas) {
        btnNextVeletas.addEventListener('click', () => {
            showVeletasItem(currentVeletasIndex + 1);
        });
    }

    veletasThumbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            showVeletasItem(index);
        });
    });

    // FUNCIONES DE LA GALERÍA: COMUNICACIÓN AUDIOVISUAL
    function openComm() {
        if (!commModal) return;
        commModal.classList.add('active');
        commModal.setAttribute('aria-hidden', 'false');
        activeGallery = 'comm-audiovisual';
        showCommItem(0);
    }

    function closeComm() {
        if (!commModal) return;
        commModal.classList.remove('active');
        commModal.setAttribute('aria-hidden', 'true');
        activeGallery = null;
    }

    function showCommItem(index) {
        if (!commMainImg) return;
        
        // Enlazar índice circularmente
        if (index < 0) index = commItems.length - 1;
        if (index >= commItems.length) index = 0;
        
        currentCommIndex = index;
        const itemSrc = commItems[currentCommIndex];
        
        // Efecto visual de transición
        commMainImg.classList.add('changing');
        
        setTimeout(() => {
            commMainImg.src = itemSrc;
            commMainImg.alt = `Comunicación Audiovisual Item ${currentCommIndex + 1}`;
            commMainImg.classList.remove('changing');
        }, 150);

        // Actualizar miniaturas
        commThumbButtons.forEach((btn, idx) => {
            if (idx === currentCommIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // EVENT LISTENERS DE LA GALERÍA: COMUNICACIÓN AUDIOVISUAL
    if (btnOpenComm) {
        btnOpenComm.addEventListener('click', openComm);
    }

    if (btnCloseComm) {
        btnCloseComm.addEventListener('click', closeComm);
    }

    if (commModal) {
        commModal.addEventListener('click', (e) => {
            if (e.target === commModal) {
                closeComm();
            }
        });
    }

    if (btnPrevComm) {
        btnPrevComm.addEventListener('click', () => {
            showCommItem(currentCommIndex - 1);
        });
    }

    if (btnNextComm) {
        btnNextComm.addEventListener('click', () => {
            showCommItem(currentCommIndex + 1);
        });
    }

    commThumbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            showCommItem(index);
        });
    });

    // FUNCIONES DE LA GALERÍA: PROPUESTA GRÁFICA
    function openPropuesta() {
        if (!propuestaModal) return;
        propuestaModal.classList.add('active');
        propuestaModal.setAttribute('aria-hidden', 'false');
        activeGallery = 'propuesta-grafica';
        showPropuestaItem(0);
    }

    function closePropuesta() {
        if (!propuestaModal) return;
        propuestaModal.classList.remove('active');
        propuestaModal.setAttribute('aria-hidden', 'true');
        activeGallery = null;
    }

    function showPropuestaItem(index) {
        if (!propuestaMainImg) return;
        
        // Enlazar índice circularmente
        if (index < 0) index = propuestaItems.length - 1;
        if (index >= propuestaItems.length) index = 0;
        
        currentPropuestaIndex = index;
        const itemSrc = propuestaItems[currentPropuestaIndex];
        
        // Efecto visual de transición
        propuestaMainImg.classList.add('changing');
        
        setTimeout(() => {
            propuestaMainImg.src = itemSrc;
            propuestaMainImg.alt = `Propuesta Gráfica Item ${currentPropuestaIndex + 1}`;
            propuestaMainImg.classList.remove('changing');
        }, 150);

        // Actualizar miniaturas
        propuestaThumbButtons.forEach((btn, idx) => {
            if (idx === currentPropuestaIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // EVENT LISTENERS DE LA GALERÍA: PROPUESTA GRÁFICA
    if (btnOpenPropuesta) {
        btnOpenPropuesta.addEventListener('click', openPropuesta);
    }

    if (btnClosePropuesta) {
        btnClosePropuesta.addEventListener('click', closePropuesta);
    }

    if (propuestaModal) {
        propuestaModal.addEventListener('click', (e) => {
            if (e.target === propuestaModal) {
                closePropuesta();
            }
        });
    }

    if (btnPrevPropuesta) {
        btnPrevPropuesta.addEventListener('click', () => {
            showPropuestaItem(currentPropuestaIndex - 1);
        });
    }

    if (btnNextPropuesta) {
        btnNextPropuesta.addEventListener('click', () => {
            showPropuestaItem(currentPropuestaIndex + 1);
        });
    }

    propuestaThumbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            showPropuestaItem(index);
        });
    });

    // FUNCIONES DE LA GALERÍA: DESFILE JATO 2026
    function openDesfile() {
        if (!desfileModal) return;
        desfileModal.classList.add('active');
        desfileModal.setAttribute('aria-hidden', 'false');
        activeGallery = 'desfile';
        showDesfileItem(0);
    }

    function closeDesfile() {
        if (!desfileModal) return;
        desfileModal.classList.remove('active');
        desfileModal.setAttribute('aria-hidden', 'true');
        activeGallery = null;
    }

    function showDesfileItem(index) {
        if (!desfileMainImg) return;
        
        // Enlazar índice circularmente
        if (index < 0) index = desfileItems.length - 1;
        if (index >= desfileItems.length) index = 0;
        
        currentDesfileIndex = index;
        const itemSrc = desfileItems[currentDesfileIndex];
        
        // Efecto visual de transición
        desfileMainImg.classList.add('changing');
        
        setTimeout(() => {
            desfileMainImg.src = itemSrc;
            desfileMainImg.alt = `Desfile Item ${currentDesfileIndex + 1}`;
            desfileMainImg.classList.remove('changing');
        }, 150);

        // Actualizar miniaturas
        desfileThumbButtons.forEach((btn, idx) => {
            if (idx === currentDesfileIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // EVENT LISTENERS DE LA GALERÍA: DESFILE JATO 2026
    if (btnOpenDesfile) {
        btnOpenDesfile.addEventListener('click', openDesfile);
    }

    if (btnCloseDesfile) {
        btnCloseDesfile.addEventListener('click', closeDesfile);
    }

    if (desfileModal) {
        desfileModal.addEventListener('click', (e) => {
            if (e.target === desfileModal) {
                closeDesfile();
            }
        });
    }

    if (btnPrevDesfile) {
        btnPrevDesfile.addEventListener('click', () => {
            showDesfileItem(currentDesfileIndex - 1);
        });
    }

    if (btnNextDesfile) {
        btnNextDesfile.addEventListener('click', () => {
            showDesfileItem(currentDesfileIndex + 1);
        });
    }

    desfileThumbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            showDesfileItem(index);
        });
    });

    // Inicializar el estado inicial
    goToSlide(0);
});
