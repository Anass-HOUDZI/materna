
import { useCallback, useEffect, useState } from "react";

/**
 * Hook pour stocker la liste des favoris localement (persistant via localStorage)
 * Les favoris sont identifiés par leur "link"
 */
export function useFavorites() {
  const key = "momtech-favorites";
  const [favorites, setFavorites] = useState<string[]>([]);

  // Charger depuis le localStorage
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  // Sauver à chaque changement
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(favorites));
  }, [favorites]);

  // Ajout ou retrait
  const toggleFavorite = useCallback((toolLink: string) => {
    setFavorites(prev =>
      prev.includes(toolLink)
        ? prev.filter(x => x !== toolLink)
        : [...prev, toolLink]
    );
  }, []);

  const isFavorite = useCallback(
    (toolLink: string) => favorites.includes(toolLink),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}

