import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotorDevelopmentTrackerForm from "@/components/tools/MotorDevelopmentTrackerForm";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";

export default function MotorDevelopmentTracker() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader crumbs={[
        { href: "/enfant", label: "Enfant" },
        { label: "Tracker Développement Moteur 0-3 ans" },
      ]} />
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-teal-50 via-white to-pink-50 py-10 px-2 animate-fade-in">
        <Card className="w-full max-w-lg shadow-xl rounded-2xl border-teal-100 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-teal-900">
              Tracker Développement Moteur 0-3 ans
            </CardTitle>
            <div className="text-muted-foreground text-sm mt-2">
              Évaluez les principales acquisitions motrices de votre enfant selon son âge entre 1 et 36 mois, selon les références scientifiques internationales.
            </div>
          </CardHeader>
          <CardContent>
            <MotorDevelopmentTrackerForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
