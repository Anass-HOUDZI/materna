import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CryingMoodTabs from "@/components/tools/CryingMoodTabs";
import Footer from "@/components/ui/Footer";

export default function CryingMoodTracker() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-1 justify-center items-center bg-background py-10 px-2 animate-fade-in">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle>Tracker Pleurs & Humeur Bébé</CardTitle>
            <div className="text-muted-foreground text-sm mt-2">
              Enregistrez les épisodes de pleurs ou humeurs de bébé, visualisez tendances et accédez à des conseils bienveillants pour toute la famille.
            </div>
          </CardHeader>
          <CardContent>
            <CryingMoodTabs />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
