
export interface MotorMilestone {
  id: string;
  label: string;
  domain: 'motricite-globale' | 'motricite-fine' | 'cognitif' | 'social-communication' | 'autonomie';
  minAgeMonths: number;
  maxAgeMonths: number;
  description: string;
  videoExample?: string;
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

export interface StimululusActivity {
  id: string;
  title: string;
  domain: string;
  targetAgeMonths: number;
  duration: string;
  materials: string[];
  instructions: string[];
  objectives: string[];
}

export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;
  isPremature: boolean;
  gestationalAge?: number;
  familyHistory: string[];
  createdAt: number;
}
