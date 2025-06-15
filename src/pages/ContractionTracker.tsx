
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ContractionTrackerForm } from "@/components/tools/ContractionTrackerForm";

export default function ContractionTracker() {
  return (
    <div className="flex flex-1 justify-center items-center bg-background py-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Tracker Contractions Intelligent</CardTitle>
          <div className="text-muted-foreground text-sm mt-2">
            Suivi intelligent : enregistrez vos contractions et recevez des recommandations médicales en temps réel.
          </div>
        </CardHeader>
        <CardContent>
          <ContractionTrackerForm />
        </CardContent>
      </Card>
    </div>
  );
}
