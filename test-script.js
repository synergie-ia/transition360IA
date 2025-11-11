/********************
 * ÉTAT & PERSISTANCE
 ********************/
const LS_KEY_ANSWERS = 'ia360_answers_v2';
const LS_KEY_LAST_SNAPSHOT = 'ia360_last_snapshot_v2';

let answers = {};              // { "QID-DIM": value }
let lastComputedSnapshot = ""; // JSON des réponses lors du dernier calcul

function loadState() {
  try{
    const raw = localStorage.getItem(LS_KEY_ANSWERS);
    answers = raw ? JSON.parse(raw) : {};
    lastComputedSnapshot = localStorage.getItem(LS_KEY_LAST_SNAPSHOT) || "";
  }catch(e){ answers = {}; lastComputedSnapshot = ""; }
}
function saveAnswers() {
  try{ localStorage.setItem(LS_KEY_ANSWERS, JSON.stringify(answers)); }catch(e){}
}
function saveSnapshot() {
  try{ localStorage.setItem(LS_KEY_LAST_SNAPSHOT, snapshotAnswers()); }catch(e){}
}
function snapshotAnswers(){
  // snapshot stable: tri des clés
  const ordered = Object.keys(answers).sort().reduce((acc,k)=>{acc[k]=answers[k]; return acc;},{});
  return JSON.stringify(ordered);
}
function isDirty(){
  return snapshotAnswers() !== (lastComputedSnapshot || "");
}

/********************
 * RENDU QUESTIONNAIRE
 ********************/
function renderQuestions(){
  const root = document.getElementById("questionnaire");
  root.innerHTML = QUESTIONS.map(q => `
    <div class="question-block" data-q="${q.id}">
      <div class="question-title">${q.title}</div>
      ${q.options.map(opt => {
        const key = `${q.id}-${opt.dim}`;
        const current = Number.isFinite(answers[key]) ? Number(answers[key]) : null;
        return `
          <div class="option-row">
            <div class="option-text">${opt.text}</div>
            <div class="rating-buttons">
              ${[0,1,2,3,4].map(v=>{
                const selected = current === v ? "selected" : "";
                const valClass = current === v ? `val-${v}` : "";
                return `<div class="rate-btn ${selected} ${valClass}" data-q="${q.id}" data-dim="${opt.dim}" data-value="${v}">${v}</div>`;
              }).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");

  // interactions
  document.querySelectorAll(".rate-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const q = btn.dataset.q;
      const dim = btn.dataset.dim;
      const v = Number(btn.dataset.value);
      const key = `${q}-${dim}`;

      // maj état
      answers[key] = v;
      saveAnswers();

      // maj UI - unique sélection sur la même ligne (q+dim)
      document.querySelectorAll(`.rate-btn[data-q='${q}'][data-dim='${dim}']`)
        .forEach(b=> b.classList.remove("selected","val-0","val-1","val-2","val-3","val-4"));
      btn.classList.add("selected", `val-${v}`);

      // si un profil a déjà été calculé, marquer "dirty"
      updateRecalcState();
    });
  });
}

/********************
 * CALCUL PROFIL (12 dimensions)
 * - somme simple 0..4 (échelle incrémentale)
 * - max par dimension = 4 apparitions × 4 = 16
 ********************/
function calcProfile(){
  const scores = Object.fromEntries(DIMENSIONS.map(d=>[d.code,0]));
  Object.keys(answers).forEach(key=>{
    const dim = key.split("-")[1];
    scores[dim] += (answers[key] ?? 0);
  });
  return scores;
}

/********************
 * AFFICHAGE PROFIL
 ********************/
function renderProfile(){
  const scores = calcProfile();
  const root = document.getElementById("profile-results");
  root.innerHTML = DIMENSIONS.map(dim=>{
    const val = scores[dim.code];
    const pct = Math.round((val/16)*100);
    return `
      <div class="profile-row">
        <div class="profile-label">${dim.name}</div>
        <div class="profile-bar"><div class="profile-fill" style="width:${pct}%"></div></div>
        <div><strong>${pct}%</strong></div>
      </div>
    `;
  }).join("");
  document.getElementById("profile-section").classList.remove("hidden");
}

