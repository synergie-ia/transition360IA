// 14 intérêts (fixes)
const INTERETS = [
  "Bouger, être actif physiquement",
  "Travailler avec tes mains",
  "Enquêter, observer, comprendre",
  "Explorer les sciences ou les technologies",
  "Utiliser des chiffres, calculer, raisonner logiquement",
  "Créer artistiquement, imaginer",
  "Concevoir, résoudre des problèmes, innover",
  "Aider, accompagner, prendre soin",
  "Enseigner, transmettre, expliquer",
  "Communiquer, écrire, t'exprimer",
  "Convaincre, vendre, négocier",
  "Organiser, décider, diriger",
  "Travailler en autonomie",
  "Suivre un cadre structuré"
];

// 21 univers (émojis + libellés)
const UNIVERS = [
  "🌾 Agriculture, Nature & Animaux",
  "🎨 Arts, Design & Création",
  "🛒 Commerce, Marketing & Vente",
  "🎙️ Communication, Médias & Culture",
  "🏗️ Construction, BTP & Habitat",
  "⚖️ Droit, Administration & Politique",
  "🎓 Éducation, Formation & Apprentissage",
  "🌍 Environnement, Climat & Énergies",
  "💶 Gestion, Finance & Comptabilité",
  "🍽️ Hôtellerie, Restauration & Tourisme",
  "🏠 Immobilier & Patrimoine",
  "⚙️ Industrie, Fabrication & Production",
  "🚚 Logistique, Transport & Mobilité",
  "💼 Management, Entrepreneuriat & Stratégie",
  "💻 Numérique, Informatique & Data",
  "⚕️ Santé, Bien-être & Médical",
  "🔬 Sciences, Recherche & Innovation",
  "🛡️ Sécurité, Défense & Urgence",
  "❤️ Social, Aide & Solidarité",
  "🏋️ Sport, Loisirs & Vie Active",
  "🚀 Technologies Émergentes & Futur du Travail"
];

// MATRICE univers × intérêts
// Valeurs autorisées : 2 (faible), 4 (secondaire), 6 (important), 8 (très important), 10 (structurant)
const MATRICE_UNIVERS = {
  "🌾 Agriculture, Nature & Animaux":             [10,10, 6, 4, 2, 4, 6, 6, 4, 2, 2, 2,10, 2],
  "🎨 Arts, Design & Création":                   [ 2, 8, 4, 4, 2,10, 8, 4, 4, 6, 4, 4, 6, 2],
  "🛒 Commerce, Marketing & Vente":               [ 2, 4, 4, 4, 4, 4, 4, 4, 4, 8,10, 8, 8, 4],
  "🎙️ Communication, Médias & Culture":          [ 2, 4, 4, 4, 4, 8, 6, 4, 4,10, 8, 6, 6, 4],
  "🏗️ Construction, BTP & Habitat":              [ 8,10, 4, 4, 4, 4, 6, 2, 4, 2, 2, 6, 6, 8],
  "⚖️ Droit, Administration & Politique":        [ 2, 2, 8, 4, 8, 4, 6, 4, 6, 6, 4,10, 6, 8],
  "🎓 Éducation, Formation & Apprentissage":      [ 2, 4, 4, 4, 4, 4, 4, 8,10, 6, 4, 4, 6, 4],
  "🌍 Environnement, Climat & Énergies":         [ 6, 8, 8, 8, 8, 4, 8, 4, 4, 4, 4, 4, 8, 4],
  "💶 Gestion, Finance & Comptabilité":           [ 2, 2, 6, 8,10, 4, 8, 2, 4, 4, 4, 8, 6, 8],
  "🍽️ Hôtellerie, Restauration & Tourisme":      [ 8, 8, 4, 4, 2, 4, 4, 8, 4, 6, 8, 6, 8, 4],
  "🏠 Immobilier & Patrimoine":                   [ 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 8, 8, 8, 4],
  "⚙️ Industrie, Fabrication & Production":       [ 8,10, 6, 8, 8, 4, 8, 2, 4, 4, 4, 6, 8, 6],
  "🚚 Logistique, Transport & Mobilité":          [ 8, 8, 4, 4, 4, 2, 4, 2, 2, 4, 6, 6, 8, 8],
  "💼 Management, Entrepreneuriat & Stratégie":   [ 4, 4, 4, 6, 8, 4, 8, 4, 6, 6, 8,10,10, 4],
  "💻 Numérique, Informatique & Data":            [ 2, 2, 6,10, 8, 6,10, 2, 2, 4, 4, 4,10, 4],
  "⚕️ Santé, Bien-être & Médical":                [ 4, 4, 4, 4, 4, 4, 6,10, 6, 4, 4, 4, 6, 4],
  "🔬 Sciences, Recherche & Innovation":          [ 2, 2,10,10, 8, 4,10, 4, 4, 4, 4, 4, 8, 4],
  "🛡️ Sécurité, Défense & Urgence":              [ 8, 8, 6, 4, 4, 4, 6, 6, 4, 4, 4, 6, 8, 6],
  "❤️ Social, Aide & Solidarité":                [ 4, 4, 4, 4, 4, 4, 4,10, 8, 6, 4, 4, 6, 4],
  "🏋️ Sport, Loisirs & Vie Active":              [10, 8, 4, 4, 2, 4, 4, 8, 4, 6, 6, 6, 8, 4],
  "🚀 Technologies Émergentes & Futur du Travail":[ 4, 4, 8,10, 8, 8,10, 4, 4, 4, 4, 4, 8, 4]
};
