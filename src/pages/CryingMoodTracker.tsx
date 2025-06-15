import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CryingMoodTabs from "@/components/tools/CryingMoodTabs";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";

export default function CryingMoodTracker() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader crumbs={[
        { href: "/enfant", label: "Enfant" },
        { label: "Tracker Pleurs & Humeur Bébé" },
      ]} />
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-rose-50 via-white to-blue-50 py-10 px-2 animate-fade-in">
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-rose-100 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-rose-900">
              Tracker Pleurs & Humeur Bébé
            </CardTitle>
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
