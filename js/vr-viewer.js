/**
 * BarrierVerse - 3D WebXR & VR Simulation Engine (Three.js Powered)
 * Dynamic Scenario Loading, Reality Switch Transitions, and 3D Interactive Hotspots
 */

import { VR_SCENARIOS } from './data/vr-scenarios.js';
import { a11ySuite } from './accessibility.js';

export class VRViewerEngine {
  constructor(containerId = 'vr-canvas-container') {
    this.containerId = containerId;
    this.container = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.currentScenarioId = 'campus';
    this.isAccessibleMode = false;
    
    this.barrieredObjects = [];
    this.accessibleObjects = [];
    this.hotspotMeshes = [];
    this.raycaster = null;
    this.mouse = null;
    this.animationFrameId = null;
    this.controls = null;
    
    this.isDragging = false;
    this.prevMousePos = { x: 0, y: 0 };
    this.cameraRotation = { yaw: 0, pitch: 0 };
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
      this.renderFallback();
      return;
    }

    this.setupThreeScene();
    this.setupRaycaster();
    this.bindControls();
    this.loadScenario(this.currentScenarioId);
    this.animate();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupThreeScene() {
    this.container.innerHTML = '';
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 500;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f172a);
    this.scene.fog = new THREE.FogExp2(0x0f172a, 0.035);

