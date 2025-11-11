let profileScores = JSON.parse(localStorage.getItem("profile_scores") || "{}");
let selectedUniverses = JSON.parse(localStorage.getItem("selected_universes") || "[]");

function computeUniverseScore(u) {
  let sum = 0;
  u.weights.forEach((w, i) => {
    const dim = DIMENSIONS[i].code;
    sum += w * (profileScores[dim] || 0);
  });
  return sum;
}

function renderUniverses() {
  const root = document.getElementById("universList");

  const sorted = universes.map(u => ({
    ...u,
    score: computeUniverseScore(u)
  })).sort((a,b)=> b.score - a.score);

  root.innerHTML = sorted.map(u => `
    <div class="universe-block">
      <div class="universe-header" onclick="toggleSub(${u.id})">
        <div class="universe-left">
          <div class="select-circle ${selectedUniverses.includes(u.id) ? 'selected':''}" onclick="event.stopPropagation(); toggleSelect(${u.id});"></div>
          <div>${u.icon} ${u.name}</div>
        </div>
        <div class="universe-score">${Math.round(u.score)} pts</div>
      </div>

      <div id="sub-${u.id}" class="subunivers">
        ${u.subUniverses.map(s => `
          <div class="sub-item">${s.icon} ${s.name}</div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function toggleSub(id) {
  const block = document.getElementById("sub-" + id);
  block.style.display = block.style.display === "block" ? "none" : "block";
}

function toggleSelect(id) {
  if (selectedUniverses.includes(id)) {
    selectedUniverses = selectedUniverses.filter(x => x !== id);
  } else {
    selectedUniverses.push(id);
  }
  localStorage.setItem("selected_universes", JSON.stringify(selectedUniverses));
  renderUniverses();
}

document.getElementById("finishBtn").onclick = () => {
  alert("✅ Univers sélectionnés sauvegardés !");
};

renderUniverses();
