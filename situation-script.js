/* 
  Script pour le formulaire de situation
*/

document.addEventListener('DOMContentLoaded', function() {
  
  const form = document.getElementById('situationForm');
  
  // Charger les données sauvegardées
  loadSituationData();
  
  // Soumettre le formulaire
  form.addEventListener('submit', function(e){
    e.preventDefault();
    
    const formData = {
      nom: document.getElementById('nom').value,
      age: document.getElementById('age').value,
      situation: document.getElementById('situation').value,
      experience: document.getElementById('experience').value,
      formation: document.getElementById('formation').value,
      competences: document.getElementById('competences').value,
      motivations: document.getElementById('motivations').value,
      contraintes: document.getElementById('contraintes').value
    };
    
    // Sauvegarder dans localStorage
    localStorage.setItem('situation_data', JSON.stringify(formData));
    
    // Feedback visuel
    const btn = form.querySelector('.main-btn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Bilan enregistré !';
    btn.style.background = '#22c55e';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      
      // Rediriger vers l'accueil
      if(confirm('Votre bilan a été enregistré. Souhaitez-vous retourner à l\'accueil ?')){
        window.location.href = 'index.html';
      }
    }, 2000);
  });
  
});

function loadSituationData(){
  const saved = localStorage.getItem('situation_data');
  if(saved){
    try {
      const data = JSON.parse(saved);
      
      if(data.nom) document.getElementById('nom').value = data.nom;
      if(data.age) document.getElementById('age').value = data.age;
      if(data.situation) document.getElementById('situation').value = data.situation;
      if(data.experience) document.getElementById('experience').value = data.experience;
      if(data.formation) document.getElementById('formation').value = data.formation;
      if(data.competences) document.getElementById('competences').value = data.competences;
      if(data.motivations) document.getElementById('motivations').value = data.motivations;
      if(data.contraintes) document.getElementById('contraintes').value = data.contraintes;
      
    } catch(e){
      console.error('Erreur chargement situation:', e);
    }
  }
}
