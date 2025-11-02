// Données des 21 univers avec leurs descriptions et sous-univers
const universesData = [
    {
        id: 1,
        icon: '🌾',
        name: 'Agriculture, nature & animaux',
        description: 'Cultivez, élevez, protégez la nature et travaillez avec les animaux dans des métiers en plein air.',
        subUniverses: [
            'Agroalimentaire industriel',
            'Production biologique & circuits courts',
            'Agronomie & recherche appliquée',
            'Cultures céréalières & grandes exploitations',
            'Viticulture & œnologie',
            'Maraîchage & production maraîchère',
            'Horticulture & pépinière',
            'Paysagisme & aménagement végétal',
            'Forêt & sylviculture durable',
            'Élevage bovin / ovin / porcin / avicole',
            'Aquaculture & pêche durable',
            'Apiculture & insectes utiles',
            'Gestion de l eau, irrigation & bassins versants',
            'Valorisation & transformation des produits agricoles'
        ]
    },
    {
        id: 2,
        icon: '🎨',
        name: 'Arts, design & création',
        description: 'Créez, dessinez, designez et exprimez votre créativité dans l art visuel, graphique ou appliqué.',
        subUniverses: [
            'Arts visuels & peinture',
            'Sculpture & installations',
            'Design graphique & communication visuelle',
            'Design produit & industriel',
            'Architecture intérieure & décoration',
            'Photographie & image numérique',
            'Cinéma, audiovisuel & animation',
            'Mode, stylisme & textile',
            'Artisanat d art traditionnel',
            'Scénographie & design d espace',
            'Illustration & bande dessinée',
            'Patrimoine, muséographie & restauration d art',
            'Spectacle vivant & arts de la scène',
            'Métiers du luxe & savoir-faire d exception',
            'Régie & technique du spectacle'
        ]
    },
    {
        id: 3,
        icon: '🛒',
        name: 'Commerce, marketing & vente',
        description: 'Vendez, négociez, développez des stratégies commerciales et fidélisez les clients.',
        subUniverses: [
            'Commerce de détail & retail',
            'E-commerce & marketplaces',
            'Vente B2B & négociation commerciale',
            'Représentation & prospection',
            'Merchandising & mise en valeur produits',
            'Marketing stratégique',
            'Marketing digital & réseaux sociaux',
            'Communication commerciale & influence',
            'Achats & approvisionnement',
            'Gestion de rayon & management de point de vente',
            'Immobilier commercial',
            'Banque & assurance commerciale',
            'Service client & relation après-vente',
            'Commerce du luxe & clientèle premium',
            'Vente en ligne & marketplaces spécialisées'
        ]
    },
    {
        id: 4,
        icon: '🎙️',
        name: 'Communication, médias & culture',
        description: 'Informez, divertissez, communiquez à travers les médias, la culture et l événementiel.',
        subUniverses: [
            'Journalisme & presse écrite',
            'Audiovisuel & production radio/TV',
            'Relations publiques & événementiel',
            'Communication d entreprise',
            'Communication publique & politique',
            'Édition & correction',
            'Création de contenus numériques',
            'Publicité & stratégie de marque',
            'Influence, réseaux & storytelling',
            'Traduction & interprétation',
            'Médiation culturelle & animation de projets',
            'Podcasting & création audio'
        ]
    },
    {
        id: 5,
        icon: '🏗️',
        name: 'Construction, BTP & habitat',
        description: 'Construisez, rénovez, aménagez des bâtiments et infrastructures pour façonner nos villes.',
        subUniverses: [
            'Architecture & conception',
            'Gros œuvre & maçonnerie',
            'Second œuvre & finitions',
            'Menuiserie & charpente bois',
            'Plomberie, chauffage & climatisation',
            'Électricité & domotique',
            'Travaux publics & voirie',
            'Génie civil & infrastructures',
            'Rénovation énergétique & éco-bâtiment',
            'Études techniques & dessin bâtiment',
            'Coordination & conduite de chantier',
            'Gestion immobilière & copropriétés',
            'Aménagement urbain & espaces publics'
        ]
    },
    {
        id: 6,
        icon: '⚖️',
        name: 'Droit, administration & politique publique',
        description: 'Défendez, régulez, administrez dans les domaines juridique et des services publics.',
        subUniverses: [
            'Droit privé & judiciaire',
            'Droit des affaires & fiscalité',
            'Droit social & du travail',
            'Droit public & institutions',
            'Administration publique',
            'Ressources humaines & médiation',
            'Gouvernance territoriale & collectivités locales',
            'Diplomatie & relations internationales',
            'Gestion des marchés publics',
            'Intelligence juridique & conformité',
            'Notariat & professions réglementées'
        ]
    },
    {
        id: 7,
        icon: '🎓',
        name: 'Éducation, formation & apprentissage',
        description: 'Enseignez, formez, transmettez vos connaissances et accompagnez l apprentissage.',
        subUniverses: [
            'Enseignement primaire',
            'Enseignement secondaire',
            'Enseignement supérieur',
            'Formation professionnelle & continue',
            'Orientation & accompagnement',
            'Coaching & développement personnel',
            'Ingénierie pédagogique',
            'Éducation spécialisée & médiation éducative',
            'Recherche en sciences de l éducation',
            'Animation socioculturelle'
        ]
    },
    {
        id: 8,
        icon: '🌍',
        name: 'Environnement, climat & énergies',
        description: 'Protégez la planète, développez les énergies renouvelables et luttez contre le changement climatique.',
        subUniverses: [
            'Gestion des déchets & recyclage',
            'Traitement de l eau & dépollution',
            'Énergies renouvelables (solaire, éolien, hydraulique)',
            'Hydrogène & stockage d énergie',
            'Énergie nucléaire & sûreté',
            'Génie climatique & efficacité énergétique',
            'Adaptation au changement climatique',
            'Bilan carbone & comptabilité environnementale',
            'Écoconception & économie circulaire',
            'Aménagement durable des territoires',
            'Ingénierie environnementale',
            'Protection de la biodiversité & conservation',
            'Restauration écologique & gestion des milieux naturels',
            'Mobilité durable & transports propres',
            'Agriculture régénératrice & sols vivants',
            'Gestion des risques naturels & résilience'
        ]
    },
    {
        id: 9,
        icon: '💶',
        name: 'Gestion, finance & comptabilité',
        description: 'Gérez, analysez, optimisez les ressources financières et comptables des organisations.',
        subUniverses: [
            'Comptabilité & fiscalité',
            'Audit & contrôle de gestion',
            'Trésorerie & financement',
            'Banque & assurance',
            'Conseil en gestion de patrimoine',
            'Gestion d entreprise & administration',
            'Finance durable & investissement responsable',
            'Gestion de projets financiers',
            'Fintech & services financiers numériques',
            'Gestion budgétaire publique',
            'Contrôle interne & conformité'
        ]
    },
    {
        id: 10,
        icon: '🍽️',
        name: 'Hôtellerie, restauration & tourisme',
        description: 'Accueillez, servez, cuisinez et faites découvrir des destinations dans l hospitalité.',
        subUniverses: [
            'Cuisine gastronomique',
            'Restauration collective',
            'Service & sommellerie',
            'Hôtellerie & hébergement',
            'Accueil & réception',
            'Tourisme local & culturel',
            'Tourisme international',
            'Événementiel & congrès',
            'Management hôtelier',
            'Œnotourisme & terroir',
            'Gestion durable du tourisme'
        ]
    },
    {
        id: 11,
        icon: '🏠',
        name: 'Immobilier & patrimoine',
        description: 'Conseillez, gérez, valorisez les biens immobiliers et le patrimoine.',
        subUniverses: [
            'Transaction immobilière résidentielle',
            'Transaction immobilière d entreprise & commerces',
            'Promotion & développement immobilier',
            'Gestion locative & syndic de copropriété',
            'Expertise & évaluation immobilière',
            'Investissement & conseil patrimonial immobilier',
            'Aménagement foncier & urbanisme opérationnel',
            'Immobilier social & logement accompagné',
            'Facility management & gestion technique de bâtiments',
            'Immobilier de luxe & biens d exception'
        ]
    },
    {
        id: 12,
        icon: '⚙️',
        name: 'Industrie, fabrication & production',
        description: 'Produisez, assemblez, automatisez dans les usines et chaînes de production modernes.',
        subUniverses: [
            'Production industrielle',
            'Maintenance & SAV',
            'Mécanique & usinage',
            'Électrotechnique & automatisme',
            'Robotique & cobotique',
            'Chimie & matériaux',
            'Aéronautique & spatial',
            'Métallurgie & sidérurgie',
            'Industrie pharmaceutique',
            'Plasturgie & composites',
            'Qualité, sécurité & environnement industriel',
            'Supply chain industrielle',
            'Fabrication additive & impression 3D',
            'Industrie textile & habillement',
            'Micro-électronique & semi-conducteurs',
            'Industries extractives & carrières',
            'Construction & maintenance navale'
        ]
    },
    {
        id: 13,
        icon: '🚚',
        name: 'Logistique, transport & mobilité',
        description: 'Transportez, organisez, gérez les flux de marchandises et les déplacements.',
        subUniverses: [
            'Logistique & entreposage',
            'Supply chain management',
            'Douanes & commerce international',
            'Transport routier & livraison',
            'Transport ferroviaire',
            'Transport aérien',
            'Transport maritime & fluvial',
            'Mobilité urbaine & transports publics',
            'Gestion de flotte & maintenance',
            'Logistique urbaine & dernier kilomètre',
            'Activités portuaires & maritimes',
            'Mobilité autonome & véhicules intelligents'
        ]
    },
    {
        id: 14,
        icon: '💼',
        name: 'Management, entrepreneuriat & stratégie',
        description: 'Dirigez, entreprenez, élaborez des stratégies et pilotez des équipes vers le succès.',
        subUniverses: [
            'Création d entreprise & start-up',
            'Gestion de projets',
            'Innovation & transformation digitale',
            'Management d équipe',
            'RSE & développement durable',
            'Stratégie d entreprise',
            'Pilotage de structures publiques ou privées',
            'Management interculturel',
            'Conseil & accompagnement stratégique',
            'Gouvernance & leadership éthique'
        ]
    },
    {
        id: 15,
        icon: '💻',
        name: 'Numérique, informatique & data',
        description: 'Codez, développez, analysez les données et créez les technologies de demain.',
        subUniverses: [
            'Développement web & mobile',
            'DevOps & cloud computing',
            'Cybersécurité',
            'Réseaux & systèmes',
            'Intelligence artificielle & machine learning',
            'Data science & big data',
            'Réalité augmentée & métavers',
            'UX/UI design',
            'Informatique industrielle & IoT',
            'Logiciels métiers & ERP',
            'No-code & automation',
            'Design numérique & multimédia',
            'Blockchain & web3',
            'Informatique durable & sobriété numérique',
            'Gaming, jeux vidéo & développement ludique',
            'E-sport, streaming & création de contenu gaming'
        ]
    },
    {
        id: 16,
        icon: '⚕️',
        name: 'Santé, bien-être & médical',
        description: 'Soignez, accompagnez, prévenez dans les métiers de la santé et du bien-être.',
        subUniverses: [
            'Médecine générale',
            'Chirurgie & spécialités hospitalières',
            'Radiologie & imagerie médicale',
            'Biologie & analyses médicales',
            'Pharmacie & biotechnologies',
            'Infirmier & soins paramédicaux',
            'Rééducation & kinésithérapie',
            'Santé mentale & psychologie',
            'Nutrition & diététique',
            'Santé publique & prévention',
            'Accompagnement des personnes âgées',
            'Médecine du sport',
            'Médecine connectée & télésanté'
        ]
    },
    {
        id: 17,
        icon: '🔬',
        name: 'Sciences, recherche & innovation',
        description: 'Cherchez, expérimentez, innovez pour faire avancer les connaissances scientifiques.',
        subUniverses: [
            'Physique & astrophysique',
            'Mathématiques & statistiques',
            'Chimie & matériaux',
            'Biotechnologies',
            'Géosciences & climatologie',
            'Neurosciences & cognition',
            'Sciences humaines & sociales',
            'Recherche en éducation',
            'Recherche appliquée & transfert technologique',
            'R&D en entreprise',
            'Études et consulting scientifique'
        ]
    },
    {
        id: 18,
        icon: '🛡️',
        name: 'Sécurité, défense & urgence',
        description: 'Protégez, intervenez, sécurisez les personnes et les biens au quotidien.',
        subUniverses: [
            'Police & gendarmerie',
            'Pompiers & secours',
            'Sécurité privée & surveillance',
            'Protection civile',
            'Défense & armée',
            'Renseignement & sécurité stratégique',
            'Sécurité informatique & cyberdéfense',
            'Sécurité des infrastructures critiques',
            'Gestion de crise & résilience territoriale',
            'Prévention des risques & sûreté publique',
            'Industrie de défense & armement'
        ]
    },
    {
        id: 19,
        icon: '❤️',
        name: 'Social, aide & solidarité',
        description: 'Aidez, accompagnez, soutenez les personnes en difficulté ou en situation de vulnérabilité.',
        subUniverses: [
            'Aide à domicile',
            'Travail social & insertion',
            'Enfance & jeunesse',
            'Handicap & inclusion',
            'Santé mentale & accompagnement',
            'Animation & médiation sociale',
            'Protection de l enfance',
            'Économie sociale & solidaire',
            'Bénévolat & engagement citoyen',
            'Gestion d établissements médico-sociaux',
            'Médiation familiale',
            'Services à la personne & assistance familiale',
            'Accompagnement funéraire & thanatologie'
        ]
    },
    {
        id: 20,
        icon: '🏋️',
        name: 'Sport, loisirs & vie active',
        description: 'Entraînez, animez, organisez des activités sportives et de loisirs pour tous.',
        subUniverses: [
            'Coaching sportif',
            'Animation & loisirs',
            'Éducation physique & enseignement du sport',
            'Encadrement sportif & fédérations',
            'Gestion d équipements sportifs',
            'Médiation par le sport',
            'Nutrition & bien-être',
            'Sport santé & réathlétisation',
            'Organisation d événements sportifs',
            'Tourisme sportif',
            'E-sport & compétition numérique'
        ]
    },
    {
        id: 21,
        icon: '🚀',
        name: 'Technologies émergentes & futur du travail',
        description: 'Explorez l IA, la robotique, le métavers et les nouvelles formes de travail.',
        subUniverses: [
            'Robotique humanoïde avancée',
            'Technologies immersives nouvelle génération (XR, haptique)',
            'Biotechnologies avancées & bio-ingénierie',
            'AgroTech & FoodTech',
            'CleanTech & GreenTech',
            'HealthTech & MedTech',
            'SpaceTech & exploration spatiale',
            'Économie créative & travail numérique indépendant'
        ]
    }
];

// Fonction pour générer les cartes d'univers
function renderUniverses() {
    console.log('Début de renderUniverses');
    const grid = document.getElementById('universesGrid');
    
    if (!grid) {
        console.error('Élément universesGrid introuvable !');
        return;
    }
    
    console.log('Grid trouvée, nombre d univers:', universesData.length);
    
    const html = universesData.map(function(universe) {
        const subUniversesHTML = universe.subUniverses.map(function(sub) {
            return '<div class="sub-universe-item">• ' + sub + '</div>';
        }).join('');
        
        return '<div class="universe-card">' +
            '<div class="universe-image">' + universe.icon + '</div>' +
            '<div class="universe-content">' +
                '<div class="universe-name">' + universe.name + '</div>' +
                '<div class="universe-description">' + universe.description + '</div>' +
            '</div>' +
            '<div class="sub-universes">' + subUniversesHTML + '</div>' +
        '</div>';
    }).join('');
    
    grid.innerHTML = html;
    console.log('Univers rendus avec succès');
}

// Initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderUniverses);
} else {
    renderUniverses();
}
