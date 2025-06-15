
import { DueDateCalculatorForm } from "@/components/tools/DueDateCalculatorForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PregnancyDueDateCalculator() {
  return (
    <div className="flex flex-1 justify-center items-center bg-background py-8">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>Calculateur de date d’accouchement</CardTitle>
          <div className="text-muted-foreground text-sm mt-2">
            Estimez la date de votre accouchement facilement, méthode médicale Naegele (standard).
          </div>
        </CardHeader>
        <CardContent>
          <DueDateCalculatorForm />
        </CardContent>
      </Card>
    </div>
  );
}
