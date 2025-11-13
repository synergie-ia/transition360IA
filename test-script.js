/* 
  ============================================
  RECONVERSION 360 IA - QUESTIONNAIRE PROFIL
  ============================================
  
  ALGORITHME DE CALCUL :
  
  ÉTAPE 1 - CALCUL DU PROFIL (Scores quadratiques)
  ------------------------------------------------
  Pour chaque dimension, on additionne le CARRÉ des réponses.
  
  Exemple pour la dimension "SI" (Sciences & innovation) :
  - Réponses : 4, 3, 4, 2
  - Calcul : 4² + 3² + 4² + 2² = 16 + 9 + 16 + 4 = 45
  - Score brut : 45
  - Pourcentage : (45 / 64) × 100 = 70%
  
  Pourquoi 64 ? 
  → Maximum théorique = 4 réponses × 4² = 4 × 16 = 64
  
  Pourquoi le carré ?
  → Accentue les préférences fortes (4² = 16 vs 2² = 4)
  → Minimise les réponses faibles (1² = 1)
  → Évite les profils "moyens partout"
  
  
  ÉTAPE 2 - CALCUL DES UNIVERS (Moyenne pondérée)
  ------------------------------------------------
  Pour chaque univers, on calcule une moyenne pondérée des scores quadratiques.
  
  Exemple pour l'univers "Sciences, recherche & innovation" :
  
  Poids de corrélation : [5, 3, 9, 10, 8, 1, 4, 8, 0, 1, 1, 3]
  Dimensions :           MO  PT  AL  SI  CS  EC  CP  IP  MP  AE  AA  RI
  
  Scores utilisateur (quadratiques) :
  MO=16, PT=0, AL=36, SI=45, CS=36, EC=1, CP=42, IP=48, MP=7, AE=16, AA=4, RI=26
  
  Calcul de la somme pondérée :
  = (16×5) + (0×3) + (36×9) + (45×10) + (36×8) + (1×1) + (42×4) + (48×8) + (7×0) + (16×1) + (4×1) + (26×3)
  = 80 + 0 + 324 + 450 + 288 + 1 + 168 + 384 + 0 + 16 + 4 + 78
  = 1793
  
  Somme des poids : 5+3+9+10+8+1+4+8+0+1+1+3 = 53
  
  Moyenne pondérée : 1793 / 53 = 33.83
  
  Pourcentage final : (33.83 / 64) × 100 = 53%
  
  → L'univers "Sciences" a un score de 53% pour cet utilisateur
  
  ============================================
*/

let answers = {};
let profileComputed = false;
let selectedUnivers = new Set();
let totalQuestions = 0;

/* ===== GESTION DU LOCALSTORAGE ===== */

function loadSelections(){
  const saved = localStorage.getItem('selectedUnivers');
  if(saved){
    selectedUnivers = new Set(JSON.parse(saved));
  }
}

function saveSelections(){
  localStorage.setItem('selectedUnivers', JSON.stringify([...selectedUnivers]));
}

function loadAnswers(){
  const saved = localStorage.getItem('questionnaire_answers');
  if(saved){
    answers = JSON.parse(saved);
    return true;
  }
  return false;
}

function saveAnswers(){
  localStorage.setItem('questionnaire_answers', JSON.stringify(answers));
}

/* ===== UTILITAIRES ===== */

function countTotalQuestions(){
  let count = 0;
  QUESTIONS.forEach(q => {
    count += q.options.length;
  });
  return count;
}

function allQuestionsAnswered(){
  const currentCount = Object.keys(answers).length;
  console.log(`Réponses: ${currentCount}/${totalQuestions}`);
  return currentCount === totalQuestions;
}

function getUnansweredQuestions(){
  const unanswered = [];
  
  QUESTIONS.forEach(q => {
    q.options.forEach(opt => {
      const key = `${q.id}-${opt.dim}`;
      if(answers[key] === undefined){
        unanswered.push({
          questionId: q.id,
          questionTitle: q.title,
          optionText: opt.text,
          key: key
        });
      }
    });
  });
  
  return unanswered;
}

function highlightUnansweredQuestions(){
  document.querySelectorAll('.option-row').forEach(row => {
    row.classList.remove('unanswered');
  });
  
  const unanswered = getUnansweredQuestions();
  
  unanswered.forEach(item => {
    const selector = `.option-row[data-key="${item.key}"]`;
    const row = document.querySelector(selector);
    if(row){
      row.classList.add('unanswered');
    }
  });
  
  return unanswered;
}

/* ===== RENDU DES QUESTIONS ===== */

