
/**
 * Fonctions utilitaires de chiffrement avec Web Crypto API (AES-256-GCM)
 * À améliorer/étendre : gestion des clés/password user-specific, salt, etc.
 */

const algo = { name: "AES-GCM", length: 256 };

export async function generateKey() {
  return crypto.subtle.generateKey(algo, true, ["encrypt", "decrypt"]);
}

export async function encryptData(plain: string, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plain);
  const ciphertext = await crypto.subtle.encrypt(
    { ...algo, iv },
    key,
    encoded
  );
  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(ciphertext)),
  };
}

export async function decryptData(encrypted: { iv: number[], data: number[] }, key: CryptoKey) {
  const iv = new Uint8Array(encrypted.iv);
  const data = new Uint8Array(encrypted.data);
  const decrypted = await crypto.subtle.decrypt(
    { ...algo, iv },
    key,
    data
  );
  return new TextDecoder().decode(decrypted);
}
