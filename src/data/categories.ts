import { Baby, Heart, Shield, Activity, Calculator, BarChart3, TrendingUp, Search, Stethoscope, Smile } from "lucide-react";

export interface Tool {
  id: string;
  label: string;
  description: string;
  link: string;
  icon: any;
  gradient: string;
  difficulty: "Facile" | "Moyen" | "Avancé";
  rating: number;
  category: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: any;
  gradient: string;
  tools: Tool[];
}

export const TOOLS_DATA: Tool[] = [
  {
    id: "due-date-calculator",
    label: "Calculateur de date d'accouchement",
    description: "Calculez votre date d'accouchement prévue avec précision médicale",
    link: "/grossesse/calculateur-terme",
    icon: Calculator,
    gradient: "from-blue-50 to-blue-100",
    difficulty: "Facile",
    rating: 5,
    category: "grossesse"
  },
  {
    id: "contraction-tracker",
    label: "Tracker Contractions",
    description: "Surveillez vos contractions avec intelligence artificielle",
    link: "/grossesse/tracker-contractions",
    icon: BarChart3,
    gradient: "from-pink-50 to-pink-100",
    difficulty: "Facile",
    rating: 5,
    category: "grossesse"
  },
  {
    id: "weight-gain-calculator",
    label: "Calculateur Prise de Poids",
    description: "Suivez votre prise de poids selon les recommandations médicales",
    link: "/grossesse/calculateur-poids",
    icon: TrendingUp,
    gradient: "from-green-50 to-green-100",
    difficulty: "Facile",
    rating: 5,
    category: "grossesse"
  },
  {
    id: "pregnancy-calendar",
    label: "Calendrier Grossesse",
    description: "Suivez votre grossesse semaine par semaine",
    link: "/grossesse/calendrier-semaine",
    icon: Search,
    gradient: "from-violet-50 to-violet-100",
    difficulty: "Facile",
    rating: 5,
    category: "grossesse"
  },
  {
    id: "baby-movement-tracker",
    label: "Tracker Mouvements Bébé",
    description: "Surveillez les mouvements de votre bébé",
    link: "/grossesse/tracker-mouvements-bebe",
    icon: Activity,
    gradient: "from-rose-50 to-pink-100",
    difficulty: "Moyen",
    rating: 4,
    category: "grossesse"
  },
  {
    id: "symptom-journal",
    label: "Journal Symptômes",
    description: "Suivez vos symptômes de grossesse",
    link: "/grossesse/journal-symptomes",
    icon: Stethoscope,
    gradient: "from-yellow-50 to-orange-50",
    difficulty: "Facile",
    rating: 4,
    category: "grossesse"
  },
  {
    id: "sex-prediction",
    label: "Calculateur Sexe Bébé",
    description: "Prédisez le sexe de votre bébé (pour le fun)",
    link: "/grossesse/calculateur-sexe-bebe",
    icon: Smile,
    gradient: "from-fuchsia-50 to-pink-100",
    difficulty: "Facile",
    rating: 3,
    category: "grossesse"
  },
  {
    id: "budget-simulator",
    label: "Simulateur Budget Bébé",
    description: "Estimez le budget nécessaire pour votre bébé",
    link: "/grossesse/simulateur-budget-bebe",
    icon: Calculator,
    gradient: "from-sky-50 to-blue-100",
    difficulty: "Moyen",
    rating: 5,
    category: "grossesse"
  },
  {
    id: "growth-curves",
    label: "Courbes Croissance OMS",
    description: "Suivez la croissance de votre enfant",
    link: "/enfant/courbes-croissance",
    icon: TrendingUp,
    gradient: "from-blue-50 to-indigo-50",
    difficulty: "Moyen",
    rating: 5,
    category: "enfant"
  },
  {
    id: "food-diversification",
    label: "Guide Diversification",
    description: "Guide complet pour la diversification alimentaire",
    link: "/enfant/guide-diversification",
    icon: Search,
    gradient: "from-lime-50 to-lime-100",
    difficulty: "Moyen",
    rating: 5,
    category: "enfant"
  },
  {
    id: "motor-development",
    label: "Développement Moteur",
    description: "Suivez le développement moteur de votre enfant",
    link: "/enfant/developpement-moteur",
    icon: Activity,
    gradient: "from-orange-50 to-yellow-50",
    difficulty: "Moyen",
    rating: 4,
    category: "enfant"
  },
  {
    id: "nutrition-calculator",
    label: "Besoins Nutritionnels",
    description: "Calculez les besoins nutritionnels de votre enfant",
    link: "/enfant/besoins-nutritionnels",
    icon: Calculator,
    gradient: "from-teal-50 to-blue-50",
    difficulty: "Avancé",
    rating: 5,
    category: "enfant"
  },
  {
    id: "crying-mood-tracker",
    label: "Tracker Pleurs & Humeur",
    description: "Analysez les pleurs et l'humeur de votre bébé",
    link: "/enfant/tracker-pleurs-humeur",
    icon: Heart,
    gradient: "from-purple-50 to-indigo-50",
    difficulty: "Moyen",
    rating: 4,
    category: "enfant"
  },
  {
    id: "teething-calculator",
    label: "Calculateur Poussées Dentaires",
    description: "Prédisez les poussées dentaires de votre bébé",
    link: "/grossesse/calculateur-dents",
    icon: Smile,
    gradient: "from-emerald-50 to-green-100",
    difficulty: "Facile",
    rating: 4,
    category: "enfant"
  },
  {
    id: "breastfeeding-guide",
    label: "Guide Allaitement",
    description: "Guide complet pour l'allaitement maternel",
    link: "/sante/guide-allaitement",
    icon: Heart,
    gradient: "from-pink-50 to-pink-100",
    difficulty: "Moyen",
    rating: 5,
    category: "sante"
  }
];

export const CATEGORIES: Category[] = [
  {
    id: "grossesse",
    title: "Grossesse & Suivi",
    description: "Outils complets pour suivre votre grossesse semaine par semaine avec précision médicale",
    href: "/categorie/grossesse",
    icon: Baby,
    gradient: "from-blue-50 to-blue-100",
    tools: TOOLS_DATA.filter(tool => tool.category === "grossesse")
  },
  {
    id: "enfant", 
    title: "Développement Enfant",
    description: "Suivez et optimisez le développement de votre enfant de 0 à 6 ans",
    href: "/categorie/enfant",
    icon: Activity,
    gradient: "from-green-50 to-green-100", 
    tools: TOOLS_DATA.filter(tool => tool.category === "enfant")
  },
  {
    id: "sante",
    title: "Santé & Bien-être",
    description: "Outils de santé et bien-être pour toute la famille",
    href: "/categorie/sante",
    icon: Heart,
    gradient: "from-pink-50 to-pink-100",
    tools: TOOLS_DATA.filter(tool => tool.category === "sante")
  }
];

export const getToolsByCategory = (categoryId: string): Tool[] => {
  return TOOLS_DATA.filter(tool => tool.category === categoryId);
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return CATEGORIES.find(category => category.id === categoryId);
};