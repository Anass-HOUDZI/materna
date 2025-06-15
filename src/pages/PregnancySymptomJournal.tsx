import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PregnancySymptomJournalForm from "@/components/tools/PregnancySymptomJournalForm";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";

export default function PregnancySymptomJournal() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader crumbs={[
        { href: "/grossesse", label: "Grossesse" },
        { label: "Journal Symptômes" },
      ]} />
      <div className="flex flex-1 justify-center items-center bg-gradient-to-br from-orange-50 via-white to-fuchsia-50 py-10 px-2 animate-fade-in">
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-orange-100 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-orange-900">
              Journal des Symptômes de Grossesse
            </CardTitle>
            <div className="text-muted-foreground text-sm mt-2">
              Notez quotidiennement vos symptômes, humeurs et événements marquants de votre grossesse. Suivez les tendances, identifiez les facteurs déclencheurs et partagez ces informations avec votre professionnel de santé.
            </div>
          </CardHeader>
          <CardContent>
            <PregnancySymptomJournalForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
