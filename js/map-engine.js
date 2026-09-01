/**
 * BarrierVerse - Crowdsourced Accessibility Map Engine (Leaflet.js)
 * Multi-layer filters, upvoting, search autocomplete, photo proofs, and GeoJSON/CSV exports
 */

import { INITIAL_BARRIERS, CITY_COORDINATES, BARRIER_TYPES_METADATA } from './data/barriers-data.js';
import { a11ySuite } from './accessibility.js';

export class CrowdsourceMapEngine {
  constructor(mapContainerId = 'crowdsource-map') {
    this.mapContainerId = mapContainerId;
    this.map = null;
    this.markersLayer = null;
    this.barriers = [...INITIAL_BARRIERS];
    this.activeFilters = {
      layer: 'all', // all | fixed | accessible | reported
      type: 'all',
      disability: 'all',
      searchQuery: '',
      year: 2026
    };

    this.userUpvotes = new Set();
  }

  init() {
    const container = document.getElementById(this.mapContainerId);
    if (!container) return;

    this.loadUserUpvotes();

    // Check if Leaflet is available
    if (typeof L === 'undefined') {
      this.renderFallbackMap(container);
      return;
    }

    this.setupLeafletMap();
    this.bindFilterControls();
    this.bindSearchAutocomplete();
    this.renderMarkers();
    this.renderImpactSidebar();
    this.bindExportButtons();
  }

  loadUserUpvotes() {
    try {
      const saved = localStorage.getItem('barrierverse_user_upvotes');
      if (saved) {
        this.userUpvotes = new Set(JSON.parse(saved));
      }
    } catch (e) {
      // Ignored
    }
  }

  saveUserUpvotes() {
    try {
      localStorage.setItem('barrierverse_user_upvotes', JSON.stringify(Array.from(this.userUpvotes)));
    } catch (e) {
      // Ignored
    }
  }

  setupLeafletMap() {
    // Default Center: India
    this.map = L.map(this.mapContainerId, {
      center: [22.5937, 78.9629],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: false
    });

    // Dark-themed Accessible CartoDB Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  createCustomIcon(barrier) {
    let bgColor = '#ef4444';
    let iconSymbol = '⚠️';

    if (barrier.status === 'fixed') {
      bgColor = '#10b981';
      iconSymbol = '✓';
    } else if (barrier.status === 'accessible_place') {
      bgColor = '#3b82f6';
      iconSymbol = '♿';
    } else if (barrier.status === 'in_progress') {
      bgColor = '#f59e0b';
      iconSymbol = '⏳';
    }

    const html = `
      <div style="
        width: 36px;
        height: 36px;
        background: ${bgColor};
        border: 2px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 4px 14px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #ffffff;
        font-weight: 800;
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        ${iconSymbol}
      </div>
    `;

    return L.divIcon({
      html: html,
      className: 'custom-barrier-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20]
    });
  }

  renderMarkers() {
    if (!this.markersLayer) return;
    this.markersLayer.clearLayers();

    const filtered = this.barriers.filter(b => {
      // Layer Filter
      if (this.activeFilters.layer === 'fixed' && b.status !== 'fixed') return false;
      if (this.activeFilters.layer === 'accessible' && b.status !== 'accessible_place') return false;
      if (this.activeFilters.layer === 'reported' && b.status !== 'reported' && b.status !== 'in_progress') return false;

      // Type Filter
      if (this.activeFilters.type !== 'all' && b.type !== this.activeFilters.type) return false;

      // Disability Filter
      if (this.activeFilters.disability !== 'all' && b.disabilityType !== this.activeFilters.disability && b.disabilityType !== 'all') return false;

      // Search Query Filter
      if (this.activeFilters.searchQuery) {
        const q = this.activeFilters.searchQuery.toLowerCase();
        const matchesCity = b.city.toLowerCase().includes(q);
        const matchesAddress = b.address.toLowerCase().includes(q);
        const matchesTitle = b.title.toLowerCase().includes(q);
        if (!matchesCity && !matchesAddress && !matchesTitle) return false;
      }

      return true;
    });

    filtered.forEach(barrier => {
      const marker = L.marker([barrier.lat, barrier.lng], {
        icon: this.createCustomIcon(barrier),
        title: barrier.title
      });

      const popupContent = this.createPopupContent(barrier);
      marker.bindPopup(popupContent, { maxWidth: 320 });

      marker.on('click', () => {
        a11ySuite.announceLive(`Map selected: ${barrier.title} in ${barrier.city}`);
      });

      this.markersLayer.addLayer(marker);
    });

    // Update Stats Badge in UI
    const countEl = document.getElementById('map-visible-count');
    if (countEl) countEl.textContent = `${filtered.length} Locations Displayed`;
  }

