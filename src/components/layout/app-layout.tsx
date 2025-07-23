import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { FloatingElements } from "@/components/ui/floating-elements";
import { GeometricPattern } from "@/components/ui/geometric-pattern";

interface AppLayoutProps {
  children: ReactNode;
  fullHeight?: boolean; // New prop for full-height layouts
}

export function AppLayout({ children, fullHeight = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex w-full relative overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <AnimatedBackground />
      <FloatingElements />
      <GeometricPattern variant="dots" />
      
      {/* Main content */}
      <div className="relative z-10 flex w-full h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {fullHeight ? (
            <div className="h-full">
              {children}
            </div>
          ) : (
            <div className="p-6">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}