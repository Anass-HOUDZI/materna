
export interface SymptomCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface SymptomTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  commonTriggers?: string[];
  normalIntensityRange?: [number, number];
}

export interface SymptomEntry {
  id: string;
  date: string; // ISO date string
  symptomId: string;
  intensity: number; // 1-10
  duration: 'ponctuel' | 'persistant';
  triggers?: string[];
  remediesTried?: string[];
  remedyEffectiveness?: number; // 1-10
  notes?: string;
  photos?: string[]; // base64 or URLs
  createdAt: number;
  updatedAt: number;
}

export interface SymptomPattern {
  symptomId: string;
  frequency: number; // times per week
  averageIntensity: number;
  commonTriggers: string[];
  trendDirection: 'increasing' | 'decreasing' | 'stable';
  correlations: string[]; // other symptoms that occur together
}

export interface MedicalReport {
  id: string;
  generatedAt: number;
  period: {
    start: string;
    end: string;
  };
  symptoms: SymptomEntry[];
  patterns: SymptomPattern[];
  alerts: string[];
  summary: string;
}
