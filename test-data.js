/* 
  ============================================
  ORIENTATION 360 IA - DONNÉES OPTIMISÉES
  ============================================
  Matrices de corrélation CONTRASTÉES
  Maximum 4 dimensions essentielles par univers
*/

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

/* 
  ============================================
  MATRICES DE CORRÉLATION CONTRASTÉES
  ============================================
  
  Règles strictes :
  - 10 : Dimension ABSOLUMENT ESSENTIELLE (max 2 par univers)
  - 8-9 : Dimension TRÈS IMPORTANTE (max 2 par univers)
  - 6-7 : Dimension IMPORTANTE (max 3 par univers)
  - 4-5 : Dimension UTILE (max 3 par univers)
  - 1-3 : Dimension SECONDAIRE
  - 0 : Dimension NON PERTINENTE
  
  Ordre : MO, PT, AL, SI, CS, EC, CP, IP, MP, AE, AA, RI
*/

const universes = [
  {
    id: 1, // Sciences, recherche & innovation
    weights: [5, 3, 9, 10, 8, 1, 4, 8, 0, 1, 1, 3]
    // Focus : Sciences (10), Analyse (9), Conception (8), Initiative (8)
    // Somme : 53
  },
  {
    id: 2, // Industrie, ingénierie & production
    weights: [7, 10, 7, 8, 5, 0, 6, 4, 1, 5, 1, 2]
    // Focus : Pratique (10), Sciences (8), Analyse (7), Méthode (7)
    // Somme : 56
  },
  {
    id: 3, // Bâtiment, travaux & énergie
    weights: [5, 10, 4, 5, 4, 1, 4, 3, 8, 9, 1, 2]
    // Focus : Pratique (10), Action (9), Mouvement (8)
    // Somme : 56
  },
  {
    id: 4, // Numérique, informatique & data
    weights: [5, 6, 9, 10, 7, 2, 4, 7, 0, 2, 1, 3]
    // Focus : Sciences (10), Analyse (9), Conception (7), Initiative (7)
    // Somme : 56
  },
  {
    id: 5, // Agriculture, alimentation & nature
    weights: [4, 10, 4, 5, 3, 2, 4, 4, 9, 8, 3, 2]
    // Focus : Pratique (10), Mouvement (9), Action (8)
    // Somme : 58
  },
  {
    id: 6, // Logistique, transport & mobilité
    weights: [9, 6, 5, 3, 3, 0, 8, 4, 6, 9, 2, 3]
    // Focus : Méthode (9), Action (9), Coordination (8)
    // Somme : 58
  },
  {
    id: 7, // Commerce, marketing & vente
    weights: [4, 1, 3, 2, 6, 4, 6, 9, 3, 5, 4, 10]
    // Focus : Relation (10), Initiative (9), Conception (6), Coordination (6)
    // Somme : 57
  },
  {
    id: 8, // Management, entrepreneuriat & stratégie
    weights: [6, 1, 6, 4, 9, 2, 10, 10, 1, 3, 3, 9]
    // Focus : Coordination (10), Initiative (10), Conception (9), Relation (9)
    // Somme : 64
  },
  {
    id: 9, // Gestion, finance & comptabilité
    weights: [10, 0, 10, 2, 4, 0, 6, 3, 0, 1, 1, 3]
    // Focus : Méthode (10), Analyse (10), Coordination (6)
    // Somme : 40
  },
  {
    id: 10, // Droit, administration & politique publique
    weights: [9, 0, 10, 2, 8, 1, 5, 4, 0, 2, 3, 6]
    // Focus : Analyse (10), Méthode (9), Conception (8)
    // Somme : 50
  },
  {
    id: 11, // Sécurité, défense & protection
    weights: [5, 5, 4, 2, 2, 0, 7, 4, 8, 10, 6, 5]
    // Focus : Action (10), Mouvement (8), Coordination (7)
    // Somme : 58
  },
  {
    id: 12, // Santé, médical & paramédical
    weights: [6, 6, 8, 9, 4, 1, 5, 4, 3, 5, 10, 4]
    // Focus : Aide (10), Sciences (9), Analyse (8)
    // Somme : 65
  },
  {
    id: 13, // Social, éducation & insertion
    weights: [5, 2, 4, 2, 4, 3, 8, 5, 2, 3, 10, 8]
    // Focus : Aide (10), Coordination (8), Relation (8)
    // Somme : 56
  },
  {
    id: 14, // Communication, médias & culture
    weights: [4, 2, 4, 3, 9, 9, 5, 9, 1, 3, 3, 8]
    // Focus : Expression (9), Conception (9), Initiative (9), Relation (8)
    // Somme : 60
  },
  {
    id: 15, // Arts, spectacle & divertissement
    weights: [3, 3, 2, 2, 10, 10, 4, 9, 2, 2, 3, 5]
    // Focus : Expression (10), Conception (10), Initiative (9)
    // Somme : 55
  },
  {
    id: 16, // Hôtellerie, restauration & tourisme
    weights: [7, 5, 3, 2, 4, 3, 7, 5, 4, 8, 8, 8]
    // Focus : Aide (8), Relation (8), Action (8), Méthode (7), Coordination (7)
    // Somme : 64
  },
  {
    id: 17, // Services à la personne & bien-être
    weights: [5, 5, 3, 3, 3, 2, 4, 4, 4, 7, 10, 7]
    // Focus : Aide (10), Relation (7), Action (7)
    // Somme : 57
  },
  {
    id: 18, // Immobilier & patrimoine
    weights: [7, 5, 5, 3, 6, 2, 6, 8, 2, 4, 3, 9]
    // Focus : Relation (9), Initiative (8), Méthode (7)
    // Somme : 60
  },
  {
    id: 19, // Technologies émergentes & futur du travail
    weights: [3, 2, 7, 10, 9, 3, 5, 10, 1, 2, 1, 5]
    // Focus : Sciences (10), Initiative (10), Conception (9), Analyse (7)
    // Somme : 58
  },
  {
    id: 20, // Environnement, climat & énergies
    weights: [5, 6, 8, 10, 7, 2, 5, 9, 4, 5, 3, 4]
    // Focus : Sciences (10), Initiative (9), Analyse (8), Conception (7)
    // Somme : 68
  },
  {
    id: 21, // Conseil, audit & ressources humaines
    weights: [8, 1, 9, 4, 7, 1, 9, 6, 0, 2, 6, 8]
    // Focus : Analyse (9), Coordination (9), Méthode (8), Relation (8)
    // Somme : 61
  }
];

