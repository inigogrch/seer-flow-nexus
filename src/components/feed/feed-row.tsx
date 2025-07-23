import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { StoryCard } from "./story-card";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  title: string;
  summary: string;
  source: {
    name: string;
    logo?: string;
  };
  timestamp: string;
  relevance: number;
  impact: "High" | "Medium" | "Low";
  categories: string[];
  readTime: string;
  url: string;
}

interface FeedRowProps {
  title: string;
  stories: Story[];
  isLoading?: boolean;
  className?: string;
}

export function FeedRow({ title, stories, isLoading = false, className }: FeedRowProps) {
  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <h3 className="text-xl font-semibold px-6">{title}</h3>
        <div className="flex gap-4 px-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-96 h-80 animate-pulse bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-xl font-semibold px-6">{title}</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 px-6 pb-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}