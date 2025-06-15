
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Search, Info, Grid } from "lucide-react";

const steps = [
  {
    icon: <Grid className="text-blue-500" size={32} />,
    title: "Tableau de bord outils",
    text: "Retrouvez tous vos outils dans des cartes épurées. Cliquez sur une carte pour accéder à l’outil correspondant.",
  },
  {
    icon: <Star className="text-yellow-400" size={32} />,
    title: "Favoris personnalisés",
    text: "Cliquez sur l’étoile en haut à droite d’un outil pour l’ajouter à vos favoris. Vos favoris restent toujours en haut de la liste.",
  },
  {
    icon: <Search className="text-pink-500" size={32} />,
    title: "Recherche rapide",
    text: "Utilisez la barre de recherche (en haut) pour accéder instantanément à votre outil préféré.",
  },
  {
    icon: <Info className="text-violet-500" size={32} />,
    title: "Navigation et support",
    text: "Besoin d’aide ? Retrouvez ce guide à tout moment via le bouton “Aide” en bas à droite.",
  },
];

interface UserTourModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UserTourModal({ open, onClose }: UserTourModalProps) {
  const [step, setStep] = useState(0);

  function handleNext() {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      onClose();
    }
  }

  function handlePrev() {
    if (step > 0) setStep(s => s - 1);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl shadow-2xl p-0 animate-fade-in animate-scale-in" style={{ animationDuration: "0.5s" }}>
        <DialogHeader className="items-center py-2">
          <DialogTitle className="flex flex-col gap-1 items-center text-2xl font-bold mt-2 mb-1 font-playfair transition-transform duration-300 animate-fade-in">
            {steps[step].icon}
            <span>{steps[step].title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="px-8 pb-4 text-center text-base text-gray-700 min-h-[54px] flex items-center justify-center animate-fade-in" key={step}>
          {steps[step].text}
        </div>
        <DialogFooter className="flex justify-between items-center px-6 pb-4 pt-2">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={step === 0}
            className="rounded-lg px-4 font-semibold"
          >
            Précédent
          </Button>
          <div className="text-sm text-gray-400">{step + 1}/{steps.length}</div>
          <Button
            onClick={handleNext}
            variant="default"
            className="rounded-lg px-4 font-semibold"
          >
            {step === steps.length - 1 ? "Terminer" : "Suivant"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
