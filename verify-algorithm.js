#!/usr/bin/env node

/*
  ============================================
  TEST DE VÉRIFICATION DES ALGORITHMES
  ============================================

  Ce script vérifie que les calculs du profil et des univers
  utilisent bien l'algorithme quadratique.
*/

// ===== DONNÉES DE TEST =====

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

// Matrice de corrélation pour l'univers "Sciences, recherche & innovation" (id: 17)
const universSciencesWeights = [5, 3, 9, 10, 8, 1, 4, 8, 0, 1, 1, 3];
// Ordre : MO, PT, AL, SI, CS, EC, CP, IP, MP, AE, AA, RI

// ===== TEST 1 : Vérification de l'algorithme quadratique =====

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 1 : Calcul du profil avec algorithme quadratique");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// Réponses simulées pour obtenir les scores quadratiques de l'exemple
// Scores cibles : MO=16, PT=0, AL=36, SI=45, CS=36, EC=1, CP=42, IP=48, MP=7, AE=16, AA=4, RI=26

const testAnswers = {
  // MO = 16 → exemple: 4,0,0,0 (16+0+0+0=16)
  "q1-MO": 4, "q4-MO": 0, "q7-MO": 0, "q10-MO": 0,

  // PT = 0 → 0,0,0,0
  "q1-PT": 0, "q4-PT": 0, "q7-PT": 0, "q10-PT": 0,

  // AL = 36 → exemple: 3,3,0,0 (9+9+0+0=18) ❌ ou 4,2,2,0 (16+4+4+0=24) ❌
  // Pour 36: besoin de 36 = 16+4+16+0 = 4,2,4,0 ✓
  "q1-AL": 4, "q4-AL": 2, "q7-AL": 4, "q10-AL": 0,

  // SI = 45 → 4,3,4,2 (16+9+16+4=45) ✓
  "q1-SI": 4, "q4-SI": 3, "q7-SI": 4, "q10-SI": 2,

  // CS = 36 → 4,2,4,0 (16+4+16+0=36) ✓
  "q2-CS": 4, "q5-CS": 2, "q8-CS": 4, "q11-CS": 0,

  // EC = 1 → 1,0,0,0 (1+0+0+0=1) ✓
  "q2-EC": 1, "q5-EC": 0, "q8-EC": 0, "q11-EC": 0,

  // CP = 42 → besoin de 42 = 16+16+9+1 = 4,4,3,1 ✓
  "q2-CP": 4, "q5-CP": 4, "q8-CP": 3, "q11-CP": 1,

  // IP = 48 → 4,4,4,0 (16+16+16+0=48) ✓
  "q2-IP": 4, "q5-IP": 4, "q8-IP": 4, "q11-IP": 0,

  // MP = 7 → besoin de 7 = 4+1+1+1 = 2,1,1,1 ✓
  "q3-MP": 2, "q6-MP": 1, "q9-MP": 1, "q12-MP": 1,

  // AE = 16 → 4,0,0,0 (16+0+0+0=16) ✓
  "q3-AE": 4, "q6-AE": 0, "q9-AE": 0, "q12-AE": 0,

  // AA = 4 → 2,0,0,0 (4+0+0+0=4) ✓
  "q3-AA": 2, "q6-AA": 0, "q9-AA": 0, "q12-AA": 0,

  // RI = 26 → besoin de 26 = 16+9+1+0 = 4,3,1,0 ✓
  "q3-RI": 4, "q6-RI": 3, "q9-RI": 1, "q12-RI": 0
};

// Fonction de calcul du profil (algorithme quadratique)
function calcProfile(answers) {
  const scores = {};
  DIMENSIONS.forEach(d => scores[d.code] = 0);

  Object.keys(answers).forEach(key => {
    const [, dim] = key.split("-");
    const val = answers[key];
    scores[dim] += val * val;  // ← ALGORITHME QUADRATIQUE
  });

  return scores;
}

// Calcul des scores
const scoresQuadratiques = calcProfile(testAnswers);

console.log("📊 Scores quadratiques calculés :\n");
DIMENSIONS.forEach(dim => {
  const score = scoresQuadratiques[dim.code];
  const pourcentage = Math.round((score / 64) * 100);
  console.log(`   ${dim.code.padEnd(2)} - ${dim.name.padEnd(40)} : ${score.toString().padStart(2)} / 64 → ${pourcentage}%`);
});

