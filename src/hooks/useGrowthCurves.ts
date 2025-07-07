
import { useState, useCallback } from "react";
import { ChildGrowthProfile, GrowthMeasurement, GrowthAnalysis } from "@/types/growth-curves";
import { calculatePercentile, calculateBMI, estimateAdultHeight, getWHOStandards } from "@/data/growth-standards";

export function useGrowthCurves() {
  const [profile, setProfile] = useState<ChildGrowthProfile | null>(null);
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateAgeInMonths = useCallback((birthDate: string, measurementDate?: string): number => {
    const birth = new Date(birthDate);
    const measurement = measurementDate ? new Date(measurementDate) : new Date();
    const diffTime = measurement.getTime() - birth.getTime();
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44); // 30.44 jours moyens par mois
    return Math.max(0, Math.round(diffMonths * 10) / 10); // Arrondi à 0.1 mois
  }, []);

  const correctForPrematurity = useCallback((ageMonths: number, gestationalAge?: number): number => {
    if (!gestationalAge || gestationalAge >= 37) return ageMonths;
    
    const weeksEarly = 40 - gestationalAge;
    const monthsEarly = weeksEarly / 4.33; // 4.33 semaines par mois
    return Math.max(0, ageMonths - monthsEarly);
  }, []);

  const analyzeGrowth = useCallback((
    currentMeasurement: GrowthMeasurement,
    previousMeasurements: GrowthMeasurement[],
    childProfile: ChildGrowthProfile
  ): GrowthAnalysis => {
    const { weight, height, ageMonths } = currentMeasurement;
    const { gender, parentHeights, isPremature, gestationalAge } = childProfile;
    
    const correctedAge = isPremature ? correctForPrematurity(ageMonths, gestationalAge) : ageMonths;
    const bmi = calculateBMI(weight, height);

    // Calcul des percentiles
    const weightPercentile = calculatePercentile(weight, correctedAge, 'weight', gender);
    const heightPercentile = calculatePercentile(height, correctedAge, 'height', gender);
    const bmiPercentile = calculatePercentile(bmi, correctedAge, 'weight', gender); // Approximation

    // Analyse de la vélocité de croissance
    const velocityConcerns: string[] = [];
    const alerts: string[] = [];
    const recommendations: string[] = [];

    // Vérification des percentiles extrêmes
    if (weightPercentile < 3 || heightPercentile < 3) {
      alerts.push("Croissance en dessous du 3ème percentile");
      recommendations.push("Consultation pédiatrique recommandée pour évaluation approfondie");
    }
    
    if (weightPercentile > 97 || bmiPercentile > 97) {
      alerts.push("Poids élevé détecté");
      recommendations.push("Évaluation nutritionnelle et activité physique à discuter");
    }

    // Analyse de la vélocité si mesures précédentes disponibles
    if (previousMeasurements.length > 0) {
      const lastMeasurement = previousMeasurements[0];
      const timeDiffMonths = ageMonths - lastMeasurement.ageMonths;
      
      if (timeDiffMonths > 0) {
        const weightGain = weight - lastMeasurement.weight;
        const heightGain = height - lastMeasurement.height;
        
        // Vélocité mensuelle
        const weightVelocity = weightGain / timeDiffMonths;
        const heightVelocity = heightGain / timeDiffMonths;
        
        // Seuils approximatifs de vélocité par âge
        const expectedWeightVelocity = ageMonths < 12 ? 0.5 : ageMonths < 24 ? 0.2 : 0.15;
        const expectedHeightVelocity = ageMonths < 12 ? 2.0 : ageMonths < 24 ? 1.0 : 0.6;
        
        if (weightVelocity < expectedWeightVelocity * 0.5) {
          velocityConcerns.push("Ralentissement de la prise de poids");
        }
        
        if (heightVelocity < expectedHeightVelocity * 0.5) {
          velocityConcerns.push("Ralentissement de la croissance staturale");
        }
      }
    }

    // Calcul de la cible génétique
    const estimatedHeight = estimateAdultHeight(height, ageMonths, gender, parentHeights);
    const geneticTarget = (parentHeights.mother + parentHeights.father + (gender === 'boy' ? 13 : -13)) / 2;
    
    const geneticMin = geneticTarget - 8.5;
    const geneticMax = geneticTarget + 8.5;

    // Recommandations générales
    if (ageMonths < 6) {
      recommendations.push("Suivi mensuel recommandé pour les 6 premiers mois");
    } else if (ageMonths < 24) {
      recommendations.push("Suivi tous les 2-3 mois jusqu'à 2 ans");
    } else {
      recommendations.push("Suivi tous les 6 mois après 2 ans");
    }

    if (isPremature) {
      recommendations.push("Suivi spécialisé recommandé pour prématuré jusqu'à rattrapage");
    }

    return {
      currentPercentiles: {
        weight: weightPercentile,
        height: heightPercentile,
        bmi: bmiPercentile,
        headCircumference: currentMeasurement.headCircumference ? 50 : undefined // Placeholder
      },
      velocityConcerns,
      alerts,
      recommendations,
      geneticTarget: {
        minHeight: geneticMin,
        maxHeight: geneticMax,
        estimatedAdultHeight: estimatedHeight
      }
    };
  }, [correctForPrematurity]);

  const addMeasurement = useCallback((measurement: Omit<GrowthMeasurement, 'id' | 'createdAt' | 'ageMonths' | 'bmi'>) => {
    if (!profile) return null;

    const ageMonths = calculateAgeInMonths(profile.birthDate, measurement.date);
    const bmi = calculateBMI(measurement.weight, measurement.height);

    const newMeasurement: GrowthMeasurement = {
      ...measurement,
      id: `measurement-${Date.now()}`,
      ageMonths,
      bmi,
      createdAt: Date.now()
    };

    setMeasurements(prev => [newMeasurement, ...prev.filter(m => m.id !== newMeasurement.id)]);
    return newMeasurement;
  }, [profile, calculateAgeInMonths]);

  const getChartData = useCallback((type: 'weight' | 'height') => {
    if (!profile) return { measurements: [], standards: [] };

    const standards = getWHOStandards(type, profile.gender);
    const measurementData = measurements.map(m => ({
      ageMonths: m.ageMonths,
      value: type === 'weight' ? m.weight : m.height,
      date: m.date
    }));

    return {
      measurements: measurementData,
      standards: standards.map(s => ({
        ageMonths: s.ageMonths,
        p3: s.p3,
        p10: s.p10,
        p25: s.p25,
        p50: s.p50,
        p75: s.p75,
        p90: s.p90,
        p97: s.p97
      }))
    };
  }, [profile, measurements]);

  const generateReport = useCallback(() => {
    if (!profile || measurements.length === 0) return null;

    const latestMeasurement = measurements[0];
    const analysis = analyzeGrowth(latestMeasurement, measurements.slice(1), profile);

    return {
      childName: profile.name,
      birthDate: profile.birthDate,
      gender: profile.gender,
      isPremature: profile.isPremature,
      currentAge: `${Math.floor(latestMeasurement.ageMonths)} mois`,
      latestMeasurement,
      analysis,
      measurementHistory: measurements.slice(0, 10), // 10 dernières mesures
      reportDate: new Date().toISOString()
    };
  }, [profile, measurements, analyzeGrowth]);

  return {
    profile,
    measurements,
    loading,
    setProfile,
    setLoading,
    calculateAgeInMonths,
    addMeasurement,
    analyzeGrowth,
    getChartData,
    generateReport
  };
}
