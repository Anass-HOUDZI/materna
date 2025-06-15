
/**
 * Types de tracking mouvements bébé
 */

import type { TrackingMethod } from "@/components/tools/BabyMovementTrackerForm"; // Pour reuse méthodes

export type BabyMovementEntry = {
  timestamp: number;
  date: string; // YYYY-MM-DD
  movements: number;
  duration: number; // seconds
  method: TrackingMethod;
  note?: string;
};
