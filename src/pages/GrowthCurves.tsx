import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GrowthCurvesForm from "@/components/tools/GrowthCurvesForm";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";

export default function GrowthCurves() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader crumbs={[
        { href: "/enfant", label: "Enfant" },
        { label: "Courbes Croissance OMS" },
      ]} />
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-violet-50 via-white to-blue-50 py-10 px-2 animate-fade-in">
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-violet-100 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-violet-900">
              Courbes de Croissance OMS
            </CardTitle>
            <div className="text-muted-foreground text-sm mt-2">
              Visualisez les courbes de croissance de l’OMS pour suivre le développement de votre enfant, de la naissance à 5 ans, selon les normes internationales.
            </div>
          </CardHeader>
          <CardContent>
            <GrowthCurvesForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
