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
  return (
    <div className="relative">
      <Card className={cn(
        "group cursor-pointer transition-all duration-300",
        "hover:shadow-medium hover:scale-[1.01] hover:-translate-y-1",
        "bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/30",
        "w-[420px] h-80", // Make cards wider but same height
        className
      )}>
        <CardContent className="p-4 h-full">
          <div className="space-y-3 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {story.source.logo ? (
                  <img 
                    src={story.source.logo} 
                    alt={story.source.name}
                    className="h-6 w-6 rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="h-6 w-6 rounded bg-gradient-chrome flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">
                      {story.source.name.charAt(0)}
                    </span>
                  </div>
                )}
                 <div className="min-w-0 flex-1">
                  <p className="font-medium text-xs truncate">{story.source.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs font-medium px-2 py-0.5",
                    story.relevance >= 90 ? "border-red-500 text-red-600 bg-red-50" :
                    story.relevance >= 80 ? "border-orange-500 text-orange-600 bg-orange-50" :
                    "border-yellow-500 text-yellow-600 bg-yellow-50"
                  )}
                >
                  {story.relevance}%
                </Badge>
                <p className="text-xs text-muted-foreground">{story.timestamp}</p>
              </div>
            </div>

            {/* Placeholder Image */}
            <div className="w-full h-24 rounded-md overflow-hidden bg-muted">
              <img 
                src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=96&fit=crop&crop=center`}
                alt="Story thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {story.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                {story.summary}
              </p>
              
              {/* Categories */}
              <div className="flex items-center gap-1 flex-wrap">
                {story.categories.slice(0, 6).map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Action Buttons - Positioned outside bottom right */}
      <div className="absolute -bottom-2 -right-2 flex items-center gap-1 bg-background border rounded-md p-1 shadow-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          className="hover:bg-accent h-6 w-6 p-0"
          // 🔄 MIGRATION TODO: Wire to real bookmark functionality
          // onClick={() => onBookmark?.(story.id)}
        >
          <Bookmark className="h-3 w-3" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="hover:bg-accent h-6 w-6 p-0"
          // 🔄 MIGRATION TODO: Wire to real comment/discussion functionality
          // onClick={() => onComment?.(story.id)}
        >
          <MessageCircle className="h-3 w-3" />
        </Button>
        <Button 
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-2 py-1 h-6"
          onClick={() => window.open(story.url, '_blank')}
          // 🔄 MIGRATION TODO: Add analytics tracking for article clicks
          // onClick={() => { trackArticleClick(story.id); window.open(story.url, '_blank'); }}
        >
          Read
          <ExternalLink className="ml-1 h-2.5 w-2.5" />
        </Button>
      </div>
    </div>
  );
}