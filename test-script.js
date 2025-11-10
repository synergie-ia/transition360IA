// ==========================================================
// test-script.js — Questionnaire A/B/C/D → Intérêts → Univers
// ==========================================================

(function(){
  "use strict";

  // Sûreté des données
  const QUESTIONS = Array.isArray(window.questions) ? window.questions : [];
  const INTERESTS = Array.isArray(window.interests) ? window.interests : [];
  const UNIVERSES = Array.isArray(window.universes) ? window.universes : [];
  const STORAGE_KEY = window.R360_ABCD_KEY || 'reconversion360_abcd';

  // État
  let answers = {};           // { qIndex: 'A'|'B'|'C'|'D' }
  let interestScores = {};    // { code: 0..4 } — calculé depuis answers
  let results = [];           // univers triés

  // Chargement localStorage
  function loadState(){
    try{
      const saved = localStorage.getItem(STORAGE_KEY);
      answers = saved ? JSON.parse(saved) : {};
    }catch(e){
      console.warn("Impossible de charger le stockage :", e);
      answers = {};
    }
  }
  function saveState(){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }catch(e){
      console.warn("Impossible de sauvegarder :", e);
    }
  }

  // Rendu des questions (style cartes)
  function renderQuestions(){
    const container = document.getElementById('questionsList');
    if(!container){ return; }
    if(!QUESTIONS.length){
      container.innerHTML = `<p style="color:red;padding:20px;">❌ Le questionnaire n'a pas été chargé.</p>`;
      return;
    }

    container.innerHTML = QUESTIONS.map((q, qi) => {
      const idx = qi + 1;
      return `
        <div class="question-card" data-q="${idx}">
          <div class="question-title">${q.title}</div>
          <div class="question-text">${q.text}</div>
          <div class="choice-grid">
            ${q.choices.map(ch => {
              const selected = answers[idx] === ch.key ? 'selected' : '';
              return `
                <button class="choice-btn ${selected}" data-q="${idx}" data-choice="${ch.key}">
                  <div class="choice-key">${ch.key}</div>
                  <div class="choice-text">${ch.text} <span style="opacity:.7;">(${labelFromCode(ch.code)})</span></div>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Listeners
    container.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', function(){
        const q = Number(this.dataset.q);
        const c = this.dataset.choice;

        // sélection unique
        answers[q] = c;
        saveState();

        const card = this.closest('.question-card');
        card.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');

        updateProgress();
      });
    });

    updateProgress();
  }

  // Progression
  function updateProgress(){
    const total = QUESTIONS.length || 1;
    const answered = Object.keys(answers).length;
    const pct = Math.min(100, (answered / total) * 100);
    const bar = document.getElementById('progressBar');
    if(bar) bar.style.width = pct + '%';
  }

  // Calcul des scores par dimension à partir des 12 réponses
  function computeInterestScores(){
    // Init 0
    interestScores = {};
    INTERESTS.forEach(i => { interestScores[i.code] = 0; });

    // Mapping explicite depuis window.questions (chaque choix contient un code)
    QUESTIONS.forEach((q, idx) => {
      const qIndex = idx + 1;
      const choiceKey = answers[qIndex];
      if(!choiceKey) return;
      const choice = q.choices.find(c => c.key === choiceKey);
      if(!choice) return;

      const code = choice.code;
      if(typeof interestScores[code] === 'number') {
        interestScores[code] += 1; // chaque dimension apparaît 4 fois max → plage 0..4
      }
    });
  }

  // Conversion intérêts (0..4) → univers via weights (0/1/3/6)
  function computeUniversResults(){
    results = UNIVERSES.map(u => {
      let score = 0;
      let maxScore = 0;

      // respecter l'ordre : MO, PT, AL, SI, CS, EC, MP, CP, IP, AT, AA, RI
      // on récupère la valeur de chaque code dans interestScores en respectant l'ordre d'INTERESTS
      INTERESTS.forEach((it, i) => {
        const weight = u.weights[i] || 0;
        const userVal = interestScores[it.code] || 0;   // 0..4
        score += userVal * weight;
        maxScore += 4 * weight; // max utilisateur = 4 (car chaque dimension peut être choisie 4 fois)
      });

      const percentage = maxScore ? (score / maxScore) * 100 : 0;
      return { ...u, score, maxScore, percentage };
    }).sort((a,b) => b.percentage - a.percentage);
  }

  // Affichage des résultats
  function renderResults(){
    const wrap = document.getElementById('results');
    const list = document.getElementById('resultsList');
    if(!wrap || !list) return;

    const top5 = results.slice(0,5);
    const rest = results.slice(5);

    list.innerHTML = `
      <h2 style="text-align:center;margin-bottom:28px;">🎯 Vos résultats</h2>
      ${top5.map((r,i)=>`
        <div class="result-card">
          <div class="result-info">
            <div class="result-title">${r.icon} #${i+1} ${r.name}</div>
            <div class="progress-bar"><div class="progress-fill" style="width:${r.percentage.toFixed(1)}%"></div></div>
          </div>
          <div class="result-actions">
            <div class="result-score">${Math.round(r.percentage)}%</div>
          </div>
        </div>
      `).join('')}
      ${rest.length ? `
        <button class="show-more-btn" id="showMoreBtn">👇 Voir les ${rest.length} autres univers</button>
        <div id="remainingUniverses" style="display:none;">
          ${rest.map((r,i)=>`
            <div class="result-card">
              <div class="result-info">
                <div class="result-title">${r.icon} #${i+6} ${r.name}</div>
                <div class="progress-bar"><div class="progress-fill" style="width:${r.percentage.toFixed(1)}%"></div></div>
              </div>
              <div class="result-actions"><div class="result-score">${Math.round(r.percentage)}%</div></div>
            </div>
          `).join('')}
        </div>
      ` : ``}
    `;

    wrap.classList.add('show');

    const btn = document.getElementById('showMoreBtn');
    if(btn){
      btn.onclick = () => {
        document.getElementById('remainingUniverses').style.display = 'block';
        btn.style.display = 'none';
      };
    }
  }

  // Label court depuis code (MO, PT, etc.)
  function labelFromCode(code){
    const it = INTERESTS.find(i => i.code === code);
    return it ? it.name : code;
  }

  // Contrôle avant calcul
  function validateAllAnswered(){
    const total = QUESTIONS.length;
    return Object.keys(answers).length === total;
  }

  // Action calcul
  function onCalculate(){
    if(!validateAllAnswered()){
      alert("Merci de répondre aux 12 questions avant de calculer vos résultats.");
      return;
    }
    computeInterestScores();
    computeUniversResults();
    renderResults();
    // scroll vers résultats
    document.getElementById('results').scrollIntoView({ behavior:'smooth', block:'start' });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderQuestions();
    const btn = document.getElementById('calculateBtn');
    if(btn) btn.addEventListener('click', onCalculate);
  });

})();
