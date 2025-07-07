
import { WHOStandard, GrowthPercentile } from "@/types/growth-curves";

// Données simplifiées WHO 2006 (0-24 mois) et 2007 (24-60 mois)
// En production, ces données seraient plus complètes

export const WHO_WEIGHT_BOYS: GrowthPercentile[] = [
  { ageMonths: 0, p3: 2.5, p10: 2.9, p25: 3.3, p50: 3.7, p75: 4.2, p90: 4.8, p97: 5.5 },
  { ageMonths: 1, p3: 3.4, p10: 3.9, p25: 4.5, p50: 5.1, p75: 5.8, p90: 6.6, p97: 7.5 },
  { ageMonths: 3, p3: 5.0, p10: 5.7, p25: 6.4, p50: 7.1, p75: 7.9, p90: 8.8, p97: 9.9 },
  { ageMonths: 6, p3: 6.4, p10: 7.1, p25: 7.9, p50: 8.8, p75: 9.8, p90: 10.9, p97: 12.1 },
  { ageMonths: 12, p3: 8.4, p10: 9.2, p25: 10.1, p50: 11.0, p75: 12.0, p90: 13.1, p97: 14.3 },
  { ageMonths: 24, p3: 10.8, p10: 11.7, p25: 12.7, p50: 13.8, p75: 15.0, p90: 16.3, p97: 17.8 },
  { ageMonths: 36, p3: 12.1, p10: 13.1, p25: 14.2, p50: 15.3, p75: 16.7, p90: 18.3, p97: 20.0 },
  { ageMonths: 48, p3: 13.4, p10: 14.5, p25: 15.7, p50: 17.1, p75: 18.6, p90: 20.4, p97: 22.4 },
  { ageMonths: 60, p3: 14.7, p10: 15.9, p25: 17.2, p50: 18.7, p75: 20.4, p90: 22.4, p97: 24.7 }
];

export const WHO_HEIGHT_BOYS: GrowthPercentile[] = [
  { ageMonths: 0, p3: 46.1, p10: 47.5, p25: 48.9, p50: 50.4, p75: 51.8, p90: 53.2, p97: 54.7 },
  { ageMonths: 1, p3: 50.8, p10: 52.3, p25: 53.7, p50: 55.2, p75: 56.7, p90: 58.1, p97: 59.6 },
  { ageMonths: 3, p3: 57.3, p10: 58.9, p25: 60.4, p50: 62.0, p75: 63.5, p90: 65.0, p97: 66.6 },
  { ageMonths: 6, p3: 63.3, p10: 65.0, p25: 66.6, p50: 68.3, p75: 69.9, p90: 71.6, p97: 73.3 },
  { ageMonths: 12, p3: 71.0, p10: 72.8, p25: 74.5, p50: 76.2, p75: 77.9, p90: 79.6, p97: 81.3 },
  { ageMonths: 24, p3: 81.7, p10: 83.7, p25: 85.6, p50: 87.6, p75: 89.6, p90: 91.5, p97: 93.5 },
  { ageMonths: 36, p3: 88.7, p10: 90.9, p25: 93.0, p50: 95.2, p75: 97.3, p90: 99.4, p97: 101.6 },
  { ageMonths: 48, p3: 94.9, p10: 97.3, p25: 99.6, p50: 102.0, p75: 104.4, p90: 106.7, p97: 109.1 },
  { ageMonths: 60, p3: 100.7, p10: 103.2, p25: 105.7, p50: 108.3, p75: 110.8, p90: 113.3, p97: 115.9 }
];

// Données similaires pour les filles (versions ajustées)
export const WHO_WEIGHT_GIRLS: GrowthPercentile[] = [
  { ageMonths: 0, p3: 2.4, p10: 2.8, p25: 3.2, p50: 3.6, p75: 4.0, p90: 4.5, p97: 5.1 },
  { ageMonths: 1, p3: 3.2, p10: 3.6, p25: 4.2, p50: 4.8, p75: 5.5, p90: 6.2, p97: 7.0 },
  { ageMonths: 3, p3: 4.5, p10: 5.2, p25: 5.8, p50: 6.6, p75: 7.5, p90: 8.5, p97: 9.6 },
  { ageMonths: 6, p3: 5.7, p10: 6.5, p25: 7.3, p50: 8.2, p75: 9.3, p90: 10.4, p97: 11.6 },
  { ageMonths: 12, p3: 7.7, p10: 8.5, p25: 9.4, p50: 10.4, p75: 11.5, p90: 12.7, p97: 14.1 },
  { ageMonths: 24, p3: 10.2, p10: 11.2, p25: 12.3, p50: 13.5, p75: 14.8, p90: 16.3, p97: 17.9 },
  { ageMonths: 36, p3: 11.6, p10: 12.7, p25: 13.9, p50: 15.2, p75: 16.7, p90: 18.4, p97: 20.3 },
  { ageMonths: 48, p3: 12.9, p10: 14.1, p25: 15.4, p50: 16.8, p75: 18.5, p90: 20.4, p97: 22.5 },
  { ageMonths: 60, p3: 14.2, p10: 15.5, p25: 16.9, p50: 18.5, p75: 20.3, p90: 22.4, p97: 24.9 }
];

