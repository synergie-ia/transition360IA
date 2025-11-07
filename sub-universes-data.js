// Données complètes des 188 sous-univers professionnels
// Ordre des poids: [RM, MT, DC, ST, II, RS, PN, LS, AI, IC, AA, AE]
// RM=Règles&Méthodes | MT=Manuel&Technique | DC=Données&Chiffres | ST=Sciences&Technologies
// II=Investigation&Information | RS=Relations&Sociabilité | PN=Physique&Nature | LS=Leadership&Stratégie
// AI=Action&Initiative | IC=Idées&Conception | AA=Aide&Accompagnement | AE=Arts&Expression

const subUniverses = [
    {
        id: 1,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '🏭',
        name: 'Production industrielle & process standardisés',
        weights: [5, 5, 4, 3, 2, 2, 2, 1, 1, 1, 1, 0]
    },
    {
        id: 2,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '🌿',
        name: 'Circuits courts & agriculture biologique',
        weights: [3, 4, 1, 1, 2, 5, 5, 1, 4, 2, 3, 1]
    },
    {
        id: 3,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '🔬',
        name: 'Agronomie & recherche appliquée',
        weights: [4, 2, 4, 5, 5, 1, 2, 1, 1, 3, 3, 0]
    },
    {
        id: 4,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '🌾',
        name: 'Grandes cultures & agriculture de précision',
        weights: [3, 5, 5, 4, 2, 1, 3, 3, 2, 2, 0, 0]
    },
    {
        id: 5,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '�葡',
        name: 'Viticulture & œnologie',
        weights: [3, 5, 1, 3, 3, 2, 5, 2, 2, 4, 1, 4]
    },
    {
        id: 6,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '🥬',
        name: 'Production végétale intensive (maraîchage, horticulture, pépinière)',
        weights: [3, 5, 1, 2, 3, 3, 5, 1, 2, 1, 3, 1]
    },
    {
        id: 7,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '🌲',
        name: 'Aménagement végétal & forestier',
        weights: [3, 5, 1, 2, 3, 2, 5, 1, 1, 3, 1, 3]
    },
    {
        id: 8,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '🐄',
        name: 'Élevage & productions animales',
        weights: [3, 5, 3, 3, 4, 1, 5, 1, 2, 0, 1, 0]
    },
    {
        id: 9,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '🐟',
        name: 'Aquaculture, pêche & milieux aquatiques',
        weights: [3, 5, 3, 3, 3, 1, 5, 1, 2, 0, 0, 0]
    },
    {
        id: 10,
        universeId: 1,
        universeName: '1. Agriculture, Nature & Animaux',
        icon: '🐝',
        name: 'Apiculture & pollinisateurs',
        weights: [3, 5, 1, 3, 5, 1, 3, 1, 3, 2, 2, 1]
    },
    {
        id: 11,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '🎭',
        name: 'Arts plastiques & scénographie artistique',
        weights: [0, 3, 0, 0, 3, 2, 2, 1, 1, 5, 1, 5]
    },
    {
        id: 12,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '✏️',
        name: 'Design graphique & illustration',
        weights: [2, 4, 1, 3, 2, 3, 0, 1, 2, 5, 1, 5]
    },
    {
        id: 13,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '📐',
        name: 'Design produit & industriel',
        weights: [3, 5, 2, 4, 3, 2, 0, 1, 2, 5, 0, 4]
    },
    {
        id: 14,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '🏠',
        name: 'Architecture intérieure & décoration',
        weights: [2, 3, 1, 2, 3, 4, 1, 1, 2, 5, 3, 5]
    },
    {
        id: 15,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '📷',
        name: 'Photographie, cinéma & audiovisuel',
        weights: [2, 5, 1, 4, 3, 3, 2, 1, 3, 4, 0, 5]
    },
    {
        id: 16,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '👗',
        name: 'Mode, stylisme & textile',
        weights: [2, 4, 2, 2, 4, 3, 1, 2, 3, 5, 1, 5]
    },
    {
        id: 17,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '💎',
        name: 'Artisanat d\'art & métiers du luxe',
        weights: [4, 5, 1, 2, 3, 1, 1, 1, 2, 3, 2, 5]
    },
    {
        id: 18,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '🎬',
        name: 'Scénographie, spectacle & régie technique',
        weights: [3, 5, 1, 3, 2, 3, 2, 2, 4, 4, 2, 5]
    },
    {
        id: 19,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '🏛️',
        name: 'Patrimoine, muséographie & restauration',
        weights: [4, 5, 2, 4, 5, 2, 1, 2, 1, 2, 3, 3]
    },
    {
        id: 20,
        universeId: 2,
        universeName: '2. Arts, Design & Création',
        icon: '💻',
        name: 'Design numérique & création interactive',
        weights: [2, 4, 3, 5, 4, 3, 0, 1, 2, 5, 1, 4]
    },
    {
        id: 21,
        universeId: 3,
        universeName: '3. Commerce, Marketing & Vente',
        icon: '🛍️',
        name: 'Commerce de détail & e-commerce',
        weights: [2, 4, 2, 2, 1, 5, 0, 1, 3, 0, 3, 0]
    },
    {
        id: 22,
        universeId: 3,
        universeName: '3. Commerce, Marketing & Vente',
        icon: '🤝',
        name: 'Vente B2B & négociation',
        weights: [0, 0, 2, 1, 4, 5, 0, 3, 5, 2, 3, 0]
    },
    {
        id: 23,
        universeId: 3,
        universeName: '3. Commerce, Marketing & Vente',
        icon: '📣',
        name: 'Marketing & communication commerciale',
        weights: [0, 0, 3, 3, 5, 4, 0, 2, 2, 5, 0, 3]
    },
    {
        id: 24,
        universeId: 3,
        universeName: '3. Commerce, Marketing & Vente',
        icon: '🏪',
        name: 'Merchandising & point de vente',
        weights: [2, 5, 3, 0, 0, 3, 0, 3, 2, 0, 0, 4]
    },
    {
        id: 25,
        universeId: 3,
        universeName: '3. Commerce, Marketing & Vente',
        icon: '📦',
        name: 'Achats & approvisionnement',
        weights: [3, 0, 5, 0, 5, 4, 0, 2, 3, 0, 0, 0]
    },
    {
        id: 26,
        universeId: 3,
        universeName: '3. Commerce, Marketing & Vente',
        icon: '🏢',
        name: 'Immobilier commercial',
        weights: [0, 0, 3, 0, 4, 5, 0, 2, 4, 0, 2, 0]
    },
    {
        id: 27,
        universeId: 3,
        universeName: '3. Commerce, Marketing & Vente',
        icon: '🏦',
        name: 'Banque & assurance commerciale',
        weights: [4, 0, 5, 0, 3, 5, 0, 0, 2, 0, 3, 0]
    },
    {
        id: 28,
        universeId: 3,
        universeName: '3. Commerce, Marketing & Vente',
        icon: '☎️',
        name: 'Service client & relation après-vente',
        weights: [2, 3, 0, 0, 2, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 29,
        universeId: 3,
        universeName: '3. Commerce, Marketing & Vente',
        icon: '💍',
        name: 'Commerce de luxe',
        weights: [0, 0, 0, 0, 3, 5, 0, 0, 2, 0, 4, 4]
    },
    {
        id: 30,
        universeId: 4,
        universeName: '4. Communication, Médias & Culture',
        icon: '📰',
        name: 'Journalisme & médias',
        weights: [2, 2, 0, 3, 5, 5, 0, 0, 4, 0, 0, 3]
    },
    {
        id: 31,
        universeId: 4,
        universeName: '4. Communication, Médias & Culture',
        icon: '🎤',
        name: 'Relations publiques & événementiel',
        weights: [0, 2, 0, 0, 3, 5, 0, 3, 5, 4, 0, 0]
    },
    {
        id: 32,
        universeId: 4,
        universeName: '4. Communication, Médias & Culture',
        icon: '📢',
        name: 'Communication d\'entreprise & institutionnelle',
        weights: [3, 0, 0, 0, 3, 5, 0, 3, 0, 4, 0, 4]
    },
    {
        id: 33,
        universeId: 4,
        universeName: '4. Communication, Médias & Culture',
        icon: '📚',
        name: 'Édition & création de contenus',
        weights: [2, 3, 0, 0, 5, 0, 0, 0, 0, 4, 0, 5]
    },
    {
        id: 34,
        universeId: 4,
        universeName: '4. Communication, Médias & Culture',
        icon: '📺',
        name: 'Publicité & stratégie de marque',
        weights: [0, 0, 0, 2, 3, 4, 0, 0, 0, 5, 0, 5]
    },
    {
        id: 35,
        universeId: 4,
        universeName: '4. Communication, Médias & Culture',
        icon: '🌐',
        name: 'Traduction & interprétation',
        weights: [3, 5, 0, 0, 4, 3, 0, 0, 0, 0, 2, 0]
    },
    {
        id: 36,
        universeId: 4,
        universeName: '4. Communication, Médias & Culture',
        icon: '🎨',
        name: 'Médiation culturelle',
        weights: [0, 0, 0, 0, 4, 5, 0, 0, 0, 2, 5, 3]
    },
    {
        id: 37,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '📐',
        name: 'Architecture & conception',
        weights: [0, 4, 0, 4, 3, 3, 0, 0, 0, 5, 0, 5]
    },
    {
        id: 38,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '🧱',
        name: 'Gros œuvre & maçonnerie',
        weights: [3, 5, 0, 2, 0, 0, 5, 2, 0, 0, 0, 0]
    },
    {
        id: 39,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '🎨',
        name: 'Second œuvre & finitions',
        weights: [2, 5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 3]
    },
    {
        id: 40,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '🪚',
        name: 'Menuiserie & charpente',
        weights: [0, 5, 0, 2, 0, 0, 4, 0, 0, 0, 0, 3]
    },
    {
        id: 41,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '⚡',
        name: 'Équipements techniques du bâtiment',
        weights: [4, 5, 0, 5, 3, 0, 3, 0, 0, 0, 0, 0]
    },
    {
        id: 42,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '🚧',
        name: 'Travaux publics & génie civil',
        weights: [3, 5, 0, 4, 0, 0, 5, 3, 0, 0, 0, 0]
    },
    {
        id: 43,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '♻️',
        name: 'Rénovation énergétique',
        weights: [3, 5, 0, 5, 4, 0, 0, 0, 0, 0, 2, 0]
    },
    {
        id: 44,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '📏',
        name: 'Études techniques & dessin',
        weights: [3, 5, 4, 5, 3, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 45,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '👷',
        name: 'Coordination de chantier',
        weights: [4, 3, 0, 0, 0, 5, 0, 5, 3, 0, 0, 0]
    },
    {
        id: 46,
        universeId: 5,
        universeName: '5. Construction, BTP & Habitat',
        icon: '🏙️',
        name: 'Gestion immobilière & aménagement urbain',
        weights: [4, 0, 5, 0, 3, 4, 0, 3, 0, 0, 0, 0]
    },
    {
        id: 47,
        universeId: 6,
        universeName: '6. Droit, Administration & Politique',
        icon: '⚖️',
        name: 'Droit privé & judiciaire',
        weights: [5, 0, 0, 0, 5, 4, 0, 2, 0, 0, 3, 0]
    },
    {
        id: 48,
        universeId: 6,
        universeName: '6. Droit, Administration & Politique',
        icon: '💼',
        name: 'Droit des affaires & fiscalité',
        weights: [5, 0, 5, 0, 4, 3, 0, 3, 0, 0, 0, 0]
    },
    {
        id: 49,
        universeId: 6,
        universeName: '6. Droit, Administration & Politique',
        icon: '👥',
        name: 'Droit social & du travail',
        weights: [5, 0, 0, 0, 3, 5, 0, 0, 0, 0, 4, 0]
    },
    {
        id: 50,
        universeId: 6,
        universeName: '6. Droit, Administration & Politique',
        icon: '🏛️',
        name: 'Droit public & institutions',
        weights: [5, 0, 0, 0, 5, 3, 0, 3, 0, 0, 0, 0]
    },
    {
        id: 51,
        universeId: 6,
        universeName: '6. Droit, Administration & Politique',
        icon: '🏢',
        name: 'Administration publique',
        weights: [5, 0, 4, 0, 2, 3, 0, 3, 0, 0, 0, 0]
    },
    {
        id: 52,
        universeId: 6,
        universeName: '6. Droit, Administration & Politique',
        icon: '🤝',
        name: 'Ressources humaines & médiation',
        weights: [4, 0, 0, 0, 0, 5, 0, 3, 0, 0, 5, 0]
    },
    {
        id: 53,
        universeId: 6,
        universeName: '6. Droit, Administration & Politique',
        icon: '🏛️',
        name: 'Gouvernance territoriale & marchés publics',
        weights: [5, 0, 4, 0, 3, 3, 0, 5, 0, 0, 0, 0]
    },
    {
        id: 54,
        universeId: 6,
        universeName: '6. Droit, Administration & Politique',
        icon: '📋',
        name: 'Conformité & intelligence juridique',
        weights: [5, 0, 3, 3, 5, 3, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 55,
        universeId: 7,
        universeName: '7. Éducation, Formation & Apprentissage',
        icon: '🎓',
        name: 'Enseignement primaire & secondaire',
        weights: [4, 0, 0, 0, 3, 5, 0, 2, 0, 0, 5, 0]
    },
    {
        id: 56,
        universeId: 7,
        universeName: '7. Éducation, Formation & Apprentissage',
        icon: '🏫',
        name: 'Enseignement supérieur',
        weights: [3, 0, 0, 0, 5, 3, 0, 3, 0, 0, 5, 0]
    },
    {
        id: 57,
        universeId: 7,
        universeName: '7. Éducation, Formation & Apprentissage',
        icon: '💼',
        name: 'Formation professionnelle',
        weights: [0, 4, 0, 0, 2, 4, 0, 0, 3, 0, 5, 0]
    },
    {
        id: 58,
        universeId: 7,
        universeName: '7. Éducation, Formation & Apprentissage',
        icon: '🧭',
        name: 'Orientation & coaching',
        weights: [0, 0, 0, 0, 4, 5, 0, 0, 2, 0, 5, 0]
    },
    {
        id: 59,
        universeId: 7,
        universeName: '7. Éducation, Formation & Apprentissage',
        icon: '📚',
        name: 'Ingénierie pédagogique',
        weights: [0, 0, 0, 5, 4, 0, 0, 0, 0, 5, 3, 0]
    },
    {
        id: 60,
        universeId: 7,
        universeName: '7. Éducation, Formation & Apprentissage',
        icon: '♿',
        name: 'Éducation spécialisée',
        weights: [3, 0, 0, 0, 3, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 61,
        universeId: 7,
        universeName: '7. Éducation, Formation & Apprentissage',
        icon: '🔬',
        name: 'Recherche en éducation',
        weights: [3, 0, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 62,
        universeId: 7,
        universeName: '7. Éducation, Formation & Apprentissage',
        icon: '🎪',
        name: 'Animation socioculturelle',
        weights: [0, 0, 0, 0, 0, 5, 0, 0, 5, 3, 4, 0]
    },
    {
        id: 63,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '♻️',
        name: 'Gestion des déchets & économie circulaire',
        weights: [4, 5, 0, 5, 3, 0, 0, 0, 0, 3, 0, 0]
    },
    {
        id: 64,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '💧',
        name: 'Traitement de l\'eau',
        weights: [4, 5, 0, 5, 3, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 65,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '☀️',
        name: 'Énergies renouvelables',
        weights: [3, 5, 0, 5, 4, 0, 0, 0, 0, 3, 0, 0]
    },
    {
        id: 66,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '⚛️',
        name: 'Énergie nucléaire',
        weights: [5, 4, 0, 5, 3, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 67,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '🌡️',
        name: 'Efficacité énergétique & génie climatique',
        weights: [3, 5, 4, 5, 4, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 68,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '📊',
        name: 'Bilan carbone & comptabilité environnementale',
        weights: [3, 0, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 69,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '🔧',
        name: 'Ingénierie environnementale',
        weights: [3, 4, 0, 5, 5, 0, 0, 0, 0, 4, 0, 0]
    },
    {
        id: 70,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '🦋',
        name: 'Biodiversité & conservation',
        weights: [0, 3, 0, 5, 5, 0, 4, 0, 0, 0, 0, 0]
    },
    {
        id: 71,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '🚲',
        name: 'Mobilité durable',
        weights: [3, 0, 0, 5, 4, 0, 0, 0, 0, 4, 0, 0]
    },
    {
        id: 72,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '🌱',
        name: 'Agriculture régénératrice',
        weights: [0, 5, 0, 5, 4, 0, 4, 0, 0, 0, 0, 0]
    },
    {
        id: 73,
        universeId: 8,
        universeName: '8. Environnement, Climat & Énergies',
        icon: '⚠️',
        name: 'Gestion des risques naturels',
        weights: [3, 0, 0, 5, 5, 0, 0, 4, 0, 0, 0, 0]
    },
    {
        id: 74,
        universeId: 9,
        universeName: '9. Gestion, Finance & Comptabilité',
        icon: '🧮',
        name: 'Comptabilité & fiscalité',
        weights: [5, 0, 5, 2, 3, 2, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 75,
        universeId: 9,
        universeName: '9. Gestion, Finance & Comptabilité',
        icon: '🔍',
        name: 'Audit & contrôle de gestion',
        weights: [4, 0, 5, 0, 5, 3, 0, 3, 0, 0, 0, 0]
    },
    {
        id: 76,
        universeId: 9,
        universeName: '9. Gestion, Finance & Comptabilité',
        icon: '💰',
        name: 'Trésorerie & financement',
        weights: [3, 0, 5, 0, 3, 5, 0, 0, 4, 0, 0, 0]
    },
    {
        id: 77,
        universeId: 9,
        universeName: '9. Gestion, Finance & Comptabilité',
        icon: '🏦',
        name: 'Banque & assurance',
        weights: [4, 0, 5, 0, 3, 5, 0, 0, 0, 0, 2, 0]
    },
    {
        id: 78,
        universeId: 9,
        universeName: '9. Gestion, Finance & Comptabilité',
        icon: '💎',
        name: 'Gestion de patrimoine',
        weights: [0, 0, 5, 0, 4, 5, 0, 0, 0, 0, 4, 0]
    },
    {
        id: 79,
        universeId: 9,
        universeName: '9. Gestion, Finance & Comptabilité',
        icon: '🌱',
        name: 'Finance durable & projets financiers',
        weights: [3, 0, 5, 0, 5, 0, 0, 4, 0, 3, 0, 0]
    },
    {
        id: 80,
        universeId: 9,
        universeName: '9. Gestion, Finance & Comptabilité',
        icon: '💳',
        name: 'Fintech & services numériques',
        weights: [0, 0, 5, 5, 3, 0, 0, 0, 0, 4, 0, 0]
    },
    {
        id: 81,
        universeId: 9,
        universeName: '9. Gestion, Finance & Comptabilité',
        icon: '📊',
        name: 'Gestion budgétaire & conformité',
        weights: [5, 0, 5, 0, 3, 0, 0, 4, 0, 0, 0, 0]
    },
    {
        id: 82,
        universeId: 10,
        universeName: '10. Hôtellerie, Restauration & Tourisme',
        icon: '👨‍🍳',
        name: 'Cuisine & gastronomie',
        weights: [3, 5, 0, 0, 0, 0, 3, 0, 0, 4, 0, 5]
    },
    {
        id: 83,
        universeId: 10,
        universeName: '10. Hôtellerie, Restauration & Tourisme',
        icon: '🍽️',
        name: 'Restauration collective',
        weights: [5, 5, 4, 0, 0, 0, 0, 3, 0, 0, 0, 0]
    },
    {
        id: 84,
        universeId: 10,
        universeName: '10. Hôtellerie, Restauration & Tourisme',
        icon: '🍷',
        name: 'Service & sommellerie',
        weights: [0, 5, 0, 0, 3, 5, 0, 0, 0, 0, 4, 0]
    },
    {
        id: 85,
        universeId: 10,
        universeName: '10. Hôtellerie, Restauration & Tourisme',
        icon: '🏨',
        name: 'Hôtellerie & hébergement',
        weights: [3, 3, 0, 0, 0, 5, 0, 2, 0, 0, 5, 0]
    },
    {
        id: 86,
        universeId: 10,
        universeName: '10. Hôtellerie, Restauration & Tourisme',
        icon: '🗺️',
        name: 'Tourisme & guidage',
        weights: [0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 4, 3]
    },
    {
        id: 87,
        universeId: 10,
        universeName: '10. Hôtellerie, Restauration & Tourisme',
        icon: '🎪',
        name: 'Événementiel & congrès',
        weights: [0, 0, 0, 0, 0, 5, 0, 4, 5, 3, 0, 0]
    },
    {
        id: 88,
        universeId: 10,
        universeName: '10. Hôtellerie, Restauration & Tourisme',
        icon: '🔑',
        name: 'Management hôtelier',
        weights: [3, 0, 4, 0, 0, 5, 0, 5, 0, 0, 0, 0]
    },
    {
        id: 89,
        universeId: 10,
        universeName: '10. Hôtellerie, Restauration & Tourisme',
        icon: '🌿',
        name: 'Tourisme durable',
        weights: [0, 0, 0, 0, 5, 4, 0, 0, 0, 4, 3, 0]
    },
    {
        id: 90,
        universeId: 11,
        universeName: '11. Immobilier & Patrimoine',
        icon: '🏘️',
        name: 'Transaction immobilière',
        weights: [0, 0, 3, 0, 4, 5, 0, 0, 5, 0, 3, 0]
    },
    {
        id: 91,
        universeId: 11,
        universeName: '11. Immobilier & Patrimoine',
        icon: '🏗️',
        name: 'Promotion & développement',
        weights: [0, 0, 4, 0, 3, 4, 0, 5, 5, 0, 0, 0]
    },
    {
        id: 92,
        universeId: 11,
        universeName: '11. Immobilier & Patrimoine',
        icon: '🔑',
        name: 'Gestion locative & syndic',
        weights: [5, 0, 4, 0, 0, 5, 0, 0, 0, 0, 3, 0]
    },
    {
        id: 93,
        universeId: 11,
        universeName: '11. Immobilier & Patrimoine',
        icon: '📐',
        name: 'Expertise & évaluation',
        weights: [0, 4, 5, 3, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 94,
        universeId: 11,
        universeName: '11. Immobilier & Patrimoine',
        icon: '💰',
        name: 'Investissement & conseil patrimonial',
        weights: [0, 0, 5, 0, 4, 5, 0, 0, 0, 0, 4, 0]
    },
    {
        id: 95,
        universeId: 11,
        universeName: '11. Immobilier & Patrimoine',
        icon: '🗺️',
        name: 'Aménagement foncier & urbanisme',
        weights: [4, 0, 0, 0, 5, 0, 0, 3, 0, 5, 0, 0]
    },
    {
        id: 96,
        universeId: 11,
        universeName: '11. Immobilier & Patrimoine',
        icon: '🏘️',
        name: 'Immobilier social',
        weights: [4, 0, 3, 0, 0, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 97,
        universeId: 11,
        universeName: '11. Immobilier & Patrimoine',
        icon: '🔧',
        name: 'Facility management',
        weights: [0, 5, 4, 0, 0, 3, 0, 5, 0, 0, 0, 0]
    },
    {
        id: 98,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '⚙️',
        name: 'Production industrielle',
        weights: [5, 5, 3, 3, 0, 0, 0, 2, 0, 0, 0, 0]
    },
    {
        id: 99,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '🔧',
        name: 'Maintenance & SAV',
        weights: [2, 5, 0, 4, 5, 3, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 100,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '⚙️',
        name: 'Mécanique & usinage',
        weights: [4, 5, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 101,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '🤖',
        name: 'Électrotechnique, automatisme & robotique',
        weights: [4, 5, 0, 5, 3, 0, 0, 0, 0, 3, 0, 0]
    },
    {
        id: 102,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '⚗️',
        name: 'Chimie & matériaux',
        weights: [4, 4, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 103,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '✈️',
        name: 'Aéronautique & spatial',
        weights: [5, 5, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 104,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '🔨',
        name: 'Métallurgie & sidérurgie',
        weights: [3, 5, 0, 5, 0, 0, 4, 0, 0, 0, 0, 0]
    },
    {
        id: 105,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '💊',
        name: 'Industrie pharmaceutique',
        weights: [5, 3, 0, 5, 4, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 106,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '✅',
        name: 'Qualité, sécurité & supply chain',
        weights: [5, 0, 4, 0, 5, 0, 0, 3, 0, 0, 0, 0]
    },
    {
        id: 107,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '🖨️',
        name: 'Fabrication additive & innovation',
        weights: [0, 5, 0, 5, 3, 0, 0, 0, 0, 4, 0, 0]
    },
    {
        id: 108,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '🧵',
        name: 'Industrie textile',
        weights: [3, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 2]
    },
    {
        id: 109,
        universeId: 12,
        universeName: '12. Industrie, Fabrication & Production',
        icon: '⚡',
        name: 'Micro-électronique & industries extractives',
        weights: [4, 5, 0, 5, 0, 0, 3, 0, 0, 0, 0, 0]
    },
    {
        id: 110,
        universeId: 13,
        universeName: '13. Logistique, Transport & Mobilité',
        icon: '📦',
        name: 'Logistique & entreposage',
        weights: [4, 5, 5, 0, 0, 0, 3, 2, 0, 0, 0, 0]
    },
    {
        id: 111,
        universeId: 13,
        universeName: '13. Logistique, Transport & Mobilité',
        icon: '🔗',
        name: 'Supply chain management',
        weights: [0, 0, 5, 3, 4, 3, 0, 5, 0, 0, 0, 0]
    },
    {
        id: 112,
        universeId: 13,
        universeName: '13. Logistique, Transport & Mobilité',
        icon: '🌍',
        name: 'Douanes & commerce international',
        weights: [5, 0, 4, 0, 5, 3, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 113,
        universeId: 13,
        universeName: '13. Logistique, Transport & Mobilité',
        icon: '🚚',
        name: 'Transport routier & livraison',
        weights: [4, 5, 0, 0, 0, 2, 5, 0, 0, 0, 0, 0]
    },
    {
        id: 114,
        universeId: 13,
        universeName: '13. Logistique, Transport & Mobilité',
        icon: '🚂',
        name: 'Transport ferroviaire & aérien',
        weights: [5, 5, 0, 4, 0, 3, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 115,
        universeId: 13,
        universeName: '13. Logistique, Transport & Mobilité',
        icon: '⚓',
        name: 'Transport maritime & activités portuaires',
        weights: [5, 5, 0, 4, 0, 0, 3, 0, 0, 0, 0, 0]
    },
    {
        id: 116,
        universeId: 13,
        universeName: '13. Logistique, Transport & Mobilité',
        icon: '🚌',
        name: 'Mobilité urbaine & transports publics',
        weights: [4, 4, 0, 0, 0, 5, 0, 0, 0, 0, 3, 0]
    },
    {
        id: 117,
        universeId: 13,
        universeName: '13. Logistique, Transport & Mobilité',
        icon: '🚗',
        name: 'Gestion de flotte & maintenance',
        weights: [0, 5, 5, 3, 0, 0, 0, 4, 0, 0, 0, 0]
    },
    {
        id: 118,
        universeId: 13,
        universeName: '13. Logistique, Transport & Mobilité',
        icon: '🚁',
        name: 'Logistique urbaine & mobilité autonome',
        weights: [0, 4, 4, 5, 0, 0, 0, 0, 0, 4, 0, 0]
    },
    {
        id: 119,
        universeId: 14,
        universeName: '14. Management, Entrepreneuriat & Stratégie',
        icon: '🚀',
        name: 'Création d\'entreprise & start-up',
        weights: [0, 0, 3, 0, 0, 4, 0, 5, 5, 5, 0, 0]
    },
    {
        id: 120,
        universeId: 14,
        universeName: '14. Management, Entrepreneuriat & Stratégie',
        icon: '📋',
        name: 'Gestion de projets',
        weights: [4, 0, 4, 0, 0, 5, 0, 5, 3, 0, 0, 0]
    },
    {
        id: 121,
        universeId: 14,
        universeName: '14. Management, Entrepreneuriat & Stratégie',
        icon: '💡',
        name: 'Innovation & transformation digitale',
        weights: [0, 0, 0, 5, 4, 0, 0, 4, 3, 5, 0, 0]
    },
    {
        id: 122,
        universeId: 14,
        universeName: '14. Management, Entrepreneuriat & Stratégie',
        icon: '👥',
        name: 'Management d\'équipe',
        weights: [0, 0, 0, 0, 0, 5, 0, 5, 3, 0, 4, 0]
    },
    {
        id: 123,
        universeId: 14,
        universeName: '14. Management, Entrepreneuriat & Stratégie',
        icon: '🌱',
        name: 'RSE & développement durable',
        weights: [3, 0, 0, 0, 5, 4, 0, 4, 0, 4, 0, 0]
    },
    {
        id: 124,
        universeId: 14,
        universeName: '14. Management, Entrepreneuriat & Stratégie',
        icon: '📊',
        name: 'Stratégie d\'entreprise',
        weights: [0, 0, 5, 0, 5, 0, 0, 5, 0, 4, 0, 0]
    },
    {
        id: 125,
        universeId: 14,
        universeName: '14. Management, Entrepreneuriat & Stratégie',
        icon: '🌍',
        name: 'Management interculturel & conseil',
        weights: [0, 0, 0, 0, 4, 5, 0, 4, 0, 0, 5, 0]
    },
    {
        id: 126,
        universeId: 14,
        universeName: '14. Management, Entrepreneuriat & Stratégie',
        icon: '⚖️',
        name: 'Gouvernance & leadership éthique',
        weights: [5, 0, 0, 0, 3, 4, 0, 5, 0, 0, 0, 0]
    },
    {
        id: 127,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '📱',
        name: 'Développement web & mobile',
        weights: [0, 5, 0, 5, 3, 0, 0, 0, 2, 4, 0, 0]
    },
    {
        id: 128,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '☁️',
        name: 'DevOps & cloud computing',
        weights: [4, 5, 0, 5, 3, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 129,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '🔒',
        name: 'Cybersécurité',
        weights: [4, 4, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 130,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '🖧',
        name: 'Réseaux & systèmes',
        weights: [4, 5, 0, 5, 3, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 131,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '🤖',
        name: 'IA, machine learning & data science',
        weights: [0, 0, 5, 5, 5, 0, 0, 0, 0, 4, 0, 0]
    },
    {
        id: 132,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '🎨',
        name: 'UX/UI design & design numérique',
        weights: [0, 0, 0, 4, 4, 0, 0, 0, 0, 5, 0, 5]
    },
    {
        id: 133,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '🥽',
        name: 'Réalité augmentée & métavers',
        weights: [0, 3, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4]
    },
    {
        id: 134,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '📡',
        name: 'Informatique industrielle & IoT',
        weights: [3, 5, 0, 5, 4, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 135,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '⚙️',
        name: 'No-code, automation & logiciels métiers',
        weights: [0, 0, 0, 5, 3, 3, 0, 0, 0, 4, 0, 0]
    },
    {
        id: 136,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '🔗',
        name: 'Blockchain & web3',
        weights: [0, 0, 3, 5, 4, 0, 0, 0, 0, 4, 0, 0]
    },
    {
        id: 137,
        universeId: 15,
        universeName: '15. Numérique, Informatique & Data',
        icon: '🎮',
        name: 'Gaming & e-sport',
        weights: [0, 0, 0, 5, 0, 0, 0, 0, 3, 4, 0, 5]
    },
    {
        id: 138,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '👨‍⚕️',
        name: 'Médecine générale',
        weights: [3, 0, 0, 4, 5, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 139,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '🏥',
        name: 'Chirurgie & spécialités hospitalières',
        weights: [4, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 140,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '📡',
        name: 'Radiologie & imagerie',
        weights: [3, 4, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 141,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '🔬',
        name: 'Biologie & analyses médicales',
        weights: [4, 4, 3, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 142,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '💊',
        name: 'Pharmacie & biotechnologies',
        weights: [5, 0, 0, 5, 4, 3, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 143,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '👩‍⚕️',
        name: 'Infirmier & soins paramédicaux',
        weights: [4, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 144,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '🏃',
        name: 'Rééducation & kinésithérapie',
        weights: [0, 5, 0, 3, 0, 4, 2, 0, 0, 0, 5, 0]
    },
    {
        id: 145,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '🧠',
        name: 'Santé mentale & psychologie',
        weights: [3, 0, 0, 0, 5, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 146,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '🥗',
        name: 'Nutrition, diététique & médecine du sport',
        weights: [0, 0, 0, 5, 4, 4, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 147,
        universeId: 16,
        universeName: '16. Santé, Bien-être & Médical',
        icon: '📱',
        name: 'Santé publique, prévention & télésanté',
        weights: [0, 0, 3, 5, 5, 4, 0, 0, 0, 0, 4, 0]
    },
    {
        id: 148,
        universeId: 17,
        universeName: '17. Sciences, Recherche & Innovation',
        icon: '🔭',
        name: 'Physique & astrophysique',
        weights: [0, 3, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 149,
        universeId: 17,
        universeName: '17. Sciences, Recherche & Innovation',
        icon: '📐',
        name: 'Mathématiques & statistiques',
        weights: [0, 0, 5, 5, 5, 0, 0, 0, 0, 3, 0, 0]
    },
    {
        id: 150,
        universeId: 17,
        universeName: '17. Sciences, Recherche & Innovation',
        icon: '⚗️',
        name: 'Chimie & matériaux',
        weights: [4, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 151,
        universeId: 17,
        universeName: '17. Sciences, Recherche & Innovation',
        icon: '🧬',
        name: 'Biotechnologies',
        weights: [4, 4, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 152,
        universeId: 17,
        universeName: '17. Sciences, Recherche & Innovation',
        icon: '🌍',
        name: 'Géosciences & climatologie',
        weights: [0, 0, 4, 5, 5, 0, 4, 0, 0, 0, 0, 0]
    },
    {
        id: 153,
        universeId: 17,
        universeName: '17. Sciences, Recherche & Innovation',
        icon: '🧠',
        name: 'Neurosciences & cognition',
        weights: [0, 3, 4, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 154,
        universeId: 17,
        universeName: '17. Sciences, Recherche & Innovation',
        icon: '📚',
        name: 'Sciences humaines & sociales',
        weights: [0, 0, 4, 0, 5, 4, 0, 0, 0, 0, 0, 2]
    },
    {
        id: 155,
        universeId: 17,
        universeName: '17. Sciences, Recherche & Innovation',
        icon: '🔬',
        name: 'Recherche appliquée & R&D entreprise',
        weights: [0, 0, 0, 5, 5, 0, 0, 0, 3, 5, 0, 0]
    },
    {
        id: 156,
        universeId: 17,
        universeName: '17. Sciences, Recherche & Innovation',
        icon: '💼',
        name: 'Consulting scientifique',
        weights: [0, 0, 4, 5, 5, 4, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 157,
        universeId: 18,
        universeName: '18. Sécurité, Défense & Urgence',
        icon: '👮',
        name: 'Police & gendarmerie',
        weights: [5, 0, 0, 0, 4, 3, 5, 0, 3, 0, 0, 0]
    },
    {
        id: 158,
        universeId: 18,
        universeName: '18. Sécurité, Défense & Urgence',
        icon: '🚒',
        name: 'Pompiers & secours',
        weights: [3, 5, 0, 0, 0, 0, 5, 0, 5, 0, 4, 0]
    },
    {
        id: 159,
        universeId: 18,
        universeName: '18. Sécurité, Défense & Urgence',
        icon: '👁️',
        name: 'Sécurité privée & surveillance',
        weights: [5, 3, 0, 0, 0, 3, 5, 0, 0, 0, 0, 0]
    },
    {
        id: 160,
        universeId: 18,
        universeName: '18. Sécurité, Défense & Urgence',
        icon: '🚨',
        name: 'Protection civile & gestion de crise',
        weights: [4, 0, 0, 0, 3, 4, 0, 5, 5, 0, 0, 0]
    },
    {
        id: 161,
        universeId: 18,
        universeName: '18. Sécurité, Défense & Urgence',
        icon: '🪖',
        name: 'Défense & armée',
        weights: [5, 4, 0, 0, 0, 0, 5, 4, 0, 0, 0, 0]
    },
    {
        id: 162,
        universeId: 18,
        universeName: '18. Sécurité, Défense & Urgence',
        icon: '🕵️',
        name: 'Renseignement & cyberdéfense',
        weights: [4, 0, 4, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 163,
        universeId: 18,
        universeName: '18. Sécurité, Défense & Urgence',
        icon: '🔒',
        name: 'Sécurité des infrastructures',
        weights: [5, 3, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 164,
        universeId: 18,
        universeName: '18. Sécurité, Défense & Urgence',
        icon: '⚔️',
        name: 'Industrie de défense',
        weights: [4, 5, 0, 5, 3, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 165,
        universeId: 19,
        universeName: '19. Social, Aide & Solidarité',
        icon: '🏠',
        name: 'Aide à domicile & services à la personne',
        weights: [0, 4, 0, 0, 0, 5, 3, 0, 0, 0, 5, 0]
    },
    {
        id: 166,
        universeId: 19,
        universeName: '19. Social, Aide & Solidarité',
        icon: '🤝',
        name: 'Travail social & insertion',
        weights: [0, 0, 0, 0, 4, 5, 0, 0, 3, 0, 5, 0]
    },
    {
        id: 167,
        universeId: 19,
        universeName: '19. Social, Aide & Solidarité',
        icon: '👶',
        name: 'Enfance & protection de l\'enfance',
        weights: [4, 0, 0, 0, 3, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 168,
        universeId: 19,
        universeName: '19. Social, Aide & Solidarité',
        icon: '♿',
        name: 'Handicap & inclusion',
        weights: [3, 4, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 169,
        universeId: 19,
        universeName: '19. Social, Aide & Solidarité',
        icon: '💚',
        name: 'Santé mentale & accompagnement',
        weights: [3, 0, 0, 0, 4, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 170,
        universeId: 19,
        universeName: '19. Social, Aide & Solidarité',
        icon: '🎪',
        name: 'Animation & médiation sociale',
        weights: [0, 0, 0, 0, 0, 5, 0, 0, 5, 3, 4, 0]
    },
    {
        id: 171,
        universeId: 19,
        universeName: '19. Social, Aide & Solidarité',
        icon: '🤝',
        name: 'Économie sociale & solidaire',
        weights: [0, 0, 0, 0, 0, 5, 0, 4, 5, 3, 0, 0]
    },
    {
        id: 172,
        universeId: 19,
        universeName: '19. Social, Aide & Solidarité',
        icon: '🏢',
        name: 'Gestion d\'établissements & médiation familiale',
        weights: [4, 0, 0, 0, 0, 5, 0, 5, 0, 0, 4, 0]
    },
    {
        id: 173,
        universeId: 19,
        universeName: '19. Social, Aide & Solidarité',
        icon: '🕊️',
        name: 'Accompagnement funéraire',
        weights: [4, 3, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0]
    },
    {
        id: 174,
        universeId: 20,
        universeName: '20. Sport, Loisirs & Vie Active',
        icon: '🏋️',
        name: 'Coaching sportif & éducation physique',
        weights: [0, 0, 0, 0, 3, 4, 5, 0, 0, 0, 5, 0]
    },
    {
        id: 175,
        universeId: 20,
        universeName: '20. Sport, Loisirs & Vie Active',
        icon: '🎯',
        name: 'Animation & loisirs',
        weights: [0, 0, 0, 0, 0, 5, 0, 0, 5, 3, 4, 0]
    },
    {
        id: 176,
        universeId: 20,
        universeName: '20. Sport, Loisirs & Vie Active',
        icon: '⚽',
        name: 'Encadrement sportif & fédérations',
        weights: [4, 0, 0, 0, 0, 3, 5, 5, 0, 0, 0, 0]
    },
    {
        id: 177,
        universeId: 20,
        universeName: '20. Sport, Loisirs & Vie Active',
        icon: '🏟️',
        name: 'Gestion d\'équipements sportifs',
        weights: [0, 4, 3, 0, 0, 4, 0, 5, 0, 0, 0, 0]
    },
    {
        id: 178,
        universeId: 20,
        universeName: '20. Sport, Loisirs & Vie Active',
        icon: '🤾',
        name: 'Médiation par le sport',
        weights: [0, 0, 0, 0, 0, 5, 5, 0, 3, 0, 5, 0]
    },
    {
        id: 179,
        universeId: 20,
        universeName: '20. Sport, Loisirs & Vie Active',
        icon: '🥗',
        name: 'Sport santé & nutrition',
        weights: [0, 0, 0, 5, 4, 0, 4, 0, 0, 0, 5, 0]
    },
    {
        id: 180,
        universeId: 20,
        universeName: '20. Sport, Loisirs & Vie Active',
        icon: '🎪',
        name: 'Organisation d\'événements & tourisme sportif',
        weights: [0, 0, 0, 0, 0, 5, 0, 4, 5, 3, 0, 0]
    },
    {
        id: 181,
        universeId: 20,
        universeName: '20. Sport, Loisirs & Vie Active',
        icon: '🎮',
        name: 'E-sport & compétition numérique',
        weights: [0, 0, 3, 5, 0, 4, 0, 0, 5, 0, 0, 0]
    },
    {
        id: 182,
        universeId: 21,
        universeName: '21. Technologies Émergentes',
        icon: '🤖',
        name: 'Robotique humanoïde & XR avancée',
        weights: [0, 4, 0, 5, 4, 0, 0, 0, 0, 5, 0, 0]
    },
    {
        id: 183,
        universeId: 21,
        universeName: '21. Technologies Émergentes',
        icon: '🧬',
        name: 'Biotechnologies & bio-ingénierie',
        weights: [4, 4, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 184,
        universeId: 21,
        universeName: '21. Technologies Émergentes',
        icon: '🌾',
        name: 'AgroTech & FoodTech',
        weights: [0, 0, 0, 5, 4, 0, 0, 0, 3, 5, 0, 0]
    },
    {
        id: 185,
        universeId: 21,
        universeName: '21. Technologies Émergentes',
        icon: '🌱',
        name: 'CleanTech & GreenTech',
        weights: [0, 0, 0, 5, 4, 0, 0, 0, 3, 5, 0, 0]
    },
    {
        id: 186,
        universeId: 21,
        universeName: '21. Technologies Émergentes',
        icon: '💉',
        name: 'HealthTech & MedTech',
        weights: [0, 3, 0, 5, 4, 0, 0, 0, 0, 5, 0, 0]
    },
    {
        id: 187,
        universeId: 21,
        universeName: '21. Technologies Émergentes',
        icon: '🚀',
        name: 'SpaceTech & exploration spatiale',
        weights: [0, 4, 0, 5, 5, 0, 0, 0, 0, 4, 0, 0]
    },
    {
        id: 188,
        universeId: 21,
        universeName: '21. Technologies Émergentes',
        icon: '💼',
        name: 'Économie créative & travail indépendant',
        weights: [0, 0, 0, 3, 0, 4, 0, 0, 5, 5, 0, 0]
    }
];
