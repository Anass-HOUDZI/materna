
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
  bg = "from-blue-50/80 to-pink-50/80",
  className = "",
}: ToolSectionCardProps) {
  return (
    <div className={`rounded-3xl shadow-xl border border-white/20 bg-white/95 backdrop-blur-md 
                     ring-1 ring-gray-200/50 mb-8 mobile-s:mb-10 sm:mb-12 overflow-hidden 
                     transition-all duration-300 ease-out hover:shadow-2xl hover:ring-blue-300/50
                     transform-gpu will-change-transform ${className}`}>
      <div className={`px-8 mobile-s:px-10 sm:px-12 py-6 mobile-s:py-7 sm:py-8 
                       bg-gradient-to-r ${bg} backdrop-blur-sm border-b border-white/30`}>
        <h2 className="font-bold text-xl mobile-s:text-2xl sm:text-3xl text-gray-800 
                       drop-shadow-sm tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      <div className="p-8 mobile-s:p-10 sm:p-12 lg:p-14 space-y-6">
        {children}
      </div>
    </div>
  );
}