function renderQuestions(){
  const root = document.getElementById("questionsContainer");
  
  root.innerHTML = QUESTIONS.map(q => `
    <div class="question-block" id="block-${q.id}">
      <div class="question-title">${q.title}</div>
      ${q.options.map(opt => {
        const key = `${q.id}-${opt.dim}`;
        return `
        <div class="option-row" data-key="${key}">
          <div class="option-text">${opt.text}</div>
          <div class="rating-buttons">
            ${[0,1,2,3,4].map(v => `
              <div class="rate-btn" data-q="${q.id}" data-dim="${opt.dim}" data-val="${v}">${v}</div>
            `).join("")}
          </div>
        </div>
      `}).join("")}
    </div>
  `).join("");

  Object.keys(answers).forEach(key=>{
    const [q, dim] = key.split("-");
    const v = answers[key];
    const selector = `.rate-btn[data-q='${q}'][data-dim='${dim}'][data-val='${v}']`;
    const btn = document.querySelector(selector);
    if(btn){
      btn.classList.add("selected", `v${v}`);
    }
  });

  attachRatingEvents();
}

function attachRatingEvents(){
  document.querySelectorAll(".rate-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const q = btn.dataset.q;
      const dim = btn.dataset.dim;
      const v = Number(btn.dataset.val);
      const key = `${q}-${dim}`;
      
      answers[key] = v;
      saveAnswers();

      const selector = `.rate-btn[data-q='${q}'][data-dim='${dim}']`;
      document.querySelectorAll(selector).forEach(b=>{
        b.classList.remove("selected","v0","v1","v2","v3","v4");
      });
      
      btn.classList.add("selected", `v${v}`);

      const row = document.querySelector(`.option-row[data-key="${key}"]`);
      if(row){
        row.classList.remove('unanswered');
      }

      if(allQuestionsAnswered()){
        document.getElementById("errorMessage").classList.add("hidden");
      }

      if(profileComputed){
        document.getElementById("profileSection").classList.add("hidden");
        document.getElementById("univers-section").classList.add("hidden");
        profileComputed = false;
      }
    });
  });
}

/* 
  ============================================
  ÉTAPE 1 : CALCUL DU PROFIL (QUADRATIQUE)
  ============================================
  
  Cette fonction calcule le score de chaque dimension en additionnant
  le CARRÉ de chaque réponse.
  
  Pourquoi le carré ?
  - Valorise les préférences fortes (4² = 16)
  - Minimise les réponses neutres (2² = 4)
  - Accentue les contrastes dans le profil
  
  Retour : Objet avec les scores bruts (non convertis en %)
  Exemple : { MO: 30, PT: 16, AL: 45, SI: 50, ... }
*/
function calcProfile(){
  const scores = Object.fromEntries(DIMENSIONS.map(d => [d.code, 0]));
  
  Object.keys(answers).forEach(key => {
    const [, dim] = key.split("-");
    const val = answers[key];
    scores[dim] += val * val;
  });
  
  console.log("📊 Scores quadratiques par dimension:", scores);
  
  return scores;
}

/* 
  Convertit un score quadratique brut en pourcentage
  
  Max théorique = 64 (si l'utilisateur met 4 aux 4 réponses d'une dimension)
  Calcul : 4² + 4² + 4² + 4² = 16 + 16 + 16 + 16 = 64
  
  Exemple : score de 32 → (32/64) × 100 = 50%
*/
function percentFromSum(sum){
  const MAX_SCORE_QUADRATIQUE = 64;
  return Math.round((sum / MAX_SCORE_QUADRATIQUE) * 100);
}

/* 
  ============================================
  ÉCHELLE OFFICIELLE DE COMPATIBILITÉ
  ============================================
  
  Nouvelle échelle à 5 niveaux basée sur les pourcentages :
  
  Pourcentage    Niveau                    Symboles
  ≥ 52 %         Très compatible           ⭐⭐⭐
  48 % – 51 %    Compatible                ⭐⭐
  44 % – 47 %    Assez compatible          ⭐
  40 % – 43 %    Peu compatible            ⚪
  ≤ 39 %         Très peu compatible       ⚫
  
  Retourne un objet avec le niveau, les symboles et la classe CSS
*/
function getCompatibilityLevel(pct){
  if(pct >= 52){
    return {
      level: "Très compatible",
      stars: "⭐⭐⭐",
      class: "level-5"
    };
  } else if(pct >= 48){
    return {
      level: "Compatible",
      stars: "⭐⭐",
      class: "level-4"
    };
  } else if(pct >= 44){
    return {
      level: "Assez compatible",
      stars: "⭐",
      class: "level-3"
    };
  } else if(pct >= 40){
    return {
      level: "Peu compatible",
      stars: "⚪",
      class: "level-2"
    };
  } else {
    return {
      level: "Très peu compatible",
      stars: "⚫",
      class: "level-1"
    };
  }
}

