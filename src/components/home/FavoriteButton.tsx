
import React from "react";
import { Star, StarOff } from "lucide-react";

interface Props {
  isActive: boolean;
  onClick: () => void;
}

/**
 * Affiche une étoile "favorite" cliquable
 */
export default function FavoriteButton({ isActive, onClick }: Props) {
  return (
    <button
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      aria-label={isActive ? "Retirer des favoris" : "Ajouter aux favoris"}
      className="absolute top-2 right-3 z-20 cursor-pointer rounded-full p-1 transition-colors hover:bg-yellow-50"
      title={isActive ? "Retirer des favoris" : "Ajouter aux favoris"}
      tabIndex={0}
    >
      {isActive ? (
        <Star className="text-yellow-400 fill-yellow-300 drop-shadow" size={23} />
      ) : (
        <StarOff className="text-gray-300" size={23} />
      )}
    </button>
  );
}
