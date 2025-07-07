
export interface GrowthMeasurement {
  id: string;
  childId: string;
  date: string;
  ageMonths: number;
  weight: number; // kg
  height: number; // cm
  headCircumference?: number; // cm
  bmi: number;
  createdAt: number;
}

export interface ChildGrowthProfile {
  id: string;
  name: string;
  birthDate: string;
  gender: 'boy' | 'girl';
  isPremature: boolean;
  gestationalAge?: number; // weeks
  parentHeights: {
    mother: number;
    father: number;
  };
  ethnicity?: string;
  familyHistory: string[];
  createdAt: number;
}

export interface GrowthPercentile {
  ageMonths: number;
  p3: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  p97: number;
}

export interface GrowthAnalysis {
  currentPercentiles: {
    weight: number;
    height: number;
    bmi: number;
    headCircumference?: number;
  };
  velocityConcerns: string[];
  alerts: string[];
  recommendations: string[];
  geneticTarget: {
    minHeight: number;
    maxHeight: number;
    estimatedAdultHeight: number;
  };
}

export interface WHOStandard {
  type: 'weight' | 'height' | 'bmi' | 'head-circumference';
  gender: 'boy' | 'girl';
  data: GrowthPercentile[];
}
