
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { useBudgetSimulator } from '@/hooks/useBudgetSimulator';
import { FamilyProfile, BudgetScenario } from '@/types/budget-simulator';
import BudgetProfileForm from './BudgetProfileForm';
import BudgetSimulationResults from './BudgetSimulationResults';
import { Calculator, FileBarChart2, Lightbulb } from 'lucide-react';

export default function BudgetSimulatorForm() {
  const [step, setStep] = useState<'profile' | 'scenario' | 'results'>('profile');
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile | null>(null);
  const [currentSimulation, setCurrentSimulation] = useState(null);
  
  const {
    loading,
    createSimulation,
    getOptimizationTips,
    scenarios
  } = useBudgetSimulator();

  const handleProfileSubmit = (profile: FamilyProfile) => {
    setFamilyProfile(profile);
    setStep('scenario');
  };

  const handleScenarioSelect = async (scenario: BudgetScenario) => {
    if (!familyProfile) return;
    
    const simulation = await createSimulation(familyProfile, scenario);
    setCurrentSimulation(simulation);
    setStep('results');
  };

  const handleNewSimulation = () => {
    setStep('profile');
    setFamilyProfile(null);
    setCurrentSimulation(null);
  };

  const handleExportPDF = (simulation) => {
    // Simulation d'export PDF
    const element = document.createElement('a');
    const reportContent = `
Rapport Budget Bébé - ${simulation.scenario.name}
=========================================

Profil familial:
- Revenus: ${simulation.familyProfile.parentIncome.toLocaleString()}€/mois
- Région: ${simulation.familyProfile.region}
- Mode de garde: ${simulation.familyProfile.childcareMode}

Simulation budgétaire:
- Coût total année 1: ${simulation.totalFirstYear.toLocaleString()}€
- Aides publiques: ${simulation.governmentAid.toLocaleString()}€
- Coût net: ${simulation.netCost.toLocaleString()}€

Détail par poste:
${simulation.categories.map(cat => `- ${cat.name}: ${cat.yearTotal.toLocaleString()}€`).join('\n')}

Généré par MomTech Suite - ${new Date().toLocaleDateString()}
    `;
    
    const file = new Blob([reportContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `budget-bebe-${simulation.scenario.name}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (step === 'profile') {
    return (
      <Layout direction="column" gap="xl" align="center">
        <div className="text-center max-w-2xl">
          <Calculator className="h-16 w-16 mx-auto text-blue-600 mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Simulateur Budget Bébé Année 1
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Anticipez et optimisez votre budget bébé avec des simulations précises basées sur les données officielles INSEE et CAF.
          </p>
        </div>
        
        <BudgetProfileForm
          onSubmit={handleProfileSubmit}
          loading={loading}
        />
      </Layout>
    );
  }

  if (step === 'scenario') {
    return (
      <Layout direction="column" gap="xl" align="center">
        <div className="text-center">
          <FileBarChart2 className="h-16 w-16 mx-auto text-blue-600 mb-6" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Choisissez votre scénario
          </h2>
          <p className="text-lg text-slate-600">
            Sélectionnez le style de vie qui correspond à vos priorités
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {scenarios.map(scenario => (
            <Card 
              key={scenario.id} 
              variant="interactive" 
              size="lg"
              onClick={() => handleScenarioSelect(scenario)}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <Layout direction="column" gap="md" align="center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {scenario.name}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {scenario.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {scenario.preferences.secondHand && (
                      <Badge variant="secondary">Seconde main</Badge>
                    )}
                    {scenario.preferences.organic && (
                      <Badge variant="secondary">Bio</Badge>
                    )}
                    {scenario.preferences.premium && (
                      <Badge variant="secondary">Premium</Badge>
                    )}
                    {scenario.preferences.minimal && (
                      <Badge variant="secondary">Minimaliste</Badge>
                    )}
                  </div>
                </div>
                
                <Button variant="primary" size="lg" fullWidth>
                  Simuler ce scénario
                </Button>
              </Layout>
            </Card>
          ))}
        </div>
      </Layout>
    );
  }

  if (step === 'results' && currentSimulation) {
    return (
      <Layout direction="column" gap="xl">
        <div className="text-center">
          <Lightbulb className="h-16 w-16 mx-auto text-blue-600 mb-6" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Votre simulation budgétaire
          </h2>
        </div>

        <BudgetSimulationResults
          simulation={currentSimulation}
          onNewSimulation={handleNewSimulation}
          onExportPDF={handleExportPDF}
          optimizationTips={getOptimizationTips(currentSimulation)}
        />
      </Layout>
    );
  }

  return null;
}