export const WHO_HEIGHT_GIRLS: GrowthPercentile[] = [
  { ageMonths: 0, p3: 45.4, p10: 46.8, p25: 48.2, p50: 49.6, p75: 51.0, p90: 52.4, p97: 53.9 },
  { ageMonths: 1, p3: 49.8, p10: 51.3, p25: 52.7, p50: 54.2, p75: 55.6, p90: 57.1, p97: 58.5 },
  { ageMonths: 3, p3: 56.2, p10: 57.8, p25: 59.3, p50: 60.9, p75: 62.4, p90: 63.9, p97: 65.5 },
  { ageMonths: 6, p3: 61.2, p10: 62.9, p25: 64.5, p50: 66.2, p75: 67.8, p90: 69.4, p97: 71.1 },
  { ageMonths: 12, p3: 68.9, p10: 70.7, p25: 72.4, p50: 74.1, p75: 75.8, p90: 77.5, p97: 79.2 },
  { ageMonths: 24, p3: 80.0, p10: 82.0, p25: 83.9, p50: 85.9, p75: 87.9, p90: 89.8, p97: 91.8 },
  { ageMonths: 36, p3: 87.0, p10: 89.2, p25: 91.3, p50: 93.4, p75: 95.6, p90: 97.7, p97: 99.8 },
  { ageMonths: 48, p3: 93.1, p10: 95.4, p25: 97.7, p50: 100.1, p75: 102.4, p90: 104.7, p97: 107.0 },
  { ageMonths: 60, p3: 98.7, p10: 101.2, p25: 103.7, p50: 106.2, p75: 108.7, p90: 111.2, p97: 113.8 }
];

export const getWHOStandards = (type: 'weight' | 'height', gender: 'boy' | 'girl'): GrowthPercentile[] => {
  if (type === 'weight') {
    return gender === 'boy' ? WHO_WEIGHT_BOYS : WHO_WEIGHT_GIRLS;
  } else {
    return gender === 'boy' ? WHO_HEIGHT_BOYS : WHO_HEIGHT_GIRLS;
  }
};

export const calculatePercentile = (value: number, ageMonths: number, type: 'weight' | 'height', gender: 'boy' | 'girl'): number => {
  const standards = getWHOStandards(type, gender);
  
  // Trouver les données les plus proches de l'âge
  const closest = standards.reduce((prev, curr) => 
    Math.abs(curr.ageMonths - ageMonths) < Math.abs(prev.ageMonths - ageMonths) ? curr : prev
  );
  
  // Estimation approximative du percentile
  if (value <= closest.p3) return 3;
  if (value <= closest.p10) return 10;
  if (value <= closest.p25) return 25;
  if (value <= closest.p50) return 50;
  if (value <= closest.p75) return 75;
  if (value <= closest.p90) return 90;
  if (value <= closest.p97) return 97;
  return 97;
};

export const calculateBMI = (weight: number, height: number): number => {
  return weight / Math.pow(height / 100, 2);
};

export const estimateAdultHeight = (childHeight: number, ageMonths: number, gender: 'boy' | 'girl', parentHeights: { mother: number; father: number }): number => {
  // Méthode simplifiée combinant taille actuelle et cible génétique
  const geneticTarget = (parentHeights.mother + parentHeights.father + (gender === 'boy' ? 13 : -13)) / 2;
  
  // Projection basique selon l'âge
  const ageYears = ageMonths / 12;
  if (ageYears < 2) {
    return geneticTarget; // Trop jeune pour projection fiable
  }
  
  // Facteur de croissance restante approximatif
  const remainingGrowthFactor = gender === 'boy' ? 
    (18 - ageYears) / (18 - 2) : 
    (16 - ageYears) / (16 - 2);
  
  const projectedHeight = childHeight + (remainingGrowthFactor * (geneticTarget - childHeight) * 0.7);
  
  return Math.round(projectedHeight);
};
