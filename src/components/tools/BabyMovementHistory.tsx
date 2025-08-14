
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText } from "lucide-react";
import type { EncryptedToolData } from "@/types/models";
import type { TrackingMethod } from "./BabyMovementTrackerForm";
import { isBabyMovementTool, getBabyMovementData } from "@/utils/baby-movement";
import ResponsiveGrid from "@/components/ui/ResponsiveGrid";

interface BabyMovementHistoryProps {
  history: EncryptedToolData[];
  method: TrackingMethod;
}

export default function BabyMovementHistory({ history, method }: BabyMovementHistoryProps) {
  // Filtrer les 7 dernières entrées pour la méthode sélectionnée
  const relevantHistory = history
    .filter(e => 
      isBabyMovementTool(e) && 
      getBabyMovementData(e)?.method === method
    )
    .slice(0, 7);

  if (relevantHistory.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg xs:text-xl flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Historique - {method}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm xs:text-base text-muted-foreground text-center py-8">
            Aucune session enregistrée pour cette méthode
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg xs:text-xl flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Historique - {method}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full space-y-4">
        <ResponsiveGrid minItemWidth={280} gap="md" className="w-full">
          {relevantHistory.map((entry, index) => {
            const data = getBabyMovementData(entry);
            if (!data) return null;

            return (
              <Card key={entry.id || index} variant="outline" className="w-full">
                <CardContent className="p-4 space-y-3">
                  {/* Date et badge méthode */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm xs:text-base font-medium">
                      {format(new Date(data.timestamp), "dd/MM/yyyy", { locale: fr })}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {data.method}
                    </Badge>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">
                          {data.movements}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Mouvements</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-medium">
                          {Math.floor(data.duration / 60)}:{(data.duration % 60).toString().padStart(2, "0")}
                        </p>
                        <p className="text-xs text-muted-foreground">Durée</p>
                      </div>
                    </div>
                  </div>

                  {/* Note si présente */}
                  {data.note && (
                    <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                      <FileText className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-xs leading-relaxed break-words">
                        {data.note}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </ResponsiveGrid>
      </CardContent>
    </Card>
  );
}
