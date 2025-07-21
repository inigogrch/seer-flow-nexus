import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Bookmark, MessageCircle } from "lucide-react";

interface StoryCardProps {
  story: {
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
  };
  className?: string;
}

export function StoryCard({ story, className }: StoryCardProps) {
  const impactColors = {
    High: "bg-destructive text-destructive-foreground",
    Medium: "bg-warning text-warning-foreground", 
    Low: "bg-muted text-muted-foreground"
  };

  return (
    <Card className={cn(
      "group cursor-pointer transition-all duration-300",
      "hover:shadow-medium hover:scale-[1.01] hover:-translate-y-1",
      "bg-gradient-glass border-2 border-border hover:border-primary/30",
      className
    )}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {story.source.logo ? (
                <img 
                  src={story.source.logo} 
                  alt={story.source.name}
                  className="h-8 w-8 rounded object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-8 w-8 rounded bg-gradient-chrome flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium">
                    {story.source.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{story.source.name}</p>
                <p className="text-xs text-muted-foreground">{story.timestamp}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={cn("text-xs", impactColors[story.impact])}>
                {story.impact} Impact
              </Badge>
              <Badge variant="outline" className="text-xs">
                {story.relevance}% relevance
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
              {story.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {story.summary}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">{story.readTime}</span>
              {story.categories.slice(0, 3).map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => window.open(story.url, '_blank')}
              >
                Read
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}