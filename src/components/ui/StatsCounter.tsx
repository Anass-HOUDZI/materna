
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  gradient?: string;
}

const StatsCounter = React.memo<StatsCounterProps>(({
  value,
  label,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
  gradient = "from-blue-600 to-purple-600"
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${label}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [label]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function pour un effet plus fluide
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isVisible, value, duration]);

  return (
    <div
      id={`counter-${label}`}
      className={cn("text-center space-y-2", className)}
    >
      <div className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
        gradient
      )}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-lg md:text-xl text-muted-foreground font-medium">
        {label}
      </div>
    </div>
  );
});

StatsCounter.displayName = "StatsCounter";

export default StatsCounter;
