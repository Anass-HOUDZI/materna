import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/components/ui/Layout';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SymptomEntry } from '@/types/symptom-journal';
import { SYMPTOM_TEMPLATES, SYMPTOM_CATEGORIES } from '@/data/symptom-catalog';
import { Trash2, Edit, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SymptomHistoryProps {
  entries: SymptomEntry[];
  onEdit: (entry: SymptomEntry) => void;
  onDelete: (id: string) => void;
}

export default function SymptomHistory({ entries, onEdit, onDelete }: SymptomHistoryProps) {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'intensity'>('date');

  const filteredEntries = entries
    .filter(entry => {
      if (filter === 'all') return true;
      const symptom = SYMPTOM_TEMPLATES.find(s => s.id === entry.symptomId);
      return symptom?.category === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.intensity - a.intensity;
    });

  const getSymptomInfo = (symptomId: string) => {
    return SYMPTOM_TEMPLATES.find(s => s.id === symptomId);
  };

  const getCategoryInfo = (categoryId: string) => {
    return SYMPTOM_CATEGORIES.find(c => c.id === categoryId);
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'bg-green-100 text-green-800';
    if (intensity <= 6) return 'bg-yellow-100 text-yellow-800';
    if (intensity <= 8) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  if (entries.length === 0) {
    return (
      <Card variant="outlined" size="md" className="text-center py-8">
        <div className="text-slate-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="font-medium mb-2">Aucun symptôme enregistré</h3>
          <p className="text-sm">Commencez par ajouter votre premier symptôme</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Tous ({entries.length})
        </Button>
        {SYMPTOM_CATEGORIES.map(category => {
          const count = entries.filter(entry => {
            const symptom = getSymptomInfo(entry.symptomId);
            return symptom?.category === category.id;
          }).length;
          
          if (count === 0) return null;
          
          return (
            <Button
              key={category.id}
              variant={filter === category.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(category.id)}
            >
              {category.icon} {category.name} ({count})
            </Button>
          );
        })}
      </div>

      {/* Tri */}
      <div className="flex gap-2">
        <Button
          variant={sortBy === 'date' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSortBy('date')}
        >
          Trier par date
        </Button>
        <Button
          variant={sortBy === 'intensity' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSortBy('intensity')}
        >
          Trier par intensité
        </Button>
      </div>

      {/* Liste des symptômes */}
      <div className="space-y-3">
        {filteredEntries.map(entry => {
          const symptom = getSymptomInfo(entry.symptomId);
          const category = symptom ? getCategoryInfo(symptom.category) : null;
          
          return (
            <Card key={entry.id} variant="outlined" size="sm" className="hover:shadow-md transition-shadow">
              <Layout direction="row" gap="md" align="center" justify="between">
                <div className="flex-1 min-w-0">
                  <Layout direction="row" gap="sm" align="center" wrap>
                    <span className="text-lg">{category?.icon}</span>
                    <div>
                      <h4 className="font-medium text-slate-800">{symptom?.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>{formatDate(entry.date)}</span>
                        <Badge className={cn('text-xs', getIntensityColor(entry.intensity))}>
                          {entry.intensity}/10
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {entry.duration}
                        </Badge>
                      </div>
                    </div>
                  </Layout>
                  
                  {entry.triggers && entry.triggers.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {entry.triggers.slice(0, 3).map(trigger => (
                        <Badge key={trigger} variant="secondary" className="text-xs">
                          {trigger}
                        </Badge>
                      ))}
                      {entry.triggers.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{entry.triggers.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {entry.notes && (
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {entry.notes}
                    </p>
                  )}
                </div>

                <Layout direction="row" gap="xs">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(entry)}
                    icon={<Edit className="h-4 w-4" />}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(entry.id)}
                    icon={<Trash2 className="h-4 w-4" />}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  />
                </Layout>
              </Layout>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
