/* 
  ============================================
  RECONVERSION 360 IA - PAGE D'ACCUEIL
  ============================================
  Script avec récupération des vrais noms d'univers
*/

document.addEventListener('DOMContentLoaded', function() {
  
  const btnCopy = document.getElementById('btnCopyResults');
  const btnProject = document.getElementById('btnProject');
  const btnReset = document.getElementById('btnResetData');
  
  // Vérifier si des données existent
  function hasAnyData(){
    const answers = localStorage.getItem('questionnaire_answers');
    const selectedUnivers = localStorage.getItem('selectedUnivers');
    const situationData = localStorage.getItem('situation_data');
    
    return !!(answers || selectedUnivers || situationData);
  }
  
  // Vérifier si au moins 3 univers ont été sélectionnés
  function hasMinimumUniversSelected(){
    const selectedUnivers = localStorage.getItem('selectedUnivers');
    if(!selectedUnivers) return false;
    
    const univers = JSON.parse(selectedUnivers);
    return univers.length >= 3;
  }
  
  // Vérifier si le bilan de situation est complet
  function isSituationComplete(){
    const situationData = localStorage.getItem('situation_data');
    if(!situationData) return false;
    
    const situation = JSON.parse(situationData);
    
    const required = [
      'prenom', 'age', 
      'q1', 'q2', 'q3', 'q4',
      'q5', 'q6', 'q7', 'q8', 
      'q9', 'q10',
      'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17',
      'q18',
      'q19'
    ];
    
    return required.every(field => situation[field] && situation[field].toString().trim() !== '');
  }
  
  // Vérifier si les données ont été copiées
  function hasBeenCopied(){
    return localStorage.getItem('data_copied') === 'true';
  }
  
  // Mettre à jour l'état du bouton Réinitialiser
  function updateResetButton(){
    if(btnReset){
      btnReset.disabled = !hasAnyData();
    }
  }
  
  // Calculer le profil d'intérêts avec pourcentages
  function calcProfileWithPercentages(){
    const answers = JSON.parse(localStorage.getItem('questionnaire_answers') || '{}');
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
    
    const percentages = DIMENSIONS.map(dim => ({
      name: dim.name,
      percent: Math.round((scores[dim.code] / 64) * 100)
    }));
    
    percentages.sort((a, b) => b.percent - a.percent);
    
    return percentages;
  }
  
  // Récupérer les univers sélectionnés avec VRAIS noms et pourcentages
  function getSelectedUniversWithPercentages(){
    // Charger les détails sauvegardés lors de la validation
    const selectedDetails = localStorage.getItem('selected_univers_details');
    
    if(selectedDetails){
      try {
        const details = JSON.parse(selectedDetails);
        
        // Convertir en tableau et trier par pourcentage décroissant
        return Object.entries(details).map(([id, data]) => ({
          id: parseInt(id),
          name: data.name,
          percent: data.percent
        })).sort((a, b) => b.percent - a.percent);
        
      } catch(e) {
        console.error('Erreur parsing selected_univers_details:', e);
      }
    }
    
    // Fallback si pas de détails sauvegardés
    console.warn('⚠️ Aucun détail d\'univers sauvegardé. Utilisez le bouton "Valider ma sélection" dans le questionnaire.');
    
    const selectedIds = JSON.parse(localStorage.getItem('selectedUnivers') || '[]');
    const universPercentages = JSON.parse(localStorage.getItem('univers_percentages') || '{}');
    
    return selectedIds.map(id => ({
      id: id,
      name: `Univers ${id} (non validé)`,
      percent: universPercentages[id] || 0
    })).sort((a, b) => b.percent - a.percent);
  }
  
  /* ===== BOUTON RÉINITIALISER ===== */
  if(btnReset){
    btnReset.addEventListener('click', function(){
      
      if(!hasAnyData()){
        alert("ℹ️ Aucune donnée à réinitialiser.");
        return;
      }
      
      const confirmation = confirm(
        "⚠️ ATTENTION : RÉINITIALISATION DES DONNÉES\n\n" +
        "Vous êtes sur le point de supprimer TOUTES vos données :\n\n" +
        "• Votre profil d'intérêts (questionnaire)\n" +
        "• Vos univers-métiers sélectionnés\n" +
        "• Votre bilan de situation\n" +
        "• Les données copiées\n\n" +
        "Cette action est IRRÉVERSIBLE.\n\n" +
        "Voulez-vous vraiment continuer ?"
      );
      
      if(!confirmation) return;
      
      const doubleConfirm = confirm(
        "🔴 DERNIÈRE CONFIRMATION\n\n" +
        "Êtes-vous ABSOLUMENT SÛR(E) de vouloir supprimer toutes vos données ?\n\n" +
        "Cette action ne peut pas être annulée."
      );
      
      if(!doubleConfirm) return;
      
      try {
        localStorage.removeItem('questionnaire_answers');
        localStorage.removeItem('selectedUnivers');
        localStorage.removeItem('univers_percentages');
        localStorage.removeItem('selected_univers_details');
        localStorage.removeItem('situation_data');
        localStorage.removeItem('data_copied');
        
        console.log('✅ Toutes les données ont été supprimées');
        
        btnReset.innerHTML = '<svg class="btn-icon-small" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg><span style="color:#22c55e">Supprimé !</span>';
        btnReset.disabled = true;
        
        setTimeout(() => {
          alert("✅ Toutes vos données ont été supprimées.\n\nVous pouvez maintenant recommencer une nouvelle saisie.");
          location.reload();
        }, 1000);
        
      } catch(e) {
        console.error('❌ Erreur lors de la suppression:', e);
        alert("❌ Erreur lors de la suppression des données.\n\nVeuillez réessayer.");
      }
    });
  }
  
  /* ===== BOUTON COPIER ===== */
  if(btnCopy){
    btnCopy.addEventListener('click', function(){
      
      if(!hasMinimumUniversSelected()){
        alert("❌ Vous devez sélectionner au moins 3 univers-métiers.\n\nRetournez au questionnaire de profil et sélectionnez vos univers.");
        return;
      }
      
      if(!isSituationComplete()){
        alert("❌ Le bilan de situation est incomplet.\n\nToutes les questions doivent être remplies.\n\nRetournez au formulaire de situation et complétez toutes les réponses.");
        return;
      }
      
      const profileData = calcProfileWithPercentages();
      const universData = getSelectedUniversWithPercentages();
      const situationData = JSON.parse(localStorage.getItem('situation_data'));
      
      let textToCopy = "=== MES DONNÉES RECONVERSION 360 IA ===\n\n";
      
      // 📊 PROFIL D'INTÉRÊTS
      textToCopy += "📊 PROFIL D'INTÉRÊTS\n\n";
      profileData.forEach(dim => {
        textToCopy += `${dim.name} ${dim.percent}%\n`;
      });
      textToCopy += "\n";
      
      // 🌍 UNIVERS-MÉTIERS SÉLECTIONNÉS (format: Nom Pourcentage%)
      textToCopy += "🌍 UNIVERS-MÉTIERS SÉLECTIONNÉS\n\n";
      universData.forEach(u => {
        textToCopy += `${u.name} ${u.percent}%\n`;
      });
      textToCopy += "\n";
      
      // 📋 BILAN DE SITUATION
      textToCopy += "📋 BILAN DE SITUATION\n\n";
      
      if(situationData.prenom) textToCopy += `Prénom: ${situationData.prenom}\n`;
      if(situationData.age) textToCopy += `Âge: ${situationData.age}\n\n`;
      
      textToCopy += "=== SITUATION & PARCOURS ===\n";
      if(situationData.q1) textToCopy += `Q1. Objectif professionnel: ${situationData.q1}\n\n`;
      if(situationData.q2) textToCopy += `Q2. Statut actuel: ${situationData.q2}\n\n`;
      if(situationData.q3) textToCopy += `Q3. Niveau de formation: ${situationData.q3}\n\n`;
      if(situationData.q4) textToCopy += `Q4. Certifications: ${situationData.q4}\n\n`;
      
      textToCopy += "=== RESSOURCES & COMPÉTENCES ===\n";
      if(situationData.q5) textToCopy += `Q5. Compétences techniques: ${situationData.q5}\n\n`;
      if(situationData.q6) textToCopy += `Q6. Compétences à réutiliser: ${situationData.q6}\n\n`;
      if(situationData.q7) textToCopy += `Q7. Compétences relationnelles: ${situationData.q7}\n\n`;
      if(situationData.q8) textToCopy += `Q8. Expériences marquantes: ${situationData.q8}\n\n`;
      
      textToCopy += "=== VALEURS & SENS ===\n";
      if(situationData.q9) textToCopy += `Q9. Valeurs essentielles: ${situationData.q9}\n\n`;
      if(situationData.q10) textToCopy += `Q10. Secteurs à éviter: ${situationData.q10}\n\n`;
      
      textToCopy += "=== CONTRAINTES & CONDITIONS ===\n";
      if(situationData.q11) textToCopy += `Q11. Mobilité: ${situationData.q11}\n\n`;
      if(situationData.q12) textToCopy += `Q12. Conditions de travail: ${situationData.q12}\n\n`;
      if(situationData.q13) textToCopy += `Q13. Horaires: ${situationData.q13}\n\n`;
      if(situationData.q14) textToCopy += `Q14. Limitations: ${situationData.q14}\n\n`;
      if(situationData.q15) textToCopy += `Q15. Rémunération souhaitée: ${situationData.q15}\n\n`;
      if(situationData.q16) textToCopy += `Q16. Situations à éviter: ${situationData.q16}\n\n`;
      if(situationData.q17) textToCopy += `Q17. Environnement idéal: ${situationData.q17}\n\n`;
      
      textToCopy += "=== FORMATION ===\n";
      if(situationData.q18) textToCopy += `Q18. Formation envisagée: ${situationData.q18}\n\n`;
      
      textToCopy += "=== OUVERTURE ===\n";
      if(situationData.q19) textToCopy += `Q19. Informations complémentaires: ${situationData.q19}\n\n`;
      
      textToCopy += "=== FIN DES DONNÉES ===\n";
      textToCopy += "Généré par Reconversion 360 IA - Synergie IA";
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        localStorage.setItem('data_copied', 'true');
        
        const originalHTML = btnCopy.innerHTML;
        btnCopy.innerHTML = '<svg class="btn-icon-small" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg><span style="color:#22c55e">Copié !</span>';
        btnCopy.style.borderColor = '#22c55e';
        
        setTimeout(() => {
          btnCopy.innerHTML = originalHTML;
          btnCopy.style.borderColor = '';
        }, 3000);
        
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
      
      window.open('https://chatgpt.com/g/g-6914f232fb048191b5df9a123ac6af82-reconversion-360-ia', '_blank');
    });
  }
  
  updateResetButton();
  
});
