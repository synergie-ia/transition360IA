// ============================================
// DATA IA360 — Portail d’Orientation 360°
// Version sans sous-univers
// ============================================

// 1️⃣ QUESTIONS (14 intérêts professionnels)
const questions = [
  { title: "Bouger, être actif physiquement",
    description: "Te déplacer sur le terrain, être souvent en mouvement, mobiliser ton corps, ne pas rester derrière un bureau.",
    examples: "Exemples : faire du sport, marcher, porter, être debout, te déplacer." },

  { title: "Travailler avec tes mains",
    description: "Fabriquer, assembler, manipuler des objets ou des outils, réparer, créer avec des matériaux.",
    examples: "Exemples : bricoler, construire, cuisiner, réparer, travailler le bois ou le métal." },

  { title: "Enquêter, observer, comprendre",
    description: "Observer, comparer, chercher des explications, comprendre des faits, faire des recherches, analyser.",
    examples: "Exemples : faire des recherches, analyser des situations, résoudre des énigmes." },

  { title: "Explorer les sciences ou les technologies",
    description: "Faire des expériences, utiliser des outils techniques, comprendre des phénomènes scientifiques ou informatiques.",
    examples: "Exemples : coder, expérimenter, utiliser des logiciels, manipuler des machines." },

  { title: "Utiliser des chiffres, calculer, raisonner logiquement",
    description: "Faire des calculs, analyser des données, établir des liens logiques, résoudre des problèmes mathématiques.",
    examples: "Exemples : statistiques, budget, logique, planification." },

  { title: "Créer artistiquement, imaginer",
    description: "Dessiner, écrire, inventer, produire du contenu artistique ou visuel.",
    examples: "Exemples : peindre, écrire, faire de la musique, créer des designs ou vidéos." },

  { title: "Concevoir, résoudre des problèmes, innover",
    description: "Trouver des idées nouvelles, améliorer ce qui existe, créer des solutions inédites.",
    examples: "Exemples : lancer un projet, inventer, imaginer un nouveau produit." },

  { title: "Aider, accompagner, prendre soin",
    description: "Soutenir quelqu’un, résoudre un problème humain, écouter, rassurer, soigner.",
    examples: "Exemples : écouter, conseiller, soigner, assister des personnes fragiles." },

  { title: "Enseigner, transmettre, expliquer",
    description: "Partager des connaissances, faire comprendre, former ou accompagner.",
    examples: "Exemples : donner des cours, former quelqu’un, transmettre ton savoir-faire." },

  { title: "Communiquer, écrire, t’exprimer",
    description: "Parler, écrire, créer du contenu pour informer ou divertir.",
    examples: "Exemples : écrire, parler devant un groupe, animer une discussion." },

  { title: "Convaincre, vendre, négocier",
    description: "Persuader, défendre une idée, influencer ou conclure un accord.",
    examples: "Exemples : vendre un produit, défendre un projet, convaincre un public." },

  { title: "Organiser, décider, diriger",
    description: "Planifier, gérer une équipe, prendre des décisions, coordonner un projet.",
    examples: "Exemples : manager, décider, organiser un événement." },

  { title: "Travailler en autonomie",
    description: "Être indépendant, gérer ton emploi du temps, avancer seul, prendre des initiatives.",
    examples: "Exemples : travailler en freelance, gérer ton propre rythme, être ton propre patron." },

  { title: "Suivre un cadre structuré",
    description: "Appliquer une méthode, suivre des consignes, évoluer dans un environnement organisé et stable.",
    examples: "Exemples : procédures, hiérarchie, emploi du temps fixe." }
];

