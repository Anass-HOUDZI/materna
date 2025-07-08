
import { MotorMilestone, StimulusActivity } from "@/types/motor-development";

export const MOTOR_MILESTONES: MotorMilestone[] = [
  // 0-6 mois
  {
    id: "head-control-3m",
    domain: "gross-motor",
    label: "Contrôle de la tête",
    description: "Soulève et maintient la tête quand il est sur le ventre",
    minAgeMonths: 2,
    maxAgeMonths: 4,
    isEssential: true,
  },
  {
    id: "roll-over-6m",
    domain: "gross-motor",
    label: "Se retourne",
    description: "Se retourne du ventre sur le dos et vice versa",
    minAgeMonths: 4,
    maxAgeMonths: 6,
    isEssential: true,
  },
  {
    id: "grasp-reflex-6m",
    domain: "fine-motor",
    label: "Préhension volontaire",
    description: "Saisit les objets volontairement",
    minAgeMonths: 4,
    maxAgeMonths: 6,
    isEssential: true,
  },
  
  // 6-12 mois
  {
    id: "sit-unsupported-9m",
    domain: "gross-motor",
    label: "Position assise",
    description: "S'assoit sans soutien",
    minAgeMonths: 6,
    maxAgeMonths: 9,
    isEssential: true,
  },
  {
    id: "crawl-10m",
    domain: "gross-motor",
    label: "Rampe ou marche à 4 pattes",
    description: "Se déplace en rampant ou à quatre pattes",
    minAgeMonths: 7,
    maxAgeMonths: 10,
    isEssential: true,
  },
  {
    id: "pincer-grasp-12m",
    domain: "fine-motor",
    label: "Pince fine",
    description: "Utilise le pouce et l'index pour saisir",
    minAgeMonths: 9,
    maxAgeMonths: 12,
    isEssential: true,
  },
  
  // 12-24 mois
  {
    id: "walk-independently-15m",
    domain: "gross-motor",
    label: "Marche seul",
    description: "Marche de manière indépendante",
    minAgeMonths: 12,
    maxAgeMonths: 15,
    isEssential: true,
  },
  {
    id: "run-24m",
    domain: "gross-motor",
    label: "Court",
    description: "Court de manière coordonnée",
    minAgeMonths: 18,
    maxAgeMonths: 24,
    isEssential: false,
  },
  {
    id: "scribble-18m",
    domain: "fine-motor",
    label: "Gribouille",
    description: "Fait des gribouillages avec un crayon",
    minAgeMonths: 15,
    maxAgeMonths: 18,
    isEssential: false,
  },
  
  // 24-36 mois
  {
    id: "jump-30m",
    domain: "gross-motor",
    label: "Saute",
    description: "Saute à pieds joints",
    minAgeMonths: 24,
    maxAgeMonths: 30,
    isEssential: false,
  },
  {
    id: "stairs-alternating-36m",
    domain: "gross-motor",
    label: "Monte les escaliers",
    description: "Monte les escaliers en alternant les pieds",
    minAgeMonths: 30,
    maxAgeMonths: 36,
    isEssential: false,
  },
  {
    id: "draw-circle-36m",
    domain: "fine-motor",
    label: "Dessine un cercle",
    description: "Dessine un cercle approximativement rond",
    minAgeMonths: 30,
    maxAgeMonths: 36,
    isEssential: false,
  },
];

export const STIMULUS_ACTIVITIES: StimulusActivity[] = [
  {
    id: "tummy-time-3m",
    title: "Temps sur le ventre",
    domain: "gross-motor",
    targetAgeMonths: 3,
    duration: "5-10 minutes",
    materials: ["Tapis de jeu", "Jouets colorés"],
    instructions: [
      "Placez bébé sur le ventre sur un tapis",
      "Placez des jouets devant lui pour l'encourager",
      "Commencez par de courtes périodes"
    ],
    developmentGoals: ["Renforcer les muscles du cou", "Développer le contrôle de la tête"],
  },
  {
    id: "reach-grasp-6m",
    title: "Attraper des objets",
    domain: "fine-motor",
    targetAgeMonths: 6,
    duration: "10-15 minutes",
    materials: ["Hochets", "Anneaux de dentition", "Jouets texturés"],
    instructions: [
      "Présentez l'objet à distance d'une main",
      "Encouragez bébé à tendre la main",
      "Laissez-le explorer avec ses mains"
    ],
    developmentGoals: ["Développer la coordination œil-main", "Renforcer la préhension"],
  },
  {
    id: "assisted-sitting-9m",
    title: "Position assise assistée",
    domain: "gross-motor",
    targetAgeMonths: 9,
    duration: "15-20 minutes",
    materials: ["Coussins", "Jouets à manipuler"],
    instructions: [
      "Asseyez bébé avec support dorsal",
      "Réduisez progressivement le support",
      "Proposez des jouets à manipuler"
    ],
    developmentGoals: ["Renforcer les muscles du tronc", "Développer l'équilibre"],
  },
];

export const DOMAIN_LABELS = {
  "gross-motor": "Motricité globale",
  "fine-motor": "Motricité fine",
  "cognitive": "Cognitif",
  "social": "Social",
  "communication": "Communication",
};

export const DOMAIN_COLORS = {
  "gross-motor": "bg-blue-100 text-blue-800",
  "fine-motor": "bg-green-100 text-green-800",
  "cognitive": "bg-purple-100 text-purple-800",
  "social": "bg-pink-100 text-pink-800",
  "communication": "bg-yellow-100 text-yellow-800",
};
