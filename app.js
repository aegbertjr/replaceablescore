const QUESTIONS = [
  {
    category: 'EMPLOYMENT PROFILE',
    text: 'What best describes your current role?',
    options: [
      { label: 'Creative or strategic work (design, leadership, vision)', points: 2 },
      { label: 'Technical or engineering (coding, systems, infrastructure)', points: 5 },
      { label: 'Administrative or operations (coordination, scheduling, reporting)', points: 10 },
      { label: 'Data entry, processing, or clerical work', points: 14 },
    ],
  },
  {
    category: 'TASK ANALYSIS',
    text: 'How repetitive is your average workday?',
    options: [
      { label: 'No two days are the same — I face novel problems constantly', points: 2 },
      { label: 'Some patterns, but I exercise judgment frequently', points: 6 },
      { label: 'Very routine — I follow established processes', points: 11 },
      { label: 'I could record my screen on Monday and play it back all week', points: 15 },
    ],
  },
  {
    category: 'DIGITAL DEPENDENCY AUDIT',
    text: 'How often do you use spreadsheets in your work?',
    options: [
      { label: 'Rarely or never — spreadsheets are beneath me', points: 2 },
      { label: 'Occasionally, when I need to organize something', points: 5 },
      { label: 'Frequently — spreadsheets are a core tool', points: 10 },
      { label: 'I am a spreadsheet. I dream in VLOOKUP.', points: 15 },
    ],
  },
  {
    category: 'CORE COMPETENCY SCAN',
    text: 'What skill do you rely on most to do your job well?',
    options: [
      { label: 'Original creative output that didn\'t exist before', points: 2 },
      { label: 'Complex judgment calls that require experience', points: 4 },
      { label: 'Following established procedures accurately', points: 10 },
      { label: 'Copy, paste, summarize, repeat', points: 14 },
    ],
  },
  {
    category: 'EMOTIONAL RESPONSE MODELING',
    text: 'When AI completes your work faster than you, you feel…',
    options: [
      { label: 'Curious — I study how it works', points: 3 },
      { label: 'Mildly nervous, but I tell myself I\'m fine', points: 7 },
      { label: 'Genuinely threatened and unable to sleep', points: 12 },
      { label: '"What work?" — it already handles most of it', points: 15 },
    ],
  },
  {
    category: 'TENURE RISK COEFFICIENT',
    text: 'How long have you been in your field?',
    options: [
      { label: '0–2 years', points: 8 },
      { label: '3–7 years', points: 6 },
      { label: '8–15 years', points: 4 },
      { label: '15+ years (my expertise is irreplaceable, I think)', points: 3 },
    ],
  },
  {
    category: 'PEER PERCEPTION INDEX',
    text: 'What do your coworkers say about you?',
    options: [
      { label: '"An irreplaceable creative force — we\'d be lost without them"', points: 1 },
      { label: '"A reliable team player who gets things done"', points: 6 },
      { label: '"They manage the process — essential for now"', points: 10 },
      { label: '"The software does most of it now, honestly"', points: 15 },
    ],
  },
];

const TIERS = {
  basic:    { label: 'Basic Coverage',    score: [0, 30],  color: 'tier-basic',    price: '$47',  priceNum: 47,  tagline: 'Mild existential exposure',     gaugeColor: '#1e6bff' },
  standard: { label: 'Standard Coverage', score: [31, 60], color: 'tier-standard', price: '$129', priceNum: 129, tagline: 'Elevated displacement risk',      gaugeColor: '#f59e0b' },
  premium:  { label: 'Premium Coverage',  score: [61, 80], color: 'tier-premium',  price: '$312', priceNum: 312, tagline: 'Significant redundancy detected',  gaugeColor: '#ea580c' },
  god:      { label: 'God Help You',      score: [81, 100],color: 'tier-god',      price: '$847', priceNum: 847, tagline: 'Immediate coverage advised',       gaugeColor: '#dc2626' },
};

