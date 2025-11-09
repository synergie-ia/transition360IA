document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("questions-container");
  const progressBar = document.getElementById("progress-bar");

  // Génération du questionnaire
  interests.forEach(interest => {
    const card = document.createElement("div");
    card.className = "interest-card";

    card.innerHTML = `
      <div class="interest-name">${interest.name}</div>
      <div class="interest-question">${interest.question}</div>
      ${interest.statements.map((text, index) => `
        <div class="statement">
          <div class="statement-text">${text}</div>
          <div class="rating-buttons">
            ${[0,1,2,3,4].map(v => `
              <button class="rating-btn" data-interest="${interest.id}" data-statement="${index}" data-value="${v}">
                ${v}
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `;

    container.appendChild(card);
  });

  // Sélection bouton
  document.addEventListener("click", e => {
    if (e.target.classList.contains("rating-btn")) {
      const group = e.target.parentElement.querySelectorAll(".rating-btn");
      group.forEach(btn => btn.classList.remove("selected"));
      e.target.classList.add("selected");
      updateProgress();
    }
  });

  function updateProgress() {
    const count = document.querySelectorAll(".rating-btn.selected").length;
    const total = interests.length * 4;
    progressBar.style.width = `${(count / total) * 100}%`;
  }

  // Calcul
  document.getElementById("calculate-btn").addEventListener("click", () => {
    const scores = Array(interests.length).fill(0);

    document.querySelectorAll(".rating-btn.selected").forEach(btn => {
      const i = btn.dataset.interest - 1;
      scores[i] += parseInt(btn.dataset.value);
    });

    console.log("Scores par dimension :", scores);
    alert("✅ Questionnaire terminé ! Les scores sont affichés dans la console.");
  });
});
