import { DueDateCalculatorForm } from "@/components/tools/DueDateCalculatorForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";

export default function PregnancyDueDateCalculator() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader crumbs={[
        { href: "/grossesse", label: "Grossesse" },
        { label: "Calculateur de date d'accouchement" },
      ]} />
      <div className="flex flex-1 justify-center items-center bg-gradient-to-br from-blue-50 to-fuchsia-50 py-8 animate-fade-in">
        <Card className="w-full max-w-lg shadow-xl rounded-2xl border-blue-100 bg-white/90">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
              <Search size={34} className="text-blue-500 drop-shadow-sm" />
              <CardTitle className="text-2xl md:text-3xl font-bold text-blue-900">
                Calculateur de date d’accouchement
              </CardTitle>
            </div>
            <div className="text-muted-foreground text-sm mt-1 font-medium">
              Estimez la date de votre accouchement facilement, méthode médicale Naegele (standard).
            </div>
          </CardHeader>
          <CardContent>
            <DueDateCalculatorForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
