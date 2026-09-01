/**
 * BarrierVerse - Open Source Hub, Repositories, Interactive Charts & Public Roadmap
 */

import { OPEN_SOURCE_DATA } from './data/roadmap-data.js';
import { a11ySuite } from './accessibility.js';

export class OpenSourceHubEngine {
  constructor() {
    this.roadmapItems = [...OPEN_SOURCE_DATA.roadmap];
    this.userRoadmapVotes = new Set();
  }

  init() {
    this.renderRepoGrid();
    this.renderTransparencyCharts();
    this.renderRoadmap();
    this.bindRoadmapFilters();
  }

  renderRepoGrid() {
    const container = document.getElementById('opensource-repos-grid');
    if (!container) return;

    container.innerHTML = OPEN_SOURCE_DATA.repositories.map(repo => `
      <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="section-badge">${repo.badge}</span>
            <span style="font-size: 0.85rem; color: #94a3b8; font-family: monospace;">★ ${repo.stars} • ⑂ ${repo.forks}</span>
          </div>

          <h3 style="font-size: 1.25rem; color: #ffffff; margin-bottom: 8px;">${repo.name}</h3>
          <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 16px;">${repo.description}</p>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--border-color);">
            <span style="font-size: 0.8rem; color: #60a5fa; font-weight: 700;">${repo.language}</span>
            <span style="font-size: 0.8rem; color: #6ee7b7; background: rgba(16,185,129,0.15); padding: 2px 8px; border-radius: 4px;">
              ${repo.goodFirstIssuesCount} Good First Issues
            </span>
          </div>

          <div style="margin-top: 14px; display: flex; gap: 8px;">
            <a href="${repo.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="flex: 1;">GitHub Repo ↗</a>
            <button onclick="navigator.clipboard.writeText('git clone ${repo.githubUrl}.git'); alert('Copied clone command to clipboard!');" class="btn btn-secondary btn-sm" title="Copy git clone command">📋</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderTransparencyCharts() {
    this.drawDonutChart('chart-funding-canvas', OPEN_SOURCE_DATA.transparency.fundingSources);
    this.drawDonutChart('chart-spending-canvas', OPEN_SOURCE_DATA.transparency.spendingBreakdown);
  }

  drawDonutChart(canvasId, items) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 240;
    const height = canvas.height = 240;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;
    const innerRadius = 50;

    let startAngle = -Math.PI / 2;

    items.forEach(item => {
      const sliceAngle = (item.percentage / 100) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      startAngle = endAngle;
    });
  }

  renderRoadmap() {
    const container = document.getElementById('roadmap-cards-container');
    if (!container) return;

    container.innerHTML = this.roadmapItems.map(item => {
      const isUpvoted = this.userRoadmapVotes.has(item.id);
      let statusBadge = `<span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">IN PROGRESS</span>`;
      if (item.status === 'planned') {
        statusBadge = `<span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">PLANNED</span>`;
      } else if (item.status === 'rfc') {
        statusBadge = `<span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">RFC DISCUSSION</span>`;
      }

      return `
        <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              ${statusBadge}
              <span style="font-size: 0.8rem; color: #94a3b8;">Target: ${item.targetRelease}</span>
            </div>

            <h4 style="font-size: 1.15rem; color: #ffffff; margin-bottom: 8px; line-height: 1.3;">${item.title}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 14px;">${item.description}</p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border-color);">
            <span style="font-size: 0.8rem; color: #94a3b8;">Lead: ${item.lead}</span>
            
            <button onclick="window.openSourceEngine.upvoteRoadmapItem('${item.id}')" style="
              background: ${isUpvoted ? '#3b82f6' : '#1e293b'};
              color: #ffffff;
              border: 1px solid var(--border-highlight);
              padding: 6px 14px;
              border-radius: 6px;
              font-size: 0.85rem;
              font-weight: 700;
              cursor: pointer;
            ">
              ▲ Upvote (${item.upvotes})
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  upvoteRoadmapItem(itemId) {
    const item = this.roadmapItems.find(i => i.id === itemId);
    if (!item) return;

    if (this.userRoadmapVotes.has(itemId)) {
      this.userRoadmapVotes.delete(itemId);
      item.upvotes -= 1;
    } else {
      this.userRoadmapVotes.add(itemId);
      item.upvotes += 1;
      a11ySuite.announceLive(`Upvoted roadmap initiative: ${item.title}`);
    }

    this.renderRoadmap();
  }

  bindRoadmapFilters() {
    document.querySelectorAll('[data-roadmap-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-roadmap-filter]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const filter = e.currentTarget.getAttribute('data-roadmap-filter');

        if (filter === 'all') {
          this.roadmapItems = [...OPEN_SOURCE_DATA.roadmap];
        } else {
          this.roadmapItems = OPEN_SOURCE_DATA.roadmap.filter(i => i.status === filter);
        }
        this.renderRoadmap();
      });
    });
  }
}
