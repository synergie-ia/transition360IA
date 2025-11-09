// Fonction pour copier toutes les données utilisateur
function copyUserData() {
    // Vérifier que le bilan de situation est complété
    const situationCompleted = localStorage.getItem('reconversion360_situation_completed');
    
    if (!situationCompleted) {
        alert('⚠️ Vous devez d\'abord compléter votre bilan de situation professionnelle avant de copier vos données.');
        window.location.href = 'situation.html';
        return;
    }
    
    // Vérifier que des univers ont été choisis
    const selectedUniverses = localStorage.getItem('reconversion360_selected_universes');
    
    if (!selectedUniverses || JSON.parse(selectedUniverses).length === 0) {
        alert('⚠️ Vous devez d\'abord sélectionner au moins un univers professionnel avant de copier vos données.');
        window.location.href = 'universes.html';
        return;
    }
    
    // Récupérer toutes les données
    const situationData = localStorage.getItem('reconversion360_situation_data');
    const universesSelected = JSON.parse(selectedUniverses);
    const testResults = localStorage.getItem('reconversion360_test_results');
    
    // Construire le texte à copier
    let textToCopy = '═══════════════════════════════════════════════════\n';
    textToCopy += '   RECONVERSION 360 IA - DONNÉES UTILISATEUR\n';
    textToCopy += '═══════════════════════════════════════════════════\n\n';
    
    // Ajouter la date
    textToCopy += 'Date : ' + new Date().toLocaleDateString('fr-FR') + '\n\n';
    
    // Univers sélectionnés
    textToCopy += '─────────────────────────────────────────────────────\n';
    textToCopy += 'UNIVERS PROFESSIONNELS SÉLECTIONNÉS (' + universesSelected.length + ')\n';
    textToCopy += '─────────────────────────────────────────────────────\n\n';
    
    universesSelected.forEach((id, index) => {
        const universe = universesData.find(u => u.id === id);
        if (universe) {
            textToCopy += (index + 1) + '. ' + universe.name + '\n';
        }
    });
    textToCopy += '\n';
    
    // Bilan de situation
    if (situationData) {
        const data = JSON.parse(situationData);
        textToCopy += '─────────────────────────────────────────────────────\n';
        textToCopy += 'BILAN DE SITUATION PROFESSIONNELLE\n';
        textToCopy += '─────────────────────────────────────────────────────\n\n';
        
        for (const [key, value] of Object.entries(data)) {
            if (value && value.toString().trim()) {
                const label = formatFieldLabel(key);
                textToCopy += label + ' : ' + value + '\n\n';
            }
        }
    }
    
    // Résultats du test
    if (testResults) {
        textToCopy += '─────────────────────────────────────────────────────\n';
        textToCopy += 'RÉSULTATS DU TEST D\'INTÉRÊTS\n';
        textToCopy += '─────────────────────────────────────────────────────\n\n';
        textToCopy += testResults + '\n\n';
    }
    
    textToCopy += '═══════════════════════════════════════════════════\n';
    textToCopy += 'Fin des données - Reconversion 360 IA\n';
    textToCopy += '═══════════════════════════════════════════════════\n';
    
    // Copier dans le presse-papiers
    navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification('✅ Vos données ont été copiées avec succès ! Vous pouvez maintenant les coller pour les communiquer à votre assistant virtuel.');
    }).catch(err => {
        alert('❌ Erreur lors de la copie. Veuillez réessayer.');
        console.error('Erreur de copie:', err);
    });
}

// Formater les labels des champs
function formatFieldLabel(key) {
    const labels = {
        'age': 'Âge',
        'situation': 'Situation actuelle',
        'niveau_etudes': 'Niveau d\'études',
        'domaine_formation': 'Domaine de formation',
        'experience': 'Années d\'expérience',
        'secteurs': 'Secteurs d\'activité',
        'type_projet': 'Type de projet',
        'echeance': 'Échéance',
        'description_projet': 'Description du projet',
        'mobilite': 'Mobilité géographique',
        'contrat': 'Type de contrat recherché',
        'temps_travail': 'Temps de travail',
        'contraintes': 'Contraintes personnelles',
        'competences_techniques': 'Compétences techniques',
        'qualites': 'Qualités personnelles',
        'langues': 'Langues',
        'permis': 'Permis et habilitations',
        'motivations': 'Motivations principales',
        'freins': 'Freins et inquiétudes'
    };
    return labels[key] || key;
}

// Afficher une notification
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
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Ajouter les styles d'animation
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

// Charger les données des univers au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si les données nécessaires sont disponibles
    const situationCompleted = localStorage.getItem('reconversion360_situation_completed');
    const selectedUniverses = localStorage.getItem('reconversion360_selected_universes');
    
    const copyCard = document.getElementById('copyCard');
    
    if (!situationCompleted || !selectedUniverses || JSON.parse(selectedUniverses).length === 0) {
        copyCard.style.opacity = '0.6';
        copyCard.style.cursor = 'not-allowed';
    }
});