/* 
  ============================================
  ÉTAPE 2 : CALCUL DES UNIVERS (MOYENNE PONDÉRÉE)
  ============================================
  
  Pour chaque univers professionnel, on calcule un score de compatibilité
  en utilisant une moyenne pondérée des scores quadratiques.
  
  Formule complète :
  Score_Univers = (Σ(Score_Dimension_Quadratique × Poids_Corrélation)) / (Σ Poids) / 64 × 100
  
  Retour : Liste des 21 univers triés par score décroissant
*/
function calcUnivers(){
  const scoresQuadratiques = calcProfile();
  
  if(typeof universesData === 'undefined'){
    console.error("❌ universesData n'est pas défini.");
    return [];
  }
  
  const universAvecScores = universesData.map(univers => {
    let sommePonderee = 0;
    let sommePoids = 0;
    
    if(typeof universes !== 'undefined'){
      const universMatch = universes.find(uv => uv.id === univers.id);
      
      if(universMatch && universMatch.weights){
        universMatch.weights.forEach((poids, index) => {
          if(index < DIMENSIONS.length){
            const dimCode = DIMENSIONS[index].code;
            const scoreQuadratique = scoresQuadratiques[dimCode];
            sommePonderee += scoreQuadratique * poids;
            sommePoids += poids;
          }
        });
      } else {
        DIMENSIONS.forEach(dim => {
          sommePonderee += scoresQuadratiques[dim.code];
          sommePoids += 1;
        });
      }
    } else {
      DIMENSIONS.forEach(dim => {
        sommePonderee += scoresQuadratiques[dim.code];
        sommePoids += 1;
      });
    }
    
    const moyennePonderee = sommePoids > 0 ? sommePonderee / sommePoids : 0;
    const pourcentage = Math.round((moyennePonderee / 64) * 100);
    
    if(univers.id === 1){
      console.log(`
🔬 Calcul détaillé pour "${univers.name}" :
   Somme pondérée : ${sommePonderee.toFixed(2)}
   Somme des poids : ${sommePoids}
   Moyenne pondérée : ${moyennePonderee.toFixed(2)}
   Pourcentage final : ${pourcentage}%
      `);
    }
    
    return {...univers, pct: pourcentage};
  });
  
  const universTries = universAvecScores.sort((a, b) => b.pct - a.pct);
  
  console.log("🏆 Top 5 des univers compatibles:");
  universTries.slice(0, 5).forEach((u, i) => {
    console.log(`   ${i+1}. ${u.name} : ${u.pct}%`);
  });
  
  return universTries;
}

/* 
  ============================================
  AFFICHAGE DU PROFIL
  ============================================
  
  Affiche les 12 dimensions avec leurs scores en pourcentage,
  triées par ordre décroissant.
*/
function displayProfile(){
  const scoresQuadratiques = calcProfile();
  const root = document.getElementById("profileResults");
  
  const dimensionsAvecScores = DIMENSIONS.map(dim => ({
    ...dim,
    scoreQuadratique: scoresQuadratiques[dim.code],
    pct: percentFromSum(scoresQuadratiques[dim.code])
  }));
  
  dimensionsAvecScores.sort((a, b) => b.pct - a.pct);
  
  console.log("👤 Profil de l'utilisateur :");
  dimensionsAvecScores.forEach(dim => {
    console.log(`   ${dim.name} : ${dim.pct}% (score quadratique: ${dim.scoreQuadratique})`);
  });
  
  root.innerHTML = dimensionsAvecScores.map(dim => `
    <div class="profile-row">
      <div class="profile-label">${dim.name}</div>
      <div class="profile-bar">
        <div class="profile-fill" style="width:${dim.pct}%"></div>
      </div>
      <div><strong>${dim.pct}%</strong></div>
    </div>
  `).join("");

  document.getElementById("profileSection").classList.remove("hidden");
  profileComputed = true;
  
  setTimeout(() => {
    document.getElementById("profileSection").scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }, 100);
}

/* ===== COMPTEUR UNIVERS SÉLECTIONNÉS ===== */

function updateUniversCounter(){
  const counter = document.getElementById("selectedUniversCounter");
  if(!counter) return;
  
  const n = selectedUnivers.size;
  counter.textContent = n === 0
    ? "0 univers sélectionné"
    : n === 1
      ? "1 univers sélectionné"
      : `${n} univers sélectionnés`;
}

