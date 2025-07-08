
import React, { useState } from "react";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMotorDevelopment } from "@/hooks/useMotorDevelopment";
import { ChildProfile } from "@/types/motor-development";
import { MOTOR_MILESTONES, DOMAIN_LABELS, DOMAIN_COLORS } from "@/data/motor-milestones";
import { AlertTriangle, TrendingUp, Activity, FileText } from "lucide-react";

export default function MotorDevelopmentTrackerForm() {
  const {
    childProfile,
    setChildProfile,
    getMilestonesForAge,
    evaluateChild,
    saveEvaluation,
    getRecommendedActivities,
    generateReport,
  } = useMotorDevelopment();

  const [profileForm, setProfileForm] = useState({
    name: "",
    birthDate: "",
    isPremature: false,
    gestationalAge: "",
  });

  const [selectedMilestones, setSelectedMilestones] = useState<string[]>([]);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("profile");

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: ChildProfile = {
      id: `child-${Date.now()}`,
      name: profileForm.name,
      birthDate: profileForm.birthDate,
      isPremature: profileForm.isPremature,
      gestationalAge: profileForm.gestationalAge ? Number(profileForm.gestationalAge) : undefined,
      familyHistory: [],
      createdAt: Date.now(),
    };

    setChildProfile(profile);
    setActiveTab("evaluation");
  };

  const handleEvaluation = () => {
    if (!childProfile) return;

    const newEvaluation = evaluateChild(childProfile, selectedMilestones);
    setEvaluation(newEvaluation);
    saveEvaluation(newEvaluation);
    setActiveTab("results");
  };

  const currentAge = childProfile ? 
    Math.floor((Date.now() - new Date(childProfile.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44)) : 0;
  
  const relevantMilestones = currentAge > 0 ? getMilestonesForAge(currentAge) : [];
  
  const milestonesByDomain = relevantMilestones.reduce((acc, milestone) => {
    if (!acc[milestone.domain]) acc[milestone.domain] = [];
    acc[milestone.domain].push(milestone);
    return acc;
  }, {} as Record<string, typeof relevantMilestones>);

  const recommendedActivities = evaluation ? 
    getRecommendedActivities(currentAge, evaluation.alertFlags.map((flag: string) => flag.toLowerCase())) : [];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profil Enfant</TabsTrigger>
          <TabsTrigger value="evaluation" disabled={!childProfile}>Évaluation</TabsTrigger>
          <TabsTrigger value="results" disabled={!evaluation}>Résultats</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card variant="outlined" size="md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity size={20} />
                Informations de l'enfant
              </h3>
              
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <FormItem>
                  <FormLabel>Prénom de l'enfant</FormLabel>
                  <FormControl>
                    <Input
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Prénom"
                      required
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={profileForm.birthDate}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, birthDate: e.target.value }))}
                      required
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={profileForm.isPremature}
                      onCheckedChange={(checked) => 
                        setProfileForm(prev => ({ ...prev, isPremature: !!checked }))
                      }
                      id="premature"
                    />
                    <FormLabel htmlFor="premature">Enfant prématuré</FormLabel>
                  </div>
                </FormItem>

                {profileForm.isPremature && (
                  <FormItem>
                    <FormLabel>Âge gestationnel (semaines)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="24"
                        max="42"
                        value={profileForm.gestationalAge}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, gestationalAge: e.target.value }))}
                        placeholder="ex: 36"
                      />
                    </FormControl>
                  </FormItem>
                )}

                <Button type="submit" className="w-full">
                  Créer le profil
                </Button>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          {childProfile && (
            <Card variant="outlined" size="md">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border-b">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Évaluation pour {childProfile.name} - {currentAge} mois
                </h3>
                {childProfile.isPremature && (
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Âge corrigé pris en compte pour l'évaluation
                  </p>
                )}
              </div>
              
              <div className="p-6 space-y-6">
                {Object.entries(milestonesByDomain).map(([domain, milestones]) => (
                  <div key={domain} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={DOMAIN_COLORS[domain as keyof typeof DOMAIN_COLORS]}>
                        {DOMAIN_LABELS[domain as keyof typeof DOMAIN_LABELS]}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ({milestones.length} étape{milestones.length > 1 ? 's' : ''})
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {milestones.map(milestone => (
                        <FormItem key={milestone.id} className="flex items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={selectedMilestones.includes(milestone.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedMilestones(prev => [...prev, milestone.id]);
                                } else {
                                  setSelectedMilestones(prev => prev.filter(id => id !== milestone.id));
                                }
                              }}
                              id={milestone.id}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel 
                              htmlFor={milestone.id} 
                              className="text-sm font-medium cursor-pointer"
                            >
                              {milestone.label}
                            </FormLabel>
                            <p className="text-xs text-muted-foreground">
                              {milestone.description}
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                              Âge typique: {milestone.minAgeMonths}-{milestone.maxAgeMonths} mois
                            </p>
                          </div>
                        </FormItem>
                      ))}
                    </div>
                  </div>
                ))}

                {relevantMilestones.length === 0 && (
                  <Alert>
                    <AlertDescription>
                      Aucune étape de développement n'est évaluée pour cet âge dans notre base de données.
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleEvaluation}
                  className="w-full"
                  disabled={relevantMilestones.length === 0}
                >
                  Générer l'évaluation
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {evaluation && (
            <>
              <Card variant="outlined" size="md">
                <div className="p-6 text-center">
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {evaluation.developmentScore}%
                    </div>
                    <h3 className="text-lg font-semibold">Score de développement global</h3>
                    <p className="text-sm text-muted-foreground">
                      {evaluation.completedMilestones.length} / {evaluation.totalMilestones} étapes validées
                    </p>
                  </div>
                  
                  {evaluation.developmentScore >= 80 && (
                    <Badge className="bg-green-100 text-green-800">Développement excellent</Badge>
                  )}
                  {evaluation.developmentScore >= 60 && evaluation.developmentScore < 80 && (
                    <Badge className="bg-yellow-100 text-yellow-800">Développement normal</Badge>
                  )}
                  {evaluation.developmentScore < 60 && (
                    <Badge className="bg-red-100 text-red-800">Attention requise</Badge>
                  )}
                </div>
              </Card>

              {evaluation.alertFlags.length > 0 && (
                <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/30">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800 dark:text-orange-200">
                    <strong>Points d'attention :</strong>
                    <ul className="list-disc list-inside mt-2">
                      {evaluation.alertFlags.map((flag: string, index: number) => (
                        <li key={index}>{flag}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Card variant="outlined" size="md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recommandations</h3>
                  <ul className="space-y-2">
                    {evaluation.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card variant="outlined" size="md">
                <div className="p-6">
                  <Button 
                    onClick={() => {
                      const report = generateReport(evaluation);
                      const blob = new Blob([report], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `evaluation-${childProfile?.name}-${evaluation.date}.json`;
                      a.click();
                    }}
                    className="w-full"
                    variant="outline"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Exporter le rapport d'évaluation
                  </Button>
                </div>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground text-center border-t pt-4">
        <p>
          ⚠️ Cette évaluation est indicative et ne remplace pas un avis médical professionnel.<br/>
          En cas de doute, consultez votre pédiatre.
        </p>
      </div>
    </div>
  );
}
