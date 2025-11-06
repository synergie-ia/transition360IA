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

  // Vérifier que universes existe
  if (typeof universes === 'undefined' || !universes.length) {
    alert('Erreur: Les univers professionnels ne sont pas chargés.');
    return;
  }

  // Calcul du score pour chaque univers selon l'algorithme
  const results = universes.map(universe => {
    let score = 0;
    let maxScore = 0;
    
    // Pour chaque intérêt (12 au total)
    universe.weights.forEach((weight, index) => {
      const interestId = index + 1;
      const userRating = ratings[interestId] || 0;
      
      // Score = somme des (note utilisateur × poids univers)
      score += userRating * weight;
      
      // Score max = somme des poids × 4 (note max possible avec nouvelle échelle)
      maxScore += weight * 4;
    });
    
    // Calcul du pourcentage de compatibilité
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    return {
      id: universe.id,
      name: universe.name,
      icon: universe.icon,
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
  
  // Afficher seulement les 5 premiers
  const top5 = results.slice(0, 5);
  const remaining = results.slice(5);

  let html = top5.map((result, index) => `
    <div class="result-card">
      <div class="result-info">
        <div class="result-title">${result.icon} #${index + 1} ${result.name}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${result.percentage}%"></div>
        </div>
      </div>
      <div class="result-actions">
        <div class="result-score">${Math.round(result.percentage)}%</div>
        <button class="view-universe-btn" onclick="viewUniverseDetails(${result.id})" title="Voir les sous-univers">
          👁
        </button>
      </div>
    </div>
  `).join('');

  // Ajouter le bouton pour voir les univers restants
  if (remaining.length > 0) {
    html += `
      <button class="show-more-btn" onclick="showRemainingUniverses()" id="showMoreBtn">
        👇 Voir les ${remaining.length} univers restants
      </button>
      <div id="remainingUniverses" style="display: none;">
        ${remaining.map((result, index) => `
          <div class="result-card">
            <div class="result-info">
              <div class="result-title">${result.icon} #${index + 6} ${result.name}</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${result.percentage}%"></div>
              </div>
            </div>
            <div class="result-actions">
              <div class="result-score">${Math.round(result.percentage)}%</div>
              <button class="view-universe-btn" onclick="viewUniverseDetails(${result.id})" title="Voir les sous-univers">
                👁
              </button>
            </div>
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

// Fonction pour afficher les univers restants
function showRemainingUniverses() {
  const remainingDiv = document.getElementById('remainingUniverses');
  const btn = document.getElementById('showMoreBtn');
  
  if (remainingDiv) remainingDiv.style.display = 'block';
  if (btn) btn.style.display = 'none';
}

// Fonction pour voir les détails d'un univers
function viewUniverseDetails(universeId) {
  try {
    sessionStorage.setItem('fromResults', 'true');
  } catch (e) {
    console.log('sessionStorage not available:', e);
  }
  window.location.href = `universes.html?id=${universeId}&from=results`;
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

  // Top 5 des univers
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('TOP 5 DES UNIVERS COMPATIBLES', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');

  currentResults.slice(0, 5).forEach((result, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFont(undefined, 'bold');
    doc.text('#' + (index + 1) + ' ' + result.name, 20, yPos);
    yPos += 5;
    doc.setFont(undefined, 'normal');
    doc.text('  Compatibilite : ' + Math.round(result.percentage) + '%', 20, yPos);
    yPos += 8;
  });

  // Autres univers
  if (currentResults.length > 5) {
    yPos += 5;
    
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('AUTRES UNIVERS', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');

    currentResults.slice(5).forEach((result, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.text('#' + (index + 6) + ' ' + result.name + ' - ' + Math.round(result.percentage) + '%', 20, yPos);
      yPos += 6;
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
  content += "TOP 5 DES UNIVERS COMPATIBLES\n";
  content += "=".repeat(60) + "\n\n";

  currentResults.slice(0, 5).forEach((result, index) => {
    content += `#${index + 1} ${result.icon} ${result.name}\n`;
    content += `  Compatibilité : ${Math.round(result.percentage)}%\n\n`;
  });

  if (currentResults.length > 5) {
    content += "\nAUTRES UNIVERS\n";
    content += "=".repeat(60) + "\n\n";

    currentResults.slice(5).forEach((result, index) => {
      content += `#${index + 6} ${result.icon} ${result.name} - ${Math.round(result.percentage)}%\n`;
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
`;
document.head.appendChild(style);

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing...');
  loadSavedRatings();
  renderInterests();
});
