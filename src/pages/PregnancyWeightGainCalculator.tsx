import { Card } from "@/components/ui/card";
import { PregnancyWeightGainCalculatorForm } from "@/components/tools/PregnancyWeightGainCalculatorForm";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";

export default function PregnancyWeightGainCalculator() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader crumbs={[
        { href: "/grossesse", label: "Grossesse" },
        { label: "Calculateur Prise de Poids" },
      ]} />
      <div className="flex flex-1 justify-center items-center bg-background py-10 animate-fade-in">
        <PregnancyWeightGainCalculatorForm />
      </div>
      <Footer />
    </div>
  );
}
