/**
 * Types partagés pour MomTech Suite
 */

export type ToolCategory = "pregnancy" | "security" | "health" | "education" | "reports";

export interface EncryptedToolData {
  id?: number;
  category: ToolCategory;
  toolKey: string;         // ex: due-date-calculator
  data: { iv: number[], data: number[] }; // données chiffrées AES-GCM
}

/**
 * Types de profil grossesse – exemple.
 */
export interface PregnancyProfile {
  id?: string;
  name: string;
  createdAt: number;
  dueDate?: string;
  notes?: string;
  // Ajoutez d'autres champs nécessaires…
}

/**
 * Entrée du journal des symptômes grossesse
 */
export interface SymptomEntry {
  date: string;  // AAAA-MM-JJ
  type: string;
  intensity: number;
  note?: string;
}
