import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bookmark, MessageCircle, Clock, TrendingUp } from "lucide-react";
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
            <Card key={i} className="min-w-[320px] h-[200px] animate-pulse bg-muted" />
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
            <Card 
              key={story.id} 
              className="min-w-[320px] max-w-[320px] p-4 hover:bg-accent/50 transition-colors group cursor-pointer bg-card/50 backdrop-blur-sm border-border hover:border-primary/20"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center">
                    {story.source.logo ? (
                      <img src={story.source.logo} alt={story.source.name} className="w-3 h-3" />
                    ) : (
                      <TrendingUp className="w-3 h-3 text-primary" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{story.source.name}</span>
                </div>
                <Badge 
                  variant={story.impact === "High" ? "destructive" : story.impact === "Medium" ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {story.impact}
                </Badge>
              </div>

              {/* Content */}
              <div className="space-y-3 flex-1">
                <h4 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {story.title}
                </h4>
                
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {story.summary}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-1">
                  {story.categories.slice(0, 2).map((category, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                      {category}
                    </Badge>
                  ))}
                  {story.categories.length > 2 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{story.categories.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {story.readTime}
                  </span>
                  <span>{story.timestamp}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0 hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Handle bookmark
                    }}
                  >
                    <Bookmark className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0 hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Handle comment
                    }}
                  >
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0 hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(story.url, '_blank');
                    }}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}