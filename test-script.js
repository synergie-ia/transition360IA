// Nombre de dimensions (12 si 48 questions = 4 par dimension)
const numDimensions = 12;

// Conversion échelle 0–4 -> 0 / 1 / 4 / 9 / 16
function mapIncremental(v) {
  return [0,1,4,9,16][v];
}

function buildQuestions() {
  const container = document.getElementById("questions");
  const saved = JSON.parse(localStorage.getItem("ia360_answers") || "[]");

  container.innerHTML = ""; // reset propre

  for (let i = 0; i < 48; i++) {
    const q = document.createElement("div");
    q.className = "question-block";

    q.innerHTML = `
      <div class="question-text">Question ${i+1}</div>
      <div class="scale" data-id="${i}">
        ${[0,1,2,3,4].map(v => `
          <div class="circle ${saved[i] === v ? "selected" : ""}" data-value="${v}"></div>
        `).join("")}
      </div>
    `;

    container.append(q);
  }

  // ✅ écoute de tous les clics
  document.querySelectorAll(".circle").forEach(circle => {
    circle.addEventListener("click", () => {
      const scale = circle.parentElement;
      const qIndex = parseInt(scale.dataset.id);
      const value = parseInt(circle.dataset.value);

      // récupère réponses existantes
      let answers = JSON.parse(localStorage.getItem("ia360_answers") || "[]");
      answers[qIndex] = value;
      localStorage.setItem("ia360_answers", JSON.stringify(answers));

      // visuel sélection
      scale.querySelectorAll(".circle").forEach(c => c.classList.remove("selected"));
      circle.classList.add("selected");
    });
  });
}

buildQuestions();

document.getElementById("calcBtn").addEventListener("click", () => {
  const raw = JSON.parse(localStorage.getItem("ia360_answers") || "[]");
  let scores = new Array(numDimensions).fill(0);

  raw.forEach((v, i) => {
    const dim = Math.floor(i / 4);
    scores[dim] += mapIncremental(v ?? 0);
  });

  localStorage.setItem("ia360_profile_scores", JSON.stringify(scores));
  window.location.href = "universes.html";
});
