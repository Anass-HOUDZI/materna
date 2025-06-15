import { Card } from "@/components/ui/card";
import { PregnancyWeightGainCalculatorForm } from "@/components/tools/PregnancyWeightGainCalculatorForm";
import Footer from "@/components/ui/Footer";

export default function PregnancyWeightGainCalculator() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center bg-background py-10 animate-fade-in">
        <PregnancyWeightGainCalculatorForm />
      </div>
      <Footer />
    </div>
  );
}
