
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";

type Crumb = {
  href?: string;
  label: string;
};

interface PageHeaderProps {
  crumbs: Crumb[];
}

export default function PageHeader({ crumbs }: PageHeaderProps) {
  // Simplifier les breadcrumbs : seulement Accueil + nom de l'outil
  const simplifiedCrumbs = crumbs.length > 1 ? [crumbs[crumbs.length - 1]] : crumbs;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 pt-6 mobile-s:pt-8 sm:pt-10 pb-4 mobile-s:pb-6 mb-4">
      <div className="flex items-center gap-4 w-full">
        {/* Enhanced breadcrumb container with modern glassmorphism design */}
        <div className="flex items-center gap-4 w-full bg-white/80 backdrop-blur-xl 
                        shadow-soft-lg rounded-3xl px-6 mobile-s:px-8 py-4 mobile-s:py-5 
                        border border-white/60 ring-1 ring-blue-200/40 animate-fade-in
                        hover:shadow-xl hover:bg-white/90 transition-all duration-500 ease-out
                        backdrop-filter backdrop-saturate-150">
          <Button
            asChild
            variant="outline"
            className="px-5 mobile-s:px-7 py-3 mobile-s:py-4 font-semibold flex items-center gap-3 
                       rounded-2xl text-slate-700 bg-white/95 border-2 border-blue-200/70 
                       shadow-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                       hover:border-blue-400/80 hover:shadow-lg hover:scale-105
                       transition-all duration-300 ease-out text-base mobile-s:text-lg
                       focus-visible:ring-4 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2
                       min-h-touch"
          >
            <a 
              href="/" 
              aria-label="Retour à l'accueil"
              className="flex items-center gap-3"
            >
              <HomeIcon className="w-5 h-5 mobile-s:w-6 mobile-s:h-6" />
              <span>Accueil</span>
            </a>
          </Button>
          
          <Breadcrumb className="flex-1">
            <BreadcrumbList className="text-base mobile-s:text-lg">
              {simplifiedCrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.label}>
                  {idx === 0 && <BreadcrumbSeparator className="text-slate-400" />}
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-slate-800 font-semibold text-lg mobile-s:text-xl">
                      {crumb.label}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}