/********************
 * CALCUL UNIVERS (tri % décroissant)
 * - score = Σ (score_dim × poids_univers_dim)
 * - max   = Σ (16 × poids_univers_dim)
 ********************/
function calcUnivers(){
  const dimScores = calcProfile();
  return universes.map(u=>{
    let score=0, max=0;
    u.weights.forEach((w,i)=>{
      const dimCode = DIMENSIONS[i].code;
      score += (dimScores[dimCode]||0) * w;
      max   += 16 * w;
    });
    const pct = max>0 ? Math.round((score/max)*100) : 0;
    return {...u, pct};
  }).sort((a,b)=> b.pct - a.pct);
}

function renderUnivers(){
  const list = calcUnivers();
  const root = document.getElementById("univers-results");
  const top5 = list.slice(0,5);
  const others = list.slice(5);

  root.innerHTML = top5.map(u=>`
    <div class="univers-card">
      <div>${u.icon} ${u.name}</div>
      <div><strong>${u.pct}%</strong></div>
    </div>
  `).join("");

  const btnShow = document.getElementById("btn-show-all");
  btnShow.classList.remove("hidden");
  btnShow.onclick = ()=>{
    root.innerHTML += others.map(u=>`
      <div class="univers-card">
        <div>${u.icon} ${u.name}</div>
        <div><strong>${u.pct}%</strong></div>
      </div>
    `).join("");
    btnShow.classList.add("hidden");
  };

  document.getElementById("univers-section").classList.remove("hidden");
}

/********************
 * LOGIQUE “RECALCULER”
 ********************/
function setCalcButtonDirtyUI(isDirty){
  const btn = document.getElementById("btn-calc-profile");
  const banner = document.getElementById("recalc-banner");
  const btnUnivers = document.getElementById("btn-calc-univers");

  if(isDirty){
    btn.textContent = "🔄 Recalculer mon profil";
    banner.classList.remove("hidden");
    // Bloquer l’accès aux univers tant que non recalculé
    if (btnUnivers) btnUnivers.disabled = true;
  }else{
    btn.textContent = "✅ Calculer mon profil";
    banner.classList.add("hidden");
    if (btnUnivers && !document.getElementById("profile-section").classList.contains("hidden")){
      btnUnivers.disabled = false;
    }
  }
}
function updateRecalcState(){
  setCalcButtonDirtyUI(isDirty());
}

/********************
 * NAVIGATION
 ********************/
function goBackToUnivers(){
  window.location.href = "universes.html";
}

/********************
 * INIT
 ********************/
document.addEventListener("DOMContentLoaded", ()=>{
  loadState();
  renderQuestions();
  updateRecalcState();

  // Boutons retour
  document.getElementById("btn-back-univers-top").addEventListener("click", goBackToUnivers);
  document.getElementById("btn-back-univers-bottom").addEventListener("click", goBackToUnivers);

  // Calcul / Recalcul profil
  const doCalculate = ()=>{
    renderProfile();
    // snapshot “propre” après calcul
    lastComputedSnapshot = snapshotAnswers();
    saveSnapshot();
    setCalcButtonDirtyUI(false); // déverrouille “Voir les univers”
  };
  document.getElementById("btn-calc-profile").addEventListener("click", doCalculate);
  document.getElementById("btn-recalc-inline").addEventListener("click", doCalculate);

  // Univers
  document.getElementById("btn-calc-univers").addEventListener("click", ()=>{
    renderUnivers();
    // scroll vers la section
    document.getElementById("univers-section").scrollIntoView({behavior:"smooth", block:"start"});
  });

  // Si des réponses existaient déjà : on affiche directement le profil (option “sauter au profil”)
  if(Object.keys(answers).length){
    renderProfile();
    // Considérer l’état comme “propre” au chargement, puis repasser en dirty si l’utilisateur modifie
    lastComputedSnapshot = snapshotAnswers();
    saveSnapshot();
    setCalcButtonDirtyUI(false);
  }
});
