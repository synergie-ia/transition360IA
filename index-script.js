/* 
  Script pour la page d'accueil avec validation complète
*/

document.addEventListener('DOMContentLoaded', function() {
  
  const btnCopy = document.getElementById('btnCopyResults');
  const btnProject = document.getElementById('btnProject');
  
  // Vérifier si le profil a été calculé
  function isProfileCalculated(){
    const answers = localStorage.getItem('questionnaire_answers');
    if(!answers) return false;
    
    // Vérifier qu'il y a 48 réponses (12 questions × 4 options)
    const answersObj = JSON.parse(answers);
    return Object.keys(answersObj).length === 48;
  }
  
  // Vérifier si des univers ont été sélectionnés
  function hasUniversSelected(){
    const selectedUnivers = localStorage.getItem('selectedUnivers');
    if(!selectedUnivers) return false;
    
    const univers = JSON.parse(selectedUnivers);
    return univers.length > 0;
  }
  
  // Vérifier si le bilan de situation est complet
  function isSituationComplete(){
    const situationData = localStorage.getItem('situation_data');
    if(!situationData) return false;
    
    const situation = JSON.parse(situationData);
    
    // Vérifier les champs obligatoires
    const required = ['prenom', 'age', 'q1', 'q2', 'q3', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q17', 'q18'];
    
    return required.every(field => situation[field] && situation[field].trim() !== '');
  }
  
  // Vérifier si tout est prêt pour la copie
  function canCopy(){
    return isProfileCalculated() && hasUniversSelected() && isSituationComplete();
  }
  
  // Vérifier si les données ont été copiées
  function hasBeenCopied(){
    return localStorage.getItem('data_copied') === 'true';
  }
  
  // Calculer le profil d'intérêts (copie de la fonction de test-script.js)
  function calcProfile(){
    const answers = JSON.parse(localStorage.getItem('questionnaire_answers'));
    const DIMENSIONS = [
      { code: "MO", name: "Méthode & organisation" },
      { code: "PT", name: "Pratique & technique" },
      { code: "AL", name: "Analyse & logique" },
      { code: "SI", name: "Sciences & innovation" },
      { code: "CS", name: "Conception & structuration d'idées" },
      { code: "EC", name: "Expression & création" },
      { code: "CP", name: "Coordination & pilotage" },
      { code: "IP", name: "Initiative & projet" },
      { code: "MP", name: "Mouvement & plein air" },
      { code: "AE", name: "Action & efficacité terrain" },
      { code: "AA", name: "Aide & Accompagnement" },
      { code: "RI", name: "Relation & influence" }
    ];
    
    const scores = Object.fromEntries(DIMENSIONS.map(d=>[d.code,0]));
    
    Object.keys(answers).forEach(key=>{
      const [,dim] = key.split("-");
      const val = answers[key];
      scores[dim] += val * val;
    });
    
    // Convertir en pourcentages
    const percentages = {};
    DIMENSIONS.forEach(dim => {
      const sum = scores[dim.code];
      percentages[dim.name] = Math.round((sum / 64) * 100);
    });
    
    return percentages;
  }
  
  // Mettre à jour l'état des boutons
  function updateButtonStates(){
    const copyReady = canCopy();
    const copied = hasBeenCopied();
    
    // Bouton copier
    if(btnCopy){
      btnCopy.disabled = !copyReady;
    }
    
    // Bouton projet
    if(btnProject){
      btnProject.disabled = !copied;
    }
  }
  
  // Initialiser l'état des boutons
  updateButtonStates();
  
  /* ===== BOUTON COPIER ===== */
  if(btnCopy){
    btnCopy.addEventListener('click', function(){
      
      if(!canCopy()){
        let message = "❌ Données incomplètes. Vous devez compléter :\n\n";
        
        if(!isProfileCalculated()){
          message += "• Le questionnaire de profil (48 réponses nécessaires)\n";
        }
        if(!hasUniversSelected()){
          message += "• La sélection des univers-métiers\n";
        }
        if(!isSituationComplete()){
          message += "• Le bilan de situation (toutes les questions obligatoires)\n";
        }
        
        alert(message);
        return;
      }
      
      // Récupérer toutes les données
      const selectedUnivers = JSON.parse(localStorage.getItem('selectedUnivers'));
      const situationData = JSON.parse(localStorage.getItem('situation_data'));
      const profilePercentages = calcProfile();
      
      // Construire le texte à copier
      let textToCopy = "=== MES DONNÉES RECONVERSION 360 IA ===\n\n";
      
      // PROFIL D'INTÉRÊTS
      textToCopy += "📊 PROFIL D'INTÉRÊTS\n\n";
      
      // Trier par score décroissant
      const sortedProfile = Object.entries(profilePercentages)
        .sort((a, b) => b[1] - a[1]);
      
      sortedProfile.forEach(([dimension, percent]) => {
        textToCopy += `${dimension}: ${percent}%\n`;
      });
      
      textToCopy += "\n";
      
      // UNIVERS-MÉTIERS SÉLECTIONNÉS
      if(selectedUnivers && selectedUnivers.length > 0){
        textToCopy += "🌍 UNIVERS-MÉTIERS SÉLECTIONNÉS\n\n";
        
        // Récupérer les univers avec leurs pourcentages depuis universesData
        if(typeof universesData !== 'undefined'){
          selectedUnivers.forEach(id => {
            const univers = universesData.find(u => u.id === id);
            if(univers){
              // On ne peut pas recalculer le pourcentage ici sans avoir accès aux matrices
              // On indique juste le nom
              textToCopy += `• ${univers.name}\n`;
            }
          });
        } else {
          textToCopy += `${selectedUnivers.length} univers sélectionnés\n`;
        }
        
        textToCopy += "\n";
      }
      
      // BILAN DE SITUATION
      textToCopy += "📋 BILAN DE SITUATION\n\n";
      
      if(situationData.prenom) textToCopy += `Prénom: ${situationData.prenom}\n`;
      if(situationData.age) textToCopy += `Âge: ${situationData.age}\n\n`;
      
      textToCopy += "=== SITUATION & PARCOURS ===\n";
      if(situationData.q1) textToCopy += `Objectif professionnel: ${situationData.q1}\n`;
      if(situationData.q2) textToCopy += `Statut actuel: ${situationData.q2}\n`;
      if(situationData.q3) textToCopy += `Niveau de formation: ${situationData.q3}\n`;
      if(situationData.q4) textToCopy += `Certifications: ${situationData.q4}\n\n`;
      
      textToCopy += "=== RESSOURCES & COMPÉTENCES ===\n";
      if(situationData.q5) textToCopy += `Compétences techniques: ${situationData.q5}\n`;
      if(situationData.q6) textToCopy += `Compétences à réutiliser: ${situationData.q6}\n`;
      if(situationData.q7) textToCopy += `Compétences relationnelles: ${situationData.q7}\n`;
      if(situationData.q8) textToCopy += `Expériences marquantes: ${situationData.q8}\n\n`;
      
      textToCopy += "=== VALEURS & SENS ===\n";
      if(situationData.q9) textToCopy += `Valeurs essentielles: ${situationData.q9}\n`;
      if(situationData.q10) textToCopy += `Secteurs à éviter: ${situationData.q10}\n\n`;
      
      textToCopy += "=== CONTRAINTES & CONDITIONS ===\n";
      if(situationData.q11) textToCopy += `Mobilité: ${situationData.q11}\n`;
      if(situationData.q12) textToCopy += `Conditions de travail: ${situationData.q12}\n`;
      if(situationData.q13) textToCopy += `Horaires: ${situationData.q13}\n`;
      if(situationData.q14) textToCopy += `Limitations: ${situationData.q14}\n`;
      if(situationData.q15) textToCopy += `Rémunération souhaitée: ${situationData.q15}\n`;
      if(situationData.q16) textToCopy += `Situations à éviter: ${situationData.q16}\n`;
      if(situationData.q17) textToCopy += `Environnement idéal: ${situationData.q17}\n\n`;
      
      textToCopy += "=== FORMATION ===\n";
      if(situationData.q18) textToCopy += `Formation envisagée: ${situationData.q18}\n\n`;
      
      if(situationData.q19) {
        textToCopy += "=== INFORMATIONS COMPLÉMENTAIRES ===\n";
        textToCopy += `${situationData.q19}\n\n`;
      }
      
      textToCopy += "=== FIN DES DONNÉES ===\n";
      textToCopy += "Généré par Reconversion 360 IA - Synergie IA";
      
      // Copier dans le presse-papier
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Marquer comme copié
        localStorage.setItem('data_copied', 'true');
        updateButtonStates();
        
        // Feedback visuel
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = '<span style="color:#22c55e">✓ Données copiées !</span>';
        btnCopy.style.borderColor = '#22c55e';
        
        setTimeout(() => {
          btnCopy.innerHTML = originalText;
          btnCopy.style.borderColor = '';
        }, 2000);
        
      }).catch(err => {
        alert("❌ Erreur lors de la copie. Veuillez réessayer.");
        console.error('Erreur copie:', err);
      });
      
    });
  }
  
  /* ===== BOUTON CONSTRUIRE MON PROJET ===== */
  if(btnProject){
    btnProject.addEventListener('click', function(e){
      
      if(!hasBeenCopied()){
        e.preventDefault();
        alert("⚠️ Vous devez d'abord copier vos données avant d'accéder à cette section.\n\nCliquez sur le bouton 'Copier mes résultats pour l'IA' ci-dessous.");
        return;
      }
      
      // Rediriger vers le GPT personnalisé
      window.open('https://chatgpt.com/g/g-6914f232fb048191b5df9a123ac6af82-reconversion-360-ia', '_blank');
    });
  }
  
});
