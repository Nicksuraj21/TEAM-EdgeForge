/**
 * BarrierVerse - Main Application Orchestrator & Client-Side Router
 * Initializes all modular engines and coordinates seamless page transitions
 */

import { a11ySuite } from './accessibility.js';
import { VRViewerEngine } from './vr-viewer.js';
import { CrowdsourceMapEngine } from './map-engine.js';
import { ReportWizardEngine } from './report-wizard.js';
import { PledgePortalEngine } from './pledge-portal.js';
import { OpenSourceHubEngine } from './open-source-hub.js';
import { StoryReaderEngine } from './story-reader.js';
import { VolunteerQuizEngine } from './volunteer-quiz.js';

class BarrierVerseApp {
  constructor() {
    this.vrEngine = null;
    this.mapEngine = null;
    this.reportWizard = null;
    this.pledgePortal = null;
    this.openSourceEngine = null;
    this.storyReader = null;
    this.volunteerQuiz = null;

    this.currentPage = 'home';
  }

  init() {
    this.initEngines();
    this.bindNavigation();
    this.handleInitialRoute();
    this.animateImpactCounters();
    this.initHeroCanvasPreview();
    this.bindGlobalActions();
  }

  initEngines() {
    this.vrEngine = new VRViewerEngine('vr-canvas-container');
    this.mapEngine = new CrowdsourceMapEngine('crowdsource-map');
    this.reportWizard = new ReportWizardEngine();
    this.pledgePortal = new PledgePortalEngine();
    this.openSourceEngine = new OpenSourceHubEngine();
    this.storyReader = new StoryReaderEngine();
    this.volunteerQuiz = new VolunteerQuizEngine();

    // Global window bridges for inline event handlers
    window.barrierMapEngine = this.mapEngine;
    window.openSourceEngine = this.openSourceEngine;
    window.storyReaderEngine = this.storyReader;
  }

  bindNavigation() {
    window.addEventListener('hashchange', () => {
      this.routeTo(window.location.hash.slice(1) || 'home');
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav-links');

    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close mobile menu on link click
      mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mainNav.classList.remove('mobile-open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  handleInitialRoute() {
    const hash = window.location.hash.slice(1);
    this.routeTo(hash || 'home');
  }

  routeTo(pageId) {
    const validPages = ['home', 'about', 'vr-experience', 'map', 'report', 'organizations', 'opensource', 'blog', 'get-involved'];
    const targetPage = validPages.includes(pageId) ? pageId : 'home';
    this.currentPage = targetPage;

    // Toggle view containers
    document.querySelectorAll('.page-view').forEach(view => {
      view.style.display = view.id === `view-${targetPage}` ? 'block' : 'none';
    });

    // Update Nav Active states
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${targetPage}`);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Page-specific initialization & refresh
    if (targetPage === 'vr-experience') {
      setTimeout(() => this.vrEngine.init(), 100);
    } else if (targetPage === 'map') {
      setTimeout(() => this.mapEngine.init(), 100);
    } else if (targetPage === 'report') {
      setTimeout(() => this.reportWizard.init(), 100);
    } else if (targetPage === 'organizations') {
      setTimeout(() => this.pledgePortal.init(), 100);
    } else if (targetPage === 'opensource') {
      setTimeout(() => this.openSourceEngine.init(), 100);
    } else if (targetPage === 'blog') {
      setTimeout(() => this.storyReader.init(), 100);
    } else if (targetPage === 'get-involved') {
      setTimeout(() => this.volunteerQuiz.init(), 100);
    }

    // ARIA announce page navigation
    const pageTitleMap = {
      home: 'BarrierVerse Home',
      about: 'About Us & Radical Transparency',
      'vr-experience': 'Interactive 3D VR Simulation',
      map: 'Live Crowdsourced Accessibility Map',
      report: 'Report an Accessibility Barrier',
      organizations: 'Organization Pledge & Case Studies',
      opensource: 'Open Source Transparency Hub',
      blog: 'Community Stories & Blog',
      'get-involved': 'Get Involved & Volunteer Roles'
    };

    a11ySuite.announceLive(`Navigated to ${pageTitleMap[targetPage] || targetPage}`);
  }

  animateImpactCounters() {
    const counters = [
      { id: 'counter-reported', target: 4829 },
      { id: 'counter-fixed', target: 1412 },
      { id: 'counter-orgs', target: 218 },
      { id: 'counter-volunteers', target: 3490 },
      { id: 'counter-cities', target: 42 }
    ];

    counters.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;

      let start = 0;
      const duration = 1800;
      const increment = item.target / (duration / 16);

      const update = () => {
        start += increment;
        if (start < item.target) {
          el.textContent = Math.floor(start).toLocaleString();
          requestAnimationFrame(update);
        } else {
          el.textContent = item.target.toLocaleString();
        }
      };

      requestAnimationFrame(update);
    });
  }

  initHeroCanvasPreview() {
    const container = document.getElementById('hero-3d-preview-canvas');
    if (!container || typeof THREE === 'undefined') return;

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111827);

      const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 1.2, 4);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const light = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(light);

      const dirLight = new THREE.DirectionalLight(0x60a5fa, 1.5);
      dirLight.position.set(5, 10, 7);
      scene.add(dirLight);

      // Rotating VR Headset Representation (Stylized Torus & Box Mesh)
      const headsetGroup = new THREE.Group();

      const visorGeo = new THREE.BoxGeometry(1.6, 0.9, 0.7);
      const visorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      headsetGroup.add(visor);

      const glassGeo = new THREE.PlaneGeometry(1.4, 0.7);
      const glassMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: false });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.set(0, 0, 0.36);
      headsetGroup.add(glass);

      // Glowing Accessible Ramp beneath
      const rampGeo = new THREE.BoxGeometry(3, 0.08, 3);
      const rampMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });
      const ramp = new THREE.Mesh(rampGeo, rampMat);
      ramp.rotation.x = Math.PI / 12;
      ramp.position.set(0, -0.9, 0);
      headsetGroup.add(ramp);

      scene.add(headsetGroup);

      const animateHero = () => {
        requestAnimationFrame(animateHero);
        headsetGroup.rotation.y += 0.01;
        headsetGroup.position.y = Math.sin(Date.now() * 0.002) * 0.1;
        renderer.render(scene, camera);
      };

      animateHero();
    } catch (e) {
      console.warn('Hero 3D Canvas error', e);
    }
  }

  bindGlobalActions() {
    // Newsletter form
    const newsletterForm = document.getElementById('footer-newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✓ Thank you for subscribing! You will receive max 1 privacy-first community update per month.');
        newsletterForm.reset();
      });
    }

    // VR Scenario Card Selector buttons on Homepage
    document.querySelectorAll('[data-launch-vr-scenario]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const scId = e.currentTarget.getAttribute('data-launch-vr-scenario');
        window.location.hash = '#vr-experience';
        setTimeout(() => {
          if (this.vrEngine) {
            this.vrEngine.loadScenario(scId);
          }
        }, 200);
      });
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.barrierVerseApp = new BarrierVerseApp();
  window.barrierVerseApp.init();
});
