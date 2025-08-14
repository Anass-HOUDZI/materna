
import React from "react";
import { Link } from "react-router-dom";
import ModernCard from "./ModernCard";
import { Calendar, Smile, Heart, Shield, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = "calendar" | "smile" | "heart" | "shield";

const iconMap: Record<IconName, LucideIcon> = {
  calendar: Calendar,
  smile: Smile,
  heart: Heart,
  shield: Shield,
};

const colorVariants = {
  calendar: {
    bg: "bg-gradient-to-br from-blue-500/10 to-blue-600/20",
    iconBg: "bg-blue-500",
    iconColor: "text-white",
    border: "border-blue-200/50",
    hover: "hover:from-blue-500/20 hover:to-blue-600/30"
  },
  smile: {
    bg: "bg-gradient-to-br from-emerald-500/10 to-green-600/20",
    iconBg: "bg-emerald-500",
    iconColor: "text-white",
    border: "border-emerald-200/50", 
    hover: "hover:from-emerald-500/20 hover:to-green-600/30"
  },
  heart: {
    bg: "bg-gradient-to-br from-rose-500/10 to-pink-600/20",
    iconBg: "bg-rose-500",
    iconColor: "text-white",
    border: "border-rose-200/50",
    hover: "hover:from-rose-500/20 hover:to-pink-600/30"
  },
  shield: {
    bg: "bg-gradient-to-br from-violet-500/10 to-purple-600/20",
    iconBg: "bg-violet-500",
    iconColor: "text-white",
    border: "border-violet-200/50",
    hover: "hover:from-violet-500/20 hover:to-purple-600/30"
  }
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
  const colors = colorVariants[icon];

  return (
    <Link
      to={href}
      className={cn(
        "group block relative overflow-hidden",
        // Mobile-first sizing and spacing
        "min-h-touch rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6",
        // Background and borders
        "bg-white/90 backdrop-blur-sm border shadow-md xs:shadow-lg",
        // Transitions and transforms - optimized for mobile
        "transition-all duration-300 ease-out transform-gpu",
        // Touch interactions
        "active:scale-95 active:brightness-95",
        // Desktop hover effects
        "no-touch:hover:shadow-xl no-touch:hover:scale-[1.02] no-touch:hover:-translate-y-1",
        // Focus styles
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        // Color variants
        colors.bg,
        colors.border,
        colors.hover,
        className
      )}
      aria-label={`${title} – ouvrir`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 opacity-0 no-touch:group-hover:opacity-100 transition-opacity duration-500">
        <div className={cn("absolute inset-0", colors.bg)} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-3 xs:space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className={cn(
            "flex items-center justify-center shadow-lg",
            // Mobile-first icon sizing
            "h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 rounded-xl xs:rounded-2xl",
            "transition-transform duration-300 no-touch:group-hover:scale-110",
            colors.iconBg
          )}>
            <Icon className={cn(
              colors.iconColor,
              // Mobile-first icon sizes
              "h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8"
            )} strokeWidth={1.5} aria-hidden />
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-1 xs:space-y-2">
          <h3 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 leading-tight">
            {title}
          </h3>
          <p className="text-xs xs:text-sm text-gray-600 leading-relaxed px-1 xs:px-0">
            {description}
          </p>
        </div>
      </div>

      {/* Shine effect - disabled on mobile for performance */}
      <div className="absolute inset-0 opacity-0 no-touch:group-hover:opacity-20 transition-opacity duration-500">
        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent transform skew-x-12 no-touch:group-hover:animate-shine" />
      </div>
    </Link>
  );
});

HeroQuickCard.displayName = "HeroQuickCard";

export default HeroQuickCard;
