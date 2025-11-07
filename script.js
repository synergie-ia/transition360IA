// Stockage des réponses de l'utilisateur
let ratings = {};
let currentResults = [];

// Charger les réponses sauvegardées au démarrage
function loadSavedRatings() {
  try {
    const saved = localStorage.getItem('orientation360_ratings');
    if (saved) {
      ratings = JSON.parse(saved);
    }
  } catch (e) {
    console.log('Impossible de charger les données sauvegardées:', e);
    ratings = {};
  }
}

// Sauvegarder les réponses
function saveRatings() {
  try {
    localStorage.setItem('orientation360_ratings', JSON.stringify(ratings));
  } catch (e) {
    console.log('Impossible de sauvegarder les données:', e);
  }
}

// Fonction d'initialisation au chargement de la page
function renderInterests() {
  const container = document.getElementById('interestsList');
  
  if (!container) {
    console.error('Container interestsList not found');
    return;
  }
  
  if (typeof interests === 'undefined' || !interests.length) {
    console.error('interests array not found or empty');
    container.innerHTML = '<p style="color: red; padding: 20px;">Erreur: Les questions ne sont pas chargées. Vérifiez que data.js est bien chargé.</p>';
    return;
  }
  
  container.innerHTML = interests.map(interest => `
    <div class="interest-card">
      <div class="interest-question">
        <strong>Question ${interest.id}</strong> - ${interest.description} → <strong>${interest.title}</strong>
      </div>
      <div class="rating-buttons">
        <button class="rating-btn level-0" data-interest="${interest.id}" data-value="0">Pas du tout</button>
        <button class="rating-btn level-1" data-interest="${interest.id}" data-value="1">Un peu</button>
        <button class="rating-btn level-2" data-interest="${interest.id}" data-value="2">Moyennement</button>
        <button class="rating-btn level-3" data-interest="${interest.id}" data-value="3">Plutôt</button>
        <button class="rating-btn level-4" data-interest="${interest.id}" data-value="4">Totalement</button>
      </div>
    </div>
  `).join('');

  // Ajouter les event listeners
  document.querySelectorAll('.rating-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const interestId = parseInt(this.getAttribute('data-interest'));
      const value = parseInt(this.getAttribute('data-value'));
      
      ratings[interestId] = value;
      
      // Sauvegarder dans localStorage
      saveRatings();
      
      // Mettre à jour visuellement
      const card = this.closest('.interest-card');
      card.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      
      // Mettre à jour la barre de progression
      updateProgress();
    });
  });

  // Restaurer les sélections
  Object.keys(ratings).forEach(interestId => {
    const value = ratings[interestId];
    const btn = document.querySelector(`.rating-btn[data-interest="${interestId}"][data-value="${value}"]`);
    if (btn) {
      btn.classList.add('selected');
    }
  });

  // Mettre à jour la progression
  updateProgress();
}

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
  const totalAnswered = Object.keys(ratings).length;
  const percentage = (totalAnswered / interests.length) * 100;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = percentage + '%';
  }
}

// Fonction pour créer le profil utilisateur
function createUserProfile() {
  let profile = "MON PROFIL D'INTÉRÊTS\n";
  profile += "=".repeat(50) + "\n\n";
  
  interests.forEach(interest => {
    const rating = ratings[interest.id] || 0;
    const ratingLabels = ['Pas du tout', 'Un peu', 'Moyennement', 'Plutôt', 'Totalement'];
    profile += `${interest.title}\n`;
    profile += `  ${ratingLabels[rating]}\n\n`;
  });
  
  return profile;
}

// Fonction principale de calcul des résultats
function calculateResults() {
  // Vérifier que toutes les questions ont été répondues
  if (Object.keys(ratings).length < interests.length) {
    alert('Veuillez répondre à toutes les questions avant de calculer vos résultats.');
    return;
  }

  // Vérifier que subUniverses existe
  if (typeof subUniverses === 'undefined' || !subUniverses.length) {
    alert('Erreur: Les sous-univers professionnels ne sont pas chargés.');
    return;
  }

  // Mapping des intérêts pour correspondre à l'ordre de la matrice
  // Ordre dans data.js: [Activités physiques(9), Manuel(10), Investigation(11), Sciences(12), Arts(7), Idées(8), Aide(5), Relations(6), Leadership(4), Action(3), Règles(2), Données(1)]
  // Ordre dans sub-universes: [RM(2), MT(10), DC(1), ST(12), II(11), RS(6), PN(9), LS(4), AI(3), IC(8), AA(5), AE(7)]
  // Mapping: Position dans weights → ID d'intérêt
  const interestMapping = [2, 10, 1, 12, 11, 6, 9, 4, 3, 8, 5, 7];

  // Calcul du score pour chaque sous-univers
  const results = subUniverses.map(subUniverse => {
    let score = 0;
    let maxScore = 0;
    
    subUniverse.weights.forEach((weight, index) => {
      const interestId = interestMapping[index];
      const userRating = ratings[interestId] || 0;
      
      // Score = somme des (note utilisateur × poids sous-univers)
      score += userRating * weight;
      
      // Score max = somme des poids × 4 (note max possible)
      maxScore += weight * 4;
    });
    
    // Calcul du pourcentage de compatibilité
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    return {
      id: subUniverse.id,
      universeId: subUniverse.universeId,
      universeName: subUniverse.universeName,
      name: subUniverse.name,
      icon: subUniverse.icon,
      score: score,
      maxScore: maxScore,
      percentage: percentage
    };
  });

  // Tri des résultats par pourcentage décroissant
  results.sort((a, b) => b.percentage - a.percentage);
  
  // Stocker TOUS les résultats globalement
  currentResults = results;
  
  // Affichage des résultats
  displayResults(currentResults);
}

