import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProjectsPrioritiesProps {
  projects: string;
  onProjectsChange: (value: string) => void;
  onComplete: () => void;
  isLoading: boolean;
}

export function ProjectsPriorities({ 
  projects, 
  onProjectsChange, 
  onComplete,
  isLoading 
}: ProjectsPrioritiesProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Your projects & priorities</h2>
        <p className="text-muted-foreground text-lg">
          Tell us what you're working on to get more relevant insights
        </p>
      </div>

      <Card className="max-w-2xl mx-auto bg-gradient-chrome border-2">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Projects & Priorities:
              </label>
              <textarea
                placeholder="e.g., Building an agentic RAG pipeline, implementing computer vision for manufacturing QA, migrating to modern data stack..."
                value={projects}
                onChange={(e) => onProjectsChange(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <Button 
              onClick={onComplete}
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium py-3 text-base group"
            >
              {isLoading ? (
                "Setting up your feed..."
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}