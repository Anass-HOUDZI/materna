
import { SymptomCategory, SymptomTemplate } from '@/types/symptom-journal';

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    id: 'digestifs',
    name: 'Digestifs',
    description: 'Nausées, vomissements, brûlures, constipation',
    icon: '🤢'
  },
  {
    id: 'physiques',
    name: 'Physiques',
    description: 'Fatigue, douleurs, œdèmes, varices',
    icon: '😴'
  },
  {
    id: 'neurologiques',
    name: 'Neurologiques',
    description: 'Maux de tête, vertiges, troubles du sommeil',
    icon: '🧠'
  },
  {
    id: 'emotionnels',
    name: 'Émotionnels',
    description: 'Humeur, stress, anxiété, déprime',
    icon: '💭'
  },
  {
    id: 'cutanes',
    name: 'Cutanés',
    description: 'Masque de grossesse, vergetures, prurit',
    icon: '🌸'
  }
];

export const SYMPTOM_TEMPLATES: SymptomTemplate[] = [
  // Digestifs
  {
    id: 'nausees-matinales',
    name: 'Nausées matinales',
    category: 'digestifs',
    description: 'Sensation de nausée, principalement le matin',
    commonTriggers: ['Odeurs fortes', 'Estomac vide', 'Fatigue'],
    normalIntensityRange: [3, 7]
  },
  {
    id: 'vomissements',
    name: 'Vomissements',
    category: 'digestifs',
    description: 'Épisodes de vomissements',
    commonTriggers: ['Nausées intenses', 'Mouvements brusques', 'Certains aliments'],
    normalIntensityRange: [4, 8]
  },
  {
    id: 'brulures-estomac',
    name: 'Brûlures d\'estomac',
    category: 'digestifs',
    description: 'Remontées acides, sensation de brûlure',
    commonTriggers: ['Repas copieux', 'Position allongée', 'Aliments épicés'],
    normalIntensityRange: [2, 6]
  },
  {
    id: 'constipation',
    name: 'Constipation',
    category: 'digestifs',
    description: 'Difficultés à aller à la selle',
    commonTriggers: ['Hormones', 'Manque d\'hydratation', 'Sédentarité'],
    normalIntensityRange: [2, 5]
  },

  // Physiques
  {
    id: 'fatigue',
    name: 'Fatigue',
    category: 'physiques',
    description: 'Sensation d\'épuisement, manque d\'énergie',
    commonTriggers: ['Hormones', 'Manque de sommeil', 'Stress'],
    normalIntensityRange: [3, 8]
  },
  {
    id: 'mal-dos',
    name: 'Mal de dos',
    category: 'physiques',
    description: 'Douleurs lombaires ou dorsales',
    commonTriggers: ['Poids du bébé', 'Posture', 'Literie inadéquate'],
    normalIntensityRange: [2, 7]
  },
  {
    id: 'oedemes',
    name: 'Œdèmes',
    category: 'physiques',
    description: 'Gonflements des pieds, mains, visage',
    commonTriggers: ['Station debout prolongée', 'Chaleur', 'Excès de sel'],
    normalIntensityRange: [1, 6]
  },
  {
    id: 'varices',
    name: 'Varices',
    category: 'physiques',
    description: 'Veines dilatées, sensation de jambes lourdes',
    commonTriggers: ['Station debout', 'Hérédité', 'Compression'],
    normalIntensityRange: [2, 6]
  },

  // Neurologiques
  {
    id: 'maux-tete',
    name: 'Maux de tête',
    category: 'neurologiques',
    description: 'Céphalées, migraines',
    commonTriggers: ['Stress', 'Déshydratation', 'Hormones', 'Manque de sommeil'],
    normalIntensityRange: [3, 8]
  },
  {
    id: 'vertiges',
    name: 'Vertiges',
    category: 'neurologiques',
    description: 'Sensation de tournis, instabilité',
    commonTriggers: ['Changement de position', 'Hypoglycémie', 'Fatigue'],
    normalIntensityRange: [2, 6]
  },
  {
    id: 'troubles-sommeil',
    name: 'Troubles du sommeil',
    category: 'neurologiques',
    description: 'Difficultés d\'endormissement, réveils nocturnes',
    commonTriggers: ['Inconfort physique', 'Stress', 'Besoins fréquents'],
    normalIntensityRange: [3, 7]
  },

  // Émotionnels
  {
    id: 'sautes-humeur',
    name: 'Sautes d\'humeur',
    category: 'emotionnels',
    description: 'Changements d\'humeur rapides et intenses',
    commonTriggers: ['Hormones', 'Fatigue', 'Stress'],
    normalIntensityRange: [2, 7]
  },
  {
    id: 'anxiete',
    name: 'Anxiété',
    category: 'emotionnels',
    description: 'Sensation d\'inquiétude, d\'appréhension',
    commonTriggers: ['Rendez-vous médicaux', 'Changements corporels', 'Avenir'],
    normalIntensityRange: [2, 6]
  },
  {
    id: 'stress',
    name: 'Stress',
    category: 'emotionnels',
    description: 'Tension nerveuse, préoccupations',
    commonTriggers: ['Travail', 'Préparatifs bébé', 'Finances'],
    normalIntensityRange: [2, 8]
  },

  // Cutanés
  {
    id: 'masque-grossesse',
    name: 'Masque de grossesse',
    category: 'cutanes',
    description: 'Taches pigmentaires sur le visage',
    commonTriggers: ['Soleil', 'Hormones'],
    normalIntensityRange: [1, 4]
  },
  {
    id: 'vergetures',
    name: 'Vergetures',
    category: 'cutanes',
    description: 'Stries sur la peau (ventre, seins, hanches)',
    commonTriggers: ['Étirement rapide', 'Génétique'],
    normalIntensityRange: [1, 5]
  },
  {
    id: 'prurit',
    name: 'Démangeaisons',
    category: 'cutanes',
    description: 'Sensation de prurit, envie de se gratter',
    commonTriggers: ['Étirement peau', 'Sécheresse', 'Hormones'],
    normalIntensityRange: [2, 7]
  }
];

export const COMMON_TRIGGERS = [
  'Odeurs fortes', 'Estomac vide', 'Fatigue', 'Stress', 'Hormones',
  'Déshydratation', 'Manque de sommeil', 'Position allongée',
  'Repas copieux', 'Aliments épicés', 'Mouvements brusques',
  'Station debout prolongée', 'Chaleur', 'Changement de position',
  'Hypoglycémie', 'Soleil', 'Sécheresse cutanée'
];

export const COMMON_REMEDIES = [
  'Repos', 'Hydratation', 'Collation légère', 'Position surélevée',
  'Compresse froide', 'Compresse chaude', 'Massage doux',
  'Exercices légers', 'Relaxation', 'Méditation', 'Tisane',
  'Alimentation fractionnée', 'Éviter déclencheurs',
  'Crème hydratante', 'Protection solaire'
];
