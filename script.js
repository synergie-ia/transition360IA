// Génère les 14 curseurs
const zoneQuestions = document.getElementById("questions");
INTERETS.forEach((lib, i) => {
  const wrap = document.createElement("div");
  wrap.className = "question";
  wrap.innerHTML = `
    <label>${i+1}. ${lib}</label>
    <div class="row">
      <input type="range" id="q${i}" min="0" max="10" step="1" value="5" oninput="updateLabel(${i})"/>
      <span class="tag"><span id="val${i}">5</span>/10</span>
    </div>
  `;
  zoneQuestions.appendChild(wrap);
});

function updateLabel(i){
  document.getElementById(`val${i}`).textContent = document.getElementById(`q${i}`).value;
}

// Algorithme simple (sans exposant) :
// Score = (Σ(profil_i × importance_i)) / (10 × Σ(importance_i)) × 100
function calculer(){
  const profil = [];
  for(let i=0;i<INTERETS.length;i++){
    profil.push(parseInt(document.getElementById(`q${i}`).value,10));
  }

  const resultats = [];

  for(const univers of UNIVERS){
    const imp = MATRICE_UNIVERS[univers];
    let num = 0;           // numérateur
    let denomPoids = 0;    // somme des poids

    for(let i=0;i<INTERETS.length;i++){
      num += profil[i] * imp[i];
      denomPoids += imp[i];
    }
    const score = (num / (10 * denomPoids)) * 100;
    resultats.push({ univers, score });
  }

  resultats.sort((a,b)=> b.score - a.score);

  const zone = document.getElementById("resultats");
  zone.innerHTML = "<h2>Résultats — compatibilité par univers</h2>";
  resultats.forEach(r=>{
    zone.innerHTML += `<div class="univers">${r.univers} — <b>${r.score.toFixed(1)}%</b></div>`;
  });

  zone.innerHTML += `<hr><div class="mono"><b>Profil (à copier dans l’IA) :</b> [${profil.join(", ")}]</div>`;
}