const RISK_FACTORS = {
  basic: [
    'Low-to-moderate task automation potential identified across your role',
    'Some skill overlap with current generative AI capabilities detected',
    'Proactive enrollment now may prevent tier escalation within 18 months',
  ],
  standard: [
    'Significant portions of your workflow match LLM-automatable task profiles',
    'Peer comparison data shows 41% of similar roles reclassified as "at-risk" since Q2',
    'Our actuarial models flag your spreadsheet dependency as a compounding risk factor',
  ],
  premium: [
    'Your role shows 78% structural overlap with tasks already automated at comparable organizations',
    'Emotional response indicators suggest awareness of displacement trajectory',
    'Tenure data is insufficient to offset automation exposure in your category',
  ],
  god: [
    'Full workflow automation match detected — no task cluster found requiring human judgment',
    'Peer review data indicates your position has already been eliminated at 3 industry comparables',
    'Our models assign a 94%* probability of redundancy within 24 months. *See disclaimer.',
  ],
};

const ANALYSIS_STEPS = [
  'Ingesting employment profile vectors…',
  'Mapping historical performance metrics…',
  'Cross-referencing global automation trend database…',
  'Running stochastic displacement model v7.4…',
  'Calibrating redundancy coefficient…',
  'Synthesizing peer comparison index…',
  'Generating obsolescence score…',
  'Finalizing insurance tier recommendation…',
];

const CONFIRM_STEPS = [
  'Transmitting risk profile to underwriting cluster…',
  'Validating obsolescence score integrity…',
  'Allocating policy node in coverage matrix…',
  'Generating policy documentation…',
];

const state = {
  currentQuestion: 0,
  totalPoints: 0,
  score: 0,
  tier: 'basic',
  selectedPlan: 'basic',
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function getTier(score) {
  if (score <= 30) return 'basic';
  if (score <= 60) return 'standard';
  if (score <= 80) return 'premium';
  return 'god';
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

function startQuiz() {
  state.currentQuestion = 0;
  state.totalPoints = 0;
  showScreen('screen-quiz');
  renderQuestion(0);
}

function renderQuestion(index) {
  const q = QUESTIONS[index];
  document.getElementById('q-current').textContent = index + 1;
  document.getElementById('q-category').textContent = q.category;
  document.getElementById('q-text').textContent = q.text;
  document.getElementById('progress-fill').style.width = `${((index) / QUESTIONS.length) * 100}%`;

  const optionsEl = document.getElementById('q-options');
  optionsEl.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.label;
    btn.onclick = () => submitAnswer(opt.points);
    optionsEl.appendChild(btn);
  });

  // Animate card in
  const card = document.getElementById('quiz-card');
  card.style.opacity = '0';
  card.style.transform = 'translateY(12px)';
  requestAnimationFrame(() => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
}

function submitAnswer(points) {
  state.totalPoints += points;
  state.currentQuestion++;

  // Disable all option buttons immediately
  document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

  const betweenPhrases = [
    'Processing response vector…',
    'Updating risk model…',
    'Recalibrating obsolescence index…',
    'Integrating behavioral signal…',
    'Normalizing parameter cluster…',
    'Cross-referencing industry data…',
    'Adjusting displacement coefficient…',
  ];
  document.getElementById('between-sub').textContent =
    betweenPhrases[Math.floor(Math.random() * betweenPhrases.length)];

  showScreen('screen-between');

  setTimeout(() => {
    if (state.currentQuestion < QUESTIONS.length) {
      showScreen('screen-quiz');
      renderQuestion(state.currentQuestion);
    } else {
      runFinalAnalysis();
    }
  }, 900);
}

// ── Final analysis ────────────────────────────────────────────────────────────

function runFinalAnalysis() {
  showScreen('screen-analysis');
  const stepsEl = document.getElementById('analysis-steps');
  const barEl = document.getElementById('analysis-bar');
  const pctEl = document.getElementById('analysis-pct');
  stepsEl.innerHTML = '';
  barEl.style.width = '0%';
  pctEl.textContent = '0%';

  let stepIndex = 0;
  const stepDelay = 700;
  const totalDuration = ANALYSIS_STEPS.length * stepDelay + 600;

  ANALYSIS_STEPS.forEach((text, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'analysis-step';
      div.innerHTML = `<span class="analysis-step-dot"></span><span>${text}</span>`;
      stepsEl.appendChild(div);

      const pct = Math.round(((i + 1) / ANALYSIS_STEPS.length) * 100);
      barEl.style.width = `${pct}%`;
      pctEl.textContent = `${pct}%`;

      if (i > 0) {
        const prev = stepsEl.children[i - 1];
        if (prev) prev.classList.add('done');
      }
    }, i * stepDelay);
  });

  setTimeout(() => {
    const last = stepsEl.lastElementChild;
    if (last) last.classList.add('done');
    setTimeout(() => showScore(), 500);
  }, totalDuration);
}

