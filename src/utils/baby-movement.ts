
import type { BabyMovementEntry } from "@/types/movement-entry";
import type { EncryptedToolData } from "@/types/models";

// Pour l'instant, la donnée n'est pas chiffrée, donc accès direct
// (en 'prod', intégrer crypto ici)

export function isBabyMovementTool(entry: EncryptedToolData): boolean {
  // Ajout de garde type toolKey et présence attributs mouvements
  const d = entry.data as any; // à remplacer par déchiffrage si besoin
  return (
    entry.toolKey === "baby-movement-tracker" &&
    d &&
    typeof d.method === "string" &&
    typeof d.date === "string" &&
    typeof d.movements === "number"
  );
}

export function getBabyMovementData(entry: EncryptedToolData): BabyMovementEntry | null {
  try {
    // SANS chiffrement: la data est stockée en JSON brut
    return entry.data as BabyMovementEntry;
  } catch {
    return null;
  }
}

export function wrapBabyMovementEntry(entry: BabyMovementEntry): EncryptedToolData {
  // Ici stockage en clair, normalisé pour Dexie
  return {
    toolKey: "baby-movement-tracker",
    category: "pregnancy",
    data: entry,
  };
}