/* ===== RENDU D'UNE CARTE UNIVERS ===== */

function renderUniversCard(u){
  const isSelected = selectedUnivers.has(u.id);
  const hasSubUnivers = u.subUniverses && u.subUniverses.length > 0;
  
  const compatibility = getCompatibilityLevel(u.pct);
  
  const subUniversHTML = hasSubUnivers
    ? `<div class="sub-univers-list" id="sub-${u.id}">
        ${u.subUniverses.map(s => `
          <div class="sub-item">
            <div class="sub-icon">${s.icon || '•'}</div>
            <div>
              <div class="sub-name">${s.name}</div>
              ${s.description ? `<div class="sub-desc">${s.description}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>`
    : '';

  return `
    <div class="univers-card ${isSelected ? 'selected' : ''} ${compatibility.class}" id="card-${u.id}">
      <div class="univers-header">
        <div class="univers-main">
          <div class="univers-icon">${u.icon}</div>
          <div class="univers-name">${u.name}</div>
        </div>
        <div class="univers-right">
          <div class="univers-stars">${compatibility.stars}</div>
          <div class="univers-actions">
            ${hasSubUnivers 
              ? `<button class="btn-toggle-sub" data-id="${u.id}" title="Voir les sous-univers">🔎</button>` 
              : '<div style="width:40px"></div>'}
            <button class="btn-select-univers ${isSelected ? 'selected' : ''}" data-id="${u.id}" title="Sélectionner cet univers">
              <span class="tick">${isSelected ? '✓' : ''}</span>
            </button>
          </div>
        </div>
      </div>
      ${subUniversHTML}
    </div>
  `;
}

/* ===== ÉVÉNEMENTS SUR LES CARTES UNIVERS ===== */

function attachUniversEvents(){
  document.querySelectorAll(".btn-toggle-sub").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      const id = btn.dataset.id;
      const subList = document.getElementById(`sub-${id}`);
      
      if(subList){
        const isVisible = subList.classList.contains("visible");
        subList.classList.toggle("visible");
        btn.textContent = isVisible ? "🔎" : "❌";
        btn.title = isVisible ? "Voir les sous-univers" : "Masquer les sous-univers";
      }
    });
  });

  document.querySelectorAll(".btn-select-univers").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      const card = document.getElementById(`card-${id}`);
      
      if(selectedUnivers.has(id)){
        selectedUnivers.delete(id);
        card.classList.remove("selected");
        btn.classList.remove("selected");
        btn.querySelector(".tick").textContent = "";
      } else {
        selectedUnivers.add(id);
        card.classList.add("selected");
        btn.classList.add("selected");
        btn.querySelector(".tick").textContent = "✓";
      }
      
      saveSelections();
      updateUniversCounter();
    });
  });
}

/* ===== AFFICHAGE DES UNIVERS ===== */

