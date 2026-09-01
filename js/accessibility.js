/**
 * BarrierVerse - Global Accessibility Suite (WCAG 2.2 AAA Engine)
 * Font scaler, high contrast modes, dyslexia typography, reading ruler, and speech synthesis
 */

class AccessibilitySuite {
  constructor() {
    this.drawerBackdrop = null;
    this.drawer = null;
    this.ruler = null;
    this.synth = window.speechSynthesis || null;
    this.state = {
      fontScale: 100, // 100, 120, 140
      contrastMode: 'default', // default, high-dark, high-light, yellow-black
      dyslexicFont: false,
      readingRuler: false,
      reducedMotion: false,
      lineHeightRelaxed: false,
      colorblindFilter: 'none' // none, protanopia, deuteranopia, tritanopia, grayscale
    };

    this.init();
  }

  init() {
    this.loadPersistedState();
    this.injectColorblindSVGFilters();
    this.createReadingRuler();
    this.bindEvents();
    this.applyAllPreferences();
  }

  loadPersistedState() {
    try {
      const saved = localStorage.getItem('barrierverse_a11y_settings');
      if (saved) {
        this.state = { ...this.state, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage unavailable for A11y settings', e);
    }
  }

  savePersistedState() {
    try {
      localStorage.setItem('barrierverse_a11y_settings', JSON.stringify(this.state));
    } catch (e) {
      // Ignored
    }
  }

  injectColorblindSVGFilters() {
    if (document.getElementById('a11y-svg-filters')) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'a11y-svg-filters';
    svg.style.display = 'none';
    svg.innerHTML = `
      <defs>
        <filter id="protanopia-filter">
          <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0"/>
        </filter>
        <filter id="deuteranopia-filter">
          <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0"/>
        </filter>
        <filter id="tritanopia-filter">
          <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0 0, 0.433, 0.567, 0, 0 0, 0.475, 0.525, 0, 0 0, 0, 0, 1, 0"/>
        </filter>
      </defs>
    `;
    document.body.appendChild(svg);
  }

  createReadingRuler() {
    let ruler = document.getElementById('reading-ruler');
    if (!ruler) {
      ruler = document.createElement('div');
      ruler.id = 'reading-ruler';
      ruler.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ruler);
    }
    this.ruler = ruler;

    window.addEventListener('mousemove', (e) => {
      if (this.state.readingRuler && this.ruler) {
        this.ruler.style.top = `${e.clientY}px`;
      }
    });
  }

  bindEvents() {
    const triggerBtn = document.getElementById('a11y-toggle-btn');
    const closeBtn = document.getElementById('a11y-close-btn');
    this.drawer = document.getElementById('a11y-drawer');
    this.drawerBackdrop = document.getElementById('a11y-backdrop');

    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => this.openDrawer());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (this.drawerBackdrop) {
      this.drawerBackdrop.addEventListener('click', () => this.closeDrawer());
    }

    // Keyboard escape to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawer && this.drawer.classList.contains('active')) {
        this.closeDrawer();
      }
    });

    // Font Scaler Buttons
    document.querySelectorAll('[data-a11y-font]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const scale = parseInt(e.currentTarget.getAttribute('data-a11y-font'), 10);
        this.setFontScale(scale);
      });
    });

    // Contrast Buttons
    document.querySelectorAll('[data-a11y-contrast]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-a11y-contrast');
        this.setContrastMode(mode);
      });
    });

    // Toggle Checkboxes
    const dysToggle = document.getElementById('a11y-dyslexic-toggle');
    if (dysToggle) {
      dysToggle.addEventListener('change', (e) => {
        this.state.dyslexicFont = e.target.checked;
        this.applyDyslexiaMode();
        this.savePersistedState();
      });
    }

    const rulerToggle = document.getElementById('a11y-ruler-toggle');
    if (rulerToggle) {
      rulerToggle.addEventListener('change', (e) => {
        this.state.readingRuler = e.target.checked;
        this.applyReadingRuler();
        this.savePersistedState();
      });
    }

    const motionToggle = document.getElementById('a11y-motion-toggle');
    if (motionToggle) {
      motionToggle.addEventListener('change', (e) => {
        this.state.reducedMotion = e.target.checked;
        this.applyReducedMotion();
        this.savePersistedState();
      });
    }

    const lineToggle = document.getElementById('a11y-lineheight-toggle');
    if (lineToggle) {
      lineToggle.addEventListener('change', (e) => {
        this.state.lineHeightRelaxed = e.target.checked;
        this.applyLineHeight();
        this.savePersistedState();
      });
    }

    const colorblindSelect = document.getElementById('a11y-colorblind-select');
    if (colorblindSelect) {
      colorblindSelect.addEventListener('change', (e) => {
        this.state.colorblindFilter = e.target.value;
        this.applyColorblindFilter();
        this.savePersistedState();
      });
    }

    // Reset All Button
    const resetBtn = document.getElementById('a11y-reset-all-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetAll());
    }
  }

  openDrawer() {
    if (this.drawer && this.drawerBackdrop) {
      this.drawer.classList.add('active');
      this.drawerBackdrop.classList.add('active');
      this.drawer.setAttribute('aria-hidden', 'false');
      this.announceLive('Accessibility panel opened');
      
      const firstBtn = this.drawer.querySelector('button, input');
      if (firstBtn) firstBtn.focus();
    }
  }

  closeDrawer() {
    if (this.drawer && this.drawerBackdrop) {
      this.drawer.classList.remove('active');
      this.drawerBackdrop.classList.remove('active');
      this.drawer.setAttribute('aria-hidden', 'true');
      this.announceLive('Accessibility panel closed');
      
      const trigger = document.getElementById('a11y-toggle-btn');
      if (trigger) trigger.focus();
    }
  }

  setFontScale(scale) {
    this.state.fontScale = scale;
    document.body.classList.remove('text-scale-100', 'text-scale-120', 'text-scale-140');
    document.body.classList.add(`text-scale-${scale}`);
    
    document.querySelectorAll('[data-a11y-font]').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-a11y-font'), 10) === scale);
    });

    this.announceLive(`Font size set to ${scale}%`);
    this.savePersistedState();
  }

  setContrastMode(mode) {
    this.state.contrastMode = mode;
    document.body.classList.remove('theme-high-contrast-dark', 'theme-high-contrast-light', 'theme-yellow-on-black');
    
    if (mode === 'high-dark') {
      document.body.classList.add('theme-high-contrast-dark');
    } else if (mode === 'high-light') {
      document.body.classList.add('theme-high-contrast-light');
    } else if (mode === 'yellow-black') {
      document.body.classList.add('theme-yellow-on-black');
    }

    document.querySelectorAll('[data-a11y-contrast]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-a11y-contrast') === mode);
    });

    this.announceLive(`High contrast mode set to ${mode}`);
    this.savePersistedState();
  }

  applyDyslexiaMode() {
    document.body.classList.toggle('font-dyslexic', !!this.state.dyslexicFont);
    const toggle = document.getElementById('a11y-dyslexic-toggle');
    if (toggle) toggle.checked = !!this.state.dyslexicFont;
    this.announceLive(`Dyslexia-friendly font ${this.state.dyslexicFont ? 'enabled' : 'disabled'}`);
  }

  applyReadingRuler() {
    if (this.ruler) {
      this.ruler.classList.toggle('active', !!this.state.readingRuler);
    }
    const toggle = document.getElementById('a11y-ruler-toggle');
    if (toggle) toggle.checked = !!this.state.readingRuler;
    this.announceLive(`Reading ruler ${this.state.readingRuler ? 'enabled' : 'disabled'}`);
  }

  applyReducedMotion() {
    document.body.classList.toggle('reduce-motion', !!this.state.reducedMotion);
    const toggle = document.getElementById('a11y-motion-toggle');
    if (toggle) toggle.checked = !!this.state.reducedMotion;
  }

  applyLineHeight() {
    document.body.classList.toggle('line-height-relaxed', !!this.state.lineHeightRelaxed);
    const toggle = document.getElementById('a11y-lineheight-toggle');
    if (toggle) toggle.checked = !!this.state.lineHeightRelaxed;
  }

  applyColorblindFilter() {
    document.body.classList.remove('filter-protanopia', 'filter-deuteranopia', 'filter-tritanopia', 'filter-grayscale');
    if (this.state.colorblindFilter && this.state.colorblindFilter !== 'none') {
      document.body.classList.add(`filter-${this.state.colorblindFilter}`);
    }
    const select = document.getElementById('a11y-colorblind-select');
    if (select) select.value = this.state.colorblindFilter || 'none';
  }

  applyAllPreferences() {
    this.setFontScale(this.state.fontScale || 100);
    this.setContrastMode(this.state.contrastMode || 'default');
    this.applyDyslexiaMode();
    this.applyReadingRuler();
    this.applyReducedMotion();
    this.applyLineHeight();
    this.applyColorblindFilter();
  }

  resetAll() {
    this.state = {
      fontScale: 100,
      contrastMode: 'default',
      dyslexicFont: false,
      readingRuler: false,
      reducedMotion: false,
      lineHeightRelaxed: false,
      colorblindFilter: 'none'
    };
    this.savePersistedState();
    this.applyAllPreferences();
    this.announceLive('All accessibility preferences reset to default');
  }

  announceLive(message) {
    let region = document.getElementById('a11y-live-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'a11y-live-region';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.style.position = 'absolute';
      region.style.width = '1px';
      region.style.height = '1px';
      region.style.overflow = 'hidden';
      region.style.clip = 'rect(0 0 0 0)';
      document.body.appendChild(region);
    }
    region.textContent = '';
    setTimeout(() => {
      region.textContent = message;
    }, 50);
  }
}

export const a11ySuite = new AccessibilitySuite();
