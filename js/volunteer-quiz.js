/**
 * BarrierVerse - Volunteer Portal, Interactive Role Match Quiz & Event RSVPs
 */

import { a11ySuite } from './accessibility.js';

export class VolunteerQuizEngine {
  constructor() {
    this.currentQuestion = 1;
    this.answers = {
      time: 'medium',
      skill: 'field',
      impact: 'local'
    };
  }

  init() {
    this.bindQuizOptions();
    this.bindVolunteerForm();
    this.bindEventRSVPs();
  }

  bindQuizOptions() {
    document.querySelectorAll('[data-quiz-step]').forEach(pane => {
      pane.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const step = parseInt(pane.getAttribute('data-quiz-step'), 10);
          const val = e.currentTarget.getAttribute('data-quiz-val');

          if (step === 1) this.answers.time = val;
          if (step === 2) this.answers.skill = val;
          if (step === 3) this.answers.impact = val;

          pane.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
          e.currentTarget.classList.add('selected');

          if (step < 3) {
            this.goToStep(step + 1);
          } else {
            this.calculateAndShowResult();
          }
        });
      });
    });

    document.getElementById('quiz-restart-btn')?.addEventListener('click', () => {
      this.goToStep(1);
      document.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
    });
  }

  goToStep(stepNum) {
    this.currentQuestion = stepNum;
    document.querySelectorAll('[data-quiz-step]').forEach(pane => {
      const pStep = parseInt(pane.getAttribute('data-quiz-step'), 10);
      pane.style.display = pStep === stepNum ? 'block' : 'none';
    });
    a11ySuite.announceLive(`Volunteer quiz question ${stepNum} of 3`);
  }

  calculateAndShowResult() {
    const resultBox = document.getElementById('quiz-result-container');
    const quizFlow = document.getElementById('quiz-flow-container');
    if (!resultBox || !quizFlow) return;

    quizFlow.style.display = 'none';
    resultBox.style.display = 'block';

    let role = {
      title: "Field Barrier Verifier",
      icon: "📍",
      time: "2-3 Hours / Week (Flexible)",
      desc: "Visit reported barriers near your home or college, take photo verifications, and confirm when local repairs are completed.",
      benefits: "Official Volunteer Badge, Certificate, & Direct neighborhood impact"
    };

    if (this.answers.skill === 'code') {
      role = {
        title: "Open Source Core Contributor",
        icon: "💻",
        time: "3-5 Hours / Week",
        desc: "Build features for the Three.js VR engine, React Native mobile app, or YOLOv8 computer vision barrier detector.",
        benefits: "GitHub Contributor Spotlight, Mentorship & Portfolio Project"
      };
    } else if (this.answers.skill === 'lived_exp') {
      role = {
        title: "Compensated PwD Advisory Member",
        icon: "🛡️",
        time: "4-6 Hours / Month",
        desc: "Guide our technical design, audit corporate pledges, and review community stories with guaranteed honorarium compensation.",
        benefits: "Monthly Honorarium (₹3,000 – ₹6,000) & Steering Committee Voting Seat"
      };
    } else if (this.answers.skill === 'content') {
      role = {
        title: "Accessibility Storyteller & Translator",
        icon: "✍️",
        time: "2-4 Hours / Week",
        desc: "Translate reporting guides into Hindi / regional languages, write field diaries, and amplify citizen barrier stories.",
        benefits: "Published Byline, Writer Grants, & Community Recognition"
      };
    }

    resultBox.innerHTML = `
      <div class="glass-card" style="padding: 36px; text-align: center; border-color: var(--primary); animation: fadeIn 0.3s ease;">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">${role.icon}</div>
        <span class="section-badge green">Your Perfect Role Match</span>
        <h3 style="font-size: 1.8rem; color: #ffffff; margin: 8px 0;">${role.title}</h3>
        <p style="color: #60a5fa; font-weight: 700; margin-bottom: 16px;">⏱️ Time Commitment: ${role.time}</p>
        <p style="color: #cbd5e1; max-width: 520px; margin: 0 auto 20px auto; font-size: 1rem; line-height: 1.6;">${role.desc}</p>
        
        <div style="background: rgba(30,41,59,0.7); padding: 14px; border-radius: 8px; max-width: 500px; margin: 0 auto 24px auto; text-align: left;">
          <strong style="color: #6ee7b7; font-size: 0.85rem;">What You Receive:</strong>
          <span style="color: #f8fafc; font-size: 0.9rem; display: block; margin-top: 4px;">${role.benefits}</span>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button id="prefill-volunteer-signup-btn" class="btn btn-primary">Sign Up for This Role →</button>
          <button id="quiz-retry-btn" class="btn btn-secondary">Retake Quiz</button>
        </div>
      </div>
    `;

    a11ySuite.announceLive(`Quiz completed. Your recommended role is: ${role.title}`);

    document.getElementById('prefill-volunteer-signup-btn')?.addEventListener('click', () => {
      const roleSelect = document.getElementById('volunteer-role-select');
      if (roleSelect) {
        roleSelect.value = role.title.includes('Verifier') ? 'verifier' : (role.title.includes('Code') ? 'dev' : 'advocate');
      }
      document.getElementById('volunteer-application-form')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('quiz-retry-btn')?.addEventListener('click', () => {
      resultBox.style.display = 'none';
      quizFlow.style.display = 'block';
      this.goToStep(1);
    });
  }

  bindVolunteerForm() {
    const form = document.getElementById('volunteer-application-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('volunteer-name')?.value || 'Volunteer';
      alert(`🎉 Welcome to the movement, ${name}! Your volunteer onboarding kit and calendar invitation for this week's orientation call have been sent to your email.`);
      form.reset();
    });
  }

  bindEventRSVPs() {
    document.querySelectorAll('[data-rsvp-event]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eventTitle = e.currentTarget.getAttribute('data-rsvp-event');
        alert(`✓ Confirmed RSVP for "${eventTitle}". Calendar invitation and Zoom link sent to your email!`);
        e.currentTarget.textContent = '✓ Registered';
        e.currentTarget.classList.add('btn-success');
      });
    });
  }
}
