
import React from "react";

// Illustration SVG pastel pour le header (naissance/famille, friendly)
export default function FamilyIllustration() {
  return (
    <div className="mx-auto mb-4 flex justify-center select-none" aria-hidden>
      <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
        <ellipse cx="80" cy="90" rx="60" ry="10" fill="#f3e8ff" />
        {/* Parent 1 */}
        <circle cx="56" cy="53" r="18" fill="#dbeafe"/>
        <circle cx="53" cy="48" r="6" fill="#fca5a5" />
        {/* Parent 2 */}
        <circle cx="104" cy="53" r="17" fill="#fef3c7"/>
        <circle cx="107" cy="47" r="6" fill="#fdba74" />
        {/* Bébé */}
        <ellipse cx="80" cy="66" rx="15" ry="13" fill="#fce7f3" />
        <circle cx="80" cy="67" r="7" fill="#a5f3fc" />
        {/* Brassards */}
        <rect x="65" y="60" width="7" height="17" rx="4" fill="#fbcfe8" />
        <rect x="88" y="60" width="7" height="17" rx="4" fill="#fef9c3" />
      </svg>
    </div>
  );
}
