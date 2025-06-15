
/**
 * Wrapper réutilisable pour chiffrer/déchiffrer selon l’API WebCrypto
 * Utilise les fonctions de encryption.ts
 */
import { encryptData, decryptData, generateKey } from "@/storage/encryption";

export async function encryptObject(obj: any, key: CryptoKey) {
  const json = JSON.stringify(obj);
  return await encryptData(json, key);
}

export async function decryptObject(enc: { iv: number[], data: number[] }, key: CryptoKey) {
  const plain = await decryptData(enc, key);
  return JSON.parse(plain);
}

export { generateKey };
