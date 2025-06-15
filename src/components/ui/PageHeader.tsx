
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
        <Button
          asChild
          variant="outline"
          className="px-3 py-2 font-semibold rounded-lg"
        >
          <a href="/" aria-label="Retour à l'accueil">
            <HomeIcon className="mr-2" size={18} />
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
  );
}