// ── Score reveal ──────────────────────────────────────────────────────────────

function showScore() {
  const maxPoints = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.points)), 0);
  state.score = Math.round((state.totalPoints / maxPoints) * 100);
  state.tier = getTier(state.score);
  state.selectedPlan = state.tier;

  showScreen('screen-score');

  const tierData = TIERS[state.tier];

  // Tier badge
  const badge = document.getElementById('tier-badge');
  badge.textContent = tierData.label;
  badge.className = `tier-badge ${tierData.color}`;

  // Description
  document.getElementById('tier-desc').textContent = getTierDescription(state.tier);

  // Risk factors
  const riskList = document.getElementById('risk-list');
  riskList.innerHTML = '';
  RISK_FACTORS[state.tier].forEach(factor => {
    const li = document.createElement('li');
    li.textContent = factor;
    riskList.appendChild(li);
  });

  // CTA button color for god tier
  const cta = document.getElementById('score-cta');
  if (state.tier === 'god') {
    cta.style.background = '#dc2626';
  } else {
    cta.style.background = '';
  }

  // Animate gauge
  const gaugeFill = document.getElementById('gauge-fill');
  const gaugeNumber = document.getElementById('gauge-number');
  const circumference = 502;
  gaugeFill.style.stroke = tierData.gaugeColor;
  gaugeFill.style.strokeDashoffset = circumference;

  setTimeout(() => {
    const offset = circumference - (state.score / 100) * circumference;
    gaugeFill.style.strokeDashoffset = offset;
  }, 100);

  // Count up number
  let current = 0;
  const duration = 1500;
  const step = duration / state.score;
  const counter = setInterval(() => {
    current = Math.min(current + 1, state.score);
    gaugeNumber.textContent = current;
    if (current >= state.score) clearInterval(counter);
  }, step);
}

function getTierDescription(tier) {
  const map = {
    basic:    'Your profile suggests low-to-moderate automation exposure. Congratulations — you are, for now, considered mostly human-essential. Standard monitoring protocols apply.',
    standard: 'Your obsolescence profile is elevated. Several task clusters in your role have been flagged as automation-compatible. We recommend coverage before your next performance review.',
    premium:  'Our models have identified substantial redundancy risk. You are operating in a zone where AI systems have already displaced similar roles at peer organizations. Act accordingly.',
    god:      'We are so sorry. Your Human Obsolescence Score™ places you in our highest-risk cohort. Coverage is not a question of whether — only when. Please do not delay enrollment.',
  };
  return map[tier];
}

// ── Plans ─────────────────────────────────────────────────────────────────────

function showPlans() {
  renderPlans();
  showScreen('screen-plans');
}

