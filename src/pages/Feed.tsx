import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { FeedRow } from "@/components/feed/feed-row";
import { FeedHeader } from "@/components/feed/feed-header";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/feed/filters";
import { Sparkles, TrendingUp, Zap, Globe, Star } from "lucide-react";

// Mock story data - TODO: Replace with actual API calls
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
    title: "Tesla's FSD v12 Shows 90% Improvement in Complex Urban Scenarios",
    summary: "Latest Full Self-Driving update demonstrates significant improvements in handling complex city driving situations.",
    source: { name: "Tesla Engineering", logo: "" },
    timestamp: "6 hours ago",
    relevance: 82,
    impact: "Medium" as const,
    categories: ["Autonomous Vehicles", "Tesla", "Computer Vision"],
    readTime: "3 min read",
    url: "https://tesla.com"
  }
];

// Default feed rows for non-personalized users
const DEFAULT_ROWS = [
  { title: "🔥 Trending Now", query: "trending", icon: TrendingUp },
  { title: "🚀 Latest Breakthroughs", query: "breakthroughs", icon: Zap },
  { title: "🌐 Industry News", query: "industry", icon: Globe },
  { title: "⭐ Editor's Picks", query: "editors-picks", icon: Star }
];

interface UserPreferences {
  role: string;
  interests: string[];
  projects: string[];
}

export default function Feed() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImpact, setSelectedImpact] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Load user preferences from localStorage on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem('user_preferences');
    if (savedPrefs) {
      try {
        setUserPreferences(JSON.parse(savedPrefs));
      } catch (error) {
        console.error('Failed to parse user preferences:', error);
      }
    }
  }, []);

  // Generate personalized rows based on user preferences
  const getPersonalizedRows = (preferences: UserPreferences) => {
    const rows = [
      { title: "✨ Top Picks for You", query: `personalized-${preferences.role}`, icon: Sparkles },
      ...preferences.interests.slice(0, 3).map(interest => ({
        title: `🎯 ${interest}`,
        query: interest.toLowerCase().replace(/\s+/g, '-'),
        icon: TrendingUp
      })),
      { title: "🔥 Trending in Your Field", query: `trending-${preferences.role}`, icon: TrendingUp },
      { title: "📈 Latest Updates", query: "latest", icon: Zap }
    ];
    return rows;
  };

  const feedRows = userPreferences ? getPersonalizedRows(userPreferences) : DEFAULT_ROWS;

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual feed refresh API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Feed refreshed');
    } catch (error) {
      console.error('Failed to refresh feed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <FeedHeader 
          storiesCount={mockStories.length * feedRows.length}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          userProfile={userPreferences ? {
            role: userPreferences.role,
            interests: userPreferences.interests
          } : undefined}
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

        {/* Personalization prompt for new users */}
        {!userPreferences && (
          <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Get Personalized Content</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Tell us about your role and interests to get a curated feed tailored for you.
                </p>
              </div>
              <Button 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20"
                onClick={() => window.location.href = '/personalize'}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Personalize
              </Button>
            </div>
          </div>
        )}

        {/* Feed Rows */}
        <div className="space-y-8">
          {feedRows.map((row, index) => (
            <FeedRow
              key={`${row.query}-${index}`}
              title={row.title}
              stories={mockStories} // TODO: Fetch based on row.query
              isLoading={isLoading}
            />
          ))}
        </div>

        {/* TODO: Add migration note */}
        {/* 
        MIGRATION TODO:
        1. Replace mockStories with actual API calls to GET /api/feed?query={row.query}
        2. Implement vector relevance scoring for personalized content
        3. Add caching mechanism for feed data
        4. Implement real-time updates for trending content
        5. Add pagination for large result sets
        */}
      </div>
    </AppLayout>
  );
}