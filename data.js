// Les 12 intérêts avec le nouveau questionnaire
const interests = [
    {
        id: 1, 
        icon: '📊',
        title: 'Données & chiffres', 
        description: "Travailler avec des chiffres, analyser des données, créer des tableaux et interpréter des statistiques"
    },
    {
        id: 2,
        icon: '📋',
        title: 'Règles & méthodes', 
        description: "Suivre des procédures précises, appliquer des règles strictes, vérifier la conformité et organiser méthodiquement"
    },
    {
        id: 3,
        icon: '⚡',
        title: 'Action & initiative', 
        description: "Prendre des initiatives, lancer de nouveaux projets, saisir les opportunités et relever des défis"
    },
    {
        id: 4,
        icon: '👑',
        title: 'Leadership & stratégie', 
        description: "Diriger une équipe, prendre des décisions stratégiques, avoir une vision d'ensemble et motiver les autres"
    },
    {
        id: 5,
        icon: '🤝',
        title: 'Aide & accompagnement', 
        description: "Aider les autres, les accompagner dans leurs progrès, les écouter et les soutenir"
    },
    {
        id: 6,
        icon: '👥',
        title: 'Relations & sociabilité', 
        description: "Échanger avec les autres, travailler en équipe, communiquer et créer des liens"
    },
    {
        id: 7,
        icon: '🎨',
        title: 'Arts & expression', 
        description: "Créer des choses artistiques, exprimer votre créativité, jouer avec les formes et les couleurs"
    },
    {
        id: 8,
        icon: '💡',
        title: 'Idées & conception', 
        description: "Imaginer de nouvelles idées, concevoir des solutions innovantes, structurer des projets et inventer"
    },
    {
        id: 9,
        icon: '🏃',
        title: 'Activités physiques & nature', 
        description: "Bouger, faire des activités en extérieur, être actif physiquement et explorer la nature"
    },
    {
        id: 10,
        icon: '🔧',
        title: 'Manuel & technique', 
        description: "Fabriquer ou réparer des objets avec vos mains, utiliser des outils et réaliser des tâches concrètes"
    },
    {
        id: 11,
        icon: '🔍',
        title: 'Investigation & information', 
        description: "Chercher des informations, enquêter, faire des recherches et approfondir vos connaissances"
    },
    {
        id: 12,
        icon: '🧪',
        title: 'Sciences & technologies', 
        description: "Faire des expériences, tester de nouvelles technologies, comprendre comment les choses fonctionnent"
    }
];

// Les 21 univers professionnels avec les matrices ajustées 
// Ordre des poids: [Données, Règles, Action, Leadership, Aide, Relations, Arts, Idées, Activités physiques, Manuel, Investigation, Sciences]
const universes = [
    {
        id: 1,
        icon: '🌾',
        name: 'Agriculture, nature & animaux', 
        weights: [0, 1, 2, 0, 1, 0, 0, 0, 3, 3, 1, 1]
    },
    {
        id: 2,
        icon: '🎨',
        name: 'Arts, design & création', 
        weights: [0, 0, 0, 0, 0, 1, 3, 3, 0, 1, 1, 0]
    },
    {
        id: 3,
        icon: '🛒',
        name: 'Commerce, marketing & vente', 
        weights: [1, 0, 2, 3, 1, 3, 1, 1, 0, 0, 0, 0]
    },
    {
        id: 4,
        icon: '📺',
        name: 'Communication, médias & culture', 
        weights: [0, 0, 1, 2, 1, 3, 3, 3, 0, 0, 1, 0]
    },
    {
        id: 5,
        icon: '🏗️',
        name: 'Construction, BTP & habitat', 
        weights: [1, 3, 2, 0, 0, 0, 0, 1, 2, 3, 0, 1]
    },
    {
        id: 6,
        icon: '⚖️',
        name: 'Droit, administration & politique publique', 
        weights: [3, 3, 1, 2, 1, 1, 0, 2, 0, 0, 2, 1]
    },
    {
        id: 7,
        icon: '📚',
        name: 'Éducation, formation & apprentissage', 
        weights: [0, 0, 0, 0, 2, 3, 1, 1, 0, 0, 3, 1]
    },
    {
        id: 8,
        icon: '🌍',
        name: 'Environnement, climat & énergies', 
        weights: [0, 0, 1, 0, 1, 0, 0, 1, 3, 2, 1, 2]
    },
    {
        id: 9,
        icon: '💼',
        name: 'Gestion, finance & comptabilité', 
        weights: [3, 3, 1, 2, 0, 0, 0, 1, 0, 1, 1, 1]
    },
    {
        id: 10,
        icon: '🏨',
        name: 'Hôtellerie, restauration & tourisme', 
        weights: [0, 0, 2, 1, 2, 3, 0, 1, 2, 0, 0, 0]
    },
    {
        id: 11,
        icon: '🏠',
        name: 'Immobilier & patrimoine', 
        weights: [2, 3, 2, 3, 0, 0, 0, 1, 1, 1, 1, 1]
    },
    {
        id: 12,
        icon: '🏭',
        name: 'Industrie, fabrication & production', 
        weights: [1, 2, 1, 1, 0, 0, 0, 1, 1, 3, 1, 3]
    },
    {
        id: 13,
        icon: '🚚',
        name: 'Logistique, transport & mobilité', 
        weights: [1, 2, 2, 1, 0, 0, 0, 1, 3, 3, 0, 1]
    },
    {
        id: 14,
        icon: '📈',
        name: 'Management, entrepreneuriat & stratégie', 
        weights: [2, 1, 3, 3, 0, 2, 0, 1, 0, 0, 1, 1]
    },
    {
        id: 15,
        icon: '💻',
        name: 'Numérique, informatique & data', 
        weights: [3, 1, 1, 2, 0, 0, 0, 2, 0, 1, 1, 3]
    },
    {
        id: 16,
        icon: '🏥',
        name: 'Santé, bien-être & médical', 
        weights: [1, 0, 0, 0, 3, 2, 0, 0, 1, 1, 3, 1]
    },
    {
        id: 17,
        icon: '🔬',
        name: 'Sciences, recherche & innovation', 
        weights: [2, 1, 0, 0, 0, 0, 1, 3, 0, 0, 3, 3]
    },
    {
        id: 18,
        icon: '🚨',
        name: 'Sécurité, défense & urgence', 
        weights: [0, 2, 3, 2, 0, 0, 0, 1, 3, 2, 1, 1]
    },
    {
        id: 19,
        icon: '❤️',
        name: 'Social, aide & solidarité', 
        weights: [0, 0, 1, 0, 3, 3, 0, 0, 0, 0, 1, 0]
    },
    {
        id: 20,
        icon: '⚽',
        name: 'Sport, loisirs & vie active', 
        weights: [0, 0, 3, 1, 1, 3, 1, 0, 3, 1, 1, 0]
    },
    {
        id: 21,
        icon: '🚀',
        name: 'Technologies émergentes & futur du travail', 
        weights: [3, 1, 2, 2, 0, 0, 1, 2, 1, 1, 2, 3]
    }
];