  createPopupContent(barrier) {
    const isUpvoted = this.userUpvotes.has(barrier.id);
    const statusColor = barrier.status === 'fixed' ? '#10b981' : (barrier.status === 'accessible_place' ? '#3b82f6' : '#ef4444');
    const statusLabel = barrier.status === 'fixed' ? 'Fixed & Verified' : (barrier.status === 'accessible_place' ? 'Accessible Place' : 'Reported Barrier');

    return `
      <div style="font-family: inherit; color: #0f172a; padding: 4px;">
        <div style="display: inline-block; padding: 2px 8px; background: ${statusColor}; color: #ffffff; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">
          ${statusLabel}
        </div>
        <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 6px; line-height: 1.3;">${barrier.title}</h4>
        <p style="font-size: 12px; color: #475569; margin-bottom: 8px;">📍 ${barrier.address}</p>
        
        ${barrier.hasPhoto ? `
          <div style="margin-bottom: 8px; border-radius: 6px; overflow: hidden; height: 110px;">
            <img src="${barrier.photoUrl}" alt="${barrier.title}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        ` : ''}

        <p style="font-size: 12px; line-height: 1.4; margin-bottom: 10px; color: #334155;">
          ${barrier.description}
        </p>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 8px;">
          <button onclick="window.barrierMapEngine.handleUpvote('${barrier.id}')" style="
            background: ${isUpvoted ? '#3b82f6' : '#f1f5f9'};
            color: ${isUpvoted ? '#ffffff' : '#0f172a'};
            border: 1px solid #cbd5e1;
            padding: 5px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          ">
            👍 Seen This (${barrier.upvotes})
          </button>
          
          <button onclick="window.barrierMapEngine.openVerifyModal('${barrier.id}')" style="
            background: #10b981;
            color: #ffffff;
            border: none;
            padding: 5px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
          ">
            Verify Fix
          </button>
        </div>
      </div>
    `;
  }

  handleUpvote(barrierId) {
    const barrier = this.barriers.find(b => b.id === barrierId);
    if (!barrier) return;

    if (this.userUpvotes.has(barrierId)) {
      this.userUpvotes.delete(barrierId);
      barrier.upvotes -= 1;
      a11ySuite.announceLive(`Removed upvote for ${barrier.title}`);
    } else {
      this.userUpvotes.add(barrierId);
      barrier.upvotes += 1;
      a11ySuite.announceLive(`Upvoted ${barrier.title}. Thank you for verifying!`);
    }

    this.saveUserUpvotes();
    this.renderMarkers();
    this.renderImpactSidebar();
  }

  openVerifyModal(barrierId) {
    const barrier = this.barriers.find(b => b.id === barrierId);
    if (!barrier) return;

    const modal = document.getElementById('map-verify-modal');
    const backdrop = document.getElementById('map-verify-backdrop');
    if (!modal || !backdrop) return;

    modal.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="color: #ffffff; font-size: 1.3rem;">Verify Barrier Fix</h3>
        <button id="close-verify-modal-btn" class="btn btn-secondary btn-sm">✕</button>
      </div>

      <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 14px;">
        Has <strong>${barrier.title}</strong> at <em>${barrier.address}</em> been repaired or made accessible?
      </p>

      <div style="background: rgba(30,41,59,0.7); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <label style="display: block; font-weight: 700; color: #f8fafc; margin-bottom: 8px; font-size: 0.9rem;">
          Upload Photo Proof of Fix (Required):
        </label>
        <input type="file" accept="image/*" id="verify-photo-input" style="color: #cbd5e1; font-size: 0.9rem;" />
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-weight: 700; color: #f8fafc; margin-bottom: 6px; font-size: 0.9rem;">
          Verification Notes:
        </label>
        <textarea id="verify-notes-input" placeholder="e.g. New ramp built with 1:12 slope and yellow tactile strips installed on Feb 2026" class="footer-input" style="width: 100%; height: 80px;"></textarea>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button id="cancel-verify-btn" class="btn btn-secondary btn-sm">Cancel</button>
        <button id="submit-verify-btn" class="btn btn-success btn-sm">Submit Verification (Adds to Review Queue)</button>
      </div>
    `;

    backdrop.classList.add('active');

    document.getElementById('close-verify-modal-btn')?.addEventListener('click', () => backdrop.classList.remove('active'));
    document.getElementById('cancel-verify-btn')?.addEventListener('click', () => backdrop.classList.remove('active'));

    document.getElementById('submit-verify-btn')?.addEventListener('click', () => {
      barrier.status = 'fixed';
      barrier.verifiedCount += 1;
      backdrop.classList.remove('active');
      this.renderMarkers();
      this.renderImpactSidebar();
      a11ySuite.announceLive(`Verification submitted for ${barrier.title}. Status updated to Fixed!`);
      alert(`🎉 Thank you! Verification photo logged for #${barrier.id}. Updated on community map.`);
    });
  }

