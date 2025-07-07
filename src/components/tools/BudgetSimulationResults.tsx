
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/components/ui/Layout';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BudgetSimulation } from '@/types/budget-simulator';
import { BUDGET_SCENARIOS } from '@/data/budget-data';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { 
  Calculator, 
  TrendingDown, 
  Gift, 
  AlertCircle, 
  Download,
  RefreshCw
} from 'lucide-react';

interface BudgetSimulationResultsProps {
  simulation: BudgetSimulation;
  onNewSimulation: () => void;
  onExportPDF: (simulation: BudgetSimulation) => void;
  optimizationTips: string[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

export default function BudgetSimulationResults({ 
  simulation, 
  onNewSimulation, 
  onExportPDF,
  optimizationTips 
}: BudgetSimulationResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'tips'>('overview');

  const pieData = simulation.categories.map((cat, index) => ({
    name: cat.name,
    value: cat.yearTotal,
    color: COLORS[index % COLORS.length]
  }));

  const barData = simulation.categories.map(cat => ({
    name: cat.name.length > 10 ? cat.name.substring(0, 10) + '...' : cat.name,
    fullName: cat.name,
    annuel: cat.yearTotal,
    mensuel: Math.round(cat.yearTotal / 12)
  }));

  const incomePercentage = (simulation.netCost / (simulation.familyProfile.parentIncome * 12)) * 100;

  return (
    <div className="space-y-6">
      {/* Résumé principal */}
      <Card variant="elevated" size="lg" className="text-center">
        <Layout direction="column" gap="lg">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Budget Bébé Année 1
            </h2>
            <Badge variant="secondary" className="text-base px-4 py-2">
              Scénario {simulation.scenario.name}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {simulation.totalFirstYear.toLocaleString()}€
              </div>
              <div className="text-slate-600">Coût total année 1</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                -{simulation.governmentAid.toLocaleString()}€
              </div>
              <div className="text-slate-600">Aides publiques</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {simulation.netCost.toLocaleString()}€
              </div>
              <div className="text-slate-600">Coût net réel</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Impact sur votre budget familial</span>
              <span className="font-bold text-blue-600">{incomePercentage.toFixed(1)}%</span>
            </div>
            <Progress value={Math.min(incomePercentage, 100)} className="h-3" />
            <div className="text-sm text-slate-600 mt-2">
              {simulation.monthlyAverage.toLocaleString()}€/mois en moyenne
            </div>
          </div>
        </Layout>
      </Card>

      {/* Onglets */}
      <div className="flex gap-2 justify-center">
        <Button
          variant={activeTab === 'overview' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('overview')}
        >
          Vue d'ensemble
        </Button>
        <Button
          variant={activeTab === 'details' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('details')}
        >
          Détail par poste
        </Button>
        <Button
          variant={activeTab === 'tips' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('tips')}
        >
          Conseils d'optimisation
        </Button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graphique en secteurs */}
          <Card variant="outlined" size="md">
            <h3 className="text-xl font-bold mb-4 text-center">Répartition des dépenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value.toLocaleString()}€`, 'Coût annuel']} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Graphique en barres */}
          <Card variant="outlined" size="md">
            <h3 className="text-xl font-bold mb-4 text-center">Coûts mensuels par poste</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString()}€`, 'Coût mensuel']}
                  labelFormatter={(label, payload) => {
                    const item = payload?.[0]?.payload;
                    return item?.fullName || label;
                  }}
                />
                <Bar dataKey="mensuel" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="space-y-4">
          {simulation.categories.map((category, index) => (
            <Card key={category.id} variant="outlined" size="md">
              <Layout direction="row" gap="md" align="center" justify="between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{category.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{category.name}</h4>
                    <p className="text-slate-600 text-sm">{category.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    {category.yearTotal.toLocaleString()}€
                  </div>
                  <div className="text-sm text-slate-600">
                    {Math.round(category.yearTotal / 12).toLocaleString()}€/mois
                  </div>
                </div>
              </Layout>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {category.items.slice(0, 4).map(item => (
                  <div key={item.name} className="flex justify-between py-1">
                    <span className="text-slate-600">{item.name}</span>
                    <span className="font-medium">{item.cost.toLocaleString()}€</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="space-y-4">
          <Card variant="outlined" size="md" className="border-orange-200 bg-orange-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-orange-800 mb-2">
                  Conseils pour optimiser votre budget
                </h3>
                <ul className="space-y-2">
                  {optimizationTips.map((tip, index) => (
                    <li key={index} className="text-orange-700 flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Comparaison scénarios */}
          <Card variant="outlined" size="md">
            <h3 className="font-bold text-lg mb-4">Comparaison des scénarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BUDGET_SCENARIOS.map(scenario => {
                const estimatedCost = Math.round(
                  simulation.totalFirstYear / simulation.scenario.multiplier * scenario.multiplier
                );
                const isActive = scenario.id === simulation.scenario.id;
                
                return (
                  <div 
                    key={scenario.id} 
                    className={`p-4 rounded-xl border-2 ${
                      isActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                    }`}
                  >
                    <h4 className="font-bold mb-1">{scenario.name}</h4>
                    <div className="text-lg font-bold text-blue-600 mb-2">
                      {estimatedCost.toLocaleString()}€
                    </div>
                    <p className="text-sm text-slate-600">{scenario.description}</p>
                    {isActive && (
                      <Badge variant="secondary" className="mt-2">Actuel</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          onClick={onNewSimulation}
          icon={<RefreshCw className="h-4 w-4" />}
        >
          Nouvelle simulation
        </Button>
        <Button
          variant="primary"
          onClick={() => onExportPDF(simulation)}
          icon={<Download className="h-4 w-4" />}
        >
          Exporter le rapport PDF
        </Button>
      </div>
    </div>
  );
}
