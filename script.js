// =======================
// SCRIPT PRINCIPAL IA360
// =======================

let currentPage = 0;
const selections = { interets: [], competences: [], personnalite: [], valeurs: [] };
const maxChoices = 6;

// Changement de page
function goToPage(page) {
  document.querySelectorAll('.page, #welcome').forEach(p => p.style.display = 'none');
  const next = document.getElementById(page === 0 ? 'welcome' : `page${page}`);
  if (next) next.style.display = 'block';
  currentPage = page;
}

// Génération des blocs de verbes
function renderSection(id, data) {
  const container = document.getElementById(id);
  container.innerHTML = '';

  data.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <label>
        <input type="checkbox" onchange="toggleChoice('${id}', ${i}, this)">
        <div class="content">
          <div class="verbs">${item.verbes.join(', ')}</div>
          <div class="phrase">${item.phrase}</div>
        </div>
      </label>
    `;
    container.appendChild(div);
  });
}

function toggleChoice(category, index, checkbox) {
  if (checkbox.checked) {
    if (selections[category].length >= maxChoices) {
      alert(`Tu ne peux choisir que ${maxChoices} éléments maximum.`);
      checkbox.checked = false;
      return;
    }
    selections[category].push(index);
  } else {
    selections[category] = selections[category].filter(i => i !== index);
  }
}

// Affichage du récapitulatif
function showSummary() {
  goToPage('summary');
  const recap = document.getElementById('recap');
  recap.innerHTML = '';

  Object.keys(selections).forEach(cat => {
    const section = document.createElement('div');
    section.className = 'recap-section';
    section.innerHTML = `<h3>${cat.toUpperCase()}</h3>`;

    if (selections[cat].length === 0) {
      section.innerHTML += `<p><em>Aucune sélection</em></p>`;
    } else {
      const list = document.createElement('ul');
      selections[cat].forEach(i => {
        const data = window[cat][i];
        const li = document.createElement('li');
        li.innerHTML = `<strong>${data.verbes.join(', ')}</strong> — ${data.phrase}`;
        list.appendChild(li);
      });
      section.appendChild(list);
    }
    recap.appendChild(section);
  });
}

// Copier le profil final
function copyProfile() {
  let text = '🎯 PROFIL GLOBAL ORIENTATION 360 IA\n\n';
  Object.keys(selections).forEach(cat => {
    text += `--- ${cat.toUpperCase()} ---\n`;
    selections[cat].forEach(i => {
      const d = window[cat][i];
      text += `• ${d.verbes.join(', ')} — ${d.phrase}\n`;
    });
    text += '\n';
  });
  navigator.clipboard.writeText(text);
  alert('Profil copié dans le presse-papiers !');
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  goToPage(0);
  renderSection('interets', interets);
  renderSection('competences', competences);
  renderSection('personnalite', personnalite);
  renderSection('valeurs', valeurs);
});
