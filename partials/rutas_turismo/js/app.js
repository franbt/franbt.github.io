/**
 * RUTAS TURÍSTICAS & ESCÁCERES - LÓGICA PRINCIPAL (VANILLA JS)
 * Seguridad reforzada, gestión de temas, mapas vectoriales interactivos y audioguía.
 */

(function() {
  'use strict';

  // --- Almacenamiento seguro (evita excepciones en modo incógnito estricto) ---
  const storage = {
    get(key, fallback = null) {
      try {
        return localStorage.getItem(key) || fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(key, String(val));
      } catch (e) {}
    }
  };

  // --- Estado Global ---
  const state = {
    theme: storage.get('theme', (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'),
    currentView: 'catalog',
    activeRouteId: null,
    activeStopNum: 1,
    activeThemeFilter: 'all',
    activeDifficultyFilter: 'all',
    searchQuery: ''
  };

  // --- Inicialización ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSimulator();
    initFilters();
    initSearch();
    renderCatalog();
    handleUrlHash();
    window.addEventListener('hashchange', handleUrlHash);
  });

  // --- 1. Gestión de Tema Claro / Oscuro OLED ---
  function initTheme() {
    applyTheme(state.theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    storage.set('theme', theme);

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      const isDark = theme === 'dark';
      themeBtn.innerHTML = isDark 
        ? '<span class="icon">☀️</span><span class="theme-btn-text">Modo Claro</span>'
        : '<span class="icon">🌙</span><span class="theme-btn-text">Modo Oscuro</span>';
      themeBtn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro OLED');
      themeBtn.setAttribute('title', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro OLED');
    }
  }

  function toggleTheme() {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // --- 2. Simulador de Dispositivo (PC / Tablet / Móvil) ---
  function initSimulator() {
    const simBtns = document.querySelectorAll('.sim-btn');
    const wrapper = document.getElementById('main-content-wrapper');

    simBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        simBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.device;

        if (wrapper) {
          wrapper.classList.remove('sim-mobile', 'sim-tablet', 'sim-pc');
          if (mode === 'mobile') wrapper.classList.add('sim-mobile');
          if (mode === 'tablet') wrapper.classList.add('sim-tablet');
          if (mode === 'pc') wrapper.classList.add('sim-pc');
        }
      });
    });
  }

  // --- 3. Renderizado del Catálogo de Rutas ---
  function renderCatalog() {
    const grid = document.getElementById('routes-catalog-grid');
    if (!grid || typeof ROUTES_DATA === 'undefined') return;

    const filtered = ROUTES_DATA.filter(route => {
      if (state.activeThemeFilter !== 'all' && !route.tematica.toLowerCase().includes(state.activeThemeFilter.toLowerCase())) {
        return false;
      }
      if (state.activeDifficultyFilter !== 'all' && !route.dificultad.toLowerCase().includes(state.activeDifficultyFilter.toLowerCase())) {
        return false;
      }
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        const matchTitle = route.nombre.toLowerCase().includes(q);
        const matchSlogan = route.eslogan.toLowerCase().includes(q);
        const matchDesc = route.descripcion.toLowerCase().includes(q);
        const matchTheme = route.tematica.toLowerCase().includes(q);
        if (!matchTitle && !matchSlogan && !matchDesc && !matchTheme) {
          return false;
        }
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <p style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">No se encontraron rutas con los filtros seleccionados</p>
          <p style="color: var(--text-muted); margin-top: 0.5rem;">Prueba a cambiar los términos de búsqueda o limpiar los filtros.</p>
          <button id="btn-clear-filters" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary); color: #fff; border-radius: var(--radius-md); font-weight: 600;">Restablecer Filtros</button>
        </div>
      `;
      const clearBtn = document.getElementById('btn-clear-filters');
      if (clearBtn) clearBtn.addEventListener('click', resetFilters);
      return;
    }

    grid.innerHTML = filtered.map(route => `
      <article class="route-card" onclick="window.RutasApp.openRoute('${escapeHtml(route.id)}')" tabindex="0" role="button" aria-label="Ver ficha de ${escapeHtml(route.nombre)}">
        <div class="route-card-banner" style="background: ${escapeHtml(route.bg_gradient)};">
          <span class="route-card-theme-tag">${escapeHtml(route.tematica.split(',')[0])}</span>
        </div>
        <div class="route-card-body">
          <h3 class="route-card-title">${escapeHtml(route.nombre)}</h3>
          <p class="route-card-slogan">"${escapeHtml(route.eslogan)}"</p>
          
          <div class="route-card-metrics">
            <span class="metric-badge">⏱️ ${escapeHtml(route.duracion)}</span>
            <span class="metric-badge">📏 ${escapeHtml(route.distancia)}</span>
            <span class="metric-badge ${escapeHtml(route.dificultad_class)}">⚡ ${escapeHtml(route.dificultad)}</span>
            <span class="metric-badge">📍 ${parseInt(route.numero_paradas, 10)} paradas</span>
          </div>
        </div>
        <div class="route-card-footer">
          <span style="font-size: 0.75rem; color: var(--text-muted);">♿ ${escapeHtml(route.accesibilidad.split('-')[0])}</span>
          <span class="btn-open-route">Explorar Ficha ➔</span>
        </div>
      </article>
    `).join('');
  }

  // --- 4. Filtros y Búsqueda ---
  function initFilters() {
    const themePills = document.querySelectorAll('.theme-filter-pill');
    themePills.forEach(pill => {
      pill.addEventListener('click', () => {
        themePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeThemeFilter = pill.dataset.theme || 'all';
        renderCatalog();
      });
    });

    const diffPills = document.querySelectorAll('.diff-filter-pill');
    diffPills.forEach(pill => {
      pill.addEventListener('click', () => {
        diffPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeDifficultyFilter = pill.dataset.diff || 'all';
        renderCatalog();
      });
    });
  }

  function initSearch() {
    const searchInput = document.getElementById('search-routes-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim();
        renderCatalog();
      });
    }
  }

  function resetFilters() {
    state.activeThemeFilter = 'all';
    state.activeDifficultyFilter = 'all';
    state.searchQuery = '';
    const searchInput = document.getElementById('search-routes-input');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.filter-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.theme === 'all' || p.dataset.diff === 'all');
    });
    renderCatalog();
  }

  // --- 5. Apertura de Ficha y Renderizado Detallado ---
  function openRoute(routeId) {
    window.location.hash = `#${encodeURIComponent(routeId)}`;
  }

  function showRouteDetail(routeId) {
    if (typeof ROUTES_DATA === 'undefined') return;
    const route = ROUTES_DATA.find(r => r.id === routeId);
    if (!route) {
      showCatalog();
      return;
    }

    state.activeRouteId = route.id;
    state.activeStopNum = 1;
    state.currentView = 'route-detail';

    const catalogSection = document.getElementById('catalog-section');
    const detailContainer = document.getElementById('route-detail-container');

    if (catalogSection) catalogSection.style.display = 'none';
    if (detailContainer) {
      detailContainer.style.display = 'block';
      detailContainer.innerHTML = buildRouteDetailHtml(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function showCatalog() {
    state.currentView = 'catalog';
    state.activeRouteId = null;
    window.location.hash = '';

    const catalogSection = document.getElementById('catalog-section');
    const detailContainer = document.getElementById('route-detail-container');

    if (detailContainer) {
      detailContainer.style.display = 'none';
      detailContainer.innerHTML = '';
    }
    if (catalogSection) {
      catalogSection.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    stopAudio();
  }

  function handleUrlHash() {
    const rawHash = window.location.hash.replace(/^#/, '');
    const cleanId = decodeURIComponent(rawHash).trim();
    if (cleanId && cleanId.startsWith('ruta-')) {
      showRouteDetail(cleanId);
    } else {
      showCatalog();
    }
  }

  // --- 6. Generador de HTML de la Ficha Completa ---
  function buildRouteDetailHtml(route) {
    return `
      <div class="route-detail-view">
        <button class="btn-back-catalog" onclick="window.RutasApp.showCatalog()" aria-label="Volver al catálogo">
          ⬅ Volver al Catálogo de Rutas
        </button>

        <article class="route-sheet">
          <header class="sheet-hero">
            <div class="sheet-badge-group">
              <span class="sheet-category-tag">Ficha de Ruta Oficial</span>
              <span class="metric-badge ${escapeHtml(route.dificultad_class)}">⚡ Dificultad ${escapeHtml(route.dificultad)}</span>
            </div>
            <h1 class="sheet-title">${escapeHtml(route.nombre)}</h1>
            <p class="sheet-slogan">"${escapeHtml(route.eslogan)}"</p>
          </header>

          <div class="metrics-summary-grid">
            <div class="metric-item">
              <span class="metric-item-label">Temática</span>
              <span class="metric-item-value">🏛️ ${escapeHtml(route.tematica.split(',')[0])}</span>
            </div>
            <div class="metric-item">
              <span class="metric-item-label">Duración</span>
              <span class="metric-item-value">⏱️ ${escapeHtml(route.duracion)}</span>
            </div>
            <div class="metric-item">
              <span class="metric-item-label">Distancia</span>
              <span class="metric-item-value">📏 ${escapeHtml(route.distancia)}</span>
            </div>
            <div class="metric-item">
              <span class="metric-item-label">Paradas</span>
              <span class="metric-item-value">📍 ${parseInt(route.numero_paradas, 10)} Hitos</span>
            </div>
            <div class="metric-item" style="grid-column: 1/-1;">
              <span class="metric-item-label">Inicio y Final</span>
              <span class="metric-item-value" style="font-size: 0.95rem;">🚩 ${escapeHtml(route.inicio_final)}</span>
            </div>
            <div class="metric-item" style="grid-column: 1/-1;">
              <span class="metric-item-label">Accesibilidad</span>
              <span class="metric-item-value" style="font-size: 0.95rem;">♿ ${escapeHtml(route.accesibilidad)}</span>
            </div>
          </div>

          <div class="sheet-body">
            
            <!-- 1. Descripción & Público -->
            <section class="section-block">
              <h2 class="section-title"><span class="section-title-icon">📖</span> Descripción General</h2>
              <p class="text-prose">${escapeHtml(route.descripcion)}</p>

              <div class="audience-box" style="margin-top: 0.75rem;">
                <strong>👥 Público Destinatario:</strong>
                <p class="text-prose" style="font-size: 0.95rem;">${escapeHtml(route.publico)}</p>
              </div>
            </section>

            <!-- 2. Mapa del Recorrido (Vector SVG de Alta Legibilidad) -->
            <section class="section-block" id="seccion-mapa">
              <h2 class="section-title"><span class="section-title-icon">🗺️</span> Mapa del Recorrido e Hitos</h2>
              
              <div class="map-container">
                <div class="map-toolbar">
                  <span>Plano Vectorial de Alta Definición</span>
                  <span class="map-mobile-hint">👉 Desliza el mapa para explorar</span>
                </div>
                
                <div class="map-svg-wrap">
                  <svg class="map-svg" viewBox="${escapeHtml(route.mapa.viewBox)}" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="mapRouteGrad-${escapeHtml(route.id)}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="var(--primary)" />
                        <stop offset="100%" stop-color="var(--secondary)" />
                      </linearGradient>
                      <filter id="glow-${escapeHtml(route.id)}" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
                      </filter>
                    </defs>

                    <pattern id="gridPattern-${escapeHtml(route.id)}" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-color)" stroke-width="0.75" opacity="0.6"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#gridPattern-${escapeHtml(route.id)})" />

                    <!-- Trazado de la Ruta -->
                    <path d="${escapeHtml(route.mapa.svgPath)}" fill="none" stroke="var(--border-subtle)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="${escapeHtml(route.mapa.svgPath)}" fill="none" stroke="url(#mapRouteGrad-${escapeHtml(route.id)})" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 5" />

                    <!-- Puntos de Parada Interactivos de Gran Tamaño y Contraste -->
                    ${route.mapa.puntos.map(p => `
                      <g class="map-stop-pin ${p.num === 1 ? 'active' : ''}" id="svg-pin-${p.num}" onclick="window.RutasApp.selectStop(${p.num}, true)" tabindex="0" role="button" aria-label="Parada ${p.num}: ${escapeHtml(p.name)}">
                        <circle cx="${p.x}" cy="${p.y}" r="34" fill="transparent" class="pin-hitbox" />
                        <circle cx="${p.x}" cy="${p.y}" r="22" fill="var(--bg-surface)" stroke="var(--primary)" stroke-width="4" class="pin-ring" filter="url(#glow-${escapeHtml(route.id)})" />
                        <circle cx="${p.x}" cy="${p.y}" r="15" fill="var(--primary)" class="pin-core" />
                        <text x="${p.x}" y="${p.y + 5}" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" class="pin-num">${p.num}</text>
                        <text x="${p.x}" y="${p.label_y || (p.y > 180 ? p.y + 36 : p.y - 26)}" font-size="14" font-weight="700" text-anchor="middle" class="pin-label">${escapeHtml(p.name)}</text>
                      </g>
                    `).join('')}

                    <!-- Rosa de los vientos -->
                    <g transform="translate(740, 45)" opacity="0.85">
                      <circle cx="0" cy="0" r="20" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="1.5"/>
                      <path d="M 0,-15 L 4,-2 L 0,0 L -4,-2 Z" fill="var(--danger)"/>
                      <path d="M 0,15 L 4,2 L 0,0 L -4,2 Z" fill="var(--text-muted)"/>
                      <text x="0" y="-18" font-size="10" font-weight="bold" fill="var(--danger)" text-anchor="middle">N</text>
                    </g>
                  </svg>
                </div>

                <!-- Selector de Paradas Rápido Touch-Friendly -->
                <div class="map-stops-quickbar">
                  <span class="quickbar-title">Hitos:</span>
                  <div class="quickbar-scroll">
                    ${route.fichas_paradas.map(s => `
                      <button class="stop-chip-btn ${s.num === 1 ? 'active' : ''}" id="chip-btn-${s.num}" onclick="window.RutasApp.selectStop(${s.num}, true)">
                        <span class="chip-num-badge">${s.num}</span>
                        <span>${escapeHtml(s.nombre)}</span>
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Banner de Parada Seleccionada con Enlace a Ficha -->
                <div class="selected-stop-banner" id="map-selected-banner">
                  <div class="selected-stop-info">
                    <span class="chip-num-badge" id="banner-stop-num">1</span>
                    <div>
                      <strong class="selected-stop-title" id="banner-stop-title">${escapeHtml(route.fichas_paradas[0].nombre)}</strong>
                      <span style="font-size: 0.8rem; color: var(--text-muted); display: block;" id="banner-stop-time">Estancia: ${escapeHtml(route.fichas_paradas[0].tiempo_parada)}</span>
                    </div>
                  </div>
                  <button class="btn-open-route" onclick="window.RutasApp.scrollToActiveStop()">
                    Ver Ficha de Interpretación ➔
                  </button>
                </div>

                <div class="map-legend">
                  <span class="legend-item"><span class="legend-dot" style="background: var(--primary);"></span> Línea Principal de Sendero</span>
                  <span class="legend-item"><span class="legend-dot" style="background: var(--secondary);"></span> Hitos de Interpretación</span>
                  <span class="legend-item">🏁 Distancia Total: ${escapeHtml(route.distancia)}</span>
                </div>
              </div>
            </section>

            <!-- 3. Itinerario Detallado -->
            <section class="section-block">
              <h2 class="section-title"><span class="section-title-icon">⏱️</span> Itinerario Detallado</h2>
              
              <div class="timeline">
                ${route.itinerario.map(step => `
                  <div class="timeline-step">
                    <div class="timeline-node">${step.parada}</div>
                    <div class="timeline-header">
                      <h3 class="timeline-title">${step.parada}. ${escapeHtml(step.titulo)}</h3>
                      <span class="timeline-meta">${escapeHtml(step.tiempo)} | ${escapeHtml(step.distancia_tramo)}</span>
                    </div>
                    <p class="timeline-desc">${escapeHtml(step.descripcion)}</p>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- 4. Fichas de Interpretación de cada Parada -->
            <section class="section-block">
              <h2 class="section-title"><span class="section-title-icon">🎙️</span> Fichas de Interpretación del Patrimonio</h2>
              
              <div class="stops-interpretation-list">
                ${route.fichas_paradas.map(stop => `
                  <article class="stop-card" id="stop-card-${stop.num}">
                    <div class="stop-card-header" onclick="window.RutasApp.toggleStopCard(${stop.num})" tabindex="0" role="button" aria-expanded="true">
                      <div class="stop-card-header-left">
                        <span class="stop-badge-num">${stop.num}</span>
                        <div>
                          <h3 class="stop-card-title">${escapeHtml(stop.nombre)}</h3>
                          <span style="font-size: 0.8rem; color: var(--text-muted);">Estancia estimada: ${escapeHtml(stop.tiempo_parada)}</span>
                        </div>
                      </div>
                      <span class="stop-collapse-icon" id="stop-icon-${stop.num}">▼</span>
                    </div>

                    <div class="stop-card-body" id="stop-body-${stop.num}">
                      <div class="stop-interpretation-keys">
                        <span class="stop-key-title">Claves de Interpretación:</span>
                        <p class="text-prose" style="font-size: 0.95rem;">${escapeHtml(stop.claves)}</p>
                      </div>

                      <div style="background: var(--bg-surface); padding: 0.85rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent);">
                        <strong style="font-size: 0.85rem; color: var(--text-primary);">💡 Dato de Interés:</strong>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.2rem;">${escapeHtml(stop.curiosidad)}</p>
                      </div>

                      <div class="stop-actions">
                        <button class="btn-audio-guide" onclick="window.RutasApp.playStopAudio(${stop.num})">
                          🔊 Escuchar Audioguía
                        </button>
                        <button class="btn-audio-guide" style="background: var(--bg-surface-subtle); color: var(--text-secondary);" onclick="window.RutasApp.stopAudio()">
                          ⏹ Detener
                        </button>
                      </div>
                    </div>
                  </article>
                `).join('')}
              </div>
            </section>

            <!-- 5. Recursos y Servicios Asociados -->
            <section class="section-block">
              <h2 class="section-title"><span class="section-title-icon">🛠️</span> Recursos y Servicios Asociados</h2>
              <div class="services-grid">
                ${route.recursos_servicios.map(serv => `
                  <div class="service-card">
                    <span class="service-icon">${escapeHtml(serv.icono)}</span>
                    <div class="service-content">
                      <h4>${escapeHtml(serv.nombre)}</h4>
                      <p>${escapeHtml(serv.desc)}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- 6. Recomendaciones Prácticas -->
            <section class="section-block">
              <h2 class="section-title"><span class="section-title-icon">📋</span> Recomendaciones Prácticas</h2>
              <div class="recommendations-box">
                <ul class="checklist">
                  ${route.recomendaciones.map(rec => `<li>${escapeHtml(rec)}</li>`).join('')}
                </ul>
              </div>
            </section>

            <!-- 7. Medidas de Sostenibilidad -->
            <section class="section-block">
              <h2 class="section-title"><span class="section-title-icon">🌱</span> Medidas de Sostenibilidad</h2>
              <div class="sustainability-box">
                <p class="text-prose" style="font-weight: 600; margin-bottom: 0.5rem; color: var(--primary-contrast);">
                  Compromiso de Turismo Responsable y Huella Reducida:
                </p>
                <ul class="checklist sustainability-checklist">
                  ${route.sostenibilidad.map(sos => `<li>${escapeHtml(sos)}</li>`).join('')}
                </ul>
              </div>
            </section>

            <!-- 8. Firma de Autoría y Diseño -->
            <div class="sheet-author-box">
              <div class="sheet-author-content">
                <span class="sheet-author-title">Documento Técnico y Guía Oficial</span>
                <span class="sheet-author-name">Autoría y diseño: ${escapeHtml(route.autoria)}</span>
              </div>
              <div class="controls-no-print">
                <button class="header-btn" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
              </div>
            </div>

          </div>
        </article>
      </div>
    `;
  }

  // --- 7. Selección e Interacción de Paradas ---
  function selectStop(num, shouldScroll = true) {
    state.activeStopNum = num;

    document.querySelectorAll('.map-stop-pin').forEach(pin => pin.classList.remove('active'));
    const activePin = document.getElementById(`svg-pin-${num}`);
    if (activePin) activePin.classList.add('active');

    document.querySelectorAll('.stop-chip-btn').forEach(btn => btn.classList.remove('active'));
    const activeChip = document.getElementById(`chip-btn-${num}`);
    if (activeChip) {
      activeChip.classList.add('active');
      activeChip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    if (typeof ROUTES_DATA !== 'undefined' && state.activeRouteId) {
      const route = ROUTES_DATA.find(r => r.id === state.activeRouteId);
      if (route) {
        const stop = route.fichas_paradas.find(s => s.num === num);
        if (stop) {
          const bannerNum = document.getElementById('banner-stop-num');
          const bannerTitle = document.getElementById('banner-stop-title');
          const bannerTime = document.getElementById('banner-stop-time');

          if (bannerNum) bannerNum.textContent = stop.num;
          if (bannerTitle) bannerTitle.textContent = stop.nombre;
          if (bannerTime) bannerTime.textContent = `Estancia: ${stop.tiempo_parada}`;
        }
      }
    }

    if (shouldScroll) {
      scrollToStop(num);
    }
  }

  function scrollToStop(num) {
    const card = document.getElementById(`stop-card-${num}`);
    if (card) {
      const body = document.getElementById(`stop-body-${num}`);
      const icon = document.getElementById(`stop-icon-${num}`);
      if (body) body.style.display = 'flex';
      if (icon) icon.textContent = '▼';

      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.remove('highlight-pulse');
      void card.offsetWidth;
      card.classList.add('highlight-pulse');
      setTimeout(() => {
        card.classList.remove('highlight-pulse');
      }, 2000);
    }
  }

  function scrollToActiveStop() {
    scrollToStop(state.activeStopNum || 1);
  }

  function toggleStopCard(num) {
    const body = document.getElementById(`stop-body-${num}`);
    const icon = document.getElementById(`stop-icon-${num}`);
    if (body && icon) {
      const isHidden = body.style.display === 'none';
      body.style.display = isHidden ? 'flex' : 'none';
      icon.textContent = isHidden ? '▼' : '▶';
    }
  }

  function playStopAudio(num) {
    if (typeof ROUTES_DATA === 'undefined') return;
    const route = ROUTES_DATA.find(r => r.id === state.activeRouteId) || ROUTES_DATA[0];
    if (!route) return;
    const stop = route.fichas_paradas.find(s => s.num === num);
    if (!stop) return;

    if (!('speechSynthesis' in window)) {
      alert(`Audioguía (${stop.nombre}):\n\n${stop.audio_texto}`);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${stop.nombre}. ${stop.audio_texto}`);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  function stopAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Sanitización de strings
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  window.RutasApp = {
    openRoute,
    showRouteDetail,
    showCatalog,
    selectStop,
    scrollToStop,
    scrollToActiveStop,
    toggleStopCard,
    playStopAudio,
    stopAudio,
    toggleTheme
  };

})();
