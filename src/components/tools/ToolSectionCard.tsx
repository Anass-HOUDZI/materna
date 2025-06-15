
import React from "react";

interface ToolSectionCardProps {
  title: string;
  children: React.ReactNode;
  bg?: string;
  className?: string;
}
export default function ToolSectionCard({
  title,
  children,
  bg = "from-blue-50 to-pink-50",
  className = "",
}: ToolSectionCardProps) {
  return (
    <div className={`rounded-3xl shadow-lg border border-blue-100 bg-white/90 mb-6 overflow-hidden ${className}`}>
      <div className={`px-6 py-4 bg-gradient-to-r ${bg}`}>
        <h2 className="font-bold text-lg text-blue-800 drop-shadow">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
