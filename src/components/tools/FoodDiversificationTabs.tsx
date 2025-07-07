
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFoodDiversification } from "@/hooks/useFoodDiversification";
import { DiversificationProfile } from "@/types/food-diversification";
import { Baby, Calendar, ChefHat, AlertTriangle, CheckCircle, XCircle, Download, Clock, Utensils } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function FoodDiversificationTabs() {
  const {
    profile,
    setProfile,
    calculateCurrentAge,
    getAppropriteFoods,
    addFoodReaction,
    getCurrentRecommendations,
    getProgressReport,
    exportDiversificationReport,
    checkAllergenRisk,
    foodsDatabase,
    majorAllergens
  } = useFoodDiversification();

  const [showProfileForm, setShowProfileForm] = useState(!profile);
  const [selectedFood, setSelectedFood] = useState<string>('');

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProfile: DiversificationProfile = {
      id: `div-${Date.now()}`,
      babyName: formData.get('babyName') as string,
      birthDate: formData.get('birthDate') as string,
      startDate: formData.get('startDate') as string,
      feedingMode: formData.get('feedingMode') as 'traditional' | 'dme' | 'mixed',
      allergicHistory: {
        family: formData.get('familyAllergies') === 'true',
        knownAllergies: [],
        atopyHistory: formData.get('atopyHistory') === 'true'
      },
      preferences: {
        organic: formData.get('organic') === 'true',
        homemade: formData.get('homemade') === 'true',
        cultural: formData.get('cultural') as string || ''
      },
      currentFoods: [],
      reactions: [],
      createdAt: Date.now()
    };

    setProfile(newProfile);
    setShowProfileForm(false);
  };

  const handleFoodReaction = (foodId: string, reaction: 'accepted' | 'refused' | 'allergic' | 'digestive') => {
    addFoodReaction(foodId, reaction);
  };

  const currentAge = profile ? calculateCurrentAge(profile.birthDate) : 0;
  const appropriateFoods = profile ? getAppropriteFoods(currentAge, profile.currentFoods) : [];
  const recommendations = getCurrentRecommendations();
  const progressReport = getProgressReport();

  const exportReport = () => {
    const report = exportDiversificationReport();
    if (report) {
      const blob = new Blob([report], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diversification-${profile?.babyName}-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (showProfileForm) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="w-5 h-5 text-green-500" />
            Profil de diversification
          </CardTitle>
          <CardDescription>
            Créez le profil de votre bébé pour un suivi personnalisé de la diversification alimentaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="babyName">Prénom du bébé</Label>
                <Input id="babyName" name="babyName" required placeholder="Emma, Lucas..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date de naissance</Label>
                <Input id="birthDate" name="birthDate" type="date" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startDate">Date début diversification</Label>
                <Input id="startDate" name="startDate" type="date" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedingMode">Mode de diversification</Label>
                <Select name="feedingMode" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traditional">Traditionnelle (purées)</SelectItem>
                    <SelectItem value="dme">DME (Diversification Menée par l'Enfant)</SelectItem>
                    <SelectItem value="mixed">Mixte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="familyAllergies">Antécédents allergiques familiaux</Label>
                <Select name="familyAllergies">
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
                <Label htmlFor="atopyHistory">Eczéma/Atopie</Label>
                <Select name="atopyHistory">
                  <SelectTrigger>
                    <SelectValue placeholder="Non" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Non</SelectItem>
                    <SelectItem value="true">Oui</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Préférences (optionnel)</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="organic" name="organic" />
                  <Label htmlFor="organic" className="text-sm">Bio privilégié</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="homemade" name="homemade" />
                  <Label htmlFor="homemade" className="text-sm">Fait maison</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cultural">Spécificités culturelles/alimentaires</Label>
              <Input id="cultural" name="cultural" placeholder="Végétarien, halal, casher..." />
            </div>

            <Button type="submit" className="w-full">
              Créer le profil et commencer
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header avec infos bébé */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-green-500" />
                Diversification - {profile?.babyName}
              </CardTitle>
              <CardDescription>
                {currentAge.toFixed(1)} mois • Diversification depuis {profile ? Math.floor((Date.now() - new Date(profile.startDate).getTime()) / (1000 * 60 * 60 * 24)) : 0} jours
                • Mode: {profile?.feedingMode === 'traditional' ? 'Traditionnel' : profile?.feedingMode === 'dme' ? 'DME' : 'Mixte'}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowProfileForm(true)}>
                Modifier profil
              </Button>
              {profile && (
                <Button variant="outline" onClick={exportReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export rapport
                </Button>
              )}
            </div>
          </div>
          
          {progressReport && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progression de la diversification</span>
                <span className="text-sm text-green-600">{progressReport.foodsIntroduced} aliments introduits</span>
              </div>
              <Progress value={progressReport.progressPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-green-600 mt-1">
                <span>Début</span>
                <span>{progressReport.progressPercentage}% complété</span>
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="foods">Aliments</TabsTrigger>
          <TabsTrigger value="reactions">Réactions</TabsTrigger>
          <TabsTrigger value="recipes">Recettes</TabsTrigger>
          <TabsTrigger value="guidance">Conseils</TabsTrigger>
        </TabsList>

        {/* Calendrier de diversification */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Aliments recommandés cette semaine
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appropriateFoods.length > 0 ? (
                  <div className="space-y-3">
                    {appropriateFoods.slice(0, 3).map((food) => {
                      const { risk, recommendations } = checkAllergenRisk(food.id, profile?.allergicHistory.family || false);
                      return (
                        <div key={food.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{food.name}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{food.category}</p>
                            </div>
                            <Badge variant={risk === 'high' ? 'destructive' : risk === 'medium' ? 'secondary' : 'outline'}>
                              {risk === 'high' ? 'Allergène' : risk === 'medium' ? 'Attention' : 'Sûr'}
                            </Badge>
                          </div>
                          
                          <p className="text-sm mb-2">{food.benefits.join(', ')}</p>
                          
                          {food.allergens.length > 0 && (
                            <div className="mb-2">
                              <p className="text-xs text-orange-600">
                                Allergènes: {food.allergens.join(', ')}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleFoodReaction(food.id, 'accepted')}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Accepté
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleFoodReaction(food.id, 'refused')}
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Refusé
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Tous les aliments appropriés à cet âge ont été introduits !</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Recommandations actuelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Base de données des aliments */}
        <TabsContent value="foods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Base de données des aliments</CardTitle>
              <CardDescription>
                Explorer les aliments par catégorie et âge d'introduction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedFood} onValueChange={setSelectedFood}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtrer par catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes catégories</SelectItem>
                    <SelectItem value="legumes">Légumes</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="cereales">Céréales</SelectItem>
                    <SelectItem value="proteines">Protéines</SelectItem>
                    <SelectItem value="laitages">Laitages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aliment</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Âge min</TableHead>
                    <TableHead>Allergènes</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foodsDatabase
                    .filter(food => !selectedFood || food.category === selectedFood)
                    .slice(0, 10)
                    .map((food) => {
                      const isIntroduced = profile?.currentFoods.includes(food.id);
                      const canIntroduce = food.introductionAge <= currentAge;
                      
                      return (
                        <TableRow key={food.id}>
                          <TableCell className="font-medium">{food.name}</TableCell>
                          <TableCell className="capitalize">{food.category}</TableCell>
                          <TableCell>{food.introductionAge} mois</TableCell>
                          <TableCell>
                            {food.allergens.length > 0 ? (
                              <Badge variant="outline" className="text-xs">
                                {food.allergens.length} allergène(s)
                              </Badge>
                            ) : (
                              <span className="text-green-600 text-xs">Aucun</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isIntroduced ? (
                              <Badge variant="default">Introduit</Badge>
                            ) : canIntroduce ? (
                              <Badge variant="secondary">Disponible</Badge>
                            ) : (
                              <Badge variant="outline">Trop tôt</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suivi des réactions */}
        <TabsContent value="reactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des réactions</CardTitle>
              <CardDescription>
                Suivi des acceptations, refus et réactions allergiques
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profile && profile.reactions.length > 0 ? (
                <div className="space-y-3">
                  {profile.reactions.slice(-10).reverse().map((reaction, index) => {
                    const food = foodsDatabase.find(f => f.id === reaction.foodId);
                    return (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{food?.name || reaction.foodId}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(reaction.date).toLocaleDateString('fr-FR')}
                          </p>
                          {reaction.notes && (
                            <p className="text-sm text-gray-600 mt-1">{reaction.notes}</p>
                          )}
                        </div>
                        <Badge
                          variant={
                            reaction.reaction === 'accepted' ? 'default' :
                            reaction.reaction === 'allergic' ? 'destructive' :
                            reaction.reaction === 'digestive' ? 'secondary' : 'outline'
                          }
                        >
                          {reaction.reaction === 'accepted' ? 'Accepté' :
                           reaction.reaction === 'refused' ? 'Refusé' :
                           reaction.reaction === 'allergic' ? 'Allergique' : 'Digestif'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Aucune réaction enregistrée pour le moment
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recettes */}
        <TabsContent value="recipes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-purple-500" />
                Recettes adaptées à l'âge
              </CardTitle>
              <CardDescription>
                Recettes personnalisées selon l'âge et les aliments introduits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Purée carotte-courgette</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-muted-foreground">20 min</span>
                    <Badge variant="outline">4+ mois</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Purée douce et sucrée, parfaite pour débuter la diversification
                  </p>
                  <Button variant="outline" size="sm">Voir la recette</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Compote pomme-banane</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-muted-foreground">15 min</span>
                    <Badge variant="outline">4+ mois</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Compote naturellement sucrée, riche en vitamines
                  </p>
                  <Button variant="outline" size="sm">Voir la recette</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conseils et guidance */}
        <TabsContent value="guidance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Allergènes majeurs</CardTitle>
                <CardDescription>
                  Guide d'introduction des 9 allergènes principaux
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {majorAllergens.slice(0, 5).map((allergen) => (
                    <div key={allergen.name} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{allergen.name}</h4>
                        <Badge 
                          variant={allergen.riskLevel === 'high' ? 'destructive' : 
                                  allergen.riskLevel === 'medium' ? 'secondary' : 'outline'}
                        >
                          Risque {allergen.riskLevel === 'high' ? 'élevé' : 
                                  allergen.riskLevel === 'medium' ? 'moyen' : 'faible'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Introduction: {allergen.introductionAge} mois minimum
                      </p>
                      <div className="text-xs">
                        <p className="font-medium">Précautions:</p>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {allergen.precautions.slice(0, 2).map((precaution, idx) => (
                            <li key={idx}>{precaution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conseils selon l'âge</CardTitle>
                <CardDescription>
                  Recommandations adaptées à {currentAge.toFixed(1)} mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentAge < 6 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">4-6 mois : Découverte</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Textures très lisses uniquement</li>
                        <li>• Un aliment nouveau tous les 3 jours</li>
                        <li>• Commencer par les légumes</li>
                        <li>• Quantités progressives (quelques cuillères)</li>
                      </ul>
                    </div>
                  )}
                  
                  {currentAge >= 6 && currentAge < 8 && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">6-8 mois : Élargissement</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Introduction des protéines (viande, poisson)</li>
                        <li>• Début des textures moins lisses</li>
                        <li>• Surveiller les allergènes</li>
                        <li>• 2 repas par jour + lait</li>
                      </ul>
                    </div>
                  )}
                  
                  {currentAge >= 8 && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">8+ mois : Autonomie</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Introduction des morceaux</li>
                        <li>• Développement de la préhension</li>
                        <li>• Participation aux repas familiaux</li>
                        <li>• 3 repas + collations</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
