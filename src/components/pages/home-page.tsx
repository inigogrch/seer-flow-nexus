'use client'

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { FeedRow } from "@/components/feed/feed-row";
import { FeedHeader } from "@/components/feed/feed-header";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/feed/filters";
import { RoleSelection } from "@/components/onboarding/role-selection";
import { TechInterests } from "@/components/onboarding/tech-interests";
import { ProjectsPriorities } from "@/components/onboarding/projects-priorities";
import { Sparkles, TrendingUp, Zap, Globe, Star, ChevronUp, ChevronDown, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

// 🔄 PLACEHOLDER: Mock story data - Replace with actual API calls
// This data structure matches the expected API response from GET /api/feed
const mockStories = [
  {
    id: "1",
    title: "OpenAI Releases GPT-5: Revolutionary Breakthrough in Reasoning Capabilities",
    summary: "OpenAI announces GPT-5 with unprecedented reasoning abilities, multi-modal understanding, and 10x efficiency improvements over previous models.",
    source: { name: "OpenAI Blog", logo: "" },
    timestamp: "2 hours ago",
    relevance: 95,
    impact: "High" as const,
    categories: ["LLMs", "Machine Learning", "OpenAI"],
    readTime: "4 min read",
    url: "https://openai.com"
  },
  {
    id: "2",
    title: "Google's Quantum Computer Achieves Major Milestone in Error Correction",
    summary: "Google demonstrates quantum error correction breakthrough that could accelerate practical quantum computing applications.",
    source: { name: "Google Research", logo: "" },
    timestamp: "4 hours ago",
    relevance: 88,
    impact: "High" as const,
    categories: ["Quantum Computing", "Google", "Research"],
    readTime: "6 min read",
    url: "https://research.google.com"
  },
  {
    id: "3",
    title: "Apple Unveils M3 Chip with Groundbreaking Performance and Efficiency",
    summary: "Apple introduces the M3 chip, boasting significant performance gains and power efficiency improvements for Mac devices.",
    source: { name: "Apple Newsroom", logo: "" },
    timestamp: "6 hours ago",
    relevance: 92,
    impact: "High" as const,
    categories: ["Hardware", "Apple", "Semiconductors"],
    readTime: "5 min read",
    url: "https://www.apple.com/newsroom/"
  },
  {
    id: "4",
    title: "Microsoft Announces New AI-Powered Features for Windows 12",
    summary: "Microsoft reveals upcoming AI-driven features for Windows 12, including intelligent search, enhanced productivity tools, and improved security.",
    source: { name: "Microsoft Blog", logo: "" },
    timestamp: "8 hours ago",
    relevance: 85,
    impact: "Medium" as const,
    categories: ["AI", "Software", "Microsoft"],
    readTime: "7 min read",
    url: "https://blogs.microsoft.com/"
  },
  {
    id: "5",
    title: "Amazon Web Services (AWS) Launches New Quantum Computing Service",
    summary: "AWS introduces a new cloud-based quantum computing service, providing developers with access to cutting-edge quantum hardware and software tools.",
    source: { name: "AWS News", logo: "" },
    timestamp: "10 hours ago",
    relevance: 78,
    impact: "Medium" as const,
    categories: ["Quantum Computing", "Cloud Computing", "Amazon"],
    readTime: "8 min read",
    url: "https://aws.amazon.com/blogs/aws/"
  },
  {
    id: "6",
    title: "Tesla Achieves Full Self-Driving (FSD) Capability with Latest Software Update",
    summary: "Tesla announces that its Full Self-Driving (FSD) software has reached full capability, enabling autonomous driving in most scenarios.",
    source: { name: "Tesla News", logo: "" },
    timestamp: "12 hours ago",
    relevance: 90,
    impact: "High" as const,
    categories: ["Autonomous Vehicles", "Tesla", "AI"],
    readTime: "6 min read",
    url: "https://www.tesla.com/news"
  },
  {
    id: "7",
    title: "Intel Unveils Next-Generation CPU Architecture for AI Workloads",
    summary: "Intel presents its latest CPU architecture optimized for AI workloads, delivering significant performance improvements for deep learning and machine learning tasks.",
    source: { name: "Intel Newsroom", logo: "" },
    timestamp: "14 hours ago",
    relevance: 82,
    impact: "Medium" as const,
    categories: ["Hardware", "Intel", "AI"],
    readTime: "7 min read",
    url: "https://newsroom.intel.com/"
  },
  {
    id: "8",
    title: "IBM Announces Breakthrough in Neuromorphic Computing",
    summary: "IBM reveals a major breakthrough in neuromorphic computing, paving the way for more energy-efficient and brain-inspired AI systems.",
    source: { name: "IBM Research", logo: "" },
    timestamp: "16 hours ago",
    relevance: 85,
    impact: "Medium" as const,
    categories: ["Neuromorphic Computing", "AI", "IBM"],
    readTime: "8 min read",
    url: "https://research.ibm.com/"
  },
  {
    id: "9",
    title: "NVIDIA Launches New GPU for High-Performance Computing and AI",
    summary: "NVIDIA introduces its latest GPU designed for high-performance computing and AI applications, offering unparalleled processing power and efficiency.",
    source: { name: "NVIDIA Newsroom", logo: "" },
    timestamp: "18 hours ago",
    relevance: 88,
    impact: "High" as const,
    categories: ["Hardware", "NVIDIA", "AI"],
    readTime: "6 min read",
    url: "https://nvidianews.nvidia.com/"
  },
  {
    id: "10",
    title: "DeepMind's AlphaFold 3 Achieves Unprecedented Accuracy in Protein Structure Prediction",
    summary: "DeepMind's AlphaFold 3 achieves a significant milestone in protein structure prediction, surpassing previous models in accuracy and reliability.",
    source: { name: "DeepMind Blog", logo: "" },
    timestamp: "20 hours ago",
    relevance: 95,
    impact: "High" as const,
    categories: ["AI", "DeepMind", "Biotechnology"],
    readTime: "5 min read",
    url: "https://deepmind.google/"
  }
];

// Static feed rows
const STATIC_ROWS = [
  { id: "1", title: "✨ Top Picks", icon: Sparkles },
  { id: "2", title: "💻 Software Engineering", icon: TrendingUp },
  { id: "3", title: "🤖 AI Agents", icon: Zap },
  { id: "4", title: "🔬 Research Highlights", icon: Globe }
];

export function HomePage() {
  // 🔄 ONBOARDING STATE MANAGEMENT
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [otherInterests, setOtherInterests] = useState("");
  const [projects, setProjects] = useState("");

  // 🔄 FEED STATE MANAGEMENT  
  const [feedRows, setFeedRows] = useState(STATIC_ROWS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImpact, setSelectedImpact] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Check onboarding status on mount
  useEffect(() => {
    const userPreferences = localStorage.getItem('user_preferences');
    setIsOnboardingComplete(!!userPreferences);
  }, []);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleOnboardingComplete = async () => {
    const finalRole = selectedRole === "other" ? otherRole : selectedRole;
    const finalInterests = otherInterests ? [...selectedInterests, ...otherInterests.split(',').map(i => i.trim())] : selectedInterests;
    
    const preferences = {
      role: finalRole,
      interests: finalInterests,
      projects: projects,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('user_preferences', JSON.stringify(preferences));
    
    try {
      // 🔄 MIGRATION TODO: Replace with actual API call
      const response = await fetch('/api/user/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
    
    setIsOnboardingComplete(true);
  };

  // 🔄 ONBOARDING UI LOGIC
  if (!isOnboardingComplete) {
    const totalSteps = 3;
    
    const canProceed = () => {
      switch (onboardingStep) {
        case 1: return selectedRole !== "" && (selectedRole !== "other" || otherRole.trim() !== "");
        case 2: return selectedInterests.length > 0 || otherInterests.trim() !== "";
        case 3: return projects.trim() !== "";
        default: return false;
      }
    };

    const renderStepContent = () => {
      switch (onboardingStep) {
        case 1:
          return (
            <RoleSelection
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
              otherRole={otherRole}
              onOtherRoleChange={setOtherRole}
            />
          );
        case 2:
          return (
            <TechInterests
              selectedInterests={selectedInterests}
              onInterestToggle={handleInterestToggle}
              otherInterests={otherInterests}
              onOtherInterestsChange={setOtherInterests}
            />
          );
        case 3:
          return (
            <ProjectsPriorities
              projects={projects}
              onProjectsChange={setProjects}
              onComplete={handleOnboardingComplete}
              isLoading={false}
            />
          );
        default:
          return null;
      }
    };

    return (
      <AppLayout>
        <div className="h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            {renderStepContent()}
          </div>

          <div className="flex justify-between items-center p-6 bg-background/80 backdrop-blur-sm border-t border-border">
            <Button
              variant="outline"
              onClick={() => onboardingStep > 1 ? setOnboardingStep(onboardingStep - 1) : setIsOnboardingComplete(true)}
              className="bg-background/50 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {onboardingStep > 1 ? 'Previous' : 'Skip'}
            </Button>

            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${stepNumber <= onboardingStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {stepNumber < onboardingStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`
                      w-12 h-0.5 mx-2
                      ${stepNumber < onboardingStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {onboardingStep < totalSteps ? (
              <Button
                onClick={() => setOnboardingStep(onboardingStep + 1)}
                disabled={!canProceed()}
                className="bg-gradient-primary text-primary-foreground"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleOnboardingComplete}
                disabled={!canProceed()}
                className="bg-gradient-primary text-primary-foreground"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Feed
              </Button>
            )}
          </div>
        </div>
      </AppLayout>
    );
  }

  // 🔄 FEED UI LOGIC
  const moveRow = (fromIndex: number, toIndex: number) => {
    const newRows = [...feedRows];
    const [movedRow] = newRows.splice(fromIndex, 1);
    newRows.splice(toIndex, 0, movedRow);
    setFeedRows(newRows);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // 🔄 MIGRATION TODO: Replace with actual API call
      const response = await fetch('/api/feed/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'placeholder', forceRefresh: true })
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh feed');
      }
      
      console.log('Feed refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh feed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="h-full overflow-y-auto max-h-screen">
        <div className="space-y-6 pb-6">
          {/* Header */}
          <FeedHeader 
            storiesCount={mockStories.length * feedRows.length}
            isLoading={isLoading}
            onRefresh={handleRefresh}
          />

          {/* Filters */}
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

          {/* Feed Rows */}
          <div className="space-y-8">
            {feedRows.map((row, index) => (
              <div key={row.id} className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{row.title}</h2>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => index > 0 && moveRow(index, index - 1)}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => index < feedRows.length - 1 && moveRow(index, index + 1)}
                      disabled={index === feedRows.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <FeedRow
                  title=""
                  stories={mockStories}
                  isLoading={isLoading}
                />
              </div>
            ))}
          </div>

          {/* 🔄 MIGRATION TODO: Backend Integration Required */}
          {/* 
          FEED MODES:
          1. LANDING PAGE FEED (Default): 
             - Public feed for all users
             - Rows: Trending, Breakthroughs, Industry, Editor's Picks
             - API: GET /api/feed?query=trending&mode=public
          
          2. PERSONALIZED FEED (Post-onboarding):
             - Based on user preferences from localStorage.user_preferences
             - Rows: Top Picks, {Interest}-based rows, Trending in {Role}
             - API: GET /api/feed?userId={userId}&query={rowQuery}&mode=personalized
          
          BACKEND INTEGRATION TODO:
          1. Replace mockStories with actual API calls to GET /api/feed
          2. Implement vector relevance scoring for personalized content
          3. Add user preference-based row customization
          4. Add caching mechanism for feed data
          5. Implement real-time updates for trending content
          6. Add pagination for large result sets
          7. Add analytics tracking for feed interactions
          */}
        </div>
      </div>
    </AppLayout>
  );
}
