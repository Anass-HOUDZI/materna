
import React, { useState } from "react";
import { Star, StarOff } from "lucide-react";

interface Props {
  isActive: boolean;
  onClick: () => void;
}

/**
 * Affiche une étoile "favorite" cliquable avec animation rebond
 */
export default function FavoriteButton({ isActive, onClick }: Props) {
  const [anim, setAnim] = useState(false);
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    setAnim(true);
    onClick();
    setTimeout(() => setAnim(false), 350);
  }
  return (
    <button
      onClick={handleClick}
      aria-label={isActive ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={`absolute top-2 right-3 z-20 cursor-pointer rounded-full p-1 transition-colors hover:bg-yellow-50 ring-amber-300 focus:ring-2
        ${isActive ? "shadow-[0_0_0_3px_rgba(250,204,21,0.13)]" : ""} 
        ${anim ? "animate-bounce scale-125" : ""}`}
      title={isActive ? "Retirer des favoris" : "Ajouter aux favoris"}
      tabIndex={0}
      style={{ transition: "transform 0.18s" }}
    >
      {isActive ? (
        <Star className="text-yellow-400 fill-yellow-300 drop-shadow" size={23} />
      ) : (
        <StarOff className="text-gray-300" size={23} />
      )}
      <span className="sr-only">{isActive ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
    </button>
  );
}
