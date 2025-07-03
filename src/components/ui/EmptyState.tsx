
import React from "react";
import { cn } from "@/lib/utils";
import { Search, FileX, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "search" | "file" | "alert" | React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState = React.memo<EmptyStateProps>(({
  title,
  description,
  icon = "search",
  action,
  className
}) => {
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return icon;
    }

    const iconClasses = "w-16 h-16 text-slate-400";
    
    switch (icon) {
      case "file":
        return <FileX className={iconClasses} />;
      case "alert":
        return <AlertCircle className={iconClasses} />;
      case "search":
      default:
        return <Search className={iconClasses} />;
    }
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 px-8 text-center",
      className
    )}>
      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        {renderIcon()}
      </div>
      
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        {title}
      </h3>
      
      <p className="text-slate-600 max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      
      {action && (
        <Button
          onClick={action.onClick}
          variant="primary"
          size="lg"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
});

EmptyState.displayName = "EmptyState";

export default EmptyState;
