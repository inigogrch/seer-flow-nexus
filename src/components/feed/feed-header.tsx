import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Zap } from "lucide-react";

interface FeedHeaderProps {
  storiesCount: number;
  isLoading?: boolean;
  onRefresh?: () => void;
  userProfile?: {
    role: string;
    interests: string[];
  };
}

export function FeedHeader({ 
  storiesCount, 
  isLoading = false, 
  onRefresh,
  userProfile 
}: FeedHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Latest Intelligence</h2>
        <p className="text-muted-foreground">
          {storiesCount} stories curated for you
        </p>
      </div>
      
      <Button 
        onClick={onRefresh}
        disabled={isLoading}
        variant="outline"
        className="bg-background/50 backdrop-blur-sm hover:bg-accent"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  );
}