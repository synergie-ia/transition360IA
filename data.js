// ===============================
// DONNÉES : 3 BLOCS PRINCIPAUX
// ===============================

const interets = [
  { verbes: ["Bouger", "Agir", "Participer"], phrase: "Tu aimes les environnements actifs où il faut bouger, participer et agir concrètement." },
  { verbes: ["Créer", "Imaginer", "Exprimer"], phrase: "Tu prends plaisir à concevoir, inventer et exprimer des idées ou des émotions." },
  { verbes: ["Observer", "Comprendre", "Analyser"], phrase: "Tu aimes explorer les faits, comprendre comment les choses fonctionnent." },
  { verbes: ["Découvrir", "Expérimenter", "Apprendre"], phrase: "Tu es curieux·se et apprécies les environnements où l’on découvre et apprend sans cesse." },
  { verbes: ["Aider", "Écouter", "Accompagner"], phrase: "Tu te sens bien quand tu peux soutenir, guider ou améliorer la vie des autres." },
  { verbes: ["Organiser", "Structurer", "Ranger"], phrase: "Tu préfères les cadres clairs et apprécies la rigueur et l’ordre." },
  { verbes: ["Convaincre", "Vendre", "Négocier"], phrase: "Tu te sens à l’aise pour influencer, présenter ou défendre une idée." },
  { verbes: ["Décider", "Diriger", "Initier"], phrase: "Tu aimes prendre des décisions, coordonner ou être à l’origine d’un projet." },
  { verbes: ["Réparer", "Assembler", "Fabriquer"], phrase: "Tu aimes manipuler, construire, réparer ou travailler de tes mains." },
  { verbes: ["Écrire", "Communiquer", "Transmettre"], phrase: "Tu aimes partager des idées, informer ou t’exprimer par le langage." },
  { verbes: ["Protéger", "Préserver", "Entretenir"], phrase: "Tu te sens concerné·e par la nature, les autres ou le vivant." },
  { verbes: ["Explorer", "Voyager", "Rencontrer"], phrase: "Tu es attiré·e par les découvertes, les cultures et les nouvelles expériences." }
];

const personnalite = [
  { verbes: ["Curieux", "Ouvert", "Réfléchi"], phrase: "Tu cherches à comprendre avant d’agir, et aimes explorer les idées nouvelles." },
  { verbes: ["Sociable", "Empathique", "Communicatif"], phrase: "Tu t’intéresses sincèrement aux autres et tu sais créer du lien." },
  { verbes: ["Rigoureux", "Méthodique", "Fiable"], phrase: "Tu apprécies les choses bien faites et respectes les règles établies." },
  { verbes: ["Créatif", "Spontané", "Imaginatif"], phrase: "Tu aimes trouver des idées originales et expérimenter de nouvelles voies." },
  { verbes: ["Calme", "Patient", "Posé"], phrase: "Tu sais garder ton sang-froid, même quand les autres s’agitent." },
  { verbes: ["Autonome", "Déterminé", "Persévérant"], phrase: "Tu aimes avancer à ton rythme et mener tes projets jusqu’au bout." },
  { verbes: ["Ambitieux", "Confiant", "Décideur"], phrase: "Tu assumes tes choix et cherches à te dépasser." },
  { verbes: ["Prudent", "Réservé", "Discret"], phrase: "Tu préfères observer avant d’agir et avancer sans te précipiter." },
  { verbes: ["Chaleureux", "Bienveillant", "Attentif"], phrase: "Tu es attentif·ve aux émotions et à l’ambiance autour de toi." },
  { verbes: ["Logique", "Rationnel", "Précis"], phrase: "Tu aimes raisonner avec méthode et trouver des solutions cohérentes." },
  { verbes: ["Flexible", "Adaptable", "Optimiste"], phrase: "Tu t’adaptes facilement aux changements et gardes le sourire." },
  { verbes: ["Visionnaire", "Idéaliste", "Passionné"], phrase: "Tu crois en des projets porteurs de sens et d’avenir." }
];

const valeurs = [
  { verbes: ["Justice", "Équité", "Respect"], phrase: "Tu attaches de l’importance à la justice, au respect et à la dignité humaine." },
  { verbes: ["Liberté", "Autonomie", "Indépendance"], phrase: "Tu veux pouvoir choisir et agir sans contrainte inutile." },
  { verbes: ["Créativité", "Innovation", "Expression"], phrase: "Tu valorises les idées nouvelles et la liberté d’expression." },
  { verbes: ["Sécurité", "Stabilité", "Confiance"], phrase: "Tu préfères les environnements prévisibles et rassurants." },
  { verbes: ["Solidarité", "Partage", "Altruisme"], phrase: "Tu veux contribuer positivement à la vie collective." },
  { verbes: ["Réussite", "Performance", "Reconnaissance"], phrase: "Tu es motivé·e par le succès et la progression." },
  { verbes: ["Respect de la nature", "Écologie", "Durabilité"], phrase: "Tu veux préserver le vivant et réduire ton impact." },
  { verbes: ["Connaissance", "Savoir", "Transmission"], phrase: "Tu attaches de la valeur à l’apprentissage et à la culture." },
  { verbes: ["Beauté", "Esthétique", "Harmonie"], phrase: "Tu recherches la cohérence, le beau et le sens des formes." },
  { verbes: ["Responsabilité", "Engagement", "Fiabilité"], phrase: "Tu assumes ce que tu fais et respectes tes engagements." },
  { verbes: ["Courage", "Audace", "Initiative"], phrase: "Tu n’as pas peur de prendre des risques et d’agir avec conviction." },
  { verbes: ["Humilité", "Simplicité", "Authenticité"], phrase: "Tu restes toi-même et valorises la sincérité dans les relations." }
];
