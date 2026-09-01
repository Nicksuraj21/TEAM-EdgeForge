/**
 * BarrierVerse - Impact Blog & Story Reader Engine
 * Text-to-Speech audio reader, Easy Read simplified mode, and community writer submissions
 */

import { BLOG_STORIES } from './data/stories-data.js';
import { a11ySuite } from './accessibility.js';

export class StoryReaderEngine {
  constructor() {
    this.stories = [...BLOG_STORIES];
    this.currentStory = null;
    this.isEasyReadActive = false;
    this.isStoryDyslexic = false;
    this.speechUtterance = null;
    this.isPlayingTTS = false;
    this.speechRate = 1.0;
  }

  init() {
    this.renderStoryGrid();
    this.bindCategoryFilters();
    this.bindStorySubmitForm();
  }

  renderStoryGrid(filterCategory = 'all') {
    const grid = document.getElementById('blog-stories-grid');
    if (!grid) return;

    const filtered = filterCategory === 'all' 
      ? this.stories 
      : this.stories.filter(s => s.categorySlug === filterCategory);

    grid.innerHTML = filtered.map(story => `
      <article class="glass-card" style="display: flex; flex-direction: column; overflow: hidden; padding: 0;">
        <div style="height: 200px; overflow: hidden; position: relative;">
          <img src="${story.heroImage}" alt="${story.imageAlt}" style="width: 100%; height: 100%; object-fit: cover;" />
          <span style="position: absolute; top: 12px; left: 12px; background: rgba(15,23,42,0.85); backdrop-filter: blur(8px); padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; color: #60a5fa;">
            ${story.category}
          </span>
          <span style="position: absolute; bottom: 12px; right: 12px; background: rgba(0,0,0,0.7); color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: 11px;">
            ⏱️ ${story.readingTime}
          </span>
        </div>

        <div style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              <img src="${story.author.photo}" alt="${story.author.name}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
              <div>
                <strong style="color: #f8fafc; font-size: 0.85rem; display: block;">${story.author.name}</strong>
                <span style="color: #94a3b8; font-size: 0.75rem;">${story.date} • 📍 ${story.location}</span>
              </div>
            </div>

            <h3 style="font-size: 1.25rem; color: #ffffff; margin-bottom: 10px; line-height: 1.3;">${story.title}</h3>
            <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 20px;">${story.subtitle}</p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 14px;">
            <span style="font-size: 0.75rem; color: #6ee7b7;">✓ ${story.author.isPwD ? 'PwD Voice' : 'Field Report'}</span>
            <button onclick="window.storyReaderEngine.openStoryModal('${story.id}')" class="btn btn-primary btn-sm">
              Read Story 📖
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  bindCategoryFilters() {
    document.querySelectorAll('[data-story-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-story-category]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const cat = e.currentTarget.getAttribute('data-story-category');
        this.renderStoryGrid(cat);
      });
    });
  }

  openStoryModal(storyId) {
    const story = this.stories.find(s => s.id === storyId);
    if (!story) return;

    this.currentStory = story;
    this.isEasyReadActive = false;
    this.stopTTS();

    const modal = document.getElementById('story-reader-modal');
    const backdrop = document.getElementById('story-reader-backdrop');
    if (!modal || !backdrop) return;

    modal.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
        <div>
          <span class="section-badge">${story.category}</span>
          <h2 style="font-size: clamp(1.4rem, 3vw, 2rem); color: #ffffff; margin-top: 8px;" id="story-modal-title">${story.title}</h2>
          <p style="color: #94a3b8; font-size: 0.95rem; margin-top: 6px;">By <strong>${story.author.name}</strong> (${story.author.role}) • Published ${story.date}</p>
        </div>
        <button id="close-story-modal-btn" class="btn btn-secondary btn-sm" aria-label="Close story dialog">✕ Close</button>
      </div>

      <!-- Audio Text-To-Speech Player Bar -->
      <div class="tts-player-bar">
        <div class="tts-controls">
          <button id="story-tts-play-btn" class="tts-btn" aria-label="Play audio narration">
            <span id="tts-icon">▶</span>
          </button>
          <div>
            <strong style="color: #ffffff; font-size: 0.9rem; display: block;">Audio Narration</strong>
            <span style="color: #94a3b8; font-size: 0.75rem;" id="tts-status-text">Listen to full story (Web Speech Reader)</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <label style="font-size: 0.8rem; color: #94a3b8;">Speed:</label>
          <select id="story-tts-speed" class="tts-speed-selector">
            <option value="0.8">0.8x</option>
            <option value="1.0" selected>1.0x (Normal)</option>
            <option value="1.2">1.2x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>
      </div>

      <!-- Accessibility Reader Controls (Easy Read, Dyslexia Mode) -->
      <div style="display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap;">
        <button id="toggle-easy-read-btn" class="btn btn-secondary btn-sm" style="border-color: #f59e0b;">
          💡 Easy Read Version (Simplified)
        </button>
        <button id="toggle-story-dyslexic-btn" class="btn btn-secondary btn-sm">
          🔤 Dyslexia Font
        </button>
      </div>

      <!-- Story Hero Banner -->
      <div style="margin-bottom: 24px; border-radius: 12px; overflow: hidden;">
        <img src="${story.heroImage}" alt="${story.imageAlt}" style="width: 100%; max-height: 360px; object-fit: cover;" />
        <div style="background: rgba(15,23,42,0.9); padding: 8px 14px; font-size: 0.8rem; color: #94a3b8;">
          <strong>Alt Description:</strong> ${story.imageAlt}
        </div>
      </div>

      <!-- Author Honorarium Transparency Badge -->
      <div style="background: rgba(16,185,129,0.1); border: 1px solid var(--success); padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 1.4rem;">💰</span>
        <div>
          <strong style="color: #6ee7b7; font-size: 0.85rem;">Fair Compensation Policy:</strong>
          <span style="color: #cbd5e1; font-size: 0.8rem; display: block;">Author received a community grant honorarium of ${story.author.honorariumReceived}.</span>
        </div>
      </div>

      <!-- Story Body Content -->
      <div id="story-modal-body" style="font-size: 1.1rem; line-height: 1.7; color: #cbd5e1;" class="story-article-content">
        ${story.content}
      </div>

      <!-- Actions & Related CTAs -->
      <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border-color);">
        <h4 style="color: #60a5fa; margin-bottom: 12px;">Take Action on This Story:</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${story.relatedActions.map(a => `<a href="${a.link}" class="btn btn-secondary btn-sm" onclick="document.getElementById('story-reader-backdrop').classList.remove('active')">${a.text}</a>`).join('')}
        </div>
      </div>
    `;

    backdrop.classList.add('active');
    modal.focus();

    // Event listeners
    document.getElementById('close-story-modal-btn')?.addEventListener('click', () => {
      this.stopTTS();
      backdrop.classList.remove('active');
    });

    document.getElementById('story-tts-play-btn')?.addEventListener('click', () => this.toggleTTS(story));
    
    document.getElementById('story-tts-speed')?.addEventListener('change', (e) => {
      this.speechRate = parseFloat(e.target.value);
      if (this.isPlayingTTS) {
        this.stopTTS();
        this.toggleTTS(story);
      }
    });

    document.getElementById('toggle-easy-read-btn')?.addEventListener('click', () => this.toggleEasyRead(story));
    document.getElementById('toggle-story-dyslexic-btn')?.addEventListener('click', () => this.toggleStoryDyslexia());

    a11ySuite.announceLive(`Article opened: ${story.title}`);
  }

  toggleTTS(story) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device browser.');
      return;
    }

