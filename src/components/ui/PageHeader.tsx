
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
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 pt-8 mobile-s:pt-10 sm:pt-12 pb-6 mobile-s:pb-8 mb-6">
      <div className="flex items-center gap-4 w-full">
        {/* Enhanced breadcrumb container with soft design */}
        <div className="flex items-center gap-4 w-full bg-gradient-to-r from-blue-50/80 via-white/90 to-pink-50/80 
                        backdrop-blur-md shadow-lg rounded-3xl px-6 mobile-s:px-8 py-4 mobile-s:py-5 
                        border border-white/40 ring-1 ring-blue-200/30 animate-fade-in
                        hover:shadow-xl transition-all duration-300 ease-out">
          <Button
            asChild
            variant="outline"
            className="px-4 mobile-s:px-6 py-3 mobile-s:py-4 font-semibold flex items-center gap-3 
                       rounded-2xl text-slate-700 bg-white/95 border-2 border-blue-200/60 
                       shadow-md hover:bg-blue-50 hover:border-blue-400/80 hover:shadow-lg
                       transition-all duration-300 ease-out text-base mobile-s:text-lg
                       focus-visible:ring-4 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2"
            style={{ minWidth: 140 }}
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
              {crumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.label}>
                  <BreadcrumbItem>
                    {idx < crumbs.length - 1 && crumb.href ? (
                      <BreadcrumbLink 
                        asChild
                        className="text-slate-600 hover:text-blue-600 transition-colors duration-200 
                                   font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 
                                   focus:ring-offset-1 rounded-lg px-2 py-1"
                      >
                        <a href={crumb.href}>{crumb.label}</a>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-slate-800 font-semibold">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {idx < crumbs.length - 1 && (
                    <BreadcrumbSeparator className="text-slate-400" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}
