import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { FloatingElements } from "@/components/ui/floating-elements";
import { GeometricPattern } from "@/components/ui/geometric-pattern";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex w-full relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      {/* Main content */}
      <div className="relative z-10 flex w-full">
        <Sidebar />
        <main className="flex-1 p-6 overflow-hidden">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}