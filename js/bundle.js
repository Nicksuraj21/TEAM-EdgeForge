/**
 * LifeLens VR - Dedicated Virtual Disability Empathy 3D Engine
 * - 3D Campus Plaza & 3D Hospital Emergency Trauma Complex
 * - Wheelchair Dismount & Floor Crawl Empathy Struggle Simulation ("Ghis Ghis Ke Chalna")
 * - 2-Joint Biomechanical Leg Rigging for Walking NPCs & Blind Student
 * - One-Click Native Fullscreen (Key 'F'), VR Box Stereoscopic 3D, Meta Quest WebXR
 */

// ============================================================================
// 1. PROCEDURAL TEXTURE GENERATORS (PBR Textures)
// ============================================================================

function createAsphaltTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1e242d';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 30000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const c = Math.floor(20 + Math.random() * 35);
    ctx.fillStyle = `rgb(${c},${c + 2},${c + 6})`;
    ctx.fillRect(x, y, 2, 2);
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 2;
  for (let x = 0; x <= 512; x += 128) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
  }
  for (let y = 0; y <= 512; y += 128) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createGrassTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1b4d24';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const g = Math.floor(65 + Math.random() * 45);
    ctx.fillStyle = `rgb(22, ${g}, 32)`;
    ctx.fillRect(x, y, 2, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

function createBrickTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#7a3333';
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = '#b5ab9e';
  const rowH = 32; const colW = 64;
  for (let y = 0; y < 512; y += rowH) {
    ctx.fillRect(0, y, 512, 3);
    const offset = (y / rowH) % 2 === 0 ? 0 : colW / 2;
    for (let x = offset; x < 512; x += colW) {
      ctx.fillRect(x, y, 3, rowH);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function createHospitalTileTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  for (let x = 0; x <= 512; x += 128) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
  }
  for (let y = 0; y <= 512; y += 128) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
  }

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(x, y, 4, 4);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

function createHospitalWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 512);

  // Mint-teal medical protective base trim
  ctx.fillStyle = '#0d9488';
  ctx.fillRect(0, 420, 512, 92);

  ctx.fillStyle = '#14b8a6';
  ctx.fillRect(0, 414, 512, 6);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  return tex;
}

function createECGScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 256, 128);

  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 64);
  ctx.lineTo(60, 64);
  ctx.lineTo(75, 20);
  ctx.lineTo(90, 105);
  ctx.lineTo(105, 50);
  ctx.lineTo(120, 64);
  ctx.lineTo(240, 64);
  ctx.stroke();

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('HR: 78 BPM', 15, 24);
  ctx.fillText('SpO2: 98%', 15, 115);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createTactilePaverTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#facc15';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#ca8a04';
  for (let x = 16; x < 256; x += 48) {
    ctx.fillRect(x, 0, 20, 256);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 12);
  return tex;
}

// ============================================================================
// 2. SYNTHESIZED WEB AUDIO ENGINE
// ============================================================================

class WebAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.audioEnabled = true;
  }

  initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playWheelchairHum() {
    if (!this.audioEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(95, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.13);
  }

  playFloorCrawlFriction() {
    if (!this.audioEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    // Dragging floor scrape & friction sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.24);
  }

  playHeartbeatECG() {
    if (!this.audioEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  playDiscoveryChime() {
    if (!this.audioEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
    });
  }
}

// ============================================================================
// 3. MASTER LIFELENS VR APPLICATION CLASS
// ============================================================================

class LifeLensVRApp {
  constructor() {
    this.currentView = 'home';
    this.currentEnvironment = 'campus'; // 'campus' | 'hospital'
    this.empathyMode = 'wheelchair';
    this.cameraViewMode = 'third_person'; // 'third_person' | 'first_person' | 'drone'
    this.isAccessibleVR = false;
    this.isAutoTourRunning = false;
    this.autoTourStep = 0;
    this.isVRBoxStereoMode = false;
    this.isFloorCrawling = false; // "Ghis Ghis Ke Chalna" Empathy Mode
    
    // VR 3D Engine
    this.vrScene = null;
    this.vrCamera = null;
    this.vrLeftCamera = null;
    this.vrRightCamera = null;
    this.vrRenderer = null;
    this.vrHotspots = [];
    this.vrAnimId = null;

    // 3D Animated Entities
    this.riderCharacterGroup = null;
    this.crawlingCharacterGroup = null;
    this.parkedWheelchairGroup = null;
    this.blindStudentGroup = null;
    this.pedestrianNPCs = [];

    // Audio Synthesizer
    this.audioSynth = new WebAudioSynthesizer();

    // Locomotion & Physics
    this.keys = { w: false, a: false, s: false, d: false };
    this.riderPos = { x: 0, y: 0, z: 6.5 };
    this.riderYaw = 0;
    this.riderSpeed = 0;
    this.wheelRotation = 0;
    this.armPushAngle = 0;
    this.caneAngle = 0;
    this.crawlCycle = 0;

    // Gyroscope Head Tracking
    this.gyroYaw = 0;
    this.gyroPitch = 0;
  }

  init() {
    console.log("🌟 LifeLens VR Hospital & Ground Crawling Empathy Simulation Active");
    this.bindA11ySuite();
    this.bindKeyboardControls();
    this.bindGyroscopeControls();
    this.bindFullscreenListeners();

    const initialHash = (window.location.hash || '').replace(/^#/, '');
    window.showPage(initialHash || 'home');

    window.addEventListener('popstate', () => {
      const hash = (window.location.hash || '').replace(/^#/, '');
      window.showPage(hash || 'home');
    });

    setTimeout(() => this.initVREngine(), 100);
  }

  bindKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') { this.keys.w = true; this.stopAutoTour(); }
      if (k === 's' || k === 'arrowdown') { this.keys.s = true; this.stopAutoTour(); }
      if (k === 'a' || k === 'arrowleft') { this.keys.a = true; this.stopAutoTour(); }
      if (k === 'd' || k === 'arrowright') { this.keys.d = true; this.stopAutoTour(); }
      if (k === 'f') { this.toggleFullscreen(); }
      if (k === 'c') { this.toggleFloorCrawl(); }
      this.audioSynth.initContext();
    });

    window.addEventListener('keyup', (e) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') this.keys.w = false;
      if (k === 's' || k === 'arrowdown') this.keys.s = false;
      if (k === 'a' || k === 'arrowleft') this.keys.a = false;
      if (k === 'd' || k === 'arrowright') this.keys.d = false;
    });
  }

  bindGyroscopeControls() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (this.isVRBoxStereoMode && e.alpha !== null && e.beta !== null) {
          this.gyroYaw = THREE.MathUtils.degToRad(-e.alpha || 0);
          this.gyroPitch = THREE.MathUtils.degToRad((e.beta - 90) || 0);
        }
      });
    }
  }

  bindFullscreenListeners() {
    const handleFSChange = () => {
      const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      const fsBtns = document.querySelectorAll('.vr-fullscreen-btn, .vr-floating-fs-btn');
      
      fsBtns.forEach(btn => {
        if (isFS) {
          btn.classList.add('active');
          if (btn.classList.contains('vr-fullscreen-btn')) {
            btn.innerHTML = `<span>🗗</span> Exit Fullscreen`;
          } else {
            btn.innerHTML = `🗗`;
          }
        } else {
          btn.classList.remove('active');
          if (btn.classList.contains('vr-fullscreen-btn')) {
            btn.innerHTML = `<span>⛶</span> Fullscreen`;
          } else {
            btn.innerHTML = `⛶`;
          }
        }
      });

      setTimeout(() => this.handleResize(), 80);
    };

    document.addEventListener('fullscreenchange', handleFSChange);
    document.addEventListener('webkitfullscreenchange', handleFSChange);
    document.addEventListener('mozfullscreenchange', handleFSChange);
    document.addEventListener('MSFullscreenChange', handleFSChange);
    window.addEventListener('resize', () => this.handleResize());
  }

  toggleFullscreen() {
    const wrapper = document.querySelector('.vr-viewer-wrapper') || document.getElementById('vr-canvas-container');
    if (!wrapper) return;

    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);

    if (!isFS) {
      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
      } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen();
      } else if (wrapper.mozRequestFullScreen) {
        wrapper.mozRequestFullScreen();
      } else if (wrapper.msRequestFullscreen) {
        wrapper.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  handleResize() {
    const container = document.getElementById('vr-canvas-container');
    if (!container || !this.vrRenderer || !this.vrCamera) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.vrCamera.aspect = width / height;
    this.vrCamera.updateProjectionMatrix();

    if (this.vrLeftCamera && this.vrRightCamera) {
      this.vrLeftCamera.aspect = (width / 2) / height;
      this.vrLeftCamera.updateProjectionMatrix();
      this.vrRightCamera.aspect = (width / 2) / height;
      this.vrRightCamera.updateProjectionMatrix();
    }

    this.vrRenderer.setSize(width, height);
  }

  setVirtualKey(key, isPressed) {
    if (this.keys.hasOwnProperty(key)) {
      this.keys[key] = isPressed;
      this.audioSynth.initContext();
      if (isPressed) this.stopAutoTour();
    }
  }

  updateInVRHUD() {
    // 1. Location buttons
    const campusBtn = document.getElementById('in-vr-btn-campus');
    const hospBtn = document.getElementById('in-vr-btn-hospital');
    if (campusBtn) campusBtn.classList.toggle('active', this.currentEnvironment === 'campus');
    if (hospBtn) hospBtn.classList.toggle('active', this.currentEnvironment === 'hospital');

    // 2. Crawl button
    const crawlBtn = document.getElementById('in-vr-btn-crawl');
    if (crawlBtn) {
      crawlBtn.classList.toggle('crawling-active', this.isFloorCrawling);
      crawlBtn.innerHTML = this.isFloorCrawling ? `<span>♿</span> Remount Wheelchair` : `<span>🧗</span> Floor Crawl Struggle`;
    }

    // 3. Reality switch button
    const realityBtn = document.getElementById('in-vr-btn-reality');
    if (realityBtn) {
      realityBtn.classList.toggle('accessible-active', this.isAccessibleVR);
      realityBtn.innerHTML = this.isAccessibleVR ? `<span>♿</span> Solution Fixed` : `<span>⚠️</span> Barrier Fix`;
    }

    // 4. Cam angle buttons
    const cam3rd = document.getElementById('in-vr-cam-3rd');
    const cam1st = document.getElementById('in-vr-cam-1st');
    const camDrone = document.getElementById('in-vr-cam-drone');
    if (cam3rd) cam3rd.classList.toggle('active', this.cameraViewMode === 'third_person');
    if (cam1st) cam1st.classList.toggle('active', this.cameraViewMode === 'first_person');
    if (camDrone) camDrone.classList.toggle('active', this.cameraViewMode === 'drone');

    // 5. VR Box mode button
    const vrboxBtn = document.getElementById('in-vr-btn-vrbox');
    if (vrboxBtn) {
      vrboxBtn.classList.toggle('active', this.isVRBoxStereoMode);
      vrboxBtn.innerHTML = this.isVRBoxStereoMode ? `<span>✕</span> Exit VR Box` : `<span>🥽</span> VR Box Mode`;
    }

    // 6. Live HUD Status text
    const statusText = document.getElementById('in-vr-status-text');
    if (statusText) {
      const loc = this.currentEnvironment === 'hospital' ? '🏥 Hospital Trauma Ward' : '🏛️ Campus Plaza';
      const mode = this.isFloorCrawling ? '🧗 Floor Crawl (0.28m)' : '♿ Wheelchair Mode';
      const state = this.isAccessibleVR ? '✓ Universal Fixed' : '⚠️ Barriered State';
      statusText.innerText = `${loc} • ${mode} • ${state}`;
    }
  }

  // ==========================================================================
  // ENVIRONMENT SWITCHER: Campus vs Hospital Trauma Center
  // ==========================================================================
  switchEnvironment(envName) {
    this.currentEnvironment = envName;

    // Reset character positions appropriately
    if (envName === 'hospital') {
      this.riderPos = { x: 0, y: 0, z: 4.0 };
    } else {
      this.riderPos = { x: 0, y: 0, z: 6.5 };
    }
    this.riderYaw = 0;
    this.riderSpeed = 0;

    this.updateInVRHUD();
    this.initVREngine();
    this.audioSynth.playDiscoveryChime();
  }

  // ==========================================================================
  // FLOOR CRAWL / MOBILITY STRUGGLE TOGGLE ("Ghis-Ghis Ke Chalna")
  // ==========================================================================
  toggleFloorCrawl() {
    this.isFloorCrawling = !this.isFloorCrawling;

    if (this.isFloorCrawling) {
      this.audioSynth.playFloorCrawlFriction();
    } else {
      this.audioSynth.playDiscoveryChime();
    }

    this.updateInVRHUD();
    this.initVREngine();
  }

  toggleVRBoxMode() {
    this.isVRBoxStereoMode = !this.isVRBoxStereoMode;
    const divider = document.getElementById('vr-stereo-divider');

    if (this.isVRBoxStereoMode) {
      if (divider) divider.classList.add('active');
      this.setCameraView('first_person');
      this.audioSynth.playDiscoveryChime();

      const wrapper = document.querySelector('.vr-viewer-wrapper');
      if (wrapper && wrapper.requestFullscreen && !document.fullscreenElement) {
        try { wrapper.requestFullscreen(); } catch (e) {}
      }

      if (navigator.xr && this.vrRenderer && this.vrRenderer.xr) {
        navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
          if (supported) {
            navigator.xr.requestSession('immersive-vr').then((session) => {
              this.vrRenderer.xr.setSession(session);
            }).catch(() => {});
          }
        });
      }

    } else {
      if (divider) divider.classList.remove('active');
      this.setCameraView('third_person');

      if (document.exitFullscreen && document.fullscreenElement) {
        try { document.exitFullscreen(); } catch (e) {}
      }
    }

    this.updateInVRHUD();
  }

  toggleAutoTour() {
    if (this.isAutoTourRunning) {
      this.stopAutoTour();
    } else {
      this.startAutoTour();
    }
  }

  startAutoTour() {
    this.isAutoTourRunning = true;
    this.autoTourStep = 0;
    this.riderPos = { x: 0, y: 0, z: this.currentEnvironment === 'hospital' ? 4 : 6.5 };
    this.riderYaw = 0;
    this.riderSpeed = 0;
    
    if (this.isAccessibleVR) {
      this.toggleRealityMode();
    }

    const btn = document.getElementById('in-vr-btn-tour');
    if (btn) {
      btn.classList.add('active');
      btn.innerHTML = `<span>⏹️</span> Stop Tour`;
    }

    this.audioSynth.playDiscoveryChime();
  }

  stopAutoTour() {
    this.isAutoTourRunning = false;
    const btn = document.getElementById('in-vr-btn-tour');
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = `<span>🚀</span> Auto Tour`;
    }
  }

  setCameraView(viewMode, btnEl) {
    this.cameraViewMode = viewMode;
    this.updateInVRHUD();
  }

  setEmpathyMode(mode, btnEl) {
    this.empathyMode = mode;
    document.querySelectorAll('.empathy-pill-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const overlay = document.getElementById('empathy-shader-overlay');
    if (mode === 'wheelchair') {
      if (overlay) overlay.style.cssText = 'position:absolute; inset:0; pointer-events:none; z-index:5;';
    } else if (mode === 'low_vision') {
      if (overlay) overlay.style.cssText = 'position:absolute; inset:0; pointer-events:none; z-index:5; backdrop-filter: blur(5px) contrast(0.9); background: rgba(255,255,255,0.06);';
    }
    this.updateInVRHUD();
  }

  initVREngine() {
    const container = document.getElementById('vr-canvas-container');
    if (!container) return;

    if (typeof THREE === 'undefined') {
      container.innerHTML = `
        <div style="height:100%; min-height:580px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#ffffff; background:#0f172a; text-align:center; padding:24px;">
          <span style="font-size:3.5rem; margin-bottom:12px;">🥽</span>
          <h3 style="color:#ffffff; font-size:1.5rem; margin-bottom:8px;">Virtual Disability Empathy Simulator</h3>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    if (this.vrAnimId) cancelAnimationFrame(this.vrAnimId);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 580;

    this.vrScene = new THREE.Scene();
    this.vrScene.background = new THREE.Color(this.currentEnvironment === 'hospital' ? 0x0f172a : 0x0a0f1d);
    this.vrScene.fog = new THREE.FogExp2(this.currentEnvironment === 'hospital' ? 0x0f172a : 0x0a0f1d, 0.012);

    this.vrCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.vrLeftCamera = new THREE.PerspectiveCamera(60, (width / 2) / height, 0.1, 1000);
    this.vrRightCamera = new THREE.PerspectiveCamera(60, (width / 2) / height, 0.1, 1000);
    
    this.vrRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    this.vrRenderer.setSize(width, height);
    this.vrRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.vrRenderer.shadowMap.enabled = true;
    this.vrRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.vrRenderer.autoClear = false;

    if (this.vrRenderer.xr) {
      this.vrRenderer.xr.enabled = true;
    }

    container.appendChild(this.vrRenderer.domElement);

    // Lighting
    if (this.currentEnvironment === 'hospital') {
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
      this.vrScene.add(ambientLight);

      const surgicalLight = new THREE.DirectionalLight(0xf0fdf4, 1.2);
      surgicalLight.position.set(0, 12, 0);
      surgicalLight.castShadow = true;
      this.vrScene.add(surgicalLight);

      const blueLamp = new THREE.PointLight(0x38bdf8, 0.6, 20);
      blueLamp.position.set(0, 4, 0);
      this.vrScene.add(blueLamp);

      this.build3DHospitalComplex();
    } else {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      this.vrScene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xfff5ea, 1.45);
      sunLight.position.set(22, 34, 24);
      sunLight.castShadow = true;
      this.vrScene.add(sunLight);

      const blueFillLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
      blueFillLight.position.set(-22, 14, -14);
      this.vrScene.add(blueFillLight);

      this.buildExpansiveCampus();
      this.build3DBlindStudent();
      this.buildWalkingNPCs();
    }

    // Build Character Model (Wheelchair Rider OR Floor Crawling Prone Character)
    if (this.isFloorCrawling) {
      this.build3DParkedWheelchair();
      this.build3DCrawlingCharacter();
    } else {
      this.build3DWheelchairRider();
    }

    // Reality Switch Button
    const switchBtn = document.getElementById('reality-switch-trigger');
    if (switchBtn) {
      switchBtn.onclick = () => this.toggleRealityMode();
    }

    // Raycast Hotspot Clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    container.onclick = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, this.vrCamera);
      const hits = raycaster.intersectObjects(this.vrHotspots);
      if (hits.length > 0) {
        this.openHotspotModal(hits[0].object.userData.data);
      }
    };

    // 60FPS Game Loop
    let lastHumTime = 0;
    let lastECGTime = 0;

    const animate = () => {
      this.vrAnimId = requestAnimationFrame(animate);

      // Automated Showcase Tour Logic
      if (this.isAutoTourRunning) {
        this.runAutoTourStep();
      } else {
        // Floor crawl moves slower due to heavy physical exertion
        const maxSpeed = this.isFloorCrawling ? 0.038 : 0.085;
        const turnSpeed = this.isFloorCrawling ? 0.026 : 0.038;

        if (this.keys.w) {
          this.riderSpeed = Math.min(this.riderSpeed + 0.005, maxSpeed);
        } else if (this.keys.s) {
          this.riderSpeed = Math.max(this.riderSpeed - 0.005, -maxSpeed * 0.5);
        } else {
          this.riderSpeed *= 0.82;
        }

        if (this.keys.a) {
          this.riderYaw += turnSpeed * (this.riderSpeed >= 0 ? 1 : -1);
        }
        if (this.keys.d) {
          this.riderYaw -= turnSpeed * (this.riderSpeed >= 0 ? 1 : -1);
        }
      }

      // Update Character Position based on Yaw and Speed
      this.riderPos.x -= Math.sin(this.riderYaw) * this.riderSpeed;
      this.riderPos.z -= Math.cos(this.riderYaw) * this.riderSpeed;

      // Constrain inside bounds
      const boundX = this.currentEnvironment === 'hospital' ? 9.5 : 16;
      const boundZMin = this.currentEnvironment === 'hospital' ? -8.5 : -7.5;
      const boundZMax = this.currentEnvironment === 'hospital' ? 8.5 : 14;

      this.riderPos.x = Math.max(-boundX, Math.min(boundX, this.riderPos.x));
      this.riderPos.z = Math.max(boundZMin, Math.min(boundZMax, this.riderPos.z));

      // Elevation check (Campus stairs vs ramp)
      if (this.currentEnvironment === 'campus') {
        if (this.isAccessibleVR) {
          if (this.riderPos.x >= -6.2 && this.riderPos.x <= -0.8 && this.riderPos.z <= -1 && this.riderPos.z >= -7) {
            this.riderPos.y = THREE.MathUtils.lerp(0, 1.15, (-this.riderPos.z - 1) / 6);
          } else if (this.riderPos.z < -7 && this.riderPos.x >= -6.5 && this.riderPos.x <= 2) {
            this.riderPos.y = 1.15;
          } else {
            this.riderPos.y = 0;
          }
        } else {
          if (this.riderPos.x >= -6.5 && this.riderPos.x <= -0.5 && this.riderPos.z < -2.8) {
            this.riderPos.z = -2.8;
            this.riderSpeed = 0;
          } else {
            this.riderPos.y = 0;
          }
        }
      } else {
        this.riderPos.y = 0;
      }

      // Physics & Locomotion Animation
      if (Math.abs(this.riderSpeed) > 0.001) {
        if (this.isFloorCrawling) {
          this.crawlCycle += this.riderSpeed * 7.5;
          if (Date.now() - lastHumTime > 400) {
            this.audioSynth.playFloorCrawlFriction();
            lastHumTime = Date.now();
          }
        } else {
          this.wheelRotation -= this.riderSpeed * 5.5;
          this.armPushAngle = Math.sin(Date.now() * 0.012) * 0.35;
          if (Date.now() - lastHumTime > 350) {
            this.audioSynth.playWheelchairHum();
            lastHumTime = Date.now();
          }
        }
      }

      // Sync Character Models
      if (this.isFloorCrawling) {
        if (this.crawlingCharacterGroup) {
          this.crawlingCharacterGroup.position.set(this.riderPos.x, this.riderPos.y, this.riderPos.z);
          this.crawlingCharacterGroup.rotation.y = this.riderYaw;
          this.animateCrawlingMotion();
        }
      } else {
        if (this.riderCharacterGroup) {
          this.riderCharacterGroup.position.set(this.riderPos.x, this.riderPos.y, this.riderPos.z);
          this.riderCharacterGroup.rotation.y = this.riderYaw;
          this.animateRiderWheelsAndArms();
        }
      }

      // Hospital Audio & ECG Beeps
      if (this.currentEnvironment === 'hospital' && Date.now() - lastECGTime > 1200) {
        this.audioSynth.playHeartbeatECG();
        lastECGTime = Date.now();
      }

      // Walking Blind Student NPC
      if (this.blindStudentGroup && this.currentEnvironment === 'campus') {
        const blindSpeed = 0.00035;
        const blindCycle = Date.now() * blindSpeed;
        const blindZ = -1 + Math.sin(blindCycle) * 3.5;
        this.blindStudentGroup.position.z = blindZ;

        const isMovingForward = Math.cos(blindCycle) < 0;
        this.blindStudentGroup.rotation.y = isMovingForward ? 0 : Math.PI;

        const blindStepTime = Date.now() * 0.0032;
        const blindStride = Math.sin(blindStepTime);

        this.caneAngle = Math.sin(blindStepTime) * 0.32;
        const caneMesh = this.blindStudentGroup.getObjectByName("blindCane");
        if (caneMesh) caneMesh.rotation.z = this.caneAngle;

        const lHip = this.blindStudentGroup.getObjectByName("blindLeftHip");
        const rHip = this.blindStudentGroup.getObjectByName("blindRightHip");
        const lKnee = this.blindStudentGroup.getObjectByName("blindLeftKnee");
        const rKnee = this.blindStudentGroup.getObjectByName("blindRightKnee");

        if (lHip && rHip && lKnee && rKnee) {
          lHip.rotation.x = blindStride * 0.38;
          lKnee.rotation.x = blindStride < 0 ? -blindStride * 0.6 : 0;
          rHip.rotation.x = -blindStride * 0.38;
          rKnee.rotation.x = blindStride > 0 ? blindStride * 0.6 : 0;
        }
      }

      // Pedestrian NPCs
      if (this.currentEnvironment === 'campus') {
        this.pedestrianNPCs.forEach((npc, i) => {
          const speedFactor = 0.00038;
          const walkCycle = Date.now() * speedFactor + i * 2.2;
          const walkSpan = 4.5;

          const curOffset = Math.sin(walkCycle) * walkSpan;
          npc.position.x = npc.userData.originX + curOffset;

          const movingRight = Math.cos(walkCycle) > 0;
          npc.rotation.y = movingRight ? Math.PI / 2 : -Math.PI / 2;

          const stepTime = Date.now() * 0.0036 + i * 1.5;
          const stride = Math.sin(stepTime);

          const lHip = npc.getObjectByName("npcLeftHip");
          const rHip = npc.getObjectByName("npcRightHip");
          const lKnee = npc.getObjectByName("npcLeftKnee");
          const rKnee = npc.getObjectByName("npcRightKnee");
          const lArm = npc.getObjectByName("npcLeftArm");
          const rArm = npc.getObjectByName("npcRightArm");

          if (lHip && rHip && lKnee && rKnee) {
            lHip.rotation.x = stride * 0.42;
            lKnee.rotation.x = stride < 0 ? -stride * 0.65 : 0;
            rHip.rotation.x = -stride * 0.42;
            rKnee.rotation.x = stride > 0 ? stride * 0.65 : 0;
          }

          if (lArm && rArm) {
            lArm.rotation.x = -stride * 0.35;
            rArm.rotation.x = stride * 0.35;
          }

          npc.position.y = Math.abs(Math.sin(stepTime * 2)) * 0.02;
        });
      }

      // Update Camera Position & Orientation
      const eyeHeight = this.isFloorCrawling ? 0.28 : 1.05;
      const camHeight = this.isFloorCrawling ? 1.0 : 2.0;
      const camDist = this.isFloorCrawling ? 2.2 : 3.8;

      if (this.cameraViewMode === 'third_person') {
        const targetCamX = this.riderPos.x + Math.sin(this.riderYaw) * camDist;
        const targetCamZ = this.riderPos.z + Math.cos(this.riderYaw) * camDist;
        const targetCamY = this.riderPos.y + camHeight;

        this.vrCamera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.12);
        this.vrCamera.lookAt(this.riderPos.x, this.riderPos.y + (this.isFloorCrawling ? 0.2 : 0.85), this.riderPos.z);

      } else if (this.cameraViewMode === 'first_person') {
        this.vrCamera.position.set(this.riderPos.x, this.riderPos.y + eyeHeight, this.riderPos.z);

        if (this.isVRBoxStereoMode && (this.gyroYaw !== 0 || this.gyroPitch !== 0)) {
          this.vrCamera.rotation.set(this.gyroPitch, this.riderYaw + this.gyroYaw, 0, 'YXZ');
        } else {
          const lookTargetX = this.riderPos.x - Math.sin(this.riderYaw) * 10;
          const lookTargetZ = this.riderPos.z - Math.cos(this.riderYaw) * 10;
          this.vrCamera.lookAt(lookTargetX, this.riderPos.y + eyeHeight, lookTargetZ);
        }

      } else if (this.cameraViewMode === 'drone') {
        this.vrCamera.position.lerp(new THREE.Vector3(0, 14, 14), 0.08);
        this.vrCamera.lookAt(0, 1.5, -2);
      }

      // Stereoscopic VR Box or Standard Mono Viewport Rendering
      const renderW = this.vrRenderer.domElement.clientWidth || 800;
      const renderH = this.vrRenderer.domElement.clientHeight || 580;

      if (this.isVRBoxStereoMode) {
        this.vrRenderer.setScissorTest(true);
        const halfW = Math.floor(renderW / 2);
        const ipd = 0.032;

        this.vrRenderer.setViewport(0, 0, halfW, renderH);
        this.vrRenderer.setScissor(0, 0, halfW, renderH);
        this.vrLeftCamera.aspect = halfW / renderH;
        this.vrLeftCamera.updateProjectionMatrix();
        this.vrLeftCamera.position.copy(this.vrCamera.position);
        this.vrLeftCamera.position.x -= ipd;
        this.vrLeftCamera.quaternion.copy(this.vrCamera.quaternion);
        this.vrRenderer.render(this.vrScene, this.vrLeftCamera);

        this.vrRenderer.setViewport(halfW, 0, halfW, renderH);
        this.vrRenderer.setScissor(halfW, 0, halfW, renderH);
        this.vrRightCamera.aspect = halfW / renderH;
        this.vrRightCamera.updateProjectionMatrix();
        this.vrRightCamera.position.copy(this.vrCamera.position);
        this.vrRightCamera.position.x += ipd;
        this.vrRightCamera.quaternion.copy(this.vrCamera.quaternion);
        this.vrRenderer.render(this.vrScene, this.vrRightCamera);

        this.vrRenderer.setScissorTest(false);

      } else {
        this.vrRenderer.setViewport(0, 0, renderW, renderH);
        this.vrRenderer.clear();
        this.vrRenderer.render(this.vrScene, this.vrCamera);
      }

      // Hotspot glow
      const t = Date.now() * 0.003;
      this.vrHotspots.forEach(m => {
        m.position.y = m.userData.baseY + Math.sin(t + m.position.x) * 0.06;
      });
    };
    animate();
  }

  // ==========================================================================
  // 4. AUTOMATED SHOWCASE TOUR
  // ==========================================================================
  runAutoTourStep() {
    this.autoTourStep += 1;

    if (this.autoTourStep < 200) {
      this.riderSpeed = 0.045;
      this.riderYaw = 0;

    } else if (this.autoTourStep < 300) {
      this.riderSpeed = 0;
      if (this.autoTourStep === 290 && !this.isAccessibleVR) {
        this.toggleRealityMode();
      }

    } else if (this.autoTourStep < 540) {
      this.riderSpeed = 0.038;
      this.riderYaw = 0;

    } else {
      this.riderSpeed = 0;
      if (this.autoTourStep === 550) {
        this.audioSynth.playDiscoveryChime();
      }
      if (this.autoTourStep > 660) {
        this.stopAutoTour();
      }
    }
  }

  // ==========================================================================
  // 5. 3D HOSPITAL EMERGENCY TRAUMA COMPLEX
  // ==========================================================================
  build3DHospitalComplex() {
    this.vrHotspots = [];

    // 1. Polished Hospital Tiled Floor
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      map: createHospitalTileTexture(),
      roughness: 0.25,
      metalness: 0.15
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    this.vrScene.add(floorMesh);

    // 2. Hospital Walls (Clean White with Mint-Teal Protective Base)
    const wallMat = new THREE.MeshStandardMaterial({ map: createHospitalWallTexture(), roughness: 0.4 });
    
    // Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(24, 6, 0.4), wallMat);
    backWall.position.set(0, 3, -12);
    this.vrScene.add(backWall);

    // Left & Right Walls
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 6, 24), wallMat);
    leftWall.position.set(-12, 3, 0);
    this.vrScene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 6, 24), wallMat);
    rightWall.position.set(12, 3, 0);
    this.vrScene.add(rightWall);

    // 3. Fluorescent Surgical Ceiling Strip Lights
    for (let zPos of [-7, 0, 7]) {
      const lampHousing = new THREE.Mesh(new THREE.BoxGeometry(10, 0.1, 0.6), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      lampHousing.position.set(0, 5.8, zPos);
      this.vrScene.add(lampHousing);

      const lampTube = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.05, 0.4), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1.2 }));
      lampTube.position.set(0, 5.75, zPos);
      this.vrScene.add(lampTube);
    }

    // 4. Emergency Signboard
    const emergSign = new THREE.Mesh(new THREE.BoxGeometry(5.5, 1.0, 0.15), new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0xdc2626, emissiveIntensity: 0.7 }));
    emergSign.position.set(0, 4.8, -11.7);
    this.vrScene.add(emergSign);

    // 5. Hospital Triage Reception Desk (1.2m Unreachable Counter)
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });
    const glassBarrierMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, roughness: 0.1 });

    const deskBody = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.2, 1.4), deskMat);
    deskBody.position.set(5.5, 0.6, -7);
    deskBody.castShadow = true;
    this.vrScene.add(deskBody);

    const glassPartition = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.9, 0.06), glassBarrierMat);
    glassPartition.position.set(5.5, 1.65, -6.4);
    this.vrScene.add(glassPartition);

    // Nurse PC Monitor
    const monitor = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 0.08), new THREE.MeshStandardMaterial({ color: 0x090e1a }));
    monitor.position.set(5.5, 1.45, -7.1);
    this.vrScene.add(monitor);

    // 6. Inpatient Hospital Beds (High 0.85m Bed Hazard vs Lowered 0.45m Accessible Bed)
    const bedHeight = this.isAccessibleVR ? 0.48 : 0.85;
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });
    const sheetMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.6 });
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });

    [[-6.5, -6], [-6.5, 0], [-6.5, 6]].forEach((pos, idx) => {
      const bedGroup = new THREE.Group();
      bedGroup.position.set(pos[0], 0, pos[1]);

      // Frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.2), steelMat);
      frame.position.y = bedHeight;
      frame.castShadow = true;
      bedGroup.add(frame);

      // Mattress & Blanket
      const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.22, 1.15), sheetMat);
      mattress.position.y = bedHeight + 0.16;
      bedGroup.add(mattress);

      // Pillow
      const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.1, 0.8), pillowMat);
      pillow.position.set(-0.85, bedHeight + 0.3, 0);
      bedGroup.add(pillow);

      // Legs
      for (let lx of [-1.1, 1.1]) {
        for (let lz of [-0.55, 0.55]) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, bedHeight, 8), steelMat);
          leg.position.set(lx, bedHeight / 2, lz);
          bedGroup.add(leg);
        }
      }

      // Bed Side Rails (Barrier on high bed vs transfer gap on accessible bed)
      if (!this.isAccessibleVR) {
        const sideRail = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 0.04), steelMat);
        sideRail.position.set(0.1, bedHeight + 0.4, 0.58);
        bedGroup.add(sideRail);
      }

      this.vrScene.add(bedGroup);
    });

    // 7. Medical IV Drip Stands
    [[-4.8, -6], [-4.8, 0], [-4.8, 6]].forEach(pos => {
      const ivPole = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 2.4, 8), steelMat);
      ivPole.position.set(pos[0], 1.2, pos[1] - 0.7);
      this.vrScene.add(ivPole);

      const ivBag = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.28, 0.08), new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 }));
      ivBag.position.set(pos[0], 2.2, pos[1] - 0.7);
      this.vrScene.add(ivBag);
    });

    // 8. ICU Vital Signs ECG Monitors
    [[-4.8, -4.5], [-4.8, 1.5]].forEach(pos => {
      const ecgPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8, 8), steelMat);
      ecgPole.position.set(pos[0], 0.9, pos[1]);
      this.vrScene.add(ecgPole);

      const screenBox = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.1), new THREE.MeshStandardMaterial({ map: createECGScreenTexture() }));
      screenBox.position.set(pos[0], 1.7, pos[1]);
      this.vrScene.add(screenBox);
    });

    // 9. Stretcher Trolley & Crash Cart
    const trolley = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.75, 0.9), steelMat);
    trolley.position.set(5.5, 0.4, 2);
    this.vrScene.add(trolley);

    const oxyBottle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.65, 12), new THREE.MeshStandardMaterial({ color: 0x10b981 }));
    oxyBottle.position.set(5.5, 0.9, 1.6);
    this.vrScene.add(oxyBottle);

    // 10. Doctor & Nurse Staff NPCs
    this.buildHospitalStaffNPCs();

    // 11. Hospital Barriers Hotspots
    const hospitalHotspots = [
      {
        id: "bed-hs",
        title: "Inaccessible 0.85m High Hospital Bed",
        position: [-6.5, 1.2, 0],
        problem: "Hospital bed is 0.85m high with locked side-rails and no transfer board. A patient on the floor or standard wheelchair cannot self-transfer, forcing humiliating manual lifting.",
        solution: "Motorized height-adjustable hospital bed (380mm to 850mm range) with collapsible side rails and ceiling transfer hoist.",
        cost: "₹85,000",
        affects: "Wheelchair patients, Paraplegia, Polio survivors",
        rpwdCode: "RPWD Health Infrastructure Sec 25"
      },
      {
        id: "triage-hs",
        title: "Unreachable 1.2m Triage Reception Desk",
        position: [5.5, 1.5, -7],
        problem: "Glass inquiry counter is at standing eye-level. A person crawling or in a low wheelchair cannot see the receptionist, submit documents, or speak through the high microphone.",
        solution: "Dual-height 750mm lowered reception counter bay with 480mm deep knee clearance and low-level intercom speaker.",
        cost: "₹32,000",
        affects: "Low mobility, Wheelchair users, Floor crawl survivors",
        rpwdCode: "Harmonised Guidelines 2021 Sec 6.2"
      },
      {
        id: "floor-hs",
        title: "Slippery Polished Tiles & No Grab Rails",
        position: [0, 0.5, 0],
        problem: "High-gloss slippery ceramic tiles create dangerous friction for crawling or crutch walking, with zero wall-mounted support grab bars along corridors.",
        solution: "Anti-skid R11-rated matte medical vinyl flooring + continuous 38mm stainless steel handrails along all corridors at 750mm and 900mm.",
        cost: "₹45,000 per 50m",
        affects: "Crutch walkers, Lower limb amputees, Crawling patients",
        rpwdCode: "NBC 2016 Part 3 Clause 4.2"
      }
    ];

    hospitalHotspots.forEach(hs => {
      const geo = new THREE.SphereGeometry(0.18, 12, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: this.isAccessibleVR ? 0x10b981 : 0xef4444,
        emissive: this.isAccessibleVR ? 0x10b981 : 0xef4444,
        emissiveIntensity: 0.95,
        roughness: 0.2
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...hs.position);
      mesh.userData = { data: hs, baseY: hs.position[1] };
      this.vrScene.add(mesh);
      this.vrHotspots.push(mesh);
    });
  }

  buildHospitalStaffNPCs() {
    // Doctor NPC in White Coat
    const docGroup = new THREE.Group();
    docGroup.position.set(4.5, 0, -5.5);

    const docHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), new THREE.MeshStandardMaterial({ color: 0xdeb887 }));
    docHead.position.y = 1.55;
    docGroup.add(docHead);

    const docCoat = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.85, 0.24), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }));
    docCoat.position.y = 1.05;
    docGroup.add(docCoat);

    const stetho = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.015, 8, 16), new THREE.MeshStandardMaterial({ color: 0x090e1a }));
    stetho.position.set(0, 1.35, 0.1);
    docGroup.add(stetho);

    this.vrScene.add(docGroup);

    // Nurse NPC in Turquoise Scrubs
    const nurseGroup = new THREE.Group();
    nurseGroup.position.set(-3.5, 0, -2);

    const nurseHead = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 16), new THREE.MeshStandardMaterial({ color: 0xdeb887 }));
    nurseHead.position.y = 1.52;
    nurseGroup.add(nurseHead);

    const nurseScrubs = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.5, 0.22), new THREE.MeshStandardMaterial({ color: 0x0d9488, roughness: 0.6 }));
    nurseScrubs.position.y = 1.15;
    nurseGroup.add(nurseScrubs);

    this.vrScene.add(nurseGroup);
  }

  // ==========================================================================
  // 6. FLOOR CRAWLING & MOBILITY STRUGGLE CHARACTER RIG ("Ghis Ghis Ke Chalna")
  // ==========================================================================
  build3DCrawlingCharacter() {
    if (this.crawlingCharacterGroup) {
      this.vrScene.remove(this.crawlingCharacterGroup);
    }

    this.crawlingCharacterGroup = new THREE.Group();
    this.vrScene.add(this.crawlingCharacterGroup);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.55 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1f1914, roughness: 0.8 });
    const hoodieMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.7 });
    const jeansMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.75 });
    const shoesMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });

    // Prone Torso on the Floor
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.2, 0.54), hoodieMat);
    torso.position.set(0, 0.14, 0);
    torso.rotation.x = -0.15;
    torso.castShadow = true;
    this.crawlingCharacterGroup.add(torso);

    // Strained Lifted Head Looking Upward
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.28, -0.32);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), skinMat);
    head.scale.set(0.95, 1.1, 1.0);
    head.rotation.x = -0.3; // Looking up at high desks and beds
    headGroup.add(head);

    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.125, 14, 14, 0, Math.PI * 2, 0, Math.PI / 1.7), hairMat);
    hair.position.y = 0.02;
    headGroup.add(hair);

    this.crawlingCharacterGroup.add(headGroup);

    // Reaching & Dragging Arms
    for (let side of [-1, 1]) {
      const armGroup = new THREE.Group();
      armGroup.name = side === -1 ? "crawlLeftArm" : "crawlRightArm";
      armGroup.position.set(side * 0.22, 0.12, -0.15);

      const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.28, 8), hoodieMat);
      upperArm.position.set(0, 0, -0.14);
      upperArm.rotation.x = Math.PI / 2;
      armGroup.add(upperArm);

      const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.28, 8), hoodieMat);
      forearm.position.set(0, 0, -0.38);
      forearm.rotation.x = Math.PI / 2;
      armGroup.add(forearm);

      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.1), skinMat);
      hand.position.set(0, -0.02, -0.54);
      armGroup.add(hand);

      this.crawlingCharacterGroup.add(armGroup);
    }

    // Dragging Legs on Floor
    for (let side of [-1, 1]) {
      const legGroup = new THREE.Group();
      legGroup.name = side === -1 ? "crawlLeftLeg" : "crawlRightLeg";
      legGroup.position.set(side * 0.11, 0.1, 0.26);

      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.42, 10), jeansMat);
      thigh.position.set(0, 0, 0.2);
      thigh.rotation.x = Math.PI / 2 + 0.1;
      legGroup.add(thigh);

      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.4, 10), jeansMat);
      shin.position.set(0, 0, 0.58);
      shin.rotation.x = Math.PI / 2 + 0.1;
      legGroup.add(shin);

      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.18), shoesMat);
      shoe.position.set(0, 0.02, 0.8);
      legGroup.add(shoe);

      this.crawlingCharacterGroup.add(legGroup);
    }
  }

  animateCrawlingMotion() {
    if (!this.crawlingCharacterGroup) return;

    const la = this.crawlingCharacterGroup.getObjectByName("crawlLeftArm");
    const ra = this.crawlingCharacterGroup.getObjectByName("crawlRightArm");
    const ll = this.crawlingCharacterGroup.getObjectByName("crawlLeftLeg");
    const rl = this.crawlingCharacterGroup.getObjectByName("crawlRightLeg");

    const pull = Math.sin(this.crawlCycle);

    if (la && ra) {
      la.position.z = -0.15 + pull * 0.22;
      ra.position.z = -0.15 - pull * 0.22;
    }

    if (ll && rl) {
      ll.rotation.z = pull * 0.15;
      rl.rotation.z = -pull * 0.15;
    }
  }

  build3DParkedWheelchair() {
    if (this.parkedWheelchairGroup) {
      this.vrScene.remove(this.parkedWheelchairGroup);
    }

    this.parkedWheelchairGroup = new THREE.Group();
    // Parked near dismount spot
    this.parkedWheelchairGroup.position.set(this.riderPos.x + 0.8, 0, this.riderPos.z + 0.8);
    this.parkedWheelchairGroup.rotation.y = this.riderYaw + 0.4;
    this.vrScene.add(this.parkedWheelchairGroup);

    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 });
    const blackRubberMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 });
    const leatherSeatMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });

    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.07, 0.5), leatherSeatMat);
    seat.position.set(0, 0.48, 0);
    this.parkedWheelchairGroup.add(seat);

    const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.52, 0.06), leatherSeatMat);
    back.position.set(0, 0.76, 0.23);
    this.parkedWheelchairGroup.add(back);

    for (let side of [-1, 1]) {
      const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.034, 12, 32), blackRubberMat);
      wheel.position.set(side * 0.31, 0.42, 0.12);
      wheel.rotation.y = Math.PI / 2;
      this.parkedWheelchairGroup.add(wheel);
    }
  }

  // ==========================================================================
  // 7. 3D WHEELCHAIR & HUMAN RIDER (Active Driving Rig)
  // ==========================================================================
  build3DWheelchairRider() {
    if (this.riderCharacterGroup) {
      this.vrScene.remove(this.riderCharacterGroup);
    }

    this.riderCharacterGroup = new THREE.Group();
    this.vrScene.add(this.riderCharacterGroup);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.55 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1f1914, roughness: 0.8 });
    const eyesMat = new THREE.MeshBasicMaterial({ color: 0x090e1a });
    const hoodieMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.65 });
    const innerShirtMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const jeansMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.75 });
    const shoesWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });
    const shoesAccentMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 });
    const blackRubberMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 });
    const leatherSeatMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });

    // Seat
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.07, 0.5), leatherSeatMat);
    seat.position.set(0, 0.48, 0);
    seat.castShadow = true;
    this.riderCharacterGroup.add(seat);

    // Backrest
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.52, 0.06), leatherSeatMat);
    back.position.set(0, 0.76, 0.23);
    back.rotation.x = -0.05;
    back.castShadow = true;
    this.riderCharacterGroup.add(back);

    // Frame
    for (let xOff of [-0.26, 0.26]) {
      const vertTube = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.58, 12), chromeMat);
      vertTube.position.set(xOff, 0.65, 0.24);
      this.riderCharacterGroup.add(vertTube);

      const handleGrip = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.14, 10), blackRubberMat);
      handleGrip.rotation.x = Math.PI / 2;
      handleGrip.position.set(xOff, 0.94, 0.31);
      this.riderCharacterGroup.add(handleGrip);

      const armrest = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.36), blackRubberMat);
      armrest.position.set(xOff, 0.67, 0.02);
      this.riderCharacterGroup.add(armrest);
    }

    // Footrests
    for (let xOff of [-0.13, 0.13]) {
      const footplate = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.18), chromeMat);
      footplate.position.set(xOff, 0.13, -0.34);
      footplate.rotation.x = 0.18;
      this.riderCharacterGroup.add(footplate);
    }

    // Wheels
    for (let side of [-1, 1]) {
      const wheelPivot = new THREE.Group();
      wheelPivot.name = side === -1 ? "leftBigWheel" : "rightBigWheel";
      wheelPivot.position.set(side * 0.31, 0.42, 0.12);

      const innerGroup = new THREE.Group();
      innerGroup.rotation.y = Math.PI / 2;

      const tire = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.034, 16, 36), blackRubberMat);
      tire.castShadow = true;
      innerGroup.add(tire);

      const pushRim = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.016, 10, 32), chromeMat);
      pushRim.position.z = side * 0.035;
      innerGroup.add(pushRim);

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.07, 16), chromeMat);
      hub.rotation.x = Math.PI / 2;
      innerGroup.add(hub);

      for (let s = 0; s < 12; s++) {
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.74, 4), chromeMat);
        spoke.rotation.z = (s * Math.PI) / 6;
        innerGroup.add(spoke);
      }

      wheelPivot.add(innerGroup);
      this.riderCharacterGroup.add(wheelPivot);
    }

    // Casters
    for (let side of [-0.21, 0.21]) {
      const casterPivot = new THREE.Group();
      casterPivot.name = side === -0.21 ? "leftFrontCaster" : "rightFrontCaster";
      casterPivot.position.set(side, 0.08, -0.28);

      const casterWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.035, 16), blackRubberMat);
      casterWheel.rotation.z = Math.PI / 2;
      casterPivot.add(casterWheel);

      this.riderCharacterGroup.add(casterPivot);
    }

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.28, 0.15);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.125, 20, 20), skinMat);
    head.scale.set(0.95, 1.15, 1.05);
    head.castShadow = true;
    headGroup.add(head);

    const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.7), hairMat);
    hairTop.position.set(0, 0.03, -0.01);
    headGroup.add(hairTop);

    for (let eyeSide of [-0.045, 0.045]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), eyesMat);
      eye.position.set(eyeSide, 0.03, -0.12);
      headGroup.add(eye);
    }

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.12, 12), skinMat);
    neck.position.set(0, 1.16, 0.15);
    this.riderCharacterGroup.add(neck);

    this.riderCharacterGroup.add(headGroup);

    // Torso
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.32, 0.26), hoodieMat);
    chest.position.set(0, 1.02, 0.15);
    chest.castShadow = true;
    this.riderCharacterGroup.add(chest);

    const belly = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.25), hoodieMat);
    belly.position.set(0, 0.78, 0.14);
    belly.castShadow = true;
    this.riderCharacterGroup.add(belly);

    // Legs
    for (let side of [-0.11, 0.11]) {
      const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.13, 0.44), jeansMat);
      thigh.position.set(side, 0.52, -0.07);
      thigh.castShadow = true;
      this.riderCharacterGroup.add(thigh);

      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.36, 12), jeansMat);
      shin.position.set(side, 0.31, -0.29);
      shin.castShadow = true;
      this.riderCharacterGroup.add(shin);

      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.2), shoesAccentMat);
      shoe.position.set(side, 0.14, -0.34);
      this.riderCharacterGroup.add(shoe);
    }

    // Arms
    for (let side of [-1, 1]) {
      const armGroup = new THREE.Group();
      armGroup.name = side === -1 ? "leftRiderArm" : "rightRiderArm";
      armGroup.position.set(side * 0.24, 1.1, 0.15);

      const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.046, 0.28, 12), hoodieMat);
      upperArm.position.set(side * 0.03, -0.12, -0.05);
      upperArm.rotation.x = 0.6;
      armGroup.add(upperArm);

      const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.038, 0.26, 12), hoodieMat);
      forearm.position.set(side * 0.06, -0.27, -0.16);
      forearm.rotation.x = 0.95;
      armGroup.add(forearm);

      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.035, 0.08), skinMat);
      hand.position.set(side * 0.08, -0.37, -0.22);
      armGroup.add(hand);

      this.riderCharacterGroup.add(armGroup);
    }
  }

  animateRiderWheelsAndArms() {
    if (!this.riderCharacterGroup) return;

    const lw = this.riderCharacterGroup.getObjectByName("leftBigWheel");
    const rw = this.riderCharacterGroup.getObjectByName("rightBigWheel");
    if (lw) lw.rotation.x = this.wheelRotation;
    if (rw) rw.rotation.x = this.wheelRotation;

    const lfc = this.riderCharacterGroup.getObjectByName("leftFrontCaster");
    const rfc = this.riderCharacterGroup.getObjectByName("rightFrontCaster");
    if (lfc) lfc.rotation.x = this.wheelRotation * 3.5;
    if (rfc) rfc.rotation.x = this.wheelRotation * 3.5;

    const la = this.riderCharacterGroup.getObjectByName("leftRiderArm");
    const ra = this.riderCharacterGroup.getObjectByName("rightRiderArm");
    if (la && ra) {
      la.rotation.x = this.armPushAngle;
      ra.rotation.x = this.armPushAngle;
    }
  }

  // ==========================================================================
  // 8. 3D BLIND STUDENT CHARACTER
  // ==========================================================================
  build3DBlindStudent() {
    this.blindStudentGroup = new THREE.Group();
    this.blindStudentGroup.position.set(7.5, 0, -2);
    this.vrScene.add(this.blindStudentGroup);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.55 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x221811, roughness: 0.8 });
    const poloMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.6 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
    const glassesMat = new THREE.MeshStandardMaterial({ color: 0x090e1a, metalness: 0.8 });
    const shoesMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), skinMat);
    head.position.y = 1.55;
    this.blindStudentGroup.add(head);

    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.126, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.8), hairMat);
    hair.position.set(0, 1.58, 0);
    this.blindStudentGroup.add(hair);

    const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.045, 0.06), glassesMat);
    glasses.position.set(0, 1.56, -0.11);
    this.blindStudentGroup.add(glasses);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.52, 0.22), poloMat);
    torso.position.y = 1.15;
    this.blindStudentGroup.add(torso);

    for (let side of [-1, 1]) {
      const hipGroup = new THREE.Group();
      hipGroup.name = side === -1 ? "blindLeftHip" : "blindRightHip";
      hipGroup.position.set(side * 0.1, 0.88, 0);

      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.058, 0.42, 12), pantsMat);
      thigh.position.y = -0.21;
      hipGroup.add(thigh);

      const kneeGroup = new THREE.Group();
      kneeGroup.name = side === -1 ? "blindLeftKnee" : "blindRightKnee";
      kneeGroup.position.set(0, -0.42, 0);

      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.4, 12), pantsMat);
      shin.position.y = -0.2;
      kneeGroup.add(shin);

      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.06, 0.19), shoesMat);
      shoe.position.set(0, -0.42, 0.04);
      kneeGroup.add(shoe);

      hipGroup.add(kneeGroup);
      this.blindStudentGroup.add(hipGroup);
    }

    const caneGroup = new THREE.Group();
    caneGroup.name = "blindCane";
    caneGroup.position.set(0.16, 0.8, -0.15);

    const caneRod = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.3, 10), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8 }));
    caneRod.rotation.x = Math.PI / 4;
    caneRod.position.set(0, -0.4, -0.4);
    caneGroup.add(caneRod);

    const redTip = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.25, 10), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.3 }));
    redTip.position.set(0, -0.45, 0);
    caneRod.add(redTip);

    this.blindStudentGroup.add(caneGroup);
  }

  // ==========================================================================
  // 9. WALKING STUDENT PEDESTRIAN NPCs
  // ==========================================================================
  buildWalkingNPCs() {
    this.pedestrianNPCs = [];
    const npcColors = [0xd946ef, 0xf59e0b, 0x06b6d4, 0xec4899];

    [[-8, 4], [9, 2], [-11, 8], [11, 7]].forEach((pos, idx) => {
      const npc = new THREE.Group();
      npc.position.set(pos[0], 0, pos[1]);
      npc.userData = { originX: pos[0] };

      const skinMat = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.55 });
      const hairMat = new THREE.MeshStandardMaterial({ color: 0x1f1914 });
      const topMat = new THREE.MeshStandardMaterial({ color: npcColors[idx], roughness: 0.6 });
      const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
      const backpackMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
      const shoesMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 14, 14), skinMat);
      head.position.y = 1.55;
      npc.add(head);

      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14, 0, Math.PI * 2, 0, Math.PI / 1.8), hairMat);
      hair.position.set(0, 1.57, 0);
      npc.add(hair);

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.5, 0.22), topMat);
      body.position.y = 1.15;
      npc.add(body);

      const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.36, 0.14), backpackMat);
      backpack.position.set(0, 1.18, 0.15);
      npc.add(backpack);

      for (let side of [-1, 1]) {
        const hipGroup = new THREE.Group();
        hipGroup.name = side === -1 ? "npcLeftHip" : "npcRightHip";
        hipGroup.position.set(side * 0.09, 0.88, 0);

        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.42, 10), pantsMat);
        thigh.position.y = -0.21;
        hipGroup.add(thigh);

        const kneeGroup = new THREE.Group();
        kneeGroup.name = side === -1 ? "npcLeftKnee" : "npcRightKnee";
        kneeGroup.position.set(0, -0.42, 0);

        const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.042, 0.4, 10), pantsMat);
        shin.position.y = -0.2;
        kneeGroup.add(shin);

        const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.06, 0.19), shoesMat);
        shoe.position.set(0, -0.42, 0.04);
        kneeGroup.add(shoe);

        hipGroup.add(kneeGroup);
        npc.add(hipGroup);
      }

      for (let side of [-1, 1]) {
        const armGroup = new THREE.Group();
        armGroup.name = side === -1 ? "npcLeftArm" : "npcRightArm";
        armGroup.position.set(side * 0.22, 1.34, 0);

        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.038, 0.46, 10), topMat);
        arm.position.y = -0.23;
        armGroup.add(arm);

        npc.add(armGroup);
      }

      this.vrScene.add(npc);
      this.pedestrianNPCs.push(npc);
    });
  }

  // ==========================================================================
  // 10. CAMPUS PLAZA ENVIRONMENT
  // ==========================================================================
  buildExpansiveCampus() {
    this.vrHotspots = [];

    const floorGeo = new THREE.PlaneGeometry(100, 100);
    const floorMat = new THREE.MeshStandardMaterial({ map: createAsphaltTexture(), roughness: 0.85, metalness: 0.1 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    this.vrScene.add(floorMesh);

    const grassMat = new THREE.MeshStandardMaterial({ map: createGrassTexture(), roughness: 0.9 });
    for (let xPos of [-18, 18]) {
      const lawn = new THREE.Mesh(new THREE.PlaneGeometry(16, 80), grassMat);
      lawn.rotation.x = -Math.PI / 2;
      lawn.position.set(xPos, 0.02, 0);
      lawn.receiveShadow = true;
      this.vrScene.add(lawn);
    }

    const brickMat = new THREE.MeshStandardMaterial({ map: createBrickTexture(), roughness: 0.8 });
    const mainWall = new THREE.Mesh(new THREE.BoxGeometry(32, 14, 1.8), brickMat);
    mainWall.position.set(0, 7, -9.2);
    mainWall.receiveShadow = true;
    mainWall.castShadow = true;
    this.vrScene.add(mainWall);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.2 });
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(12, 0.4, 4.5), frameMat);
    canopy.position.set(0, 5.5, -7.2);
    this.vrScene.add(canopy);

    const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35, roughness: 0.1 });
    const doorGlass = new THREE.Mesh(new THREE.BoxGeometry(5, 4.8, 0.1), glassMat);
    doorGlass.position.set(0, 2.4, -8.2);
    this.vrScene.add(doorGlass);

    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(11, 1.4, 0.25), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 }));
    signBoard.position.set(0, 6.6, -8.2);
    this.vrScene.add(signBoard);

    // Trees
    for (let pos of [[-9, -3], [9, -3], [-10, 5], [10, 5], [-12, 11], [12, 11]]) {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.9 }));
      trunk.position.set(pos[0], 1.6, pos[1]);
      trunk.castShadow = true;
      this.vrScene.add(trunk);

      const leaf = new THREE.Mesh(new THREE.DodecahedronGeometry(1.6, 1), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 }));
      leaf.position.set(pos[0], 4.0, pos[1]);
      leaf.castShadow = true;
      this.vrScene.add(leaf);
    }

    // Tactile Ground Path
    const tactileMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 24), new THREE.MeshStandardMaterial({ map: createTactilePaverTexture(), roughness: 0.5 }));
    tactileMesh.rotation.x = -Math.PI / 2;
    tactileMesh.position.set(7.5, 0.025, 0);
    this.vrScene.add(tactileMesh);

    // Reality Switch Geometry (Stairs Hazard vs 1:12 Ramp)
    if (this.isAccessibleVR) {
      const ramp = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.14, 8.5), new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.6 }));
      ramp.rotation.x = Math.PI / 22;
      ramp.position.set(-3.5, 0.58, -4.5);
      ramp.receiveShadow = true;
      this.vrScene.add(ramp);
    } else {
      for (let i = 0; i < 4; i++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.35, 0.9), new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 }));
        step.position.set(-3.5, 0.175 + (i * 0.35), -3.2 - (i * 0.9));
        step.castShadow = true;
        step.receiveShadow = true;
        this.vrScene.add(step);
      }
    }

    const hotspots = [
      {
        id: "ramp-hs",
        title: "Academic Block 1:4 Stairs Hazard",
        position: [-3.5, 0.9, -4.5],
        problem: "Steep 1:4 concrete stairs with no gentle slope. Wheelchair users risk tipping backward and severe spinal injury.",
        solution: "Universal 1:12 slope ramp with dual-height continuous 304 stainless steel handrails (750mm & 900mm).",
        cost: "₹65,000 – ₹95,000",
        affects: "Wheelchair users, Crutch users",
        rpwdCode: "Harmonised Guidelines 2021 Sec 3.2"
      },
      {
        id: "door-hs",
        title: "Heavy Double-Leaf Glass Doors (42N)",
        position: [0, 1.4, -8],
        problem: "Heavy manual push doors require 42N force to open, blocking independent wheelchair entry.",
        solution: "Automated motion-activated sliding glass entrance with 1200mm clear passage.",
        cost: "₹75,000",
        affects: "Wheelchair users, Tremor/Parkinson's students",
        rpwdCode: "NBC 2016 Part 3"
      }
    ];

    hotspots.forEach(hs => {
      const geo = new THREE.SphereGeometry(0.18, 12, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: this.isAccessibleVR ? 0x10b981 : 0xef4444,
        emissive: this.isAccessibleVR ? 0x10b981 : 0xef4444,
        emissiveIntensity: 0.95,
        roughness: 0.2
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...hs.position);
      mesh.userData = { data: hs, baseY: hs.position[1] };
      this.vrScene.add(mesh);
      this.vrHotspots.push(mesh);
    });
  }

  toggleRealityMode() {
    this.isAccessibleVR = !this.isAccessibleVR;
    const btn = document.getElementById('reality-switch-trigger');
    if (btn) {
      if (this.isAccessibleVR) {
        btn.classList.add('accessible-active');
        btn.innerHTML = `<span>♿</span> Universal Solution Active`;
      } else {
        btn.classList.remove('accessible-active');
        btn.innerHTML = `<span>⚠️</span> Barriered State (Click to Fix)`;
      }
    }
    this.initVREngine();
  }

  openHotspotModal(hotspot) {
    const modal = document.getElementById('vr-hotspot-modal');
    const backdrop = document.getElementById('vr-hotspot-backdrop');
    if (!modal || !backdrop) return;

    this.audioSynth.playDiscoveryChime();

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
        <div>
          <span style="display:inline-block; padding:4px 10px; border-radius:999px; font-size:11px; font-weight:800; background:${this.isAccessibleVR ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color:${this.isAccessibleVR ? '#6ee7b7' : '#fca5a5'};">
            ${this.isAccessibleVR ? '✓ Verified Universal Architecture Solution' : '⚠️ Lived Environmental Barrier Hazard'}
          </span>
          <h3 style="font-size:1.4rem; color:#ffffff; margin-top:6px;">${hotspot.title}</h3>
        </div>
        <button onclick="document.getElementById('vr-hotspot-backdrop').classList.remove('active')" class="btn btn-secondary btn-sm">✕</button>
      </div>

      <div style="background:rgba(30,41,59,0.85); padding:16px; border-radius:8px; border-left:4px solid ${this.isAccessibleVR ? '#10b981' : '#ef4444'}; margin-bottom:16px;">
        <strong style="color:#ffffff; display:block; margin-bottom:4px;">${this.isAccessibleVR ? 'Universal Engineering Fix:' : 'Lived Impact:'}</strong>
        <p style="color:#e2e8f0; font-size:0.95rem; line-height:1.5;">${this.isAccessibleVR ? hotspot.solution : hotspot.problem}</p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px; font-size:0.85rem;">
        <div style="background:rgba(15,23,42,0.8); padding:10px; border-radius:6px; color:#cbd5e1;">
          <span style="display:block; color:#94a3b8; font-size:0.75rem;">Affected Groups:</span>
          <strong style="color:#ffffff;">${hotspot.affects}</strong>
        </div>
        <div style="background:rgba(15,23,42,0.8); padding:10px; border-radius:6px; color:#cbd5e1;">
          <span style="display:block; color:#94a3b8; font-size:0.75rem;">Estimated Fix Cost:</span>
          <strong style="color:#10b981;">${hotspot.cost}</strong>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="color:#cbd5e1; font-size:0.82rem;">📜 ${hotspot.rpwdCode || 'RPWD Act 2016 Compliant'}</span>
        <button onclick="window.lifeLensApp.toggleRealityMode(); document.getElementById('vr-hotspot-backdrop').classList.remove('active');" class="neo-magenta-cta-btn" style="padding:8px 18px; font-size:0.88rem;">
          ${this.isAccessibleVR ? 'View Barriered State' : 'View Universal Solution'}
        </button>
      </div>
    `;

    backdrop.classList.add('active');
  }

  // ==========================================================================
  // 11. ACCESSIBILITY SUITE
  // ==========================================================================
  bindA11ySuite() {
    const trigger = document.getElementById('a11y-toggle-btn');
    const drawer = document.getElementById('a11y-drawer');
    const backdrop = document.getElementById('a11y-backdrop');
    const closeBtn = document.getElementById('a11y-close-btn');

    const openDrawer = () => {
      if (drawer && backdrop) {
        drawer.classList.add('active');
        backdrop.classList.add('active');
      }
    };

    const closeDrawer = () => {
      if (drawer && backdrop) {
        drawer.classList.remove('active');
        backdrop.classList.remove('active');
      }
    };

    if (trigger) trigger.onclick = openDrawer;
    if (closeBtn) closeBtn.onclick = closeDrawer;
    if (backdrop) backdrop.onclick = closeDrawer;

    document.querySelectorAll('[data-a11y-font]').forEach(btn => {
      btn.onclick = (e) => {
        document.querySelectorAll('[data-a11y-font]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const scale = e.currentTarget.getAttribute('data-a11y-font');
        document.body.classList.remove('text-scale-100', 'text-scale-120', 'text-scale-140');
        document.body.classList.add(`text-scale-${scale}`);
      };
    });

    document.querySelectorAll('[data-a11y-contrast]').forEach(btn => {
      btn.onclick = (e) => {
        document.querySelectorAll('[data-a11y-contrast]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const mode = e.currentTarget.getAttribute('data-a11y-contrast');
        document.body.classList.remove('theme-high-contrast-dark', 'theme-high-contrast-light');
        if (mode === 'high-dark') document.body.classList.add('theme-high-contrast-dark');
        if (mode === 'high-light') document.body.classList.add('theme-high-contrast-light');
      };
    });

    document.getElementById('a11y-dyslexic-toggle')?.addEventListener('change', (e) => {
      document.body.classList.toggle('font-dyslexic', e.target.checked);
    });
  }
}

// Global Execution
window.lifeLensApp = new LifeLensVRApp();
window.barrierApp = window.lifeLensApp;
window.barrierVerseApp = window.lifeLensApp;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.lifeLensApp.init());
} else {
  window.lifeLensApp.init();
}
