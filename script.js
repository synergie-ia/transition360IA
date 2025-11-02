// ======================================================
// === SCRIPT PRINCIPAL IA360 - ORIENTATION ===
// ======================================================

// === GÉNÉRATION DYNAMIQUE DU QUESTIONNAIRE ===
function generateQuestionnaire() {
    const container = document.getElementById('questionnaire');
    
    interests.forEach((interest, idx) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        questionDiv.innerHTML = `
            <div class="question-header">
                <span class="question-icon">${interest.icon}</span>
                <span class="question-title">${interest.name}</span>
            </div>
            <div class="question-verbs">${interest.verbs}</div>
            <div class="question-phrase">${interest.phrase}</div>
            <div class="options">
                <div class="option">
                    <input type="radio" name="q${idx}" value="-2" id="q${idx}_-2">
                    <label for="q${idx}_-2">Pas du tout moi</label>
                </div>
                <div class="option">
                    <input type="radio" name="q${idx}" value="-1" id="q${idx}_-1">
                    <label for="q${idx}_-1">Peu moi</label>
                </div>
                <div class="option">
                    <input type="radio" name="q${idx}" value="1" id="q${idx}_1">
                    <label for="q${idx}_1">Plutôt moi</label>
                </div>
                <div class="option">
                    <input type="radio" name="q${idx}" value="2" id="q${idx}_2">
                    <label for="q${idx}_2">Tout à fait moi</label>
                </div>
            </div>
        `;
        
        container.appendChild(questionDiv);
    });
}

// === RÉCUPÉRATION DES RÉPONSES ===
function getUserAnswers() {
    const answers = [];
    
    for (let i = 0; i < interests.length; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        
        if (!selected) {
            alert('⚠️ Veuillez répondre à toutes les questions avant de continuer.');
            return null;
        }
        
        answers.push(parseInt(selected.value));
    }
    
    return answers;
}

// === CALCUL DES SCORES PAR UNIVERS ===
function calculateScores(answers) {
    const scores = [];
    
    univers.forEach((universName, universIdx) => {
        let totalScore = 0;
        
        // Calcul : réponse utilisateur × coefficient de compatibilité
        for (let interestIdx = 0; interestIdx < interests.length; interestIdx++) {
            const userScore = answers[interestIdx];
            const compatibilityCoef = matrix[universIdx][interestIdx];
            totalScore += userScore * compatibilityCoef;
        }
        
        scores.push({
            name: universName,
            score: totalScore,
            coefficients: matrix[universIdx]
        });
    });
    
    // Tri par score décroissant
    scores.sort((a, b) => b.score - a.score);
    
    return scores;
}

// === AFFICHAGE DU CLASSEMENT ===
function displayRanking(scores) {
    const container = document.getElementById('ranking');
    container.innerHTML = '<h3>🏆 Vos univers les plus compatibles</h3>';
    
    // Afficher le top 10
    scores.slice(0, 10).forEach((item, index) => {
        const rankingItem = document.createElement('div');
        rankingItem.className = 'ranking-item';
        
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
        
        rankingItem.innerHTML = `
            <span class="ranking-name">${medal} ${index + 1}. ${item.name}</span>
            <span class="ranking-score">Score: ${item.score > 0 ? '+' : ''}${item.score}</span>
        `;
        
        container.appendChild(rankingItem);
    });
}

// === AFFICHAGE DE LA MATRICE COLORÉE ===
function displayMatrix(answers) {
    const table = document.getElementById('matrixTable');
    
    // En-tête du tableau
    let html = '<thead><tr><th>Univers / Intérêts</th>';
    interests.forEach(interest => {
        html += `<th title="${interest.name}">${interest.icon}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    // Lignes de la matrice
    univers.forEach((universName, universIdx) => {
        html += `<tr><td>${universName}</td>`;
        
        matrix[universIdx].forEach((compatValue, interestIdx) => {
            const userAnswer = answers[interestIdx];
            const cellClass = `score${compatValue}`;
            
            html += `<td>
                <div class="cell-score ${cellClass}" 
                     title="Compatibilité: ${compatValue} | Votre réponse: ${userAnswer}">
                    ${compatValue > 0 ? '+' : ''}${compatValue}
                </div>
            </td>`;
        });
        
        html += '</tr>';
    });
    
    html += '</tbody>';
    table.innerHTML = html;
}

// === CALCUL ET AFFICHAGE DES RÉSULTATS ===
function calculateResults() {
    // Récupérer les réponses
    const answers = getUserAnswers();
    if (!answers) return;
    
    // Calculer les scores
    const scores = calculateScores(answers);
    
    // Afficher le classement
    displayRanking(scores);
    
    // Afficher la matrice
    displayMatrix(answers);
    
    // Afficher la section résultats
    document.getElementById('results').style.display = 'block';
    
    // Scroll vers les résultats
    document.getElementById('results').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// === COPIE DU PROFIL POUR IA360 ===
function copyProfile() {
    const answers = getUserAnswers();
    if (!answers) return;
    
    const scores = calculateScores(answers);
    
    // Formatage du profil
    let profileText = '=== PROFIL IA360 - ORIENTATION PROFESSIONNELLE ===\n\n';
    
    profileText += '📊 RÉPONSES AUX INTÉRÊTS:\n';
    profileText += '─────────────────────────────\n';
    interests.forEach((interest, idx) => {
        const answer = answers[idx];
        const emoji = answer > 0 ? '✅' : answer < 0 ? '❌' : '⚪';
        profileText += `${emoji} ${interest.icon} ${interest.name}: ${answer > 0 ? '+' : ''}${answer}\n`;
    });
    
    profileText += '\n🏆 TOP 10 UNIVERS COMPATIBLES:\n';
    profileText += '─────────────────────────────\n';
    scores.slice(0, 10).forEach((item, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
        profileText += `${medal} ${index + 1}. ${item.name} → Score: ${item.score > 0 ? '+' : ''}${item.score}\n`;
    });
    
    profileText += '\n📋 TOUS LES UNIVERS:\n';
    profileText += '─────────────────────────────\n';
    scores.forEach((item, index) => {
        profileText += `${index + 1}. ${item.name}: ${item.score > 0 ? '+' : ''}${item.score}\n`;
    });
    
    profileText += '\n─────────────────────────────\n';
    profileText += 'Généré par IA360 Orientation\n';
    profileText += new Date().toLocaleDateString('fr-FR');
    
    // Copie dans le presse-papier
    navigator.clipboard.writeText(profileText).then(() => {
        alert('✅ Profil copié dans le presse-papier !\n\nVous pouvez maintenant le coller dans votre GPT IA360 ou dans un document.');
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        alert('❌ Impossible de copier automatiquement. Veuillez sélectionner et copier manuellement.');
    });
}

// === INITIALISATION AU CHARGEMENT DE LA PAGE ===
document.addEventListener('DOMContentLoaded', function() {
    generateQuestionnaire();
});

// Génération immédiate si le DOM est déjà chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateQuestionnaire);
} else {
    generateQuestionnaire();
}
