// ------------------------------
// IA360 – Moteur de calcul front
// ------------------------------

// 1) Intérêts (déplacés ici pour garder data.js minimal)
const interests = [
  {id:1,  icon:'🌿', title:'Activités physiques & nature',  verbs:'Bouger, respirer, explorer, agir', description:'Être en mouvement, terrain, extérieur.'},
  {id:2,  icon:'🔧', title:'Manuel & technique',            verbs:'Fabriquer, réparer, construire, ajuster', description:'Travail concret, outils, réalisation.'},
  {id:3,  icon:'🔍', title:'Investigation & information',    verbs:'Observer, comprendre, apprendre', description:'Analyser, enquêter, structurer.'},
  {id:4,  icon:'🧪', title:'Sciences & technologies',       verbs:'Tester, modéliser, programmer, innover', description:'Expérimenter, résoudre des problèmes.'},
  {id:5,  icon:'🎨', title:'Arts & expression',             verbs:'Imaginer, exprimer, créer, interpréter', description:'Créativité, esthétique, expression.'},
  {id:6,  icon:'💡', title:'Idées & conception',            verbs:'Concevoir, structurer, inventer, organiser', description:'Idéation, organisation, design.'},
  {id:7,  icon:'🤝', title:'Aide & accompagnement',         verbs:'Soutenir, écouter, former, accompagner', description:'Relation d’aide, utilité sociale.'},
  {id:8,  icon:'💬', title:'Relations & sociabilité',       verbs:'Communiquer, relier, partager, coopérer', description:'Contact, échanges, réseau.'},
  {id:9,  icon:'🚀', title:'Action & initiative',           verbs:'Agir, entreprendre, dynamiser, décider', description:'Prendre des initiatives, faire avancer.'},
  {id:10, icon:'🧭', title:'Leadership & stratégie',        verbs:'Motiver, diriger, influencer, décider', description:'Vision, pilotage, décision.'},
  {id:11, icon:'📊', title:'Données & chiffres',            verbs:'Mesurer, analyser, fiabiliser', description:'Rigueur, quanti, tableaux.'},
  {id:12, icon:'📋', title:'Règles & méthodes',             verbs:'Normer, cadrer, sécuriser, appliquer', description:'Procédures, conformité, méthode.'}
];

// 2) Matrice univers (pondérations 0–3) – reprise depuis ton data.js existant
//    NOTE : on conserve les noms tels que présents (y compris emojis déjà utilisés dans tes fichiers)
const universes = [
  { name: '🟩 Agriculture, nature & animaux',            weights: [3,3,1,1,0,0,1,0,2,0,0,1] },
  { name: '🎨 Arts, design & création',                 weights: [0,1,1,0,3,3,0,1,0,0,0,0] },
  { name: '🛍️ Commerce, marketing & vente',            weights: [0,0,0,0,1,1,1,3,2,3,1,0] },
  { name: '📣 Communication, médias & culture',        weights: [0,0,1,0,3,3,1,3,1,2,0,0] },
  { name: '🏗️ Construction, BTP & habitat',            weights: [3,3,2,3,1,2,1,2,3,2,2,3] },
  { name: '⚖️ Droit, administration & politique publique', weights: [0,0,2,1,0,2,1,1,1,2,3,3] },
  { name: '🎓 Éducation, formation & apprentissage',    weights: [0,0,3,1,1,1,2,3,0,0,0,0] },
  { name: '🌍 Environnement, climat & énergies',        weights: [3,2,1,2,0,1,1,0,1,0,0,0] },
  { name: '💼 Gestion, finance & comptabilité',         weights: [0,1,1,1,0,1,0,0,1,2,3,3] },
  { name: '🏭 Industrie, fabrication & production',     weights: [1,3,1,3,0,1,0,0,1,1,1,2] },
  { name: '🧭 Management, entrepreneuriat & stratégie', weights: [0,0,2,2,1,3,1,3,3,3,3,3] },
  { name: '💻 Numérique, informatique & data',          weights: [0,2,3,3,2,3,1,2,3,2,3,3] },
  { name: '🩺 Santé, bien-être & médical',              weights: [2,1,1,2,0,1,3,2,1,0,2,2] },
  { name: '🔬 Sciences, recherche & innovation',        weights: [0,1,2,3,1,3,0,0,0,1,3,3] },
  { name: '🛡️ Sécurité, défense & urgence',            weights: [3,2,1,1,0,1,0,0,3,2,0,2] },
  { name: '🤲 Social, aide & solidarité',               weights: [0,0,1,0,0,0,3,3,1,0,0,0] },
  { name: '🏃 Sport, loisirs & vie active',             weights: [3,1,1,0,1,0,1,3,3,1,0,0] },
  { name: '🚀 Technologies émergentes & futur du travail', weights: [1,1,2,3,1,2,0,0,2,2,3,1] }
];

