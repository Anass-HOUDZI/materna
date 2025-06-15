
import Dexie, { Table } from "dexie";
import { EncryptedToolData } from "@/types/models";

// Dexie database definition with one generic table for tools (to split later if needed)
export class MomTechDB extends Dexie {
  tools!: Table<EncryptedToolData, number>;

  constructor() {
    super("MomTechDB");
    this.version(1).stores({
      tools: '++id, category, toolKey',
      // Add more stores for different domains (pregnancy, health, etc.) if needed
    });
  }
}

export const db = new MomTechDB();
