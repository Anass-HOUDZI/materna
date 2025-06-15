import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ContractionTrackerForm } from "@/components/tools/ContractionTrackerForm";
import { Search } from "lucide-react";
import Footer from "@/components/ui/Footer";

export default function ContractionTracker() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 py-8 animate-fade-in">
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-pink-100 bg-white/90">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
              <Search size={32} className="text-pink-500 drop-shadow-sm" />
              <CardTitle className="text-2xl md:text-3xl font-bold text-pink-900">
                Tracker Contractions Intelligent
              </CardTitle>
            </div>
            <div className="text-muted-foreground text-sm mt-1 font-medium">
              Suivi intelligent : enregistrez vos contractions et recevez des recommandations médicales en temps réel.
            </div>
          </CardHeader>
          <CardContent>
            <ContractionTrackerForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