/* 
  ============================================
  QUESTIONS DU QUESTIONNAIRE
  ============================================
*/

const QUESTIONS = [
  {
    id: "q1",
    title: "Dans une équipe, vous choisissez :",
    options: [
      { text: "Organiser le planning et structurer les tâches", dim: "MO" },
      { text: "Utiliser des outils techniques et équipements", dim: "PT" },
      { text: "Analyser les données et faire des bilans", dim: "AL" },
      { text: "Tester de nouvelles méthodes et expérimenter", dim: "SI" }
    ]
  },
  {
    id: "q2",
    title: "Dans un projet créatif, vous préférez :",
    options: [
      { text: "Concevoir la structure et l'organisation générale", dim: "CS" },
      { text: "Créer les éléments visuels ou artistiques", dim: "EC" },
      { text: "Coordonner l'équipe et répartir les rôles", dim: "CP" },
      { text: "Proposer des idées nouvelles et lancer des pistes", dim: "IP" }
    ]
  },
  {
    id: "q3",
    title: "Au travail, vous préférez :",
    options: [
      { text: "Être en mouvement et travailler dehors", dim: "MP" },
      { text: "Agir rapidement pour régler des situations urgentes", dim: "AE" },
      { text: "Écouter et aider les personnes en difficulté", dim: "AA" },
      { text: "Convaincre et faire changer d'avis", dim: "RI" }
    ]
  },
  {
    id: "q4",
    title: "Pour progresser, vous choisissez d'apprendre à :",
    options: [
      { text: "Mieux planifier et suivre l'avancement des projets", dim: "MO" },
      { text: "Maîtriser de nouvelles techniques manuelles", dim: "PT" },
      { text: "Résoudre des problèmes complexes par l'analyse", dim: "AL" },
      { text: "Comprendre les dernières avancées scientifiques", dim: "SI" }
    ]
  },
  {
    id: "q5",
    title: "Dans un nouveau projet, vous préférez :",
    options: [
      { text: "Définir le concept et l'architecture d'ensemble", dim: "CS" },
      { text: "Créer l'identité visuelle et l'ambiance", dim: "EC" },
      { text: "Superviser l'avancement et gérer les priorités", dim: "CP" },
      { text: "Lancer de nouvelles initiatives sans attendre", dim: "IP" }
    ]
  },
  {
    id: "q6",
    title: "Votre journée idéale inclut :",
    options: [
      { text: "Bouger, vous déplacer et être en extérieur", dim: "MP" },
      { text: "Intervenir sur le terrain avec des résultats directs", dim: "AE" },
      { text: "Accompagner des personnes individuellement", dim: "AA" },
      { text: "Négocier et défendre des positions", dim: "RI" }
    ]
  },
  {
    id: "q7",
    title: "On vous confie une mission, vous choisissez de :",
    options: [
      { text: "Mettre en place des procédures claires", dim: "MO" },
      { text: "Réparer, assembler ou fabriquer quelque chose", dim: "PT" },
      { text: "Examiner la situation et établir un diagnostic", dim: "AL" },
      { text: "Explorer des solutions innovantes", dim: "SI" }
    ]
  },
  {
    id: "q8",
    title: "Dans un projet culturel, vous préférez :",
    options: [
      { text: "Structurer le contenu et le scénario", dim: "CS" },
      { text: "Créer l'univers sonore ou visuel", dim: "EC" },
      { text: "Organiser la production et les équipes", dim: "CP" },
      { text: "Inventer de nouveaux formats d'expression", dim: "IP" }
    ]
  },
  {
    id: "q9",
    title: "Dans une association, vous choisissez de :",
    options: [
      { text: "Partir en mission dans des lieux variés", dim: "MP" },
      { text: "Répondre aux urgences et situations critiques", dim: "AE" },
      { text: "Soutenir et conseiller les bénéficiaires", dim: "AA" },
      { text: "Représenter l'association et mobiliser des partenaires", dim: "RI" }
    ]
  },
  {
    id: "q10",
    title: "Vous souhaitez développer vos compétences en :",
    options: [
      { text: "Organisation et gestion du temps", dim: "MO" },
      { text: "Savoir-faire technique et pratique", dim: "PT" },
      { text: "Raisonnement logique et synthèse", dim: "AL" },
      { text: "Recherche et découverte de nouvelles connaissances", dim: "SI" }
    ]
  },
  {
    id: "q11",
    title: "Dans une équipe créative, vous aimez :",
    options: [
      { text: "Concevoir la stratégie globale", dim: "CS" },
      { text: "Produire les créations artistiques", dim: "EC" },
      { text: "Piloter le projet et coordonner", dim: "CP" },
      { text: "Proposer des approches originales", dim: "IP" }
    ]
  },
  {
    id: "q12",
    title: "Vous êtes attiré(e) par des activités de :",
    options: [
      { text: "Animation sportive en plein air", dim: "MP" },
      { text: "Intervention rapide en situation d'urgence", dim: "AE" },
      { text: "Écoute et médiation avec les personnes", dim: "AA" },
      { text: "Persuasion et influence dans les discussions", dim: "RI" }
    ]
  }
];
