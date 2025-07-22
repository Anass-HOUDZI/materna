
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { useSymptomJournal } from '@/hooks/useSymptomJournal';
import SymptomEntryForm from './SymptomEntryForm';
import SymptomHistory from './SymptomHistory';
import SymptomAnalytics from './SymptomAnalytics';
import MedicalReportGenerator from './MedicalReportGenerator';
import { SymptomEntry } from '@/types/symptom-journal';
import { Plus, History, BarChart3, FileText, BookOpen } from 'lucide-react';

type TabType = 'add' | 'history' | 'analytics' | 'reports' | 'guide';

export default function PregnancySymptomJournalForm() {
  const [activeTab, setActiveTab] = useState<TabType>('add');
  const [editingEntry, setEditingEntry] = useState<SymptomEntry | null>(null);
  
  const {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    analyzePatterns,
    generateReport,
    stats
  } = useSymptomJournal();

  const patterns = analyzePatterns(30);

  const handleAddEntry = (entryData: Omit<SymptomEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    addEntry(entryData);
    setActiveTab('history');
  };

  const handleEditEntry = (entry: SymptomEntry) => {
    setEditingEntry(entry);
    setActiveTab('add');
  };

  const handleUpdateEntry = (entryData: Omit<SymptomEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, entryData);
      setEditingEntry(null);
      setActiveTab('history');
    }
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
    setActiveTab('history');
  };

  const tabs = [
    {
      id: 'add' as const,
      label: editingEntry ? 'Modifier' : 'Ajouter',
      icon: <Plus className="h-4 w-4" />,
      badge: null
    },
    {
      id: 'history' as const,
      label: 'Historique',
      icon: <History className="h-4 w-4" />,
      badge: entries.length > 0 ? entries.length : null
    },
    {
      id: 'analytics' as const,
      label: 'Analyse',
      icon: <BarChart3 className="h-4 w-4" />,
      badge: patterns.length > 0 ? patterns.length : null
    },
    {
      id: 'reports' as const,
      label: 'Rapports',
      icon: <FileText className="h-4 w-4" />,
      badge: null
    },
    {
      id: 'guide' as const,
      label: 'Guide',
      icon: <BookOpen className="h-4 w-4" />,
      badge: null
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{stats.totalEntries}</div>
          <div className="text-sm text-blue-800">Total symptômes</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="text-2xl font-bold text-green-600">{stats.entriesLast7Days}</div>
          <div className="text-sm text-green-800">Cette semaine</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{stats.uniqueSymptoms}</div>
          <div className="text-sm text-purple-800">Types différents</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">{stats.averageIntensity.toFixed(1)}</div>
          <div className="text-sm text-orange-800">Intensité moyenne</div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-lg">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            icon={tab.icon}
            className="flex-1 min-w-0 justify-center gap-2"
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.icon}</span>
            {tab.badge && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {tab.badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <div className="min-h-[400px]">
        {activeTab === 'add' && (
          <SymptomEntryForm
            onSubmit={editingEntry ? handleUpdateEntry : handleAddEntry}
            onCancel={editingEntry ? handleCancelEdit : undefined}
          />
        )}

        {activeTab === 'history' && (
          <SymptomHistory
            entries={entries}
            onEdit={handleEditEntry}
            onDelete={deleteEntry}
          />
        )}

        {activeTab === 'analytics' && (
          <SymptomAnalytics
            entries={entries}
            patterns={patterns}
          />
        )}

        {activeTab === 'reports' && (
          <MedicalReportGenerator
            onGenerateReport={generateReport}
          />
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div className="text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h2 className="text-xl font-semibold bg-clip-text text-transparent mb-2" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Guide d'utilisation</h2>
              <p className="text-slate-600">Conseils pour optimiser votre suivi</p>
            </div>

            <div className="grid gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">💡 Conseil #1: Régularité</h3>
                <p className="text-blue-700 text-sm">Enregistrez vos symptômes quotidiennement, même les plus légers. Cela aide à détecter des patterns subtils.</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">📊 Conseil #2: Détails</h3>
                <p className="text-green-700 text-sm">Notez les déclencheurs et remèdes essayés. Ces informations sont précieuses pour votre médecin.</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">⚠️ Conseil #3: Vigilance</h3>
                <p className="text-purple-700 text-sm">Consultez rapidement si un symptôme s'aggrave brutalement ou si de nouveaux symptômes apparaissent.</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-orange-800 mb-2">📋 Conseil #4: Rapport médical</h3>
                <p className="text-orange-700 text-sm">Générez un rapport avant chaque consultation pour faciliter les échanges avec votre professionnel de santé.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-2">🔒 Confidentialité</h3>
              <p className="text-slate-700 text-sm">
                Toutes vos données sont stockées localement sur votre appareil et chiffrées. 
                Elles ne sont jamais transmises à l'extérieur, garantissant votre confidentialité totale.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
