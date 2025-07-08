
export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;
  isPremature: boolean;
  gestationalAge?: number;
  familyHistory: string[];
  createdAt: number;
}

export interface MotorMilestone {
  id: string;
  domain: string;
  label: string;
  description: string;
  minAgeMonths: number;
  maxAgeMonths: number;
  isEssential: boolean;
}

export interface MotorEvaluation {
  id: string;
  childId: string;
  date: string;
  ageMonths: number;
  isPremature: boolean;
  correctedAgeMonths?: number;
  completedMilestones: string[];
  totalMilestones: number;
  scoreByDomain: Record<string, { completed: number; total: number }>;
  developmentScore: number;
  recommendations: string[];
  alertFlags: string[];
  createdAt: number;
}

export interface StimulusActivity {
  id: string;
  title: string;
  domain: string;
  targetAgeMonths: number;
  duration: string;
  materials: string[];
  instructions: string[];
  developmentGoals: string[];
}
