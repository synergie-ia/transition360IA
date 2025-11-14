/* 
  ============================================
  RECONVERSION 360 IA - QUESTIONNAIRE PROFIL
  ============================================
  VERSION 2.0 - PONDÉRATION QUADRATIQUE
  Date : 14 novembre 2025
  
  AMÉLIORATIONS :
  ✅ Pondération quadratique des poids (Poids²)
  ✅ Meilleure discrimination entre univers
  ✅ Matrices optimisées pour plus de contraste
  
  ALGORITHME :
  
  ÉTAPE 1 - PROFIL : Σ(réponse²) / 48 × 100
  ÉTAPE 2 - UNIVERS : Σ(Score × Poids²) / Σ(Poids²) / 48 × 100
  
  Poids² :  0→0,  3→9,  6→36,  12→144
  
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
  CALCUL DU PROFIL (QUADRATIQUE)
  ============================================
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

function percentFromSum(sum){
  const MAX_SCORE_QUADRATIQUE = 48;
  return Math.round((sum / MAX_SCORE_QUADRATIQUE) * 100);
}

/* 
  ============================================
  ÉCHELLE DE COMPATIBILITÉ (OPTIMISÉE)
  ============================================
*/
function getCompatibilityLevel(pct){
  if(pct >= 50){
    return {
      level: "Très compatible",
      stars: "🟢🟢🟢",
      class: "level-5"
    };
  } else if(pct >= 40){
    return {
      level: "Compatible",
      stars: "🔵🔵",
      class: "level-4"
    };
  } else if(pct >= 30){
    return {
      level: "Assez compatible",
      stars: "🟠",
      class: "level-3"
    };
  } else if(pct >= 20){
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
  CALCUL DES UNIVERS - VERSION QUADRATIQUE ✨
  ============================================
  
  NOUVEAUTÉ : Poids élevés au carré !
  Poids 12 → 144 (16x plus fort que poids 3)
  
  Impact : Écarts de 20-40% entre univers
*/
function calcUnivers(){
  const scoresQuadratiques = calcProfile();
  
  if(typeof universesData === 'undefined'){
    console.error("❌ universesData non défini");
    return [];
  }
  
  if(typeof UNIVERS_WEIGHTS === 'undefined'){
    console.error("❌ UNIVERS_WEIGHTS non défini");
    return [];
  }
  
  const universAvecScores = universesData.map(univers => {
    let sommePonderee = 0;
    let sommePoidsCarre = 0;
    
    const universWeights = UNIVERS_WEIGHTS.find(uw => uw.id === univers.id);
    
    if(universWeights && universWeights.weights){
      universWeights.weights.forEach((poids, index) => {
        if(index < DIMENSIONS.length){
          const dimCode = DIMENSIONS[index].code;
          const scoreQuadratique = scoresQuadratiques[dimCode];
          
          // 🔥 PONDÉRATION QUADRATIQUE : poids²
          const poidsCarre = poids * poids;
          
          sommePonderee += scoreQuadratique * poidsCarre;
          sommePoidsCarre += poidsCarre;
        }
      });
    } else {
      // Fallback si pas de poids définis
      DIMENSIONS.forEach(dim => {
        sommePonderee += scoresQuadratiques[dim.code];
        sommePoidsCarre += 1;
      });
    }
    
    const moyennePonderee = sommePoidsCarre > 0 ? sommePonderee / sommePoidsCarre : 0;
    const pourcentage = Math.round((moyennePonderee / 48) * 100);
    
    // Log détaillé pour le premier univers
    if(univers.id === 1){
      console.log(`
🔬 Calcul QUADRATIQUE pour "${univers.name}" :
   Somme pondérée : ${sommePonderee.toFixed(2)}
   Somme poids² : ${sommePoidsCarre}
   Moyenne : ${moyennePonderee.toFixed(2)}
   % : ${pourcentage}%
      `);
    }
    
    return {...univers, pct: pourcentage};
  });
  
  const universTries = universAvecScores.sort((a, b) => b.pct - a.pct);
  
  console.log("🏆 Top 5 (méthode QUADRATIQUE):");
  universTries.slice(0, 5).forEach((u, i) => {
    console.log(`   ${i+1}. ${u.name} : ${u.pct}%`);
  });
  
  // Calcul de l'écart pour vérifier la discrimination
  const ecartTop1Top5 = universTries[0].pct - universTries[4].pct;
  console.log(`📊 Écart Top1-Top5 : ${ecartTop1Top5}% (objectif > 10%)`);
  
  return universTries;
}

/* 
  ============================================
  AFFICHAGE DU PROFIL
  ============================================
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
  
  console.log("👤 Profil utilisateur :");
  dimensionsAvecScores.forEach(dim => {
    console.log(`   ${dim.name} : ${dim.pct}% (quad: ${dim.scoreQuadratique})`);
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

/* ===== COMPTEUR UNIVERS ===== */

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

/* ===== CARTE UNIVERS ===== */

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
          <div class="univers-pct">${u.pct}%</div>
          <div class="univers-actions">
            ${hasSubUnivers 
              ? `<button class="btn-toggle-sub" data-id="${u.id}" title="Voir sous-univers">🔎</button>` 
              : '<div style="width:40px"></div>'}
            <button class="btn-select-univers ${isSelected ? 'selected' : ''}" data-id="${u.id}" title="Sélectionner">
              <span class="tick">${isSelected ? '✓' : ''}</span>
            </button>
          </div>
        </div>
      </div>
      ${subUniversHTML}
    </div>
  `;
}

/* ===== ÉVÉNEMENTS UNIVERS ===== */

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
        btn.title = isVisible ? "Voir sous-univers" : "Masquer";
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

/* ===== AFFICHAGE UNIVERS ===== */

function displayUnivers(){
  console.log("Calcul univers (PONDÉRATION QUADRATIQUE)...");
  
  try {
    const list = calcUnivers();
    console.log(`${list.length} univers calculés`);
    
    if(list.length === 0){
      alert("Erreur : Aucun univers calculé.");
      return;
    }
    
    const percentages = {};
    list.forEach(u => {
      percentages[u.id] = u.pct;
    });
    localStorage.setItem('univers_percentages', JSON.stringify(percentages));
    
    const root = document.getElementById("univers-results");
    const top10 = list.slice(0, 10);

    const legendHTML = `
      <div class="stars-legend">
        <div class="legend-title">📊 Échelle de compatibilité (méthode quadratique) :</div>
        <div class="legend-items">
          <div class="legend-item">🟢🟢🟢 Très compatible (≥50%)</div>
          <div class="legend-item">🔵🔵 Compatible (40-49%)</div>
          <div class="legend-item">🟠 Assez compatible (30-39%)</div>
          <div class="legend-item">⚪ Peu compatible (20-29%)</div>
          <div class="legend-item">⚫ Très peu compatible (<20%)</div>
        </div>
      </div>
    `;

    root.innerHTML = legendHTML + top10.map(u => renderUniversCard(u)).join("");
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
    console.error("Erreur:", error);
    alert("Erreur : " + error.message);
  }
}

/* ===== INITIALISATION ===== */

document.addEventListener('DOMContentLoaded', function() {
  
  // Vérification des données
  if(typeof QUESTIONS === 'undefined'){
    console.error("❌ QUESTIONS non défini");
    alert("Erreur : QUESTIONS non chargé.");
    return;
  }
  
  if(typeof DIMENSIONS === 'undefined'){
    console.error("❌ DIMENSIONS non défini");
    alert("Erreur : DIMENSIONS non chargé.");
    return;
  }
  
  if(typeof universesData === 'undefined'){
    console.error("❌ universesData non défini");
    alert("Erreur : universesData non chargé.");
    return;
  }
  
  if(typeof UNIVERS_WEIGHTS === 'undefined'){
    console.error("❌ UNIVERS_WEIGHTS non défini");
    alert("Erreur : UNIVERS_WEIGHTS non chargé.");
    return;
  }
  
  console.log("✅ Toutes les données chargées");
  console.log(`📋 ${QUESTIONS.length} questions`);
  console.log(`🎯 ${DIMENSIONS.length} dimensions`);
  console.log(`🌍 ${universesData.length} univers`);
  console.log(`⚙️ ${UNIVERS_WEIGHTS.length} matrices`);
  
  loadSelections();
  loadAnswers();
  
  totalQuestions = countTotalQuestions();
  console.log(`Total questions: ${totalQuestions}`);
  
  renderQuestions();

  const btnValidate = document.getElementById("validateBtn");
  const errorMessage = document.getElementById("errorMessage");
  
  btnValidate.addEventListener("click", ()=>{
    loadAnswers();
    
    if(!allQuestionsAnswered()){
      const unanswered = highlightUnansweredQuestions();
      errorMessage.classList.remove("hidden");
      
      if(unanswered.length > 0){
        const firstRow = document.querySelector(`.option-row[data-key="${unanswered[0].key}"]`);
        if(firstRow){
          setTimeout(() => {
            firstRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        alert("⚠️ Minimum 3 univers requis.\n\nActuellement : " + selectedUnivers.size);
        return;
      }
      
      try {
        const allUnivers = calcUnivers();
        const selectedUniversDetails = {};
        
        selectedUnivers.forEach(id => {
          const univers = allUnivers.find(u => u.id === id);
          if(univers){
            const compatibility = getCompatibilityLevel(univers.pct);
            selectedUniversDetails[id] = {
              name: univers.name,
              level: compatibility.level,
              stars: compatibility.stars,
              pct: univers.pct
            };
          }
        });
        
        localStorage.setItem('selected_univers_details', JSON.stringify(selectedUniversDetails));
        
        console.log('✅ Sélection validée:', selectedUniversDetails);
        
        const originalText = btnValidateSelection.innerHTML;
        btnValidateSelection.innerHTML = '✅ Enregistré !';
        btnValidateSelection.style.background = '#22c55e';
        btnValidateSelection.style.color = '#fff';
        
        setTimeout(() => {
          btnValidateSelection.innerHTML = originalText;
          btnValidateSelection.style.background = '';
          btnValidateSelection.style.color = '';
        }, 3000);
        
        alert("✅ Sélection de " + selectedUnivers.size + " univers enregistrée !\n\nVous pouvez retourner à l'accueil.");
        
      } catch(error) {
        console.error('❌ Erreur:', error);
        alert("❌ Erreur de sauvegarde.");
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
