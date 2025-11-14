/* 
  ============================================
  RECONVERSION 360 IA - PAGE D'ACCUEIL
  ============================================
  VERSION CORRIGÉE - COPIE COMPLÈTE DES DONNÉES
*/

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== BOUTON RÉINITIALISATION =====
  const btnReset = document.getElementById('btnResetData');
  if(btnReset){
    btnReset.addEventListener('click', function(){
      const confirm = window.confirm(
        "⚠️ ATTENTION ⚠️\n\n" +
        "Êtes-vous sûr de vouloir supprimer TOUTES vos données ?\n\n" +
        "Cette action est IRRÉVERSIBLE et effacera :\n" +
        "• Vos réponses au questionnaire d'intérêts\n" +
        "• Vos univers sélectionnés\n" +
        "• Votre bilan de situation\n\n" +
        "Cliquez sur OK pour confirmer la suppression."
      );
      
      if(confirm){
        try {
          // Supprimer toutes les clés liées à l'application
          const keys = [
            'questionnaire_answers',
            'selectedUnivers',
            'univers_percentages',
            'selected_univers_details',
            'situation_data',
            'profile_percentages',
            'univers_details'
          ];
          
          keys.forEach(key => {
            localStorage.removeItem(key);
          });
          
          console.log('✅ Toutes les données ont été supprimées');
          
          alert("✅ Toutes vos données ont été supprimées avec succès !\n\nVous pouvez recommencer depuis le début.");
          
          // Recharger la page
          location.reload();
          
        } catch(error) {
          console.error('❌ Erreur lors de la suppression:', error);
          alert("❌ Une erreur s'est produite lors de la suppression des données.");
        }
      }
    });
  }
  
  // ===== BOUTON COPIE DES RÉSULTATS =====
  const btnCopy = document.getElementById('btnCopyResults');
  if(btnCopy){
    btnCopy.addEventListener('click', function(){
      
      try {
        let output = "=== MES DONNÉES RECONVERSION 360 IA ===\n\n";
        
        // 1. PROFIL D'INTÉRÊTS
        const profileData = localStorage.getItem('profile_percentages');
        
        if(profileData){
          const profile = JSON.parse(profileData);
          output += "📊 PROFIL D'INTÉRÊTS\n";
          
          // Trier par pourcentage décroissant
          const sortedProfile = Object.entries(profile)
            .map(([code, data]) => ({ code, ...data }))
            .sort((a, b) => b.pct - a.pct);
          
          sortedProfile.forEach(dim => {
            output += `${dim.name} ${dim.pct}%\n`;
          });
          
          output += "\n";
        } else {
          output += "📊 PROFIL D'INTÉRÊTS\n";
          output += "❌ Pas encore réalisé\n";
          output += "➡️ Complétez le questionnaire d'intérêts pour obtenir votre profil\n\n";
        }
        
        // 2. UNIVERS SÉLECTIONNÉS
        const selectedUniversData = localStorage.getItem('selected_univers_details');
        const universDetailsAll = localStorage.getItem('univers_details');
        
        if(selectedUniversData){
          const selectedUnivers = JSON.parse(selectedUniversData);
          const nbUnivers = Object.keys(selectedUnivers).length;
          
          output += "🌍 UNIVERS-MÉTIERS SÉLECTIONNÉS\n";
          
          if(nbUnivers > 0){
            // Trier par pourcentage décroissant
            const sortedUnivers = Object.entries(selectedUnivers)
              .map(([id, data]) => ({ id: parseInt(id), ...data }))
              .sort((a, b) => b.pct - a.pct);
            
            sortedUnivers.forEach(univers => {
              output += `${univers.stars} ${univers.name} - ${univers.pct}% (${univers.level})\n`;
            });
          } else {
            output += "❌ Aucun univers sélectionné\n";
            output += "➡️ Sélectionnez au moins 3 univers après avoir vu vos résultats\n";
          }
          
          output += "\n";
        } else {
          output += "🌍 UNIVERS-MÉTIERS SÉLECTIONNÉS\n";
          output += "❌ Pas encore sélectionnés\n";
          output += "➡️ Complétez le questionnaire puis sélectionnez vos univers d'intérêt\n\n";
        }
        
        // 3. BILAN DE SITUATION
        const situationData = localStorage.getItem('situation_data');
        
        if(situationData){
          const situation = JSON.parse(situationData);
          const nbChamps = Object.keys(situation).length;
          
          output += "📋 BILAN DE SITUATION\n";
          output += `✅ Complété (${nbChamps} champs remplis)\n\n`;
          
          // Informations de base
          if(situation.prenom){
            output += `Prénom : ${situation.prenom}\n`;
          }
          if(situation.age){
            output += `Âge : ${situation.age} ans\n\n`;
          }
          
          // Objectif professionnel
          if(situation.q1){
            output += "🎯 OBJECTIF PROFESSIONNEL\n";
            output += `${situation.q1}\n\n`;
          }
          
          // Situation actuelle
          if(situation.q2){
            output += "💼 STATUT ACTUEL\n";
            output += `${situation.q2}\n\n`;
          }
          
          // Formation
          if(situation.q3){
            output += "🎓 NIVEAU DE FORMATION\n";
            output += `${situation.q3}\n\n`;
          }
          
          // Compétences à réutiliser
          if(situation.q6){
            output += "🔧 COMPÉTENCES À RÉUTILISER\n";
            output += `${situation.q6}\n\n`;
          }
          
          // Valeurs
          if(situation.q9){
            output += "⭐ VALEURS ESSENTIELLES\n";
            output += `${situation.q9}\n\n`;
          }
          
          // Contraintes géographiques
          if(situation.q11){
            output += "📍 MOBILITÉ GÉOGRAPHIQUE\n";
            output += `${situation.q11}\n\n`;
          }
          
          // Rémunération
          if(situation.q15){
            output += "💰 RÉMUNÉRATION MINIMALE SOUHAITÉE\n";
            output += `${situation.q15}\n\n`;
          }
          
          // Formation envisagée
          if(situation.q18){
            output += "📚 FORMATION ENVISAGÉE\n";
            output += `${situation.q18}\n\n`;
          }
          
        } else {
          output += "📋 BILAN DE SITUATION\n";
          output += "❌ Pas encore complété\n";
          output += "➡️ Remplissez le bilan de situation pour affiner votre projet\n\n";
        }
        
        // Ajouter un footer
        output += "===================================\n";
        output += "📅 Date d'export : " + new Date().toLocaleDateString('fr-FR') + "\n";
        output += "🤖 Reconversion 360 IA - Synergie IA\n";
        
        // Copier dans le presse-papier
        navigator.clipboard.writeText(output).then(() => {
          console.log('✅ Données copiées dans le presse-papier');
          
          // Feedback visuel
          const originalText = btnCopy.innerHTML;
          btnCopy.innerHTML = '<svg class="btn-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg><span>✅ Copié !</span>';
          btnCopy.style.background = '#22c55e';
          btnCopy.style.color = '#fff';
          
          setTimeout(() => {
            btnCopy.innerHTML = originalText;
            btnCopy.style.background = '';
            btnCopy.style.color = '';
          }, 3000);
          
          alert(
            "✅ Vos données ont été copiées !\n\n" +
            "Vous pouvez maintenant les coller dans une conversation avec l'IA de votre choix.\n\n" +
            "💡 Conseil : Commencez par expliquer à l'IA que vous êtes en reconversion professionnelle et collez vos données pour obtenir des conseils personnalisés."
          );
          
        }).catch(err => {
          console.error('❌ Erreur copie:', err);
          
          // Fallback : afficher dans une fenêtre
          const win = window.open('', '_blank');
          win.document.write('<pre style="font-family: monospace; white-space: pre-wrap; padding: 20px;">' + output + '</pre>');
          win.document.title = 'Mes données Reconversion 360 IA';
          
          alert(
            "📋 Vos données ont été ouvertes dans une nouvelle fenêtre.\n\n" +
            "Copiez-les manuellement (Ctrl+A puis Ctrl+C) pour les utiliser avec l'IA."
          );
        });
        
      } catch(error) {
        console.error('❌ Erreur lors de la copie:', error);
        alert("❌ Une erreur s'est produite lors de la copie des données.");
      }
      
    });
  }
  
});