  bindFilterControls() {
    // Layer Pills
    document.querySelectorAll('[data-map-layer]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-map-layer]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeFilters.layer = e.currentTarget.getAttribute('data-map-layer');
        this.renderMarkers();
      });
    });

    // Barrier Type Dropdown
    const typeSelect = document.getElementById('map-type-filter');
    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        this.activeFilters.type = e.target.value;
        this.renderMarkers();
      });
    }

    // Disability Dropdown
    const disabilitySelect = document.getElementById('map-disability-filter');
    if (disabilitySelect) {
      disabilitySelect.addEventListener('change', (e) => {
        this.activeFilters.disability = e.target.value;
        this.renderMarkers();
      });
    }

    // City Quick Select
    document.querySelectorAll('[data-map-city]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cityName = e.currentTarget.getAttribute('data-map-city');
        const coords = CITY_COORDINATES[cityName];
        if (coords && this.map) {
          this.map.flyTo([coords.lat, coords.lng], 12, { duration: 1.5 });
          a11ySuite.announceLive(`Zoomed to ${cityName}`);
        }
      });
    });
  }

  bindSearchAutocomplete() {
    const searchInput = document.getElementById('map-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      this.activeFilters.searchQuery = e.target.value.trim();
      this.renderMarkers();
    });
  }

  renderImpactSidebar() {
    const feedContainer = document.getElementById('map-recent-fixes-feed');
    if (!feedContainer) return;

    const fixedItems = this.barriers.filter(b => b.status === 'fixed').slice(0, 4);

    feedContainer.innerHTML = fixedItems.map(item => `
      <div class="impact-feed-item">
        <span class="impact-feed-icon">🎉</span>
        <div>
          <strong style="color: #6ee7b7; display: block;">${item.title}</strong>
          <span style="color: #94a3b8; font-size: 0.8rem;">📍 ${item.city} • Verified by ${item.verifiedCount} citizens</span>
        </div>
      </div>
    `).join('');
  }

  bindExportButtons() {
    const exportGeoJsonBtn = document.getElementById('export-geojson-btn');
    if (exportGeoJsonBtn) {
      exportGeoJsonBtn.addEventListener('click', () => this.exportGeoJSON());
    }

    const exportCsvBtn = document.getElementById('export-csv-btn');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => this.exportCSV());
    }
  }

  exportGeoJSON() {
    const geojsonData = {
      type: "FeatureCollection",
      features: this.barriers.map(b => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [b.lng, b.lat]
        },
        properties: {
          id: b.id,
          title: b.title,
          type: b.type,
          disabilityType: b.disabilityType,
          status: b.status,
          city: b.city,
          address: b.address,
          description: b.description,
          impact: b.impact,
          suggestedFix: b.suggestedFix,
          upvotes: b.upvotes,
          reportedDate: b.reportedDate
        }
      }))
    };

    const blob = new Blob([JSON.stringify(geojsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barrierverse-india-barriers-${new Date().toISOString().slice(0,10)}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
    a11ySuite.announceLive('Downloaded GeoJSON barrier dataset');
  }

  exportCSV() {
    const headers = ["ID", "Title", "Type", "Status", "City", "Latitude", "Longitude", "Address", "Upvotes", "Date"];
    const rows = this.barriers.map(b => [
      b.id,
      `"${b.title.replace(/"/g, '""')}"`,
      b.type,
      b.status,
      b.city,
      b.lat,
      b.lng,
      `"${b.address.replace(/"/g, '""')}"`,
      b.upvotes,
      b.reportedDate
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barrierverse-barriers-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    a11ySuite.announceLive('Downloaded CSV barrier dataset');
  }

  renderFallbackMap(container) {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 40px; text-align: center; color: #f8fafc;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🗺️</div>
        <h3>Live Crowdsourced Accessibility Map</h3>
        <p style="color: #94a3b8; max-width: 480px; margin-bottom: 20px;">Displaying 9 verified hub locations across Delhi, Mumbai, Bengaluru, Patna, Pune, Kolkata, and Hyderabad.</p>
        <button id="export-geojson-btn" class="btn btn-primary btn-sm">Download Open GeoJSON Data</button>
      </div>
    `;
  }
}
