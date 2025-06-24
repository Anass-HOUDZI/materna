
import React from "react";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/ui/PageHeader";
import Footer from "@/components/ui/Footer";
import ResponsiveContainer from "@/components/ui/ResponsiveContainer";

type Crumb = {
  href?: string;
  label: string;
};

interface ToolPageLayoutProps {
  children: React.ReactNode;
  crumbs: Crumb[];
  className?: string;
  title?: string;
  description?: string;
}

export default function ToolPageLayout({
  children,
  crumbs,
  className,
  title,
  description,
}: ToolPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30">
      {/* Soft gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-rose-50/20 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <ResponsiveContainer maxWidth="2xl" padding="sm">
          <PageHeader crumbs={crumbs} />
        </ResponsiveContainer>

        {/* Optional title section with enhanced spacing */}
        {(title || description) && (
          <ResponsiveContainer maxWidth="2xl" padding="md">
            <div className="text-center mb-8 mobile-s:mb-10 sm:mb-12 lg:mb-16 animate-fade-in">
              {title && (
                <h1 className="text-3xl mobile-s:text-4xl sm:text-5xl lg:text-6xl font-bold font-playfair 
                               bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent 
                               mb-4 mobile-s:mb-6 leading-tight tracking-tight">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-lg mobile-s:text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto 
                              leading-relaxed font-medium px-4">
                  {description}
                </p>
              )}
            </div>
          </ResponsiveContainer>
        )}

        {/* Main content with enhanced spacing and backdrop */}
        <main className={cn(
          "flex-1 flex justify-center items-start py-8 mobile-s:py-12 sm:py-16 lg:py-20",
          "animate-fade-in",
          className
        )}>
          <ResponsiveContainer maxWidth="2xl" padding="md">
            <div className="w-full">
              {children}
            </div>
          </ResponsiveContainer>
        </main>

        <Footer />
      </div>
    </div>
  );
}