    // Camera
    this.camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    this.camera.position.set(0, 1.6, 5); // Average eye-level height (1.6m)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    // Secondary Accent Light
    const pointLight = new THREE.PointLight(0x3b82f6, 1.5, 30);
    pointLight.position.set(-5, 4, 2);
    this.scene.add(pointLight);
  }

  setupRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.container.addEventListener('click', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.hotspotMeshes);

      if (intersects.length > 0) {
        const clickedHotspot = intersects[0].object.userData.hotspotData;
        this.openHotspotModal(clickedHotspot);
      }
    });
  }

  bindControls() {
    // Mouse Drag Rotation
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.prevMousePos.x;
      const deltaY = e.clientY - this.prevMousePos.y;

      this.cameraRotation.yaw -= deltaX * 0.003;
      this.cameraRotation.pitch -= deltaY * 0.003;
      this.cameraRotation.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.cameraRotation.pitch));

      this.camera.rotation.set(this.cameraRotation.pitch, this.cameraRotation.yaw, 0, 'YXZ');
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    // Touch Support
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    this.container.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.prevMousePos.x;
      const deltaY = e.touches[0].clientY - this.prevMousePos.y;

      this.cameraRotation.yaw -= deltaX * 0.004;
      this.cameraRotation.pitch -= deltaY * 0.004;
      this.camera.rotation.set(this.cameraRotation.pitch, this.cameraRotation.yaw, 0, 'YXZ');
      this.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    this.container.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Keyboard WASD Navigation
    window.addEventListener('keydown', (e) => {
      if (!this.camera) return;
      const speed = 0.3;
      const dir = new THREE.Vector3();
      this.camera.getWorldDirection(dir);
      dir.y = 0;
      dir.normalize();

      const sideDir = new THREE.Vector3().crossVectors(this.camera.up, dir).normalize();

      if (e.key === 'w' || e.key === 'ArrowUp') {
        this.camera.position.addScaledVector(dir, speed);
      } else if (e.key === 's' || e.key === 'ArrowDown') {
        this.camera.position.addScaledVector(dir, -speed);
      } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        this.camera.position.addScaledVector(sideDir, speed);
      } else if (e.key === 'd' || e.key === 'ArrowRight') {
        this.camera.position.addScaledVector(sideDir, -speed);
      }
    });

    // Reality Switch Button
    const realityBtn = document.getElementById('reality-switch-trigger');
    if (realityBtn) {
      realityBtn.addEventListener('click', () => this.toggleRealityMode());
    }
  }

  loadScenario(scenarioId) {
    this.currentScenarioId = scenarioId;
    const scenario = VR_SCENARIOS.find(s => s.id === scenarioId) || VR_SCENARIOS[0];

    // Clear Previous Meshes
    [...this.barrieredObjects, ...this.accessibleObjects, ...this.hotspotMeshes].forEach(obj => {
      this.scene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });

    this.barrieredObjects = [];
    this.accessibleObjects = [];
    this.hotspotMeshes = [];

    // Set Scene Colors
    this.scene.background = new THREE.Color(scenario.environment.skyColor);
    this.scene.fog.color = new THREE.Color(scenario.environment.skyColor);

    // Build Ground
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: scenario.environment.groundColor,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.barrieredObjects.push(ground);

    // Build Architectural Geometry based on Scenario
    this.buildScenarioArchitecture(scenario);

    // Build 3D Hotspot Sprites
    this.buildHotspotNodes(scenario.hotspots);

    // Update UI Elements
    this.updateScenarioUI(scenario);
    this.updateRealityMeshVisibility();

    a11ySuite.announceLive(`Loaded VR Scenario: ${scenario.title}`);
  }

  buildScenarioArchitecture(scenario) {
    const buildingMat = new THREE.MeshStandardMaterial({
      color: scenario.environment.buildingColor,
      roughness: 0.6
    });

    // Main Architectural Back Wall
    const wallGeo = new THREE.BoxGeometry(24, 10, 1);
    const wall = new THREE.Mesh(wallGeo, buildingMat);
    wall.position.set(0, 5, -8);
    this.scene.add(wall);
    this.barrieredObjects.push(wall);

    // Main Entrance Doors
    const doorGeo = new THREE.BoxGeometry(4, 5, 0.4);
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 2.5, -7.4);
    this.scene.add(door);
    this.barrieredObjects.push(door);

    // BARRIERED STATE: Hazardous Steep Ramp / Steps
    const stepsGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const stepGeo = new THREE.BoxGeometry(6, 0.35, 0.8);
      const stepMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
      const step = new THREE.Mesh(stepGeo, stepMat);
      step.position.set(-4, 0.175 + (i * 0.35), -3 - (i * 0.8));
      stepsGroup.add(step);
    }
    this.scene.add(stepsGroup);
    this.barrieredObjects.push(stepsGroup);

    // ACCESSIBLE STATE: Smooth 1:12 Universal Ramp with Rails & Tactile
    const rampGroup = new THREE.Group();
    const rampGeo = new THREE.BoxGeometry(5, 0.1, 7);
    const rampMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.5 });
    const ramp = new THREE.Mesh(rampGeo, rampMat);
    ramp.rotation.x = Math.PI / 18; // 1:12 slope angle (~5 degrees)
    ramp.position.set(-4, 0.6, -4.5);
    rampGroup.add(ramp);

    // Handrails for Accessible Ramp
    const railGeo = new THREE.CylinderGeometry(0.04, 0.04, 7, 12);
    const railMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });
    
    const leftRail = new THREE.Mesh(railGeo, railMat);
    leftRail.rotation.x = Math.PI / 2 + Math.PI / 18;
    leftRail.position.set(-6.2, 1.4, -4.5);
    rampGroup.add(leftRail);

    const rightRail = new THREE.Mesh(railGeo, railMat);
    rightRail.rotation.x = Math.PI / 2 + Math.PI / 18;
    rightRail.position.set(-1.8, 1.4, -4.5);
    rampGroup.add(rightRail);

    // Tactile Ground Path (Yellow guiding tiles)
    const tactileGeo = new THREE.PlaneGeometry(1.2, 9);
    const tactileMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
    const tactilePath = new THREE.Mesh(tactileGeo, tactileMat);
    tactilePath.rotation.x = -Math.PI / 2;
    tactilePath.position.set(0, 0.02, -3);
    rampGroup.add(tactilePath);

    this.scene.add(rampGroup);
    this.accessibleObjects.push(rampGroup);
  }

  buildHotspotNodes(hotspots) {
    hotspots.forEach(hotspot => {
      // Pulsing Glowing 3D Orb for Hotspot
      const hotspotGeo = new THREE.SphereGeometry(0.28, 24, 24);
      const hotspotMat = new THREE.MeshStandardMaterial({
        color: this.isAccessibleMode ? 0x10b981 : 0xef4444,
        emissive: this.isAccessibleMode ? 0x10b981 : 0xef4444,
        emissiveIntensity: 0.8,
        roughness: 0.3
      });

      const hotspotMesh = new THREE.Mesh(hotspotGeo, hotspotMat);
      hotspotMesh.position.set(...hotspot.position);
      hotspotMesh.userData = { hotspotData: hotspot, initialY: hotspot.position[1] };

      // Outer Ring Pulse
      const ringGeo = new THREE.RingGeometry(0.35, 0.42, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: this.isAccessibleMode ? 0x10b981 : 0xef4444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      hotspotMesh.add(ringMesh);

      this.scene.add(hotspotMesh);
      this.hotspotMeshes.push(hotspotMesh);
    });
  }

  toggleRealityMode() {
    this.isAccessibleMode = !this.isAccessibleMode;
    this.updateRealityMeshVisibility();

    const realityBtn = document.getElementById('reality-switch-trigger');
    if (realityBtn) {
      if (this.isAccessibleMode) {
        realityBtn.classList.add('accessible-active');
        realityBtn.innerHTML = `<span>♿</span> Accessible Solution Active`;
        a11ySuite.announceLive('Switched to Accessible Model: 1:12 Ramp, tactile pathways, and dual rails displayed');
      } else {
        realityBtn.classList.remove('accessible-active');
        realityBtn.innerHTML = `<span>⚠️</span> Barriered State (Click to Fix)`;
        a11ySuite.announceLive('Switched to Barriered Model: Steep steps, missing rails and obstacles displayed');
      }
    }

    // Update Hotspot colors
    this.hotspotMeshes.forEach(mesh => {
      const color = this.isAccessibleMode ? 0x10b981 : 0xef4444;
      mesh.material.color.setHex(color);
      mesh.material.emissive.setHex(color);
      if (mesh.children[0]) {
        mesh.children[0].material.color.setHex(color);
      }
    });
  }

  updateRealityMeshVisibility() {
    this.barrieredObjects.forEach(obj => {
      // Keep background wall & ground always, toggle steps
      if (obj.type === 'Group') {
        obj.visible = !this.isAccessibleMode;
      }
    });

    this.accessibleObjects.forEach(obj => {
      obj.visible = this.isAccessibleMode;
    });
  }

  updateScenarioUI(scenario) {
    const titleEl = document.getElementById('vr-active-title');
    const descEl = document.getElementById('vr-active-desc');
    const countEl = document.getElementById('vr-hotspots-count');

    if (titleEl) titleEl.textContent = scenario.title;
    if (descEl) descEl.textContent = scenario.subtitle;
    if (countEl) countEl.textContent = `${scenario.hotspots.length} Barriers Identified`;
  }

  openHotspotModal(hotspot) {
    const modal = document.getElementById('vr-hotspot-modal');
    const backdrop = document.getElementById('vr-hotspot-backdrop');
    if (!modal || !backdrop) return;

    modal.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
        <div>
          <span class="${this.isAccessibleMode ? 'hotspot-badge-success' : 'hotspot-badge-danger'}">
            ${this.isAccessibleMode ? '✓ Verified Accessible Fix' : '⚠️ Physical Barrier Detected'}
          </span>
          <h3 style="font-size: 1.4rem; color: #ffffff;">${hotspot.title}</h3>
        </div>
        <button id="close-hotspot-modal-btn" class="btn btn-secondary btn-sm" aria-label="Close dialog">✕</button>
      </div>

      <div class="hotspot-detail-box" style="border-left-color: ${this.isAccessibleMode ? 'var(--success)' : 'var(--danger)'}">
        <h4>${this.isAccessibleMode ? 'Universal Accessible Solution:' : 'The Barrier in Detail:'}</h4>
        <p>${this.isAccessibleMode ? hotspot.accessibleDesc : hotspot.barrieredDesc}</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
        <div style="background: rgba(30,41,59,0.7); padding: 14px; border-radius: 8px;">
          <strong style="display:block; color: #94a3b8; font-size: 0.8rem; text-transform: uppercase;">Who Is Affected:</strong>
          <span style="color: #f8fafc; font-size: 0.95rem;">${hotspot.affects}</span>
        </div>
        <div style="background: rgba(30,41,59,0.7); padding: 14px; border-radius: 8px;">
          <strong style="display:block; color: #94a3b8; font-size: 0.8rem; text-transform: uppercase;">Estimated Fix Cost:</strong>
          <span style="color: #6ee7b7; font-weight: 800; font-size: 1.05rem;">${hotspot.cost}</span>
        </div>
      </div>

      <div style="background: rgba(15,23,42,0.9); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 20px;">
        <strong style="color: #60a5fa; font-size: 0.85rem;">Mandatory Standard:</strong>
        <p style="font-size: 0.9rem; margin-top: 4px;">${hotspot.guideline}</p>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <a href="#report" class="btn btn-secondary btn-sm">Report Similar Barrier</a>
        <button id="modal-reality-toggle" class="btn btn-primary btn-sm">
          ${this.isAccessibleMode ? 'View Barriered Problem' : 'View Accessible Solution'}
        </button>
      </div>
    `;

    backdrop.classList.add('active');
    modal.focus();

    const closeBtn = document.getElementById('close-hotspot-modal-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        backdrop.classList.remove('active');
      });
    }

    const modalToggle = document.getElementById('modal-reality-toggle');
    if (modalToggle) {
      modalToggle.addEventListener('click', () => {
        this.toggleRealityMode();
        this.openHotspotModal(hotspot); // refresh modal content
      });
    }

    a11ySuite.announceLive(`Barrier detail opened: ${hotspot.title}`);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Pulse Hotspot Spheres
    const time = Date.now() * 0.003;
    this.hotspotMeshes.forEach(mesh => {
      mesh.position.y = mesh.userData.initialY + Math.sin(time + mesh.position.x) * 0.08;
      if (mesh.children[0]) {
        const scale = 1 + Math.sin(time * 2) * 0.2;
        mesh.children[0].scale.set(scale, scale, scale);
      }
    });

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  onWindowResize() {
    if (!this.container || !this.camera || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  renderFallback() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 40px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 16px;">🌐</div>
        <h3 style="margin-bottom: 8px;">Interactive 360° Accessibility Tour</h3>
        <p style="max-width: 500px; margin-bottom: 20px;">WebGL is not enabled in this environment. You can still explore the scenarios, view before/after fixes, and review the accessibility guidelines below.</p>
        <button id="reality-switch-trigger" class="reality-switch-btn">
          <span>⚠️</span> Switch to Accessible Solution
        </button>
      </div>
    `;
  }
}
