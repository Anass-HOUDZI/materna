import React from "react";
import { Link } from "react-router-dom";
import ModernCard from "./ModernCard";
import { Calendar, Baby, Heart, Shield, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = "calendar" | "baby" | "heart" | "shield";

const iconMap: Record<IconName, LucideIcon> = {
  calendar: Calendar,
  baby: Baby,
  heart: Heart,
  shield: Shield,
};

interface HeroQuickCardProps {
  title: string;
  description: string;
  icon: IconName;
  href: string;
  className?: string;
}

const HeroQuickCard = React.memo<HeroQuickCardProps>(({ title, description, icon, href, className }) => {
  const Icon = iconMap[icon];

  return (
    <ModernCard variant="elevated" shine hover3d className={cn("h-full", className)}>
      <Link
        to={href}
        className="block p-5 sm:p-6 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`${title} – ouvrir`}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </div>
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </Link>
    </ModernCard>
  );
});

HeroQuickCard.displayName = "HeroQuickCard";

export default HeroQuickCard;
