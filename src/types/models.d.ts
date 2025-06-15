
/**
 * Types partagés pour MomTech Suite
 */

export type ToolCategory = "pregnancy" | "security" | "health" | "education" | "reports";

// PATCH: On permet que .data soit un objet chiffré OU une donnée métier en clair pour dev local
export interface EncryptedToolData {
  id?: number;
  category: ToolCategory;
  toolKey: string;         
  // Donnée : en prod = {iv, data}, en dev/clair = type métier
  data: { iv: number[]; data: number[] } | any;
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