function displayUnivers(){
  console.log("Calcul des univers...");
  
  try {
    const list = calcUnivers();
    console.log(`${list.length} univers calculés`);
    
    if(list.length === 0){
      alert("Erreur : Aucun univers n'a pu être calculé.");
      return;
    }
    
    const percentages = {};
    list.forEach(u => {
      percentages[u.id] = u.pct;
    });
    localStorage.setItem('univers_percentages', JSON.stringify(percentages));
    
    const root = document.getElementById("univers-results");
    const top5 = list.slice(0, 5);
    const others = list.slice(5);

    const legendHTML = `
      <div class="stars-legend">
        <div class="legend-title">📊 Échelle de compatibilité :</div>
        <div class="legend-items">
          <div class="legend-item">⭐⭐⭐ Très compatible</div>
          <div class="legend-item">⭐⭐ Compatible</div>
          <div class="legend-item">⭐ Assez compatible</div>
          <div class="legend-item">⚪ Peu compatible</div>
          <div class="legend-item">⚫ Très peu compatible</div>
        </div>
      </div>
    `;

    root.innerHTML = legendHTML + top5.map(u => renderUniversCard(u)).join("");
    attachUniversEvents();
    updateUniversCounter();

    const btnShow = document.getElementById("btn-show-all");
    btnShow.classList.remove("hidden");
    
    const newBtnShow = btnShow.cloneNode(true);
    btnShow.parentNode.replaceChild(newBtnShow, btnShow);
    
    newBtnShow.addEventListener("click", ()=>{
      root.innerHTML = legendHTML + list.map(u => renderUniversCard(u)).join("");
      attachUniversEvents();
      newBtnShow.classList.add("hidden");
    });

    document.getElementById("univers-section").classList.remove("hidden");
    
    setTimeout(() => {
      document.getElementById("univers-section").scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
    
  } catch(error) {
    console.error("Erreur lors du calcul des univers:", error);
    alert("Une erreur s'est produite : " + error.message);
  }
}

/* ===== INITIALISATION ===== */

document.addEventListener('DOMContentLoaded', function() {
  
  if(typeof QUESTIONS === 'undefined'){
    console.error("❌ QUESTIONS non défini");
    alert("Erreur de chargement des données. Veuillez actualiser la page.");
    return;
  }
  
  if(typeof DIMENSIONS === 'undefined'){
    console.error("❌ DIMENSIONS non défini");
    alert("Erreur de chargement des données. Veuillez actualiser la page.");
    return;
  }
  
  if(typeof universesData === 'undefined'){
    console.error("❌ universesData non défini");
    alert("Erreur de chargement des données. Veuillez actualiser la page.");
    return;
  }
  
  console.log("✅ Toutes les données sont chargées correctement");
  console.log(`📋 ${QUESTIONS.length} questions chargées`);
  console.log(`🎯 ${DIMENSIONS.length} dimensions chargées`);
  console.log(`🌍 ${universesData.length} univers chargés`);
  
  loadSelections();
  loadAnswers();
  
  totalQuestions = countTotalQuestions();
  console.log(`Total de questions attendues: ${totalQuestions}`);
  
  renderQuestions();

  const btnValidate = document.getElementById("validateBtn");
  const errorMessage = document.getElementById("errorMessage");
  
  btnValidate.addEventListener("click", ()=>{
    loadAnswers();
    
    if(!allQuestionsAnswered()){
      const unanswered = highlightUnansweredQuestions();
      errorMessage.classList.remove("hidden");
      
      if(unanswered.length > 0){
        const firstUnansweredKey = unanswered[0].key;
        const firstUnansweredRow = document.querySelector(`.option-row[data-key="${firstUnansweredKey}"]`);
        
        if(firstUnansweredRow){
          setTimeout(() => {
            firstUnansweredRow.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }, 100);
        }
      }
      return;
    }
    
    errorMessage.classList.add("hidden");
    displayProfile();
  });

  const btnUnivers = document.getElementById("goUniversesBtn");
  btnUnivers.addEventListener("click", displayUnivers);

  const btnValidateSelection = document.getElementById('btnValidateSelection');
  if(btnValidateSelection){
    btnValidateSelection.addEventListener('click', ()=>{
      
      if(selectedUnivers.size < 3){
        alert("⚠️ Vous devez sélectionner au moins 3 univers avant de valider.\n\nActuellement : " + selectedUnivers.size + " univers sélectionné(s).");
        return;
      }
      
      try {
        const allUnivers = calcUnivers();
        const selectedUniversDetails = {};
        
        selectedUnivers.forEach(id => {
          const univers = allUnivers.find(u => u.id === id);
          if(univers){
            selectedUniversDetails[id] = {
              name: univers.name,
              percent: univers.pct
            };
          }
        });
        
        localStorage.setItem('selected_univers_details', JSON.stringify(selectedUniversDetails));
        
        console.log('✅ Sélection validée:', selectedUniversDetails);
        
        const originalText = btnValidateSelection.innerHTML;
        btnValidateSelection.innerHTML = '✅ Sélection enregistrée !';
        btnValidateSelection.style.background = '#22c55e';
        btnValidateSelection.style.color = '#fff';
        
        setTimeout(() => {
          btnValidateSelection.innerHTML = originalText;
          btnValidateSelection.style.background = '';
          btnValidateSelection.style.color = '';
        }, 3000);
        
        alert("✅ Votre sélection de " + selectedUnivers.size + " univers a été enregistrée avec succès !\n\nVous pouvez maintenant retourner à l'accueil et compléter votre bilan de situation.");
        
      } catch(error) {
        console.error('❌ Erreur lors de la validation:', error);
        alert("❌ Erreur lors de la sauvegarde. Veuillez réessayer.");
      }
    });
  }

  const btnAccueilTop = document.getElementById("btnAccueilTop");
  if(btnAccueilTop){
    btnAccueilTop.addEventListener("click", ()=>{
      window.location.href = 'index.html';
    });
  }

  const btnAccueilBottom = document.getElementById("btnAccueilBottom");
  if(btnAccueilBottom){
    btnAccueilBottom.addEventListener("click", ()=>{
      window.location.href = 'index.html';
    });
  }
});