    if (this.isPlayingTTS) {
      this.stopTTS();
      return;
    }

    const textToRead = this.isEasyReadActive 
      ? `${story.title}. Easy read version. ${story.easyReadVersion}`
      : `${story.title}. By ${story.author.name}. ${story.subtitle}. ${story.content.replace(/<[^>]*>/g, ' ')}`;

    this.speechUtterance = new SpeechSynthesisUtterance(textToRead);
    this.speechUtterance.rate = this.speechRate;
    this.speechUtterance.lang = 'en-IN';

    this.speechUtterance.onstart = () => {
      this.isPlayingTTS = true;
      const icon = document.getElementById('tts-icon');
      const statusText = document.getElementById('tts-status-text');
      if (icon) icon.textContent = '⏸';
      if (statusText) statusText.textContent = 'Playing narration... (Click to pause)';
      a11ySuite.announceLive('Speech narration started');
    };

    this.speechUtterance.onend = () => {
      this.stopTTS();
      a11ySuite.announceLive('Speech narration finished');
    };

    this.speechUtterance.onerror = () => {
      this.stopTTS();
    };

    window.speechSynthesis.speak(this.speechUtterance);
  }

  stopTTS() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlayingTTS = false;
    const icon = document.getElementById('tts-icon');
    const statusText = document.getElementById('tts-status-text');
    if (icon) icon.textContent = '▶';
    if (statusText) statusText.textContent = 'Listen to full story (Web Speech Reader)';
  }

  toggleEasyRead(story) {
    this.isEasyReadActive = !this.isEasyReadActive;
    const bodyEl = document.getElementById('story-modal-body');
    const btn = document.getElementById('toggle-easy-read-btn');

    if (bodyEl && btn) {
      if (this.isEasyReadActive) {
        bodyEl.innerHTML = `
          <div style="background: rgba(245,158,11,0.1); border: 2px solid #f59e0b; padding: 24px; border-radius: 12px;">
            <strong style="color: #fcd34d; font-size: 1.2rem; display: block; margin-bottom: 12px;">💡 Easy Read Mode (Simplified Language):</strong>
            <ul style="line-height: 1.8; font-size: 1.15rem; color: #ffffff; padding-left: 20px;">
              ${story.easyReadVersion.split('\n').filter(l => l.trim().length > 0).map(line => `<li>${line.replace(/^[•\s*-]+/, '')}</li>`).join('')}
            </ul>
          </div>
        `;
        btn.textContent = '📄 Switch to Full Article';
        a11ySuite.announceLive('Switched to Easy Read simplified version');
      } else {
        bodyEl.innerHTML = story.content;
        btn.textContent = '💡 Easy Read Version (Simplified)';
        a11ySuite.announceLive('Switched to Full article version');
      }
    }
  }

  toggleStoryDyslexia() {
    this.isStoryDyslexic = !this.isStoryDyslexic;
    const bodyEl = document.getElementById('story-modal-body');
    const titleEl = document.getElementById('story-modal-title');
    const btn = document.getElementById('toggle-story-dyslexic-btn');

    if (bodyEl) {
      bodyEl.classList.toggle('font-dyslexic', this.isStoryDyslexic);
    }
    if (titleEl) {
      titleEl.classList.toggle('font-dyslexic', this.isStoryDyslexic);
    }
    if (btn) {
      btn.classList.toggle('active', this.isStoryDyslexic);
    }
    a11ySuite.announceLive(`Dyslexia font in reader ${this.isStoryDyslexic ? 'enabled' : 'disabled'}`);
  }

  bindStorySubmitForm() {
    const form = document.getElementById('submit-community-story-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🎉 Thank you for submitting your story! Our editorial review team (led by PwD advocates) will review it within 7 days. Authors receive compensation upon publication.');
      form.reset();
    });
  }
}