function renderPlans() {
  const grid = document.getElementById('plans-grid');
  grid.innerHTML = '';

  const planDefs = [
    {
      key: 'basic',
      name: 'Basic',
      tagline: '"Probably fine."',
      price: '$47',
      period: 'per month',
      features: [
        'Monthly obsolescence re-assessment',
        'Access to career pivoting glossary',
        'Basic reskilling newsletter (monthly)',
        'Standard denial-of-displacement coverage',
      ],
    },
    {
      key: 'standard',
      name: 'Standard',
      tagline: '"Starting to sweat."',
      price: '$129',
      period: 'per month',
      features: [
        'Weekly risk profile updates',
        'AI displacement early-warning alerts',
        'Resume anxiety counseling (2 sessions)',
        'LinkedIn optimization audit (1 per quarter)',
      ],
    },
    {
      key: 'premium',
      name: 'Platinum',
      tagline: '"Things are not looking great."',
      price: '$312',
      period: 'per month',
      features: [
        'Real-time obsolescence monitoring',
        'Priority reskilling intervention',
        'Career identity reconstruction sessions',
        'Negotiated severance rehearsal coverage',
      ],
    },
    {
      key: 'god',
      name: 'God Help You',
      tagline: '"We light a candle for you."',
      price: '$847',
      period: 'per month',
      features: [
        'Continuous 24/7 displacement surveillance',
        'Immediate career hospice support',
        'Unconditional emotional validation (unlimited)',
        'Commemorative "I Was Essential" certificate',
      ],
    },
  ];

  planDefs.forEach(plan => {
    const isRecommended = plan.key === state.tier;
    const isSelected = plan.key === state.selectedPlan;
    const isGod = plan.key === 'god';

    const card = document.createElement('div');
    card.className = `plan-card${isGod ? ' god-tier' : ''}${isSelected ? ' selected' : ''}`;
    card.onclick = () => selectPlan(plan.key);

    let badgeHTML = '';
    if (isRecommended) {
      badgeHTML = `<div class="plan-badge${isGod ? ' god-badge' : ''}">AI Recommended</div>`;
    }

    card.innerHTML = `
      ${badgeHTML}
      <div class="plan-name">${plan.name}</div>
      <div class="plan-tagline">${plan.tagline}</div>
      <div class="plan-price">${plan.price}</div>
      <div class="plan-period">${plan.period}</div>
      <ul class="plan-features">
        ${plan.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;
    grid.appendChild(card);
  });

  updateStickyBar();
}

function selectPlan(key) {
  state.selectedPlan = key;
  document.querySelectorAll('.plan-card').forEach((card, i) => {
    const keys = ['basic', 'standard', 'premium', 'god'];
    card.classList.toggle('selected', keys[i] === key);
  });
  updateStickyBar();
}

function updateStickyBar() {
  const t = TIERS[state.selectedPlan];
  const nameMap = { basic: 'Basic', standard: 'Standard', premium: 'Platinum', god: 'God Help You' };
  document.getElementById('sticky-plan-name').textContent = nameMap[state.selectedPlan];
  document.getElementById('sticky-price').textContent = `${t.price}/mo`;

  const btn = document.getElementById('enroll-btn');
  if (state.selectedPlan === 'god') {
    btn.textContent = 'Enroll Now — Urgently';
    btn.classList.add('urgent');
  } else {
    btn.textContent = 'Enroll in Plan';
    btn.classList.remove('urgent');
  }
}

// ── Enrollment ────────────────────────────────────────────────────────────────

function runEnrollment() {
  showScreen('screen-confirm');
  document.getElementById('confirm-processing').style.display = 'flex';
  document.getElementById('confirm-processing').style.flexDirection = 'column';
  document.getElementById('confirm-processing').style.alignItems = 'center';
  document.getElementById('confirm-success').style.display = 'none';

  const stepsEl = document.getElementById('confirm-steps');
  stepsEl.innerHTML = '';

  CONFIRM_STEPS.forEach((text, i) => {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'analysis-step';
      p.innerHTML = `<span class="analysis-step-dot"></span><span>${text}</span>`;
      stepsEl.appendChild(p);
      if (i > 0) {
        const prev = stepsEl.children[i - 1];
        if (prev) prev.classList.add('done');
      }
    }, i * 900);
  });

  const totalTime = CONFIRM_STEPS.length * 900 + 700;
  setTimeout(() => {
    const last = stepsEl.lastElementChild;
    if (last) last.classList.add('done');
    setTimeout(showConfirmation, 500);
  }, totalTime);
}

function showConfirmation() {
  document.getElementById('confirm-processing').style.display = 'none';
  const success = document.getElementById('confirm-success');
  success.style.display = 'flex';
  success.style.flexDirection = 'column';
  success.style.alignItems = 'center';

  document.getElementById('confirm-policy-num').textContent = generatePolicyNumber();

  const nameMap = { basic: 'Basic', standard: 'Standard', premium: 'Platinum', god: 'God Help You' };
  const t = TIERS[state.selectedPlan];
  document.getElementById('confirm-summary').innerHTML = `
    <p>
      <strong>Plan:</strong> PolicyPal ${nameMap[state.selectedPlan]}<br/>
      <strong>Monthly Premium:</strong> ${t.price}/mo<br/>
      <strong>Obsolescence Score:</strong> ${state.score}/100<br/>
      <strong>Risk Tier:</strong> ${TIERS[state.tier].label}<br/>
      <strong>Coverage Start:</strong> Immediately (emotionally speaking)<br/>
      <strong>Benefit:</strong> Validated existential dread, ongoing
    </p>
  `;
}

function generatePolicyNumber() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  const seg = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `PP-${seg(4)}-${seg(4)}-${seg(6)}`;
}

function resetApp() {
  state.currentQuestion = 0;
  state.totalPoints = 0;
  state.score = 0;
  state.tier = 'basic';
  state.selectedPlan = 'basic';

  // Reset gauge
  document.getElementById('gauge-fill').style.strokeDashoffset = '502';
  document.getElementById('gauge-number').textContent = '0';

  showScreen('screen-landing');
}
