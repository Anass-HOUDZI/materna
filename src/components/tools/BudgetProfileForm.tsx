
import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/components/ui/Layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from '@/hooks/useForm';
import { FamilyProfile } from '@/types/budget-simulator';
import { REGIONS_DATA } from '@/data/budget-data';
import { Users, Home, MapPin, Baby } from 'lucide-react';

interface BudgetProfileFormProps {
  onSubmit: (profile: FamilyProfile) => void;
  loading?: boolean;
}

export default function BudgetProfileForm({ onSubmit, loading }: BudgetProfileFormProps) {
  const {
    data: profile,
    errors,
    updateField,
    validateAll,
    isValid
  } = useForm<FamilyProfile>({
    parentIncome: 3000,
    region: 'ile-de-france',
    childcareMode: 'daycare',
    housing: 'apartment',
    familySupport: false
  }, {
    parentIncome: {
      required: true,
      custom: (value) => {
        if (value < 1000) return 'Revenus trop faibles pour simulation';
        if (value > 20000) return 'Revenus mensuels très élevés, vérifiez la saisie';
        return null;
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      onSubmit(profile);
    }
  };

  return (
    <Card variant="elevated" size="lg" className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="text-center">
          <Baby className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Profil Familial
          </h2>
          <p className="text-slate-600">
            Renseignez vos informations pour une simulation personnalisée
          </p>
        </div>

        <Layout direction="column" gap="lg">
          {/* Revenus */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <Label htmlFor="income" className="text-base font-semibold">
                Revenus nets mensuels du foyer
              </Label>
            </div>
            <div className="relative">
              <Input
                id="income"
                type="number"
                min="1000"
                max="20000"
                step="100"
                value={profile.parentIncome}
                onChange={(e) => updateField('parentIncome', parseInt(e.target.value) || 0)}
                className="pr-8 text-lg"
                placeholder="3000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
            </div>
            {errors.parentIncome && (
              <p className="text-sm text-red-600">{errors.parentIncome}</p>
            )}
            <p className="text-sm text-slate-500">
              Revenus nets après impôts et cotisations sociales
            </p>
          </div>

          {/* Région */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <Label className="text-base font-semibold">Région de résidence</Label>
            </div>
            <Select
              value={profile.region}
              onValueChange={(value) => updateField('region', value)}
            >
              <SelectTrigger className="text-lg">
                <SelectValue placeholder="Sélectionnez votre région" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS_DATA.map(region => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-slate-500">
              Les coûts varient selon votre région de résidence
            </p>
          </div>

          {/* Mode de garde */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Baby className="h-5 w-5 text-blue-600" />
              <Label className="text-base font-semibold">Mode de garde envisagé</Label>
            </div>
            <Select
              value={profile.childcareMode}
              onValueChange={(value: any) => updateField('childcareMode', value)}
            >
              <SelectTrigger className="text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="family">Garde familiale (gratuite)</SelectItem>
                <SelectItem value="daycare">Crèche publique/privée</SelectItem>
                <SelectItem value="nanny">Assistante maternelle</SelectItem>
                <SelectItem value="home">Garde à domicile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type de logement */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600" />
              <Label className="text-base font-semibold">Type de logement</Label>
            </div>
            <Select
              value={profile.housing}
              onValueChange={(value: any) => updateField('housing', value)}
            >
              <SelectTrigger className="text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Appartement</SelectItem>
                <SelectItem value="house">Maison</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Support familial */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
            <div>
              <Label className="text-base font-semibold">Support familial</Label>
              <p className="text-sm text-slate-600">
                Grands-parents ou famille peuvent aider (équipement, garde occasionnelle...)
              </p>
            </div>
            <Switch
              checked={profile.familySupport}
              onCheckedChange={(checked) => updateField('familySupport', checked)}
            />
          </div>
        </Layout>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={!isValid}
            fullWidth
          >
            Simuler mon budget bébé
          </Button>
        </div>
      </form>
    </Card>
  );
}
