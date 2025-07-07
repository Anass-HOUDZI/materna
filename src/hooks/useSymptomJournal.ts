
import { useState, useCallback, useMemo } from 'react';
import { SymptomEntry, SymptomPattern, MedicalReport } from '@/types/symptom-journal';
import { SYMPTOM_TEMPLATES } from '@/data/symptom-catalog';

const STORAGE_KEY = 'pregnancy-symptom-journal';

export function useSymptomJournal() {
  const [entries, setEntries] = useState<SymptomEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveToStorage = useCallback((newEntries: SymptomEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
    } catch (error) {
      console.error('Erreur sauvegarde journal:', error);
    }
  }, []);

  const addEntry = useCallback((entry: Omit<SymptomEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: SymptomEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const newEntries = [...entries, newEntry];
    setEntries(newEntries);
    saveToStorage(newEntries);
    return newEntry;
  }, [entries, saveToStorage]);

  const updateEntry = useCallback((id: string, updates: Partial<SymptomEntry>) => {
    const newEntries = entries.map(entry => 
      entry.id === id 
        ? { ...entry, ...updates, updatedAt: Date.now() }
        : entry
    );
    setEntries(newEntries);
    saveToStorage(newEntries);
  }, [entries, saveToStorage]);

  const deleteEntry = useCallback((id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    setEntries(newEntries);
    saveToStorage(newEntries);
  }, [entries, saveToStorage]);

  const getEntriesForPeriod = useCallback((startDate: string, endDate: string) => {
    return entries.filter(entry => 
      entry.date >= startDate && entry.date <= endDate
    );
  }, [entries]);

  const analyzePatterns = useCallback((days: number = 30): SymptomPattern[] => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffString = cutoffDate.toISOString().split('T')[0];

    const recentEntries = entries.filter(entry => entry.date >= cutoffString);
    const symptomGroups = recentEntries.reduce((acc, entry) => {
      if (!acc[entry.symptomId]) acc[entry.symptomId] = [];
      acc[entry.symptomId].push(entry);
      return acc;
    }, {} as Record<string, SymptomEntry[]>);

    return Object.entries(symptomGroups).map(([symptomId, symptomEntries]) => {
      const frequency = symptomEntries.length / (days / 7); // per week
      const averageIntensity = symptomEntries.reduce((sum, e) => sum + e.intensity, 0) / symptomEntries.length;
      
      // Analyse des triggers
      const allTriggers = symptomEntries.flatMap(e => e.triggers || []);
      const triggerCounts = allTriggers.reduce((acc, trigger) => {
        acc[trigger] = (acc[trigger] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const commonTriggers = Object.entries(triggerCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([trigger]) => trigger);

      // Tendance (simplifié)
      const recentHalf = symptomEntries.slice(-Math.floor(symptomEntries.length / 2));
      const olderHalf = symptomEntries.slice(0, Math.floor(symptomEntries.length / 2));
      const recentAvg = recentHalf.reduce((sum, e) => sum + e.intensity, 0) / recentHalf.length;
      const olderAvg = olderHalf.reduce((sum, e) => sum + e.intensity, 0) / olderHalf.length;
      
      let trendDirection: 'increasing' | 'decreasing' | 'stable' = 'stable';
      if (recentAvg > olderAvg + 0.5) trendDirection = 'increasing';
      else if (recentAvg < olderAvg - 0.5) trendDirection = 'decreasing';

      return {
        symptomId,
        frequency,
        averageIntensity,
        commonTriggers,
        trendDirection,
        correlations: [] // Simplifiée pour l'instant
      };
    });
  }, [entries]);

  const generateReport = useCallback((startDate: string, endDate: string): MedicalReport => {
    const reportEntries = getEntriesForPeriod(startDate, endDate);
    const patterns = analyzePatterns();
    
    const alerts: string[] = [];
    
    // Vérifications automatiques
    patterns.forEach(pattern => {
      if (pattern.averageIntensity > 8) {
        const symptom = SYMPTOM_TEMPLATES.find(s => s.id === pattern.symptomId);
        alerts.push(`Intensité élevée pour ${symptom?.name}: ${pattern.averageIntensity.toFixed(1)}/10`);
      }
      if (pattern.trendDirection === 'increasing') {
        const symptom = SYMPTOM_TEMPLATES.find(s => s.id === pattern.symptomId);
        alerts.push(`Tendance à la hausse pour ${symptom?.name}`);
      }
    });

    const summary = `Période analysée: ${reportEntries.length} symptômes enregistrés. ${alerts.length > 0 ? `${alerts.length} point(s) d'attention identifié(s).` : 'Aucun point d\'attention particulier.'}`;

    return {
      id: crypto.randomUUID(),
      generatedAt: Date.now(),
      period: { start: startDate, end: endDate },
      symptoms: reportEntries,
      patterns,
      alerts,
      summary
    };
  }, [getEntriesForPeriod, analyzePatterns]);

  const stats = useMemo(() => {
    const totalEntries = entries.length;
    const uniqueSymptoms = new Set(entries.map(e => e.symptomId)).size;
    const averageIntensity = entries.length > 0 
      ? entries.reduce((sum, e) => sum + e.intensity, 0) / entries.length 
      : 0;
    
    const last7Days = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });

    return {
      totalEntries,
      uniqueSymptoms,
      averageIntensity,
      entriesLast7Days: last7Days.length
    };
  }, [entries]);

  return {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesForPeriod,
    analyzePatterns,
    generateReport,
    stats
  };
}
