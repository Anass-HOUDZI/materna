import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/components/ui/Layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { SYMPTOM_CATEGORIES, SYMPTOM_TEMPLATES, COMMON_TRIGGERS, COMMON_REMEDIES } from '@/data/symptom-catalog';
import { SymptomEntry } from '@/types/symptom-journal';

interface SymptomEntryFormProps {
  onSubmit: (entry: Omit<SymptomEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
}

export default function SymptomEntryForm({ onSubmit, onCancel }: SymptomEntryFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [formData, setFormData] = useState<{
    date: string;
    intensity: number;
    duration: 'ponctuel' | 'persistant';
    triggers: string[];
    remediesTried: string[];
    remedyEffectiveness: number;
    notes: string;
  }>({
    date: new Date().toISOString().split('T')[0],
    intensity: 5,
    duration: 'ponctuel',
    triggers: [],
    remediesTried: [],
    remedyEffectiveness: 5,
    notes: ''
  });

  const availableSymptoms = selectedCategory 
    ? SYMPTOM_TEMPLATES.filter(s => s.category === selectedCategory)
    : [];

  const selectedSymptomTemplate = SYMPTOM_TEMPLATES.find(s => s.id === selectedSymptom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSymptom) return;

    onSubmit({
      symptomId: selectedSymptom,
      ...formData
    });

    // Reset form
    setSelectedCategory('');
    setSelectedSymptom('');
    setFormData({
      date: new Date().toISOString().split('T')[0],
      intensity: 5,
      duration: 'ponctuel',
      triggers: [],
      remediesTried: [],
      remedyEffectiveness: 5,
      notes: ''
    });
  };

  const toggleTrigger = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  const toggleRemedy = (remedy: string) => {
    setFormData(prev => ({
      ...prev,
      remediesTried: prev.remediesTried.includes(remedy)
        ? prev.remediesTried.filter(r => r !== remedy)
        : [...prev.remediesTried, remedy]
    }));
  };

  return (
    <Card variant="elevated" size="md" className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center pb-4 border-b">
          <h3 className="text-xl font-semibold text-slate-800">Ajouter un symptôme</h3>
          <p className="text-slate-600 mt-1">Documentez votre symptôme pour un suivi optimal</p>
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="mt-1"
            required
          />
        </div>

        {/* Catégorie */}
        <div>
          <Label>Catégorie de symptôme</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {SYMPTOM_CATEGORIES.map(category => (
              <Button
                key={category.id}
                type="button"
                variant={selectedCategory === category.id ? "primary" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedSymptom('');
                }}
                className="h-auto p-3 flex flex-col items-center gap-1"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-xs font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Symptôme spécifique */}
        {selectedCategory && (
          <div>
            <Label>Symptôme spécifique</Label>
            <div className="grid gap-2 mt-2">
              {availableSymptoms.map(symptom => (
                <Button
                  key={symptom.id}
                  type="button"
                  variant={selectedSymptom === symptom.id ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSymptom(symptom.id)}
                  className="justify-start h-auto p-3"
                >
                  <div className="text-left">
                    <div className="font-medium">{symptom.name}</div>
                    <div className="text-xs opacity-75">{symptom.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {selectedSymptom && (
          <>
            {/* Intensité */}
            <div>
              <Label>Intensité (1-10)</Label>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>Léger</span>
                  <span className="font-medium">Intensité: {formData.intensity}</span>
                  <span>Sévère</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.intensity}
                  onChange={(e) => setFormData(prev => ({ ...prev, intensity: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Durée */}
            <div>
              <Label>Durée</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant={formData.duration === 'ponctuel' ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, duration: 'ponctuel' }))}
                >
                  Ponctuel
                </Button>
                <Button
                  type="button"
                  variant={formData.duration === 'persistant' ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, duration: 'persistant' }))}
                >
                  Persistant
                </Button>
              </div>
            </div>

            {/* Déclencheurs */}
            <div>
              <Label>Déclencheurs possibles</Label>
              <div className="flex flex-wrap gap-1 mt-2">
                {(selectedSymptomTemplate?.commonTriggers || COMMON_TRIGGERS).map(trigger => (
                  <Button
                    key={trigger}
                    type="button"
                    variant={formData.triggers.includes(trigger) ? "primary" : "outline"}
                    size="xs"
                    onClick={() => toggleTrigger(trigger)}
                  >
                    {trigger}
                  </Button>
                ))}
              </div>
            </div>

            {/* Remèdes essayés */}
            <div>
              <Label>Remèdes essayés</Label>
              <div className="flex flex-wrap gap-1 mt-2">
                {COMMON_REMEDIES.map(remedy => (
                  <Button
                    key={remedy}
                    type="button"
                    variant={formData.remediesTried.includes(remedy) ? "primary" : "outline"}
                    size="xs"
                    onClick={() => toggleRemedy(remedy)}
                  >
                    {remedy}
                  </Button>
                ))}
              </div>
            </div>

            {/* Efficacité des remèdes */}
            {formData.remediesTried.length > 0 && (
              <div>
                <Label>Efficacité des remèdes (1-10)</Label>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-slate-600 mb-2">
                    <span>Inefficace</span>
                    <span className="font-medium">Efficacité: {formData.remedyEffectiveness}</span>
                    <span>Très efficace</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.remedyEffectiveness}
                    onChange={(e) => setFormData(prev => ({ ...prev, remedyEffectiveness: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes personnelles</Label>
              <Textarea
                id="notes"
                placeholder="Décrivez le contexte, vos ressentis, ou toute information utile..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Actions */}
            <Layout direction="row" gap="md" justify="end" className="pt-4 border-t">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Annuler
                </Button>
              )}
              <Button type="submit" variant="primary">
                Enregistrer le symptôme
              </Button>
            </Layout>
          </>
        )}
      </form>
    </Card>
  );
}
