import { cn } from "@/lib/utils";

interface FloatingElementsProps {
  className?: string;
}

export function FloatingElements({ className }: FloatingElementsProps) {
  return (
    <div className={cn("fixed inset-0 pointer-events-none z-0", className)}>
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary-glow/5 rounded-full blur-xl animate-bounce" 
           style={{ animationDuration: "6s", animationDelay: "0s" }} />
      
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-primary-glow/10 to-primary/5 rounded-lg rotate-45 blur-lg animate-pulse" 
           style={{ animationDuration: "4s", animationDelay: "2s" }} />
      
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-tr from-primary/5 to-primary-glow/10 rounded-full blur-2xl animate-bounce" 
           style={{ animationDuration: "8s", animationDelay: "1s" }} />
      
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-bl from-primary-glow/8 to-primary/3 rounded-lg rotate-12 blur-xl animate-pulse" 
           style={{ animationDuration: "5s", animationDelay: "3s" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" 
             style={{
               backgroundImage: `
                 linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                 linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
               `,
               backgroundSize: "60px 60px"
             }} />
      </div>

      {/* Radial gradient overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary-glow/5 via-transparent to-transparent blur-3xl" />
    </div>
  );
}