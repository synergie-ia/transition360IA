// ======================================================
// === DONNÉES IA360 - ORIENTATION PROFESSIONNELLE ===
// ======================================================

// === 1️⃣ LES 12 INTÉRÊTS (RIASEC étendu) ===
const interests = [
    { 
        id: 1, 
        icon: "🌿", 
        name: "Activités physiques & nature", 
        verbs: "Bouger, respirer, explorer, agir", 
        phrase: "J'aime être en mouvement, vivre dehors et sentir l'énergie du corps." 
    },
    { 
        id: 2, 
        icon: "🔧", 
        name: "Manuel & technique", 
        verbs: "Fabriquer, réparer, construire, ajuster", 
        phrase: "J'aime créer ou réparer avec mes mains et voir le résultat concret de mon travail." 
    },
    { 
        id: 3, 
        icon: "🔍", 
        name: "Investigation & information", 
        verbs: "Observer, comprendre, apprendre", 
        phrase: "J'aime chercher à comprendre comment les choses fonctionnent et approfondir mes connaissances." 
    },
    { 
        id: 4, 
        icon: "🧪", 
        name: "Sciences & technologies", 
        verbs: "Tester, modéliser, programmer, innover", 
        phrase: "J'aime expérimenter, utiliser des technologies et résoudre des problèmes complexes." 
    },
    { 
        id: 5, 
        icon: "🎨", 
        name: "Arts & expression", 
        verbs: "Imaginer, exprimer, créer, interpréter", 
        phrase: "J'aime créer des œuvres originales et m'exprimer à travers l'art et la créativité." 
    },
    { 
        id: 6, 
        icon: "💡", 
        name: "Idées & conception", 
        verbs: "Concevoir, structurer, inventer, organiser", 
        phrase: "J'aime imaginer de nouveaux concepts et organiser des idées de manière innovante." 
    },
    { 
        id: 7, 
        icon: "🤝", 
        name: "Aide & accompagnement", 
        verbs: "Soutenir, écouter, former, accompagner", 
        phrase: "J'aime aider les autres à progresser et les accompagner dans leurs difficultés." 
    },
    { 
        id: 8, 
        icon: "💬", 
        name: "Relations & sociabilité", 
        verbs: "Communiquer, relier, partager, coopérer", 
        phrase: "J'aime échanger avec les autres, créer du lien et travailler en équipe." 
    },
    { 
        id: 9, 
        icon: "🚀", 
        name: "Action & initiative", 
        verbs: "Agir, entreprendre, dynamiser, décider", 
        phrase: "J'aime prendre des initiatives, lancer des projets et passer à l'action rapidement." 
    },
    { 
        id: 10, 
        icon: "🧭", 
        name: "Leadership & stratégie", 
        verbs: "Motiver, diriger, influencer, décider", 
        phrase: "J'aime guider les autres, prendre des décisions importantes et définir une vision." 
    },
    { 
        id: 11, 
        icon: "📊", 
        name: "Données & chiffres", 
        verbs: "Calculer, comparer, interpréter, vérifier", 
        phrase: "J'aime travailler avec des données chiffrées et analyser des informations précises." 
    },
    { 
        id: 12, 
        icon: "📋", 
        name: "Règles & méthodes", 
        verbs: "Contrôler, sécuriser, appliquer, structurer", 
        phrase: "J'aime suivre des procédures rigoureuses et m'assurer que tout est en ordre." 
    }
];

// === 2️⃣ LES 21 UNIVERS MÉTIERS ===
const univers = [
    "🌾 Agriculture, nature & animaux",
    "🎨 Arts, design & création",
    "🛒 Commerce, marketing & vente",
    "🗞️ Communication, médias & culture",
    "🏗️ Construction, BTP & habitat",
    "⚖️ Droit, administration & politique publique",
    "🎓 Éducation, formation & apprentissage",
    "🌍 Environnement, climat & énergies",
    "💶 Gestion, finance & comptabilité",
    "🍽️ Hôtellerie, restauration & tourisme",
    "⚙️ Industrie, fabrication & production",
    "🚚 Logistique, transport & mobilité",
    "💼 Management, entrepreneuriat & stratégie",
    "💻 Numérique, informatique & data",
    "⚕️ Santé, bien-être & médical",
    "🔬 Sciences, recherche & innovation",
    "🛡️ Sécurité, défense & urgence",
    "❤️ Social, aide & solidarité",
    "🏋️ Sport, loisirs & vie active",
    "🚀 Technologies émergentes & futur du travail",
    "🏠 Immobilier & patrimoine"
];

