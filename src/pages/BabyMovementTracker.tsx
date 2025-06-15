
import { BabyMovementTrackerForm } from "@/components/tools/BabyMovementTrackerForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Footer from "@/components/ui/Footer";
import { Baby } from "lucide-react";

export default function BabyMovementTracker() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 py-10 px-2 animate-fade-in">
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-fuchsia-100 bg-white/90">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
              <Baby size={34} className="text-fuchsia-500 drop-shadow-sm" />
              <CardTitle className="text-2xl md:text-3xl font-bold text-fuchsia-900">
                Tracker Mouvements Bébé
              </CardTitle>
            </div>
            <div className="text-muted-foreground text-sm mt-1 font-medium">
              Comptabilisez les mouvements fœtaux selon la méthode Cardiff/Sadovsky/Moore. Soyez alertée en cas de changement ou diminution inhabituelle.
            </div>
          </CardHeader>
          <CardContent>
            <BabyMovementTrackerForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