// Fonction d'affichage des résultats
function displayResults(results) {
  const container = document.getElementById('resultsList');
  
  if (!container) {
    console.error('resultsList container not found');
    return;
  }
  
  // Afficher le TOP 10
  const top10 = results.slice(0, 10);
  const next10 = results.slice(10, 20);
  const remaining = results.slice(20);

  let html = '<h2 style="text-align: center; margin-bottom: 30px;">🏆 Top 10 des sous-univers les plus compatibles</h2>';
  
  html += top10.map((result, index) => `
    <div class="result-card">
      <div class="result-info">
        <div class="result-title">${result.icon} #${index + 1} ${result.name}</div>
        <div class="result-subtitle">${result.universeName}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${result.percentage}%"></div>
        </div>
      </div>
      <div class="result-actions">
        <div class="result-score">${Math.round(result.percentage)}%</div>
      </div>
    </div>
  `).join('');

  // Ajouter le bouton pour voir les 10 suivants
  if (next10.length > 0) {
    html += `
      <button class="show-more-btn" onclick="showNext10()" id="showNext10Btn" style="margin-top: 30px;">
        👇 Voir les 10 sous-univers suivants
      </button>
      <div id="next10Results" style="display: none; margin-top: 30px;">
        <h2 style="text-align: center; margin-bottom: 30px;">Sous-univers 11 à 20</h2>
        ${next10.map((result, index) => `
          <div class="result-card">
            <div class="result-info">
              <div class="result-title">${result.icon} #${index + 11} ${result.name}</div>
              <div class="result-subtitle">${result.universeName}</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${result.percentage}%"></div>
              </div>
            </div>
            <div class="result-actions">
              <div class="result-score">${Math.round(result.percentage)}%</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Ajouter le bouton pour voir tous les autres
  if (remaining.length > 0) {
    html += `
      <button class="show-more-btn" onclick="showAllRemaining()" id="showAllBtn" style="display: none; margin-top: 20px;">
        📋 Voir tous les autres sous-univers (${remaining.length})
      </button>
      <div id="remainingResults" style="display: none; margin-top: 30px;">
        <h2 style="text-align: center; margin-bottom: 30px;">Autres sous-univers</h2>
        ${remaining.map((result, index) => `
          <div class="result-card-compact">
            <span class="result-rank">#${index + 21}</span>
            <span class="result-icon">${result.icon}</span>
            <span class="result-name-compact">${result.name}</span>
            <span class="result-universe-compact">${result.universeName}</span>
            <span class="result-score-compact">${Math.round(result.percentage)}%</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Ajouter le bouton Retour
  html += `
    <div style="text-align: center; margin-top: 30px;">
      <button onclick="window.history.back()" class="home-btn">← Retour</button>
    </div>
  `;

  container.innerHTML = html;

  // Affichage de la section résultats avec animation
  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    resultsSection.classList.add('show');
    
    // Scroll automatique vers les résultats
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fonction pour afficher les 10 suivants
function showNext10() {
  const next10Div = document.getElementById('next10Results');
  const btn = document.getElementById('showNext10Btn');
  const showAllBtn = document.getElementById('showAllBtn');
  
  if (next10Div) next10Div.style.display = 'block';
  if (btn) btn.style.display = 'none';
  if (showAllBtn) showAllBtn.style.display = 'block';
  
  // Scroll vers les nouveaux résultats
  if (next10Div) {
    next10Div.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fonction pour afficher tous les restants
function showAllRemaining() {
  const remainingDiv = document.getElementById('remainingResults');
  const btn = document.getElementById('showAllBtn');
  
  if (remainingDiv) remainingDiv.style.display = 'block';
  if (btn) btn.style.display = 'none';
  
  // Scroll vers les nouveaux résultats
  if (remainingDiv) {
    remainingDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fonction pour télécharger les résultats en PDF
function downloadResults() {
  if (currentResults.length === 0) {
    alert('Aucun résultat à télécharger. Veuillez d\'abord passer le test.');
    return;
  }

  if (typeof window.jspdf === 'undefined') {
    alert('La bibliothèque PDF n\'est pas chargée. Veuillez réessayer.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('fr-FR');

  let yPos = 20;

  // Titre
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('Orientation 360 IA', 105, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Resultats du test d\'orientation', 105, yPos, { align: 'center' });
  
  yPos += 5;
  doc.text('Date : ' + date, 105, yPos, { align: 'center' });
  
  yPos += 15;

  // Profil d'intérêts
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('MON PROFIL D\'INTERETS', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');

  interests.forEach(interest => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    const rating = ratings[interest.id] || 0;
    const ratingLabels = ['Pas du tout', 'Un peu', 'Moyennement', 'Plutot', 'Totalement'];
    
    doc.text(interest.title, 20, yPos);
    yPos += 5;
    doc.text('  ' + ratingLabels[rating], 20, yPos);
    yPos += 8;
  });

  yPos += 10;

  // Top 10 des sous-univers
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('TOP 10 DES SOUS-UNIVERS COMPATIBLES', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');

  currentResults.slice(0, 10).forEach((result, index) => {
    if (yPos > 265) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFont(undefined, 'bold');
    doc.text('#' + (index + 1) + ' ' + result.name, 20, yPos);
    yPos += 4;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.text('  ' + result.universeName, 20, yPos);
    yPos += 4;
    doc.setFontSize(9);
    doc.text('  Compatibilite : ' + Math.round(result.percentage) + '%', 20, yPos);
    yPos += 8;
  });

  // Sous-univers 11-20
  if (currentResults.length > 10) {
    yPos += 5;
    
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('SOUS-UNIVERS 11 A 20', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');

    currentResults.slice(10, 20).forEach((result, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.text('#' + (index + 11) + ' ' + result.name + ' - ' + Math.round(result.percentage) + '%', 20, yPos);
      yPos += 5;
    });
  }

  // Sauvegarde
  doc.save('Orientation360IA_Resultats_' + date.replace(/\//g, '-') + '.pdf');
  showNotification('PDF téléchargé avec succès !');
}

// Fonction pour copier les résultats
function copyResults() {
  if (currentResults.length === 0) {
    alert('Aucun résultat à copier. Veuillez d\'abord passer le test.');
    return;
  }

  const date = new Date().toLocaleDateString('fr-FR');

  let content = "ORIENTATION 360 IA - RÉSULTATS\n";
  content += "Date : " + date + "\n";
  content += "=".repeat(60) + "\n\n";

  // Ajout du profil
  content += createUserProfile();
  content += "\n" + "=".repeat(60) + "\n\n";

  // Ajout des résultats
  content += "TOP 10 DES SOUS-UNIVERS COMPATIBLES\n";
  content += "=".repeat(60) + "\n\n";

  currentResults.slice(0, 10).forEach((result, index) => {
    content += `#${index + 1} ${result.icon} ${result.name}\n`;
    content += `   ${result.universeName}\n`;
    content += `   Compatibilité : ${Math.round(result.percentage)}%\n\n`;
  });

  if (currentResults.length > 10) {
    content += "\nSOUS-UNIVERS 11 À 20\n";
    content += "=".repeat(60) + "\n\n";

    currentResults.slice(10, 20).forEach((result, index) => {
      content += `#${index + 11} ${result.icon} ${result.name} - ${Math.round(result.percentage)}%\n`;
      content += `   ${result.universeName}\n\n`;
    });
  }

  // Copie dans le presse-papier
  navigator.clipboard.writeText(content).then(() => {
    showNotification('Résultats copiés dans le presse-papier !');
  }).catch(err => {
    alert('Erreur lors de la copie : ' + err);
  });
}

// Fonction pour afficher une notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #27ae60;
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    font-weight: bold;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Ajout des animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .result-subtitle {
    font-size: 0.85em;
    color: #666;
    margin-top: 5px;
    font-style: italic;
  }
  
  .result-card-compact {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 20px;
    background: white;
    border-radius: 10px;
    margin-bottom: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .result-rank {
    font-weight: bold;
    color: #666;
    min-width: 40px;
  }
  
  .result-icon {
    font-size: 1.5em;
  }
  
  .result-name-compact {
    flex: 1;
    font-weight: 600;
  }
  
  .result-universe-compact {
    color: #666;
    font-size: 0.85em;
    font-style: italic;
  }
  
  .result-score-compact {
    font-weight: bold;
    color: #27ae60;
    min-width: 50px;
    text-align: right;
  }
`;
document.head.appendChild(style);

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing...');
  loadSavedRatings();
  renderInterests();
});
