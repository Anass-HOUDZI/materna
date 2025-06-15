
import type { BabyMovementEntry } from "@/types/movement-entry";
import type { EncryptedToolData } from "@/types/models";

// Teste si un objet EncryptedToolData correspond aux mouvements bébé
export function isBabyMovementTool(entry: EncryptedToolData): boolean {
  // En mode dev: données en clair (objet BabyMovementEntry)
  if (
    entry.toolKey === "baby-movement-tracker" &&
    entry.data &&
    typeof entry.data.method === "string" &&
    typeof entry.data.date === "string" &&
    typeof entry.data.movements === "number"
  ) {
    return true;
  }
  // (Plus tard : tester données chiffrées)
  return false;
}

// Récupère les données movements bébé en mode DEV (pas de déchiffrement)
export function getBabyMovementData(entry: EncryptedToolData): BabyMovementEntry | null {
  if (
    entry &&
    entry.data &&
    typeof entry.data.method === "string" &&
    typeof entry.data.date === "string" &&
    typeof entry.data.movements === "number"
  ) {
    return entry.data as BabyMovementEntry;
  }
  // (Plus tard : gestion du déchiffrement)
  return null;
}

// Wrappe une donnée BabyMovementEntry en EncryptedToolData (en clair/dev)
export function wrapBabyMovementEntry(entry: BabyMovementEntry): EncryptedToolData {
  return {
    toolKey: "baby-movement-tracker",
    category: "pregnancy",
    data: entry,
  };
}

