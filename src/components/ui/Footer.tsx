
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 flex justify-center items-center bg-transparent">
      <span className="text-sm text-muted-foreground text-center">
        Copyright © 2025 Anass Houdzi – Tous droits réservés.{" "}
        <a
          href="https://www.linkedin.com/in/anasshoudzi/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-blue-600 underline hover:text-fuchsia-600 transition-colors"
        >
          LinkedIn
        </a>
      </span>
    </footer>
  );
}
