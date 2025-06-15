
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
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 pt-6 pb-5 mb-4">
      <div className="flex items-center gap-3">
        {/* Bloc visuel du retour + breadcrumbs */}
        <div className="flex items-center gap-3 w-full bg-gradient-to-r from-blue-50 to-pink-50/70 shadow-md rounded-2xl px-4 py-3 border border-blue-100/60 backdrop-blur-sm animate-fade-in">
          <Button
            asChild
            variant="outline"
            className="px-3 py-2 font-semibold flex gap-2 rounded-lg text-primary bg-white/90 border-2 border-blue-200 shadow hover:bg-blue-50 hover:border-blue-400 transition text-base focus-visible:ring-2 focus-visible:ring-pink-400"
            style={{ minWidth: 112 }}
          >
            <a href="/" aria-label="Retour à l'accueil">
              <HomeIcon className="mr-2" size={20} />
              Accueil
            </a>
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.label}>
                  <BreadcrumbItem>
                    {idx < crumbs.length - 1 && crumb.href ? (
                      <BreadcrumbLink asChild>
                        <a href={crumb.href}>{crumb.label}</a>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {idx < crumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}

