
import React, { useState } from "react";

interface AccordionSimpleProps {
  children: React.ReactNode;
  className?: string;
}
export function AccordionSimple({ children, className }: AccordionSimpleProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <div className={className}>
      {React.Children.map(children, (child, idx) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              open: idx === activeIdx,
              onToggle: () => setActiveIdx(idx === activeIdx ? null : idx),
            })
          : child
      )}
    </div>
  );
}

interface AccordionSimpleItemProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onToggle?: () => void;
}
export function AccordionSimpleItem({
  title,
  children,
  open,
  onToggle,
}: AccordionSimpleItemProps) {
  return (
    <div className="border-b last:border-b-0">
      <button
        className="w-full text-left py-4 px-6 font-semibold flex justify-between items-center transition-colors hover:bg-blue-50 focus:outline-none"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={`transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}>›</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-48 opacity-100 py-2 px-6" : "max-h-0 opacity-0 py-0 px-6"}`}
        aria-hidden={!open}
      >
        <div className="text-gray-700 text-base">{children}</div>
      </div>
    </div>
  );
}
