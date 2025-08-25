import React, { useMemo, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "@/data/categories";
import { useFavorites } from "@/hooks/useFavorites";
import BasePageLayout from "@/components/ui/BasePageLayout";
import { Layout } from "@/components/ui/Layout";
import StatsCounter from "@/components/ui/StatsCounter";
import NotFound from "@/pages/NotFound";

// Lazy load ToolCard for better performance
const ToolCard = lazy(() => import("@/components/ui/ToolCard"));

const OptimizedCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Memoize category data
  const category = useMemo(() => getCategoryById(categoryId || ""), [categoryId]);

  if (!category) {
    return <NotFound />;
  }

  const crumbs = useMemo(() => [
    { href: "/", label: "Accueil" },
    { label: category.title },
  ], [category.title]);

  return (
    <BasePageLayout
      crumbs={crumbs}
      title={category.title}
      description={category.description}
      background="gradient"
    >
      <Layout direction="column" gap="2xl" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Stats */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
              <div className="text-white">
                {React.createElement(category.icon, { size: 32 })}
              </div>
            </div>
            <StatsCounter 
              value={category.tools.length} 
              label="outils disponibles"
              gradient="from-primary to-primary-foreground"
            />
          </div>
        </div>

        {/* Tools Grid */}
        {category.tools.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Suspense fallback={
              Array.from({ length: category.tools.length }).map((_, i) => (
                <div key={i} className="h-64 animate-pulse bg-muted rounded-lg" />
              ))
            }>
              {category.tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  title={tool.label}
                  description={tool.description}
                  href={tool.link}
                  icon={React.createElement(tool.icon, { size: 24 })}
                  gradient={tool.gradient}
                  isFavorite={isFavorite(tool.link)}
                  onToggleFavorite={() => toggleFavorite(tool.link)}
                  difficulty={tool.difficulty}
                  rating={tool.rating}
                />
              ))}
            </Suspense>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">{React.createElement(category.icon)}</div>
            <h3 className="text-xl font-semibold mb-2">Aucun outil disponible</h3>
            <p className="text-muted-foreground">
              Cette catégorie sera bientôt enrichie avec de nouveaux outils.
            </p>
          </div>
        )}
      </Layout>
    </BasePageLayout>
  );
};

export default OptimizedCategoryPage;