import React, { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/components/ui/Layout';
import { Badge } from '@/components/ui/badge';
import { SymptomEntry, SymptomPattern } from '@/types/symptom-journal';
import { SYMPTOM_TEMPLATES, SYMPTOM_CATEGORIES } from '@/data/symptom-catalog';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, BarChart3 } from 'lucide-react';

interface SymptomAnalyticsProps {
  entries: SymptomEntry[];
  patterns: SymptomPattern[];
}

export default function SymptomAnalytics({ entries, patterns }: SymptomAnalyticsProps) {
  const analytics = useMemo(() => {
    const last30Days = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return entryDate >= thirtyDaysAgo;
    });

    const last7Days = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return entryDate >= sevenDaysAgo;
    });

    // Symptômes les plus fréquents
    const symptomCounts = last30Days.reduce((acc, entry) => {
      acc[entry.symptomId] = (acc[entry.symptomId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topSymptoms = Object.entries(symptomCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([symptomId, count]) => ({
        symptom: SYMPTOM_TEMPLATES.find(s => s.id === symptomId),
        count
      }));

    // Intensité moyenne par semaine
    const weeklyIntensity = last30Days.reduce((acc, entry) => {
      const week = Math.floor((Date.now() - new Date(entry.date).getTime()) / (7 * 24 * 60 * 60 * 1000));
      if (!acc[week]) acc[week] = { total: 0, count: 0 };
      acc[week].total += entry.intensity;
      acc[week].count += 1;
      return acc;
    }, {} as Record<number, { total: number; count: number }>);

    // Déclencheurs les plus courants
    const allTriggers = last30Days.flatMap(entry => entry.triggers || []);
    const triggerCounts = allTriggers.reduce((acc, trigger) => {
      acc[trigger] = (acc[trigger] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topTriggers = Object.entries(triggerCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      totalEntries: entries.length,
      entriesLast30Days: last30Days.length,
      entriesLast7Days: last7Days.length,
      averageIntensity: last30Days.length > 0 
        ? last30Days.reduce((sum, e) => sum + e.intensity, 0) / last30Days.length 
        : 0,
      topSymptoms,
      topTriggers,
      weeklyIntensity
    };
  }, [entries]);

  const getTrendIcon = (trend: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-600" />;
      default: return <Minus className="h-4 w-4 text-slate-600" />;
    }
  };

  const getTrendColor = (trend: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': return 'text-red-600';
      case 'decreasing': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  const getTrendText = (trend: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': return 'En hausse';
      case 'decreasing': return 'En baisse';
      default: return 'Stable';
    }
  };

  if (entries.length === 0) {
    return (
      <Card variant="outlined" size="md" className="text-center py-8">
        <div className="text-slate-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="font-medium mb-2">Pas encore d'analyse</h3>
          <p className="text-sm">Ajoutez des symptômes pour voir les tendances</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistiques générales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="outlined" size="sm" className="text-center">
          <div className="text-2xl font-bold text-blue-600">{analytics.totalEntries}</div>
          <div className="text-sm text-slate-600">Total symptômes</div>
        </Card>
        <Card variant="outlined" size="sm" className="text-center">
          <div className="text-2xl font-bold text-green-600">{analytics.entriesLast7Days}</div>
          <div className="text-sm text-slate-600">Cette semaine</div>
        </Card>
        <Card variant="outlined" size="sm" className="text-center">
          <div className="text-2xl font-bold text-purple-600">{analytics.entriesLast30Days}</div>
          <div className="text-sm text-slate-600">Ce mois</div>
        </Card>
        <Card variant="outlined" size="sm" className="text-center">
          <div className="text-2xl font-bold text-orange-600">{analytics.averageIntensity.toFixed(1)}</div>
          <div className="text-sm text-slate-600">Intensité moyenne</div>
        </Card>
      </div>

      {/* Patterns et tendances */}
      {patterns.length > 0 && (
        <Card variant="elevated" size="md">
          <Layout direction="column" gap="md">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tendances détectées
            </h3>
            
            <div className="space-y-3">
              {patterns.map(pattern => {
                const symptom = SYMPTOM_TEMPLATES.find(s => s.id === pattern.symptomId);
                const category = symptom ? SYMPTOM_CATEGORIES.find(c => c.id === symptom.category) : null;
                
                return (
                  <div key={pattern.symptomId} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <Layout direction="row" gap="sm" align="center">
                      <span className="text-lg">{category?.icon}</span>
                      <div>
                        <div className="font-medium">{symptom?.name}</div>
                        <div className="text-sm text-slate-600">
                          {pattern.frequency.toFixed(1)} fois/semaine • Intensité moyenne: {pattern.averageIntensity.toFixed(1)}
                        </div>
                      </div>
                    </Layout>
                    
                    <Layout direction="row" gap="sm" align="center">
                      <div className={`flex items-center gap-1 ${getTrendColor(pattern.trendDirection)}`}>
                        {getTrendIcon(pattern.trendDirection)}
                        <span className="text-sm font-medium">{getTrendText(pattern.trendDirection)}</span>
                      </div>
                      {pattern.averageIntensity > 7 && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </Layout>
                  </div>
                );
              })}
            </div>
          </Layout>
        </Card>
      )}

      {/* Symptômes les plus fréquents */}
      {analytics.topSymptoms.length > 0 && (
        <Card variant="elevated" size="md">
          <Layout direction="column" gap="md">
            <h3 className="text-lg font-semibold text-slate-800">Symptômes les plus fréquents (30 derniers jours)</h3>
            
            <div className="space-y-2">
              {analytics.topSymptoms.map(({ symptom, count }) => {
                const category = symptom ? SYMPTOM_CATEGORIES.find(c => c.id === symptom.category) : null;
                
                return (
                  <div key={symptom?.id} className="flex items-center justify-between">
                    <Layout direction="row" gap="sm" align="center">
                      <span className="text-lg">{category?.icon}</span>
                      <span className="font-medium">{symptom?.name}</span>
                    </Layout>
                    <Badge variant="secondary">{count} fois</Badge>
                  </div>
                );
              })}
            </div>
          </Layout>
        </Card>
      )}

      {/* Déclencheurs les plus courants */}
      {analytics.topTriggers.length > 0 && (
        <Card variant="elevated" size="md">
          <Layout direction="column" gap="md">
            <h3 className="text-lg font-semibold text-slate-800">Déclencheurs les plus courants</h3>
            
            <div className="flex flex-wrap gap-2">
              {analytics.topTriggers.map(([trigger, count]) => (
                <Badge key={trigger} variant="outline" className="flex items-center gap-1">
                  {trigger}
                  <span className="bg-slate-200 text-slate-700 px-1 rounded text-xs">{count}</span>
                </Badge>
              ))}
            </div>
          </Layout>
        </Card>
      )}
    </div>
  );
}
