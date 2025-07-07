
import { useState, useCallback, useMemo } from "react";
import { MotorEvaluation, ChildProfile, MotorMilestone } from "@/types/motor-development";
import { MOTOR_MILESTONES, STIMULUS_ACTIVITIES } from "@/data/motor-milestones";

export function useMotorDevelopment() {
  const [evaluations, setEvaluations] = useState<MotorEvaluation[]>([]);
  const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateCorrectedAge = useCallback((birthDate: string, isPremature: boolean, gestationalAge?: number) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const ageMonths = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    
    if (!isPremature || !gestationalAge) return ageMonths;
    
    const correction = Math.max(0, (40 - gestationalAge) / 4.33); // 4.33 semaines par mois
    return Math.max(0, ageMonths - correction);
  }, []);

  const getMilestonesForAge = useCallback((ageMonths: number): MotorMilestone[] => {
    return MOTOR_MILESTONES.filter(milestone => 
      ageMonths >= milestone.minAgeMonths && ageMonths <= milestone.maxAgeMonths
    );
  }, []);

  const evaluateChild = useCallback((
    profile: ChildProfile,
    completedMilestones: string[]
  ): MotorEvaluation => {
    const ageMonths = calculateCorrectedAge(profile.birthDate, profile.isPremature, profile.gestationalAge);
    const correctedAge = profile.isPremature ? ageMonths : undefined;
    const relevantMilestones = getMilestonesForAge(ageMonths);
    
    // Score par domaine
    const scoreByDomain: Record<string, { completed: number; total: number }> = {};
    const domains = [...new Set(relevantMilestones.map(m => m.domain))];
    
    domains.forEach(domain => {
      const domainMilestones = relevantMilestones.filter(m => m.domain === domain);
      const completed = domainMilestones.filter(m => completedMilestones.includes(m.id)).length;
      scoreByDomain[domain] = {
        completed,
        total: domainMilestones.length
      };
    });

    // Score global
    const totalCompleted = completedMilestones.filter(id => 
      relevantMilestones.some(m => m.id === id)
    ).length;
    const developmentScore = relevantMilestones.length > 0 
      ? Math.round((totalCompleted / relevantMilestones.length) * 100) 
      : 0;

    // Alertes et recommandations
    const alertFlags: string[] = [];
    const recommendations: string[] = [];

    if (developmentScore < 60) {
      alertFlags.push("Retard développement possible");
      recommendations.push("Consultez votre pédiatre pour évaluation approfondie");
    }

    // Vérification retards par domaine
    Object.entries(scoreByDomain).forEach(([domain, score]) => {
      const percentage = score.total > 0 ? (score.completed / score.total) * 100 : 100;
      if (percentage < 50) {
        alertFlags.push(`Retard ${domain}`);
        recommendations.push(`Stimulation ciblée recommandée pour ${domain}`);
      }
    });

    // Recommandations d'activités
    const targetedActivities = STIMULUS_ACTIVITIES.filter(activity => 
      Math.abs(activity.targetAgeMonths - ageMonths) <= 3
    );
    
    targetedActivities.slice(0, 2).forEach(activity => {
      recommendations.push(`Activité recommandée: ${activity.title}`);
    });

    return {
      id: `eval-${Date.now()}`,
      childId: profile.id,
      date: new Date().toISOString().split('T')[0],
      ageMonths: Math.floor(calculateCorrectedAge(profile.birthDate, false)),
      isPremature: profile.isPremature,
      correctedAgeMonths: correctedAge,
      completedMilestones,
      totalMilestones: relevantMilestones.length,
      scoreByDomain,
      developmentScore,
      recommendations,
      alertFlags,
      createdAt: Date.now(),
    };
  }, [calculateCorrectedAge, getMilestonesForAge]);

  const saveEvaluation = useCallback((evaluation: MotorEvaluation) => {
    setEvaluations(prev => [evaluation, ...prev]);
  }, []);

  const getRecommendedActivities = useCallback((ageMonths: number, weakDomains: string[] = []) => {
    return STIMULUS_ACTIVITIES.filter(activity => {
      const ageMatch = Math.abs(activity.targetAgeMonths - ageMonths) <= 6;
      const domainMatch = weakDomains.length === 0 || weakDomains.includes(activity.domain);
      return ageMatch && domainMatch;
    }).slice(0, 5);
  }, []);

  const generateReport = useCallback((evaluation: MotorEvaluation) => {
    const profile = childProfile;
    if (!profile) return "";

    const reportData = {
      childName: profile.name,
      evaluationDate: evaluation.date,
      chronologicalAge: `${evaluation.ageMonths} mois`,
      correctedAge: evaluation.correctedAgeMonths ? `${evaluation.correctedAgeMonths} mois` : "N/A",
      developmentScore: `${evaluation.developmentScore}%`,
      domainScores: evaluation.scoreByDomain,
      alertFlags: evaluation.alertFlags,
      recommendations: evaluation.recommendations,
    };

    return JSON.stringify(reportData, null, 2);
  }, [childProfile]);

  return {
    evaluations,
    childProfile,
    loading,
    setChildProfile,
    calculateCorrectedAge,
    getMilestonesForAge,
    evaluateChild,
    saveEvaluation,
    getRecommendedActivities,
    generateReport,
  };
}
