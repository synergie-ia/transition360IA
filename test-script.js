/* --- Échelle incrémentale --- */
const SCALE = { 0:0, 1:4, 2:9, 3:16, 4:25 };

let answers = JSON.parse(localStorage.getItem("answers") || "{}");
let profileScores = {};
let hasCalculated = false;

/* --- Rendu du questionnaire --- */
function renderQuestions() {
  const root = document.getElementById("questionnaire");

  root.innerHTML = QUESTIONS.map(q => `
    <div class="question-block">
      <div class="question-title">${q.title}</div>
      ${q.options.map(opt => {
        const key = q.id + "-" + opt.dim;
        const saved = answers[key] ?? null;
        return `
        <div class="option-row">
          <div class="option-text">${opt.text}</div>
          <div class="rating-buttons">
            ${[0,1,2,3,4].map(v => `
              <div class="rate-btn ${saved===v ? "selected-"+v:""}"
                   data-q="${q.id}" data-dim="${opt.dim}" data-value="${v}">
                ${v}
              </div>`).join("")}
          </div>
        </div>`;
      }).join("")}
    </div>
  `).join("");

  document.querySelectorAll(".rate-btn").forEach(btn =>
    btn.onclick = () => {
      const q = btn.dataset.q;
      const dim = btn.dataset.dim;
      const v = Number(btn.dataset.value);

      answers[q+"-"+dim] = v;
      localStorage.setItem("answers", JSON.stringify(answers));

      document.querySelectorAll(`[data-q="${q}"][data-dim="${dim}"]`)
        .forEach(b => b.className = "rate-btn");
      btn.classList.add("selected-"+v);

      if (hasCalculated) calcBtn.textContent = "♻️ Recalculer le profil";
    }
  );
}

renderQuestions();

/* --- Calcul profil --- */
function computeProfile() {
  let s = {};
  DIMENSIONS.forEach(d => s[d.code] = 0);

  Object.entries(answers).forEach(([k,v]) => {
    const dim = k.split("-")[1];
    s[dim] += SCALE[v];
  });
  return s;
}

/* --- Affichage profil --- */
const calcBtn = document.getElementById("calcBtn");
calcBtn.onclick = () => {
  profileScores = computeProfile();
  localStorage.setItem("profile_scores", JSON.stringify(profileScores));
  hasCalculated = true;

  const sorted = Object.entries(profileScores)
    .sort((a,b)=>b[1]-a[1]);

  document.getElementById("profile-results").innerHTML = sorted.map(([dim,val])=>{
    const max = 25*4;
    const pct = Math.round((val/max)*100);
    return `
      <div class="profile-row">
        <div>${DIMENSIONS.find(d=>d.code===dim).name}</div>
        <div class="profile-bar"><div class="profile-fill" style="width:${pct}%"></div></div>
        <div>${pct}%</div>
      </div>`;
  }).join("");

  document.getElementById("profile-section").classList.remove("hidden");
};

/* --- Calcul Univers --- */
function computeUnivers() {
  return universes.map(u=>{
    let total=0, max=0;
    u.weights.forEach((w,i)=>{
      total += profileScores[DIMENSIONS[i].code] * w;
      max += (25*4) * w;
    });
    return {...u, pct: Math.round((total/max)*100)};
  }).sort((a,b)=>b.pct-a.pct);
}

/* --- Affichage Univers --- */
document.getElementById("showUniversBtn").onclick = () => {
  const list = computeUnivers();

  document.getElementById("univers-container").innerHTML = list.map(u=>`
    <div class="univers-card">
      <div>${u.icon} ${u.name}</div>
      <div><strong>${u.pct}%</strong></div>
    </div>
  `).join("");

  document.getElementById("univers-section").classList.remove("hidden");
};