// 2️⃣ UNIVERS (21 domaines professionnels)
const universNoms = {
  AGRI: "🌾 Agriculture, Nature & Animaux",
  ARTS: "🎨 Arts, Design & Création",
  COMM: "🎙️ Communication, Médias & Culture",
  BTP:  "🏗️ Construction, BTP & Habitat",
  DROIT:"⚖️ Droit, Administration & Politique",
  EDUC:"🎓 Éducation, Formation & Apprentissage",
  ENV:  "🌍 Environnement, Climat & Énergies",
  FIN:  "💶 Gestion, Finance & Comptabilité",
  HOT:  "🍽️ Hôtellerie, Restauration & Tourisme",
  IND:  "⚙️ Industrie, Fabrication & Production",
  LOG:  "🚚 Logistique, Transport & Mobilité",
  MAN:  "💼 Management, Entrepreneuriat & Stratégie",
  NUM:  "💻 Numérique, Informatique & Data",
  SANT:"⚕️ Santé, Bien-être & Médical",
  SCI: "🔬 Sciences, Recherche & Innovation",
  SEC: "🛡️ Sécurité, Défense & Urgence",
  SOC: "❤️ Social, Aide & Solidarité",
  SPORT:"🏋️ Sport, Loisirs & Vie Active",
  TECH:"🚀 Technologies Émergentes & Futur du Travail",
  IMMO:"🏠 Immobilier & Patrimoine",
  COM: "🛒 Commerce, Marketing & Vente"
};

// 3️⃣ MATRICE PRINCIPALE (0 à 10 — compatibilité par intérêt)
const matricePrincipale = {
  AGRI: [8, 9, 3, 2, 3, 2, 4, 5, 2, 1, 1, 3, 7, 6],
  ARTS: [2, 4, 2, 4, 2, 9, 7, 3, 3, 6, 2, 3, 7, 2],
  COMM: [3, 2, 5, 4, 5, 6, 6, 3, 5, 9, 7, 6, 6, 4],
  BTP:  [7, 9, 3, 4, 3, 2, 4, 2, 2, 1, 2, 6, 7, 5],
  DROIT:[2, 2, 8, 3, 8, 1, 5, 5, 8, 3, 6, 7, 5, 8],
  EDUC:[3, 2, 6, 3, 5, 2, 5, 9, 9, 6, 3, 5, 5, 6],
  ENV:  [6, 5, 7, 8, 5, 4, 6, 5, 5, 3, 3, 4, 7, 5],
  FIN:  [2, 1, 6, 6, 9, 2, 5, 2, 5, 4, 8, 8, 6, 9],
  HOT:  [5, 6, 3, 3, 3, 4, 4, 7, 5, 5, 8, 6, 7, 6],
  IND:  [7, 8, 3, 8, 8, 3, 6, 3, 2, 2, 4, 7, 7, 5],
  LOG:  [6, 7, 3, 4, 5, 2, 4, 3, 2, 3, 5, 8, 8, 5],
  MAN:  [4, 3, 5, 6, 5, 4, 8, 6, 5, 5, 8, 9, 8, 5],
  NUM:  [2, 2, 7,10, 8, 4, 9, 2, 4, 4, 4, 6, 8, 3],
  SANT:[4, 4, 6, 5, 4, 2, 4,10, 9, 3, 2, 4, 5, 7],
  SCI: [3, 3, 9, 9, 8, 4, 7, 4, 5, 3, 2, 5, 6, 5],
  SEC: [8, 7, 4, 6, 5, 2, 5, 5, 3, 4, 4, 8, 7, 8],
  SOC: [3, 2, 5, 3, 3, 2, 4, 9, 9, 4, 4, 5, 5, 6],
  SPORT:[10,9, 3, 3, 2, 3, 5, 6, 3, 4, 5, 5, 8, 4],
  TECH:[3, 3, 7,10, 9, 4, 9, 3, 4, 4, 5, 6, 8, 4],
  IMMO:[3, 4, 4, 3, 8, 2, 5, 3, 3, 5, 7, 8, 7, 8],
  COM: [3, 3, 4, 4, 4, 4, 6, 4, 5, 9,10, 8, 6, 4]
};
