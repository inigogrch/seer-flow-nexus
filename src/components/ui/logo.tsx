import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "rounded-full bg-gradient-primary p-1.5 shadow-glow",
        sizeClasses[size]
      )}>
        <Eye className="h-full w-full text-primary-foreground" />
      </div>
      <span className="font-bold text-lg tracking-tight">seer.ai</span>
    </div>
  );
}