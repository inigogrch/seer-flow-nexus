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

// 🔄 MIGRATION TODO: Replace with real API calls to your backend
// API ENDPOINT: POST /api/stories/feed - Get personalized stories
// API ENDPOINT: GET /api/stories/trending - Get trending stories  
// API ENDPOINT: GET /api/stories/categories - Get available categories
const mockStories = [
  {
    id: "1",
    title: "The Future of Artificial Intelligence in Healthcare", // 🔄 PLACEHOLDER: Real story title from CMS
    summary: "Exploring how AI is revolutionizing medical diagnostics and treatment planning through advanced machine learning algorithms.", // 🔄 PLACEHOLDER: Real story summary
    source: { name: "AI Medical Journal" }, // 🔄 PLACEHOLDER: Real source from backend
    timestamp: "2 hours ago", // 🔄 PLACEHOLDER: Calculate from real publishedAt timestamp
    relevance: 95, // 🔄 PLACEHOLDER: Real AI-calculated relevance score
    impact: "High" as const, // 🔄 PLACEHOLDER: Real impact classification
    categories: ["AI", "Healthcare", "Machine Learning"], // 🔄 PLACEHOLDER: Real categories from taxonomy
    readTime: "8 min read", // 🔄 PLACEHOLDER: Calculate from real content length
    url: "https://example.com/ai-healthcare" // 🔄 PLACEHOLDER: Real article URL
  },
  {
    id: "2", 
    title: "Breakthrough in Quantum Computing Algorithms", // 🔄 PLACEHOLDER: Real story data
    summary: "Researchers develop new quantum algorithms that could solve complex optimization problems exponentially faster.", // 🔄 PLACEHOLDER: Real summary
    source: { name: "Quantum Research Weekly" }, // 🔄 PLACEHOLDER: Real source
    timestamp: "5 hours ago", // 🔄 PLACEHOLDER: Real timestamp
    relevance: 88, // 🔄 PLACEHOLDER: Real relevance
    impact: "High" as const, // 🔄 PLACEHOLDER: Real impact
    categories: ["Quantum Computing", "Algorithms", "Research"], // 🔄 PLACEHOLDER: Real categories
    readTime: "12 min read", // 🔄 PLACEHOLDER: Real read time
    url: "https://example.com/quantum-algorithms" // 🔄 PLACEHOLDER: Real URL
  },
  {
    id: "3",
    title: "Sustainable Tech: Green Data Centers of Tomorrow", // 🔄 PLACEHOLDER: Real story data
    summary: "How companies are reducing their carbon footprint with innovative cooling systems and renewable energy integration.", // 🔄 PLACEHOLDER: Real summary
    source: { name: "GreenTech Today" }, // 🔄 PLACEHOLDER: Real source
    timestamp: "1 day ago", // 🔄 PLACEHOLDER: Real timestamp
    relevance: 82, // 🔄 PLACEHOLDER: Real relevance
    impact: "Medium" as const, // 🔄 PLACEHOLDER: Real impact
    categories: ["Sustainability", "Data Centers", "Green Tech"], // 🔄 PLACEHOLDER: Real categories
    readTime: "6 min read", // 🔄 PLACEHOLDER: Real read time
    url: "https://example.com/green-data-centers" // 🔄 PLACEHOLDER: Real URL
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
    
    // 🔄 MIGRATION TODO: Replace with real API call
    // API ENDPOINT: POST /api/user/onboard
    // PAYLOAD: { role, interests, projects }
    // RESPONSE: { success: boolean, userId: string, preferences: UserPreferences }
    try {
      const response = await fetch('/api/user/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: selectedRole === 'other' ? otherRole : selectedRole,
          interests: selectedInterests,
          projects: selectedProjects
        })
      });
      
      if (response.ok) {
        setIsOnboardingComplete(true);
      }
    } catch (error) {
      console.error('Onboarding failed:', error);
      // 🔄 MIGRATION TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
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
            // 🔄 MIGRATION TODO: Replace with real API call  
            // API ENDPOINT: POST /api/feed/refresh
            // PAYLOAD: { userId: string, forceRefresh: boolean }
            // RESPONSE: { stories: Story[], lastUpdated: string }
            try {
              const response = await fetch('/api/feed/refresh', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ forceRefresh: true })
              });
              // Handle response and update stories
            } catch (error) {
              console.error('Feed refresh failed:', error);
            } finally {
              setIsLoading(false);
            }
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