// 3) État utilisateur
const ratings = {};        // réponses du test (0..3)
let currentResults = [];   // liste des 21 résultats

// 4) Rendu du questionnaire
function renderInterests(){
  const container = document.getElementById('interestsList');
  container.innerHTML = interests.map(interest => `
    <div class="interest-card">
      <div class="interest-header">
        <div class="interest-icon">${interest.icon}</div>
        <div class="interest-title">
          <h3>${interest.title}</h3>
          <div class="interest-verbs">${interest.verbs}</div>
        </div>
      </div>
      <div class="interest-description">${interest.description}</div>
      <div class="rating-buttons">
        <button class="rating-btn level-0" onclick="setRating(${interest.id},0)">Pas du tout moi</button>
        <button class="rating-btn level-1" onclick="setRating(${interest.id},1)">Un peu moi</button>
        <button class="rating-btn level-2" onclick="setRating(${interest.id},2)">Plutôt moi</button>
        <button class="rating-btn level-3" onclick="setRating(${interest.id},3)">Totalement moi</button>
      </div>
    </div>
  `).join('');
}

// Mise à jour sélection
function setRating(interestId, value){
  ratings[interestId] = value;
  const card = event.target.closest('.interest-card');
  card.querySelectorAll('.rating-btn').forEach(btn=>btn.classList.remove('selected'));
  event.target.classList.add('selected');
  updateProgress();
}

// Barre de progression
function updateProgress(){
  const pct = (Object.keys(ratings).length / interests.length) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
}

// Calcul
function calculateResults(){
  if(Object.keys(ratings).length < interests.length){
    alert('Merci de répondre aux 12 questions avant de calculer vos résultats.');
    return;
  }
  const results = universes.map(u=>{
    let score=0, max=0;
    u.weights.forEach((w, idx)=>{
      const user = ratings[idx+1] ?? 0; // 0..3
      score += user * w;
      max   += w * 3;
    });
    const percentage = max>0 ? (score/max)*100 : 0;
    return { name:u.name, percentage, score, max };
  }).sort((a,b)=>b.percentage-a.percentage);

  currentResults = results; // ⚠️ on garde les 21 univers (aucun filtrage)
  displayResults(currentResults);

  // si ancre #results : scroll
  const resultsSection = document.getElementById('results');
  resultsSection.classList.add('show');
  location.hash = '#results';
  resultsSection.scrollIntoView({behavior:'smooth', block:'start'});
}

// Affichage résultats (21 univers)
function colorFor(p){
  if(p>=80) return 'green';
  if(p>=65) return 'orange';
  return 'red';
}
function displayResults(list){
  const container = document.getElementById('resultsList');
  container.innerHTML = list.map((r,i)=>`
    <div class="result-card">
      <div class="result-info">
        <div class="result-title">#${String(i+1).padStart(2,'0')} ${r.name}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${r.percentage.toFixed(1)}%"></div></div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="badge ${colorFor(r.percentage)}">${r.percentage.toFixed(1)}%</span>
      </div>
    </div>
  `).join('');
}

// Détail texte (copie améliorée)
function createVisualResults(){
  const date = new Date().toLocaleDateString('fr-FR');
  let text = `ORIENTATION 360 IA – Résultats du ${date}\n========================================\n\n`;
  currentResults.forEach((r,i)=>{
    text += `${String(i+1).padStart(2,'0')}. ${r.name} — ${r.percentage.toFixed(1)}%\n`;
  });
  alert(text);
}

// Téléchargement PDF (même design)
function downloadPDF(){
  const el = document.querySelector('.container');
  const opt = {
    margin:       10,
    filename:     'orientation-360-resultats.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS:true, backgroundColor:'#ffffff' },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().from(el).set(opt).save();
}

// Assistant (placeholder)
function askAssistant(){
  alert("Diagnostic IA : fonctionnalité à brancher sur ton agent plus tard.");
}

// Initialisation
document.addEventListener('DOMContentLoaded', renderInterests);
