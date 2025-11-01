// ===================================================
// ORIENTATION 360 IA — SCRIPT PRINCIPAL
// ===================================================

// Initialisation
let currentPage = 0;
let selections = {
  interets: [],
  personnalite: [],
  valeurs: []
};

// ===================================================
// NAVIGATION ENTRE LES PAGES
// ===================================================

function goToPage(pageIndex) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.style.display = "none");
  if (pageIndex === 0) document.getElementById("welcome").style.display = "block";
  else pages[pageIndex - 1].style.display = "block";
  currentPage = pageIndex;
  window.scrollTo(0, 0);
}

// ===================================================
// GESTION DES SÉLECTIONS
// ===================================================

function toggleSelection(cat, index) {
  const arr = selections[cat];
  const pos = arr.indexOf(index);
  const max = 6;

  if (pos > -1) {
    arr.splice(pos, 1);
  } else {
    if (arr.length >= max) {
      alert("Tu ne peux pas sélectionner plus de 6 éléments dans cette catégorie.");
      return;
    }
    arr.push(index);
  }

  renderCategory(cat);
}

function renderCategory(cat) {
  const container = document.getElementById(`${cat}-container`);
  const data = window[cat];
  container.innerHTML = "";

  data.forEach((d, i) => {
    const isSelected = selections[cat].includes(i);
    const item = document.createElement("div");
    item.className = "item-card" + (isSelected ? " selected" : "");
    item.onclick = () => toggleSelection(cat, i);
    item.innerHTML = `
      <div class="verbes">${d.verbes.join(", ")}</div>
      <div class="phrase">${d.phrase}</div>
    `;
    container.appendChild(item);
  });

  const count = selections[cat].length;
  const countEl = document.getElementById(`${cat}-count`);
  if (countEl) countEl.textContent = `${count} sélection(s)`;
}

// ===================================================
// PASSAGE À LA PAGE SUIVANTE
// ===================================================

function nextPage(cat) {
  const min = 3;
  if (selections[cat].length < min) {
    alert("Merci de sélectionner au moins 3 éléments avant de continuer.");
    return;
  }
  goToPage(currentPage + 1);
}

// ===================================================
// AFFICHAGE DU PROFIL GLOBAL
// ===================================================

function showSummary() {
  // Vérifie la dernière page avant affichage
  if (selections["valeurs"].length < 3) {
    alert("Merci de sélectionner au moins 3 éléments avant de voir ton profil.");
    return;
  }

  document.querySelectorAll(".page, #welcome").forEach(p => p.style.display = "none");
  const summary = document.getElementById("summary");
  summary.style.display = "block";

  const recap = document.getElementById("recap");
  recap.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "🎯 Ton profil global";
  recap.appendChild(title);

  Object.keys(selections).forEach(cat => {
    const section = document.createElement("div");
    section.className = "recap-section";
    section.innerHTML = `<h3>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>`;

    if (selections[cat].length === 0) {
      section.innerHTML += `<p><em>Aucun élément sélectionné.</em></p>`;
    } else {
      const list = document.createElement("ul");
      list.className = "recap-list";
      selections[cat].forEach(i => {
        const d = window[cat][i];
        const li = document.createElement("li");
        li.className = "recap-item";
        li.innerHTML = `
          <div class="recap-verbes">${d.verbes.join(", ")}</div>
          <div class="recap-phrase">${d.phrase}</div>
        `;
        list.appendChild(li);
      });
      section.appendChild(list);
    }
    recap.appendChild(section);
  });

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.innerHTML = `
    <button class="btn-strong" onclick="copyProfile()">📋 Copier pour l’IA</button>
    <button class="btn-strong" onclick="exportPDF()">📄 Télécharger le PDF</button>
    <button class="btn" onclick="goToPage(0)">🏠 Retour à l'accueil</button>
  `;
  recap.appendChild(actions);
}

// ===================================================
// COPIE DU PROFIL POUR L’IA
// ===================================================

function copyProfile() {
  let text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 PROFIL GLOBAL ORIENTATION 360 IA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce profil regroupe les éléments que tu as sélectionnés :
- Intérêts
- Personnalité
- Valeurs

────────────────────────────────────────
📌 Rappel : entre 3 et 6 choix par catégorie
────────────────────────────────────────
Date : ${new Date().toLocaleDateString("fr-FR")}\n\n`;

  Object.keys(selections).forEach(cat => {
    const title = cat.charAt(0).toUpperCase() + cat.slice(1);
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📂 ${title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (selections[cat].length === 0) {
      text += "Aucun élément sélectionné.\n\n";
    } else {
      selections[cat].forEach((i, index) => {
        const d = window[cat][i];
        text += `${index + 1}. ${d.verbes.join(", ")}\n   → ${d.phrase}\n\n`;
      });
    }
  });

  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧭 UTILISATION DANS L’IA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Colle ce texte dans ChatGPT pour obtenir :
- ton analyse qualitative,
- la mise en lien avec les univers métiers,
- et des pistes personnalisées.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.btn-strong[onclick="copyProfile()"]');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = "✅ Copié avec succès !";
      setTimeout(() => (btn.textContent = original), 2500);
    }
    alert("✅ Ton profil complet a été copié !\nTu peux maintenant le coller dans ChatGPT.");
  });
}

// ===================================================
// EXPORT PDF (placeholder)
// ===================================================

function exportPDF() {
  alert("📄 Le téléchargement PDF sera disponible prochainement.");
}

// ===================================================
// INITIALISATION AUTOMATIQUE
// ===================================================

document.addEventListener("DOMContentLoaded", function () {
  goToPage(0);
  ["interets", "personnalite", "valeurs"].forEach(cat => renderCategory(cat));
});
