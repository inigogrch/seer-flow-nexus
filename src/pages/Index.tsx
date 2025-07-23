import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { RoleSelection } from "@/components/onboarding/role-selection";
import { TechInterests } from "@/components/onboarding/tech-interests";
import { ProjectsPriorities } from "@/components/onboarding/projects-priorities";
import { FeedHeader } from "@/components/feed/feed-header";
import { Filters } from "@/components/feed/filters";
import { StoryCard } from "@/components/feed/story-card";
import { FloatingElements } from "@/components/ui/floating-elements";
import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ============================================================================
// 🔄 MIGRATION TODO: Replace this mock data with real API calls
// ============================================================================
// Mock data for demonstration - REPLACE WITH REAL API INTEGRATION
const mockStories = [
  {
    id: "1",
    title: "OpenAI Releases New Vision-Language Model: Multimodal AI Reaches Human Parity",
    summary: "Latest model demonstrates unprecedented understanding of images and text combined. Industry experts predict major impact on automation and content generation.",
    source: { name: "AI Daily", logo: undefined },
    timestamp: "8 hours ago",
    relevance: 91,
    impact: "High" as const,
    categories: ["llms", "computer-vision", "automation"],
    readTime: "6 min read",
    url: "https://example.com" // 🔄 REPLACE with real article URLs
  },
  {
    id: "2", 
    title: "Computer Vision Breakthrough: Edge Devices Now Process 4K Video in Real-Time",
    summary: "New optimization techniques allow complex computer vision models to run on mobile devices without compromising accuracy. Game-changing for IoT applications.",
    source: { name: "Tech Innovation Hub", logo: undefined },
    timestamp: "6 hours ago",
    relevance: 82,
    impact: "Medium" as const,
    categories: ["computer-vision", "edge-computing", "optimization"],
    readTime: "5 min read",
    url: "https://example.com" // 🔄 REPLACE with real article URLs
  },
  {
    id: "3",
    title: "Snowflake Announces Native LLM Integration for Data Warehousing",
    summary: "Direct integration allows data scientists to run LLM inference on warehouse data without external APIs. Significant implications for enterprise AI adoption.",
    source: { name: "Data Engineering Weekly", logo: undefined },
    timestamp: "10 hours ago", 
    relevance: 75,
    impact: "High" as const,
    categories: ["snowflake", "llms", "data-warehousing"],
    readTime: "4 min read",
    url: "https://example.com" // 🔄 REPLACE with real article URLs
  }
];
// ============================================================================

const Index = () => {
  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [otherRole, setOtherRole] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [otherInterests, setOtherInterests] = useState("");
  const [projects, setProjects] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Feed state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImpact, setSelectedImpact] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleOnboardingComplete = async () => {
    setIsLoading(true);
    
    // ============================================================================
    // 🔄 MIGRATION TODO: Replace with real API call to /api/feed endpoint
    // ============================================================================
    // Simulate API call - REPLACE WITH REAL API INTEGRATION
    // Expected API call:
    // const userData = {
    //   role: selectedRole === "other" ? otherRole : selectedRole,
    //   interests: [...selectedInterests, ...otherInterests.split(",").map(s => s.trim()).filter(Boolean)],
    //   projects: projects
    // };
    // const response = await fetch('/api/feed', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    // const feedData = await response.json();
    await new Promise(resolve => setTimeout(resolve, 2000));
    // ============================================================================
    
    setIsLoading(false);
    setIsOnboardingComplete(true);
  };

  const canProceedStep1 = selectedRole !== null && (selectedRole !== "other" || otherRole.trim() !== "");
  const canProceedStep2 = selectedInterests.length > 0 || otherInterests.trim() !== "";

  // If onboarding is not complete, show onboarding flow
  if (!isOnboardingComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background visual elements for onboarding */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <FloatingElements />
        <GeometricPattern variant="hexagons" />
        
        <div className="w-full max-w-6xl relative z-10">
          {/* Step content */}
          {onboardingStep === 1 && (
            <RoleSelection
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
              otherRole={otherRole}
              onOtherRoleChange={setOtherRole}
            />
          )}

          {onboardingStep === 2 && (
            <TechInterests
              selectedInterests={selectedInterests}
              onInterestToggle={handleInterestToggle}
              otherInterests={otherInterests}
              onOtherInterestsChange={setOtherInterests}
            />
          )}

          {onboardingStep === 3 && (
            <ProjectsPriorities
              projects={projects}
              onProjectsChange={setProjects}
              onComplete={handleOnboardingComplete}
              isLoading={isLoading}
            />
          )}

          {/* Progress indicators */}
          <div className="flex justify-center mt-8 mb-8">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-8 rounded-full transition-colors ${
                onboardingStep >= 1 ? "bg-primary" : "bg-muted"
              }`} />
              <div className={`h-2 w-8 rounded-full transition-colors ${
                onboardingStep >= 2 ? "bg-primary" : "bg-muted"
              }`} />
              <div className={`h-2 w-8 rounded-full transition-colors ${
                onboardingStep >= 3 ? "bg-primary" : "bg-muted"
              }`} />
            </div>
          </div>

          {/* Navigation */}
          {onboardingStep < 3 && (
            <div className="flex justify-center gap-4 mt-8">
              {onboardingStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setOnboardingStep(prev => prev - 1)}
                  className="group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back
                </Button>
              )}
              
              <Button
                onClick={() => setOnboardingStep(prev => prev + 1)}
                disabled={
                  (onboardingStep === 1 && !canProceedStep1) ||
                  (onboardingStep === 2 && !canProceedStep2)
                }
                className="group"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show the main feed
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in mt-2">
        <FeedHeader 
          storiesCount={mockStories.length}
          userProfile={{
            role: selectedRole === "other" ? otherRole : selectedRole || "",
            interests: [...selectedInterests, ...otherInterests.split(",").map(s => s.trim()).filter(Boolean)]
          }}
          // 🔄 MIGRATION TODO: Add onRefresh handler that calls real API
          // onRefresh={() => fetchLatestStories()}
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
          // 🔄 MIGRATION TODO: These filters should trigger API calls to filter stories
        />

        {/* 🔄 MIGRATION TODO: Replace mockStories with real data from API */}
        <ScrollArea className="h-[calc(100vh-320px)] pr-4">
          <div className="space-y-4">
            {mockStories.map((story) => (
              <StoryCard 
                key={story.id} 
                story={story}
                className="animate-slide-in"
                // 🔄 MIGRATION TODO: Add real interaction handlers
                // onBookmark={(storyId) => handleBookmark(storyId)}
                // onShare={(storyId) => handleShare(storyId)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  );
};

export default Index;