// === 3️⃣ MATRICE DE COMPATIBILITÉ ===
// Barème : +3 = alignement fort | +1 = cohérence légère | 0 = neutre | -1 = éloigné | -2 = incompatible
// Chaque ligne = UNIVERS, chaque colonne = INTÉRÊT
//
// Ordre des intérêts (colonnes) :
// 🌿 🔧 🔍 🧪 🎨 💡 🤝 💬 🚀 🧭 📊 📋

const matrix = [
    // 🌾 Agriculture, nature & animaux
    [ 3,  3,  1,  0,  0,  0,  1,  0,  1,  1,  0,  0],
    
    // 🎨 Arts, design & création
    [-1,  0,  1,  0,  3,  3,  0,  1,  0,  0, -1,  0],
    
    // 🛒 Commerce, marketing & vente
    [-1,  0,  0,  0,  1,  1, -1,  3,  1,  3,  1,  0],
    
    // 🗞️ Communication, médias & culture
    [-1,  0,  1,  0,  3,  3,  1,  3,  1,  1,  0,  0],
    
    // 🏗️ Construction, BTP & habitat
    [ 1,  3,  0,  0,  0,  1, -1,  0,  1,  0,  0,  3],
    
    // ⚖️ Droit, administration & politique publique
    [-1, -1,  1,  0, -1,  1,  0,  0,  1,  0,  3,  3],
    
    // 🎓 Éducation, formation & apprentissage
    [ 0,  0,  3,  0,  1,  1,  3,  1,  0,  0,  0,  0],
    
    // 🌍 Environnement, climat & énergies
    [ 3,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0],
    
    // 💶 Gestion, finance & comptabilité
    [-1,  0,  1,  0, -1,  1, -1,  0,  1,  1,  3,  3],
    
    // 🍽️ Hôtellerie, restauration & tourisme
    [ 1,  0,  0,  0,  0,  0,  1,  3,  1,  1,  0,  0],
    
    // ⚙️ Industrie, fabrication & production
    [ 1,  3,  1,  3,  0,  0, -1,  0,  0,  0,  0,  1],
    
    // 🚚 Logistique, transport & mobilité
    [ 3,  3,  0,  0, -1,  0, -1,  0,  1,  0,  0,  1],
    
    // 💼 Management, entrepreneuriat & stratégie
    [-1,  0,  1,  1,  0,  1, -1,  1,  3,  3,  1,  0],
    
    // 💻 Numérique, informatique & data
    [-1,  0,  1,  3,  1,  1, -1,  0,  1,  1,  3,  1],
    
    // ⚕️ Santé, bien-être & médical
    [ 1, -1,  3,  0, -1,  0,  3,  1,  0,  0,  0,  0],
    
    // 🔬 Sciences, recherche & innovation
    [ 0,  0,  3,  3,  1,  3, -1,  0,  0,  0,  3,  1],
    
    // 🛡️ Sécurité, défense & urgence
    [ 3,  1, -1,  0, -1,  0, -1,  0,  3,  1,  0,  1],
    
    // ❤️ Social, aide & solidarité
    [-1,  0,  0, -1, -1,  0,  3,  3,  0,  0,  0,  0],
    
    // 🏋️ Sport, loisirs & vie active
    [ 3, -1, -1,  0,  1,  0,  1,  3,  3,  1,  0,  0],
    
    // 🚀 Technologies émergentes & futur du travail
    [ 0,  1,  3,  3,  1,  1,  0,  0,  1,  1,  3,  0],
    
    // 🏠 Immobilier & patrimoine
    [ 0,  0,  0,  0,  0,  1, -1,  0,  3,  3,  1,  3]
];

// === 4️⃣ BARÈME DE RÉFÉRENCE ===
// +3 → 🟩 Alignement fort / univers naturel
// +1 → 🟨 Cohérence légère
//  0 → ⚪ Neutre
// -1 → 🟧 Éloigné
// -2 → 🟥 Incompatible
