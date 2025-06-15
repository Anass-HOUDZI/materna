
import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const TEETH = [
  { name: "Incisive centrale inférieure", position: "Bas", order: 1, range: "6–10 mois" },
  { name: "Incisive centrale supérieure", position: "Haut", order: 2, range: "8–12 mois" },
  { name: "Incisive latérale supérieure", position: "Haut", order: 3, range: "9–13 mois" },
  { name: "Incisive latérale inférieure", position: "Bas", order: 4, range: "10–16 mois" },
  { name: "Première molaire supérieure", position: "Haut", order: 5, range: "13–19 mois" },
  { name: "Première molaire inférieure", position: "Bas", order: 6, range: "14–18 mois" },
  { name: "Canine supérieure", position: "Haut", order: 7, range: "16–22 mois" },
  { name: "Canine inférieure", position: "Bas", order: 8, range: "17–23 mois" },
  { name: "Deuxième molaire inférieure", position: "Bas", order: 9, range: "23–31 mois" },
  { name: "Deuxième molaire supérieure", position: "Haut", order: 10, range: "25–33 mois" },
];

export default function TeethingTable() {
  // Suivi en mémoire uniquement (pour version locale)
  const [teethChecked, setTeethChecked] = useState<boolean[]>(Array(TEETH.length).fill(false));

  const handleCheck = (idx: number) => {
    setTeethChecked((prev) =>
      prev.map((val, i) => (i === idx ? !val : val))
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dent</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Âge moyen d’éruption</TableHead>
            <TableHead>Sortie ?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TEETH.map((tooth, idx) => (
            <TableRow key={tooth.name}>
              <TableCell>{tooth.name}</TableCell>
              <TableCell>{tooth.position}</TableCell>
              <TableCell>{tooth.range}</TableCell>
              <TableCell>
                <Checkbox checked={teethChecked[idx]} onCheckedChange={()=>handleCheck(idx)} aria-label={`Dent sortie ${tooth.name}`}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 text-sm rounded bg-muted p-4">
        <strong>Conseils : </strong>
        Chaque enfant a son rythme ! Les périodes sont données à titre indicatif ; une avance ou un retard de quelques mois est courant. Surveillez la fièvre inhabituelle, troubles majeurs ou douleurs persistantes et consultez votre professionnel de santé si besoin.  
        <br/>Pour apaiser : anneau de dentition, massage gencives propres, câlins… Évitez gels ou médicaments sans avis médical. 
      </div>
    </div>
  );
}
