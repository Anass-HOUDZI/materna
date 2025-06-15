
import { Card } from "@/components/ui/card";
import { PregnancyWeightGainCalculatorForm } from "@/components/tools/PregnancyWeightGainCalculatorForm";

export default function PregnancyWeightGainCalculator() {
  return (
    <div className="flex flex-1 justify-center items-center bg-background py-10 animate-fade-in">
      <PregnancyWeightGainCalculatorForm />
    </div>
  );
}