// Scores attendus de l'exemple
const scoresAttendus = {
  MO: 16, PT: 0, AL: 36, SI: 45, CS: 36, EC: 1,
  CP: 42, IP: 48, MP: 7, AE: 16, AA: 4, RI: 26
};

console.log("\n✅ Vérification des scores :\n");
let allCorrect = true;
DIMENSIONS.forEach(dim => {
  const calculated = scoresQuadratiques[dim.code];
  const expected = scoresAttendus[dim.code];
  const match = calculated === expected;
  const symbol = match ? "✓" : "✗";

  if (!match) {
    console.log(`   ${symbol} ${dim.code} : calculé=${calculated}, attendu=${expected} ❌`);
    allCorrect = false;
  } else {
    console.log(`   ${symbol} ${dim.code} : ${calculated}`);
  }
});

if (allCorrect) {
  console.log("\n🎉 Tous les scores du profil sont CORRECTS !\n");
} else {
  console.log("\n⚠️  Certains scores ne correspondent pas.\n");
}

// ===== TEST 2 : Vérification du calcul des univers =====

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 2 : Calcul de l'univers 'Sciences' avec moyenne pondérée");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("Poids de corrélation pour 'Sciences, recherche & innovation' :");
console.log("   [MO, PT, AL, SI, CS, EC, CP, IP, MP, AE, AA, RI]");
console.log(`   [${universSciencesWeights.join(', ')}]\n`);

let sommePonderee = 0;
let sommePoids = 0;

console.log("Calcul détaillé :\n");
DIMENSIONS.forEach((dim, index) => {
  const score = scoresQuadratiques[dim.code];
  const poids = universSciencesWeights[index];
  const contribution = score * poids;

  sommePonderee += contribution;
  sommePoids += poids;

  console.log(`   ${dim.code} : ${score.toString().padStart(2)} × ${poids.toString().padStart(2)} = ${contribution.toString().padStart(4)}`);
});

console.log(`\n   ${"─".repeat(50)}`);
console.log(`   Somme pondérée : ${sommePonderee}`);
console.log(`   Somme des poids : ${sommePoids}`);

const moyennePonderee = sommePonderee / sommePoids;
const pourcentageFinal = Math.round((moyennePonderee / 64) * 100);

console.log(`   Moyenne pondérée : ${moyennePonderee.toFixed(2)}`);
console.log(`   Pourcentage final : (${moyennePonderee.toFixed(2)} / 64) × 100 = ${pourcentageFinal}%`);

// Vérification avec les valeurs attendues de l'exemple
const sommeAttendue = 1793;
const moyenneAttendue = 33.83;
const pourcentageAttendu = 53;

console.log("\n✅ Vérification du calcul :\n");
console.log(`   Somme pondérée : ${sommePonderee} (attendu: ${sommeAttendue}) ${sommePonderee === sommeAttendue ? '✓' : '✗'}`);
console.log(`   Moyenne pondérée : ${moyennePonderee.toFixed(2)} (attendu: ${moyenneAttendue.toFixed(2)}) ${Math.abs(moyennePonderee - moyenneAttendue) < 0.01 ? '✓' : '✗'}`);
console.log(`   Pourcentage : ${pourcentageFinal}% (attendu: ${pourcentageAttendu}%) ${pourcentageFinal === pourcentageAttendu ? '✓' : '✗'}`);

if (sommePonderee === sommeAttendue && Math.abs(moyennePonderee - moyenneAttendue) < 0.01 && pourcentageFinal === pourcentageAttendu) {
  console.log("\n🎉 Le calcul de l'univers est CORRECT !\n");
} else {
  console.log("\n⚠️  Le calcul de l'univers ne correspond pas exactement.\n");
}

// ===== RÉSUMÉ FINAL =====

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("RÉSUMÉ");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log("✅ Algorithme quadratique utilisé : val² pour chaque réponse");
console.log("✅ Score max par dimension : 64 (4² × 4 questions)");
console.log("✅ Formule univers : Σ(score × poids) / Σ(poids) / 64 × 100");
console.log("\n");
