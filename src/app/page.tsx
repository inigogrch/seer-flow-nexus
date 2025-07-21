'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { FeedHeader } from "@/components/feed/feed-header";
import { Filters } from "@/components/feed/filters";
import { StoryCard } from "@/components/feed/story-card";
import { RoleSelection } from "@/components/onboarding/role-selection";
import { TechInterests } from "@/components/onboarding/tech-interests";
import { ProjectsPriorities } from "@/components/onboarding/projects-priorities";
import { Logo } from "@/components/ui/logo";

// Mock data - to be replaced with real API calls
const mockStories = [
  {
    id: "1",
    title: "The Future of Artificial Intelligence in Healthcare",
    summary: "Exploring how AI is revolutionizing medical diagnostics and treatment planning through advanced machine learning algorithms.",
    source: { name: "AI Medical Journal" },
    timestamp: "2 hours ago",
    relevance: 95,
    impact: "High" as const,
    categories: ["AI", "Healthcare", "Machine Learning"],
    readTime: "8 min read",
    url: "https://example.com/ai-healthcare"
  },
  {
    id: "2", 
    title: "Breakthrough in Quantum Computing Algorithms",
    summary: "Researchers develop new quantum algorithms that could solve complex optimization problems exponentially faster.",
    source: { name: "Quantum Research Weekly" },
    timestamp: "5 hours ago",
    relevance: 88,
    impact: "High" as const,
    categories: ["Quantum Computing", "Algorithms", "Research"],
    readTime: "12 min read",
    url: "https://example.com/quantum-algorithms"
  },
  {
    id: "3",
    title: "Sustainable Tech: Green Data Centers of Tomorrow", 
    summary: "How companies are reducing their carbon footprint with innovative cooling systems and renewable energy integration.",
    source: { name: "GreenTech Today" },
    timestamp: "1 day ago",
    relevance: 82,
    impact: "Medium" as const,
    categories: ["Sustainability", "Data Centers", "Green Tech"],
    readTime: "6 min read",
    url: "https://example.com/green-data-centers"
  }
];

export default function HomePage() {
  // Onboarding state
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [otherRole, setOtherRole] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState("");
  const [otherInterests, setOtherInterests] = useState("");

  // Feed state  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImpact, setSelectedImpact] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleOnboardingComplete = async () => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    // await fetch('/api/user/onboard', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     role: selectedRole === 'other' ? otherRole : selectedRole,
    //     interests: selectedInterests,
    //     projects: selectedProjects
    //   })
    // });
    
    // Simulate API call
    setTimeout(() => {
      setIsOnboardingComplete(true);
      setIsLoading(false);
    }, 1500);
  };

  if (!isOnboardingComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {onboardingStep === 1 && (
            <div className="space-y-6">
              <RoleSelection
                selectedRole={selectedRole}
                onRoleSelect={setSelectedRole}
                otherRole={otherRole}
                onOtherRoleChange={setOtherRole}
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => setOnboardingStep(2)}
                  disabled={!selectedRole}
                  size="lg"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="space-y-6">
              <TechInterests
                selectedInterests={selectedInterests}
                onInterestToggle={handleInterestToggle}
                otherInterests={otherInterests}
                onOtherInterestsChange={setOtherInterests}
              />
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setOnboardingStep(1)}
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setOnboardingStep(3)}
                  disabled={selectedInterests.length === 0}
                  size="lg"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {onboardingStep === 3 && (
            <div className="space-y-6">
              <ProjectsPriorities
                projects={selectedProjects}
                onProjectsChange={setSelectedProjects}
                onComplete={handleOnboardingComplete}
                isLoading={isLoading}
              />
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setOnboardingStep(2)}
                >
                  Back
                </Button>
                {/* Button is now inside ProjectsPriorities component */}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main feed view
  return (
    <AppLayout>
      <div className="space-y-6">
        <FeedHeader 
          storiesCount={mockStories.length}
          isLoading={isLoading}
          onRefresh={async () => {
            setIsLoading(true);
            // TODO: Replace with actual API call
            // await fetch('/api/feed/refresh', { method: 'POST' });
            setTimeout(() => setIsLoading(false), 1000);
          }}
          userProfile={{
            role: selectedRole === 'other' ? otherRole : selectedRole || '',
            interests: selectedInterests
          }}
        />
        
        <Filters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedImpact={selectedImpact}
          onImpactChange={setSelectedImpact}
          selectedTimeframe={selectedTimeframe}
          onTimeframeChange={setSelectedTimeframe}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
        />

        <div className="grid gap-6">
          {mockStories.map((story) => (
            <StoryCard 
              key={story.id}
              story={story}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}