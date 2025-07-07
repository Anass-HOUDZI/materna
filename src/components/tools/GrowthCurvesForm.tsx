
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useGrowthCurves } from "@/hooks/useGrowthCurves";
import { ChildGrowthProfile } from "@/types/growth-curves";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Download, Baby } from "lucide-react";

const chartConfig = {
  p3: {
    label: "3ème percentile",
    color: "#ef4444",
  },
  p10: {
    label: "10ème percentile", 
    color: "#f97316",
  },
  p25: {
    label: "25ème percentile",
    color: "#eab308",
  },
  p50: {
    label: "50ème percentile (médiane)",
    color: "#22c55e",
  },
  p75: {
    label: "75ème percentile",
    color: "#3b82f6",
  },
  p90: {
    label: "90ème percentile",
    color: "#8b5cf6",
  },
  p97: {
    label: "97ème percentile",
    color: "#ec4899",
  },
  measurement: {
    label: "Mesures de l'enfant",
    color: "#dc2626",
  },
};

export default function GrowthCurvesForm() {
  const { 
    profile, 
    measurements, 
    setProfile, 
    addMeasurement, 
    analyzeGrowth, 
    getChartData,
    generateReport
  } = useGrowthCurves();

  const [newMeasurement, setNewMeasurement] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    height: '',
    headCircumference: ''
  });

  const [showProfileForm, setShowProfileForm] = useState(!profile);

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProfile: ChildGrowthProfile = {
      id: `child-${Date.now()}`,
      name: formData.get('name') as string,
      birthDate: formData.get('birthDate') as string,
      gender: formData.get('gender') as 'boy' | 'girl',
      isPremature: formData.get('isPremature') === 'true',
      gestationalAge: formData.get('gestationalAge') ? Number(formData.get('gestationalAge')) : undefined,
      parentHeights: {
        mother: Number(formData.get('motherHeight')),
        father: Number(formData.get('fatherHeight'))
      },
      ethnicity: formData.get('ethnicity') as string,
      familyHistory: [],
      createdAt: Date.now()
    };

    setProfile(newProfile);
    setShowProfileForm(false);
  };

  const handleAddMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const measurement = addMeasurement({
      childId: profile.id,
      date: newMeasurement.date,
      weight: Number(newMeasurement.weight),
      height: Number(newMeasurement.height),
      headCircumference: newMeasurement.headCircumference ? Number(newMeasurement.headCircumference) : undefined
    });

    if (measurement) {
      setNewMeasurement({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        height: '',
        headCircumference: ''
      });
    }
  };

  const weightData = getChartData('weight');
  const heightData = getChartData('height');

  const analysis = profile && measurements.length > 0 
    ? analyzeGrowth(measurements[0], measurements.slice(1), profile)
    : null;

  const exportReport = () => {
    const report = generateReport();
    if (report) {
      const reportText = JSON.stringify(report, null, 2);
      const blob = new Blob([reportText], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rapport-croissance-${profile?.name}-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (showProfileForm) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="w-5 h-5 text-blue-500" />
            Profil de l'enfant
          </CardTitle>
          <CardDescription>
            Créez le profil de votre enfant pour commencer le suivi de croissance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Prénom de l'enfant</Label>
                <Input id="name" name="name" required placeholder="Emma, Lucas..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date de naissance</Label>
                <Input id="birthDate" name="birthDate" type="date" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Sexe</Label>
                <Select name="gender" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="girl">Fille</SelectItem>
                    <SelectItem value="boy">Garçon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="isPremature">Naissance prématurée ?</Label>
                <Select name="isPremature">
                  <SelectTrigger>
                    <SelectValue placeholder="Non" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Non</SelectItem>
                    <SelectItem value="true">Oui</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gestationalAge">Âge gestationnel (semaines)</Label>
                <Input 
                  id="gestationalAge" 
                  name="gestationalAge" 
                  type="number" 
                  min="24" 
                  max="42" 
                  placeholder="39"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherHeight">Taille mère (cm)</Label>
                <Input 
                  id="motherHeight" 
                  name="motherHeight" 
                  type="number" 
                  min="140" 
                  max="200" 
                  required
                  placeholder="165"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherHeight">Taille père (cm)</Label>
                <Input 
                  id="fatherHeight" 
                  name="fatherHeight" 
                  type="number" 
                  min="150" 
                  max="220" 
                  required
                  placeholder="175"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ethnicity">Origine ethnique (optionnel)</Label>
                <Input id="ethnicity" name="ethnicity" placeholder="Européenne, Africaine..." />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Créer le profil et commencer le suivi
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header avec infos enfant */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-blue-500" />
                Suivi de croissance - {profile?.name}
              </CardTitle>
              <CardDescription>
                {profile?.gender === 'boy' ? 'Garçon' : 'Fille'} • Né(e) le {new Date(profile?.birthDate || '').toLocaleDateString('fr-FR')}
                {profile?.isPremature && ' • Prématuré'}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowProfileForm(true)}>
                Modifier profil
              </Button>
              {measurements.length > 0 && (
                <Button variant="outline" onClick={exportReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulaire ajout mesure */}
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle mesure</CardTitle>
            <CardDescription>Ajoutez les dernières mesures de votre enfant</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMeasurement} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="measureDate">Date de mesure</Label>
                <Input 
                  id="measureDate"
                  type="date" 
                  value={newMeasurement.date}
                  onChange={(e) => setNewMeasurement(prev => ({ ...prev, date: e.target.value }))}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Poids (kg)</Label>
                <Input 
                  id="weight"
                  type="number" 
                  step="0.01"
                  min="0.5"
                  max="150"
                  value={newMeasurement.weight}
                  onChange={(e) => setNewMeasurement(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="3.5"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Taille (cm)</Label>
                <Input 
                  id="height"
                  type="number" 
                  step="0.1"
                  min="30"
                  max="200"
                  value={newMeasurement.height}
                  onChange={(e) => setNewMeasurement(prev => ({ ...prev, height: e.target.value }))}
                  placeholder="50.5"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headCirc">Périmètre crânien (cm) - optionnel</Label>
                <Input 
                  id="headCirc"
                  type="number" 
                  step="0.1"
                  min="25"
                  max="60"
                  value={newMeasurement.headCircumference}
                  onChange={(e) => setNewMeasurement(prev => ({ ...prev, headCircumference: e.target.value }))}
                  placeholder="35.0"
                />
              </div>

              <Button type="submit" className="w-full">
                Ajouter la mesure
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Analyse actuelle */}
        <div className="lg:col-span-2">
          {analysis && measurements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Analyse de croissance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Percentiles actuels */}
                <div>
                  <h4 className="font-medium mb-2">Percentiles actuels</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      Poids: {analysis.currentPercentiles.weight}ème percentile
                    </Badge>
                    <Badge variant="outline">
                      Taille: {analysis.currentPercentiles.height}ème percentile
                    </Badge>
                    <Badge variant="outline">
                      IMC: {analysis.currentPercentiles.bmi}ème percentile
                    </Badge>
                  </div>
                </div>

                {/* Alertes */}
                {analysis.alerts.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      Points d'attention
                    </h4>
                    <div className="space-y-1">
                      {analysis.alerts.map((alert, index) => (
                        <Badge key={index} variant="destructive" className="block w-fit">
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cible génétique */}
                <div>
                  <h4 className="font-medium mb-2">Taille cible génétique</h4>
                  <p className="text-sm text-muted-foreground">
                    Estimation: {analysis.geneticTarget.estimatedAdultHeight} cm 
                    (fourchette: {analysis.geneticTarget.minHeight}-{analysis.geneticTarget.maxHeight} cm)
                  </p>
                </div>

                {/* Recommandations */}
                {analysis.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Recommandations</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Graphiques */}
      {measurements.length > 0 && (
        <Tabs defaultValue="weight" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weight">Courbe de poids</TabsTrigger>
            <TabsTrigger value="height">Courbe de taille</TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Évolution du poids</CardTitle>
                <CardDescription>
                  Courbes de référence OMS et mesures de {profile?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData.standards}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="ageMonths" 
                        label={{ value: 'Âge (mois)', position: 'insideBottom', offset: -10 }}
                      />
                      <YAxis 
                        label={{ value: 'Poids (kg)', angle: -90, position: 'insideLeft' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      
                      {/* Courbes percentiles */}
                      <Line type="monotone" dataKey="p3" stroke="var(--color-p3)" strokeWidth={1} dot={false} name="3ème percentile" />
                      <Line type="monotone" dataKey="p10" stroke="var(--color-p10)" strokeWidth={1} dot={false} name="10ème percentile" />
                      <Line type="monotone" dataKey="p25" stroke="var(--color-p25)" strokeWidth={1} dot={false} name="25ème percentile" />
                      <Line type="monotone" dataKey="p50" stroke="var(--color-p50)" strokeWidth={2} dot={false} name="50ème percentile" />
                      <Line type="monotone" dataKey="p75" stroke="var(--color-p75)" strokeWidth={1} dot={false} name="75ème percentile" />
                      <Line type="monotone" dataKey="p90" stroke="var(--color-p90)" strokeWidth={1} dot={false} name="90ème percentile" />
                      <Line type="monotone" dataKey="p97" stroke="var(--color-p97)" strokeWidth={1} dot={false} name="97ème percentile" />
                      
                      {/* Points des mesures */}
                      {weightData.measurements.map((point, index) => (
                        <Line 
                          key={index}
                          type="monotone" 
                          dataKey={() => point.value}
                          stroke="var(--color-measurement)" 
                          strokeWidth={3}
                          dot={{ fill: "var(--color-measurement)", strokeWidth: 2, r: 4 }}
                          name={profile?.name}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="height" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Évolution de la taille</CardTitle>
                <CardDescription>
                  Courbes de référence OMS et mesures de {profile?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={heightData.standards}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="ageMonths" 
                        label={{ value: 'Âge (mois)', position: 'insideBottom', offset: -10 }}
                      />
                      <YAxis 
                        label={{ value: 'Taille (cm)', angle: -90, position: 'insideLeft' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      
                      {/* Courbes percentiles */}
                      <Line type="monotone" dataKey="p3" stroke="var(--color-p3)" strokeWidth={1} dot={false} name="3ème percentile" />
                      <Line type="monotone" dataKey="p10" stroke="var(--color-p10)" strokeWidth={1} dot={false} name="10ème percentile" />
                      <Line type="monotone" dataKey="p25" stroke="var(--color-p25)" strokeWidth={1} dot={false} name="25ème percentile" />
                      <Line type="monotone" dataKey="p50" stroke="var(--color-p50)" strokeWidth={2} dot={false} name="50ème percentile" />
                      <Line type="monotone" dataKey="p75" stroke="var(--color-p75)" strokeWidth={1} dot={false} name="75ème percentile" />
                      <Line type="monotone" dataKey="p90" stroke="var(--color-p90)" strokeWidth={1} dot={false} name="90ème percentile" />
                      <Line type="monotone" dataKey="p97" stroke="var(--color-p97)" strokeWidth={1} dot={false} name="97ème percentile" />
                      
                      {/* Points des mesures */}
                      {heightData.measurements.map((point, index) => (
                        <Line 
                          key={index}
                          type="monotone" 
                          dataKey={() => point.value}
                          stroke="var(--color-measurement)" 
                          strokeWidth={3}
                          dot={{ fill: "var(--color-measurement)", strokeWidth: 2, r: 4 }}
                          name={profile?.name}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Historique des mesures */}
      {measurements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Historique des mesures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {measurements.slice(0, 5).map((measurement) => (
                <div key={measurement.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{new Date(measurement.date).toLocaleDateString('fr-FR')}</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(measurement.ageMonths)} mois
                    </p>
                  </div>
                  <div className="text-right">
                    <p>{measurement.weight} kg • {measurement.height} cm</p>
                    <p className="text-sm text-muted-foreground">
                      IMC: {measurement.bmi.toFixed(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
