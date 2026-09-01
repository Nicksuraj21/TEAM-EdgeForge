/**
 * BarrierVerse - Organization Pledge Portal & Interactive Case Studies
 * Dynamic Org Selector, Draggable Before/After Sliders, and SVG Badge Generator
 */

import { CASE_STUDIES } from './data/case-studies.js';
import { a11ySuite } from './accessibility.js';

export class PledgePortalEngine {
  constructor() {
    this.currentCaseStudyIdx = 0;
  }

  init() {
    this.bindOrgTypeTabs();
    this.renderCaseStudySlider();
    this.bindPledgeForm();
    this.bindAIToolSimulator();
  }

  bindOrgTypeTabs() {
    document.querySelectorAll('[data-org-type]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-org-type]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const orgType = e.currentTarget.getAttribute('data-org-type');
        this.updateOrgContent(orgType);
      });
    });
  }

  updateOrgContent(orgType) {
    const titleEl = document.getElementById('org-hero-dynamic-title');
    const descEl = document.getElementById('org-hero-dynamic-desc');

    const contentMap = {
      campus: {
        title: "Make Your College Campus Accessible & Universal",
        desc: "Empower PwD students to attend lectures, labs, and libraries with 100% independence. Free audit checklists and student volunteer support."
      },
      hospital: {
        title: "Eliminate Critical Barriers in Healthcare Facilities",
        desc: "Save vital minutes in emergency drop-offs and diagnostic suites with proximity doors, high-contrast pictograms, and lowered counters."
      },
      corporate: {
        title: "Build a Truly Neuro-Inclusive & Physical Workplace",
        desc: "Attract top engineering talent with sit-stand motorized desks, sensory recharge rooms, and automated live meeting transcription."
      },
      government: {
        title: "Transform Public Transit & Civic Citizen Centers",
        desc: "Align with Sugamya Bharat and RPWD Act mandates with zero vendor lock-in. 100% open-source tools and community-validated audits."
      }
    };

    const target = contentMap[orgType] || contentMap.campus;
    if (titleEl) titleEl.textContent = target.title;
    if (descEl) descEl.textContent = target.desc;
    a11ySuite.announceLive(`Viewing ${target.title}`);
  }

  renderCaseStudySlider() {
    const container = document.getElementById('case-studies-slider-container');
    if (!container) return;

    const cs = CASE_STUDIES[this.currentCaseStudyIdx];

    container.innerHTML = `
      <div class="glass-card" style="padding: 36px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div>
            <span class="section-badge green">${cs.badgeTier} Pledge Partner</span>
            <h3 style="font-size: 1.6rem; color: #ffffff; margin-top: 6px;">${cs.orgName}</h3>
            <span style="color: #94a3b8; font-size: 0.9rem;">📍 ${cs.location} • ${cs.orgType} • Timeline: ${cs.timeline}</span>
          </div>
          
          <div style="display: flex; gap: 8px;">
            <button id="cs-prev-btn" class="btn btn-secondary btn-sm" aria-label="Previous case study">← Prev</button>
            <span style="padding: 6px 12px; color: #cbd5e1; font-weight: 700; font-size: 0.9rem;">${this.currentCaseStudyIdx + 1} / ${CASE_STUDIES.length}</span>
            <button id="cs-next-btn" class="btn btn-secondary btn-sm" aria-label="Next case study">Next →</button>
          </div>
        </div>

        <!-- Interactive Before/After Split Image Slider -->
        <div class="before-after-container" id="ba-slider-box">
          <img src="${cs.afterImage}" alt="${cs.afterLabel}" class="before-after-img-after" />
          
          <div class="before-after-img-before-wrapper" id="ba-wrapper-before">
            <img src="${cs.beforeImage}" alt="${cs.beforeLabel}" class="before-after-img-before" id="ba-img-before" />
          </div>

          <div class="before-after-slider-handle" id="ba-handle">
            <div class="before-after-slider-handle-btn">⇄</div>
          </div>

          <span class="before-after-label before">Before: Inaccessible</span>
          <span class="before-after-label after">After: Universal Fix</span>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 32px; margin-top: 28px; align-items: center;" class="cs-details-grid">
          <div>
            <h4 style="color: #60a5fa; margin-bottom: 12px; font-size: 1.15rem;">Key Barriers Retrofitted (${cs.barriersFixedCount} Fixes Total):</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.95rem; color: #cbd5e1;">
              ${cs.barriersFixedList.map(item => `<li><span style="color: #10b981; font-weight: 800; margin-right: 8px;">✓</span>${item}</li>`).join('')}
            </ul>

            <div style="margin-top: 20px; background: rgba(30,41,59,0.5); padding: 16px; border-radius: 10px; border-left: 3px solid var(--primary);">
              <p style="font-style: italic; color: #f8fafc; font-size: 0.95rem; margin-bottom: 8px;">"${cs.quoteLeadership.text}"</p>
              <strong style="color: #93c5fd; font-size: 0.85rem;">— ${cs.quoteLeadership.author}, ${cs.quoteLeadership.role}</strong>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="background: var(--bg-tertiary); padding: 18px; border-radius: 12px; border: 1px solid var(--border-color); text-align: center;">
              <span style="color: #94a3b8; font-size: 0.8rem; text-transform: uppercase; font-weight: 700;">Total Retrofit Investment</span>
              <h3 style="font-size: 2rem; color: #6ee7b7; margin-top: 4px;">${cs.totalCost}</h3>
              <span style="color: #94a3b8; font-size: 0.75rem;">100% Transparent Non-Profit Budget</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              ${cs.impactMetrics.map(m => `
                <div style="background: rgba(15,23,42,0.8); padding: 12px; border-radius: 8px; text-align: center;">
                  <strong style="font-size: 1.4rem; color: #ffffff; display: block;">${m.value}</strong>
                  <span style="font-size: 0.75rem; color: #94a3b8;">${m.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupBeforeAfterSlider();

    document.getElementById('cs-prev-btn')?.addEventListener('click', () => {
      this.currentCaseStudyIdx = (this.currentCaseStudyIdx - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
      this.renderCaseStudySlider();
    });

    document.getElementById('cs-next-btn')?.addEventListener('click', () => {
      this.currentCaseStudyIdx = (this.currentCaseStudyIdx + 1) % CASE_STUDIES.length;
      this.renderCaseStudySlider();
    });
  }

  setupBeforeAfterSlider() {
    const box = document.getElementById('ba-slider-box');
    const handle = document.getElementById('ba-handle');
    const wrapperBefore = document.getElementById('ba-wrapper-before');
    const imgBefore = document.getElementById('ba-img-before');

    if (!box || !handle || !wrapperBefore || !imgBefore) return;

    const setPosition = (x) => {
      const rect = box.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      handle.style.left = `${percent}%`;
      wrapperBefore.style.width = `${percent}%`;
      imgBefore.style.width = `${rect.width}px`;
    };

    let isSliding = false;

    box.addEventListener('mousedown', (e) => {
      isSliding = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isSliding = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isSliding) setPosition(e.clientX);
    });

    // Touch
    box.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    // Initial sync
    setTimeout(() => {
      const rect = box.getBoundingClientRect();
      imgBefore.style.width = `${rect.width}px`;
    }, 100);
  }

  bindPledgeForm() {
    const form = document.getElementById('organization-pledge-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const orgName = document.getElementById('pledge-org-name')?.value || 'Inclusive Institution';
      const tier = document.querySelector('input[name="pledge_tier"]:checked')?.value || 'Leader';

      this.generateAndDownloadBadge(orgName, tier);
    });
  }

  generateAndDownloadBadge(orgName, tier) {
    const modal = document.getElementById('pledge-success-modal');
    const backdrop = document.getElementById('pledge-success-backdrop');
    if (!modal || !backdrop) return;

    const svgBadge = `
      <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>
        <rect x="5" y="5" width="390" height="190" rx="16" fill="url(#badgeGrad)" stroke="url(#borderGrad)" stroke-width="4"/>
        <text x="200" y="45" fill="#60a5fa" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">BARRIERVERSE VERIFIED</text>
        <text x="200" y="85" fill="#ffffff" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle">${orgName.slice(0, 26)}</text>
        <rect x="130" y="105" width="140" height="28" rx="14" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
        <text x="200" y="124" fill="#6ee7b7" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">★ ${tier.toUpperCase()} PLEDGE</text>
        <text x="200" y="165" fill="#94a3b8" font-family="Arial, sans-serif" font-size="11" text-anchor="middle">Committed to 100% Universal Accessibility 2026</text>
      </svg>
    `;

    modal.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">🏆</div>
        <h3 style="font-size: 1.8rem; color: #ffffff; margin-bottom: 8px;">Welcome to the Accessibility Movement!</h3>
        <p style="color: #cbd5e1; max-width: 480px; margin: 0 auto 20px auto; font-size: 0.95rem;">
          <strong>${orgName}</strong> is officially registered as a BarrierVerse <strong>${tier}</strong>.
        </p>

        <div style="background: rgba(15,23,42,0.9); padding: 16px; border-radius: 12px; display: inline-block; margin-bottom: 24px; border: 1px solid var(--border-color);">
          ${svgBadge}
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button id="download-badge-svg-btn" class="btn btn-primary btn-sm">Download Verified SVG Badge 📥</button>
          <a href="#map" class="btn btn-secondary btn-sm" id="pledge-close-btn">Explore Local Barriers</a>
        </div>
      </div>
    `;

    backdrop.classList.add('active');
    a11ySuite.announceLive(`Organization pledge completed for ${orgName}`);

    document.getElementById('download-badge-svg-btn')?.addEventListener('click', () => {
      const blob = new Blob([svgBadge], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `barrierverse-${orgName.toLowerCase().replace(/\s+/g, '-')}-badge.svg`;
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById('pledge-close-btn')?.addEventListener('click', () => {
      backdrop.classList.remove('active');
    });
  }

  bindAIToolSimulator() {
    const analyzeBtn = document.getElementById('run-ai-analyzer-btn');
    const resultBox = document.getElementById('ai-analyzer-results');

    if (analyzeBtn && resultBox) {
      analyzeBtn.addEventListener('click', () => {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="background: rgba(30,41,59,0.8); border: 1px solid var(--border-highlight); border-radius: 12px; padding: 20px; animation: fadeIn 0.3s ease;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              <span style="font-size: 1.5rem;">🤖</span>
              <strong style="color: #60a5fa; font-size: 1.1rem;">YOLOv8 Barrier Detection Analysis Complete</strong>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.9rem; margin-bottom: 16px;">
              <div style="background: rgba(15,23,42,0.8); padding: 10px; border-radius: 6px;">
                <span style="color: #94a3b8; display: block; font-size: 0.75rem;">Calculated Gradient:</span>
                <strong style="color: #fca5a5; font-size: 1.1rem;">1:4.8 Slope (Hazardous)</strong>
              </div>
              <div style="background: rgba(15,23,42,0.8); padding: 10px; border-radius: 6px;">
                <span style="color: #94a3b8; display: block; font-size: 0.75rem;">Handrails Detected:</span>
                <strong style="color: #fca5a5; font-size: 1.1rem;">Missing (0/2 sides)</strong>
              </div>
            </div>

            <div style="background: rgba(16,185,129,0.15); border: 1px solid var(--success); padding: 12px; border-radius: 8px;">
              <strong style="color: #6ee7b7; font-size: 0.9rem;">Automated Solution Checklist Generated:</strong>
              <p style="color: #cbd5e1; font-size: 0.85rem; margin-top: 4px;">
                1. Rebuild ramp to 1:12 slope.<br>
                2. Install continuous dual handrails at 750mm & 900mm.<br>
                3. Add 300mm tactile yellow hazard blisters at approach.
              </p>
            </div>
          </div>
        `;
        a11ySuite.announceLive('AI Photo Analysis complete: 1:4.8 slope detected');
      });
    }
  }
}
