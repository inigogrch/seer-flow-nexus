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
    <div className="space-y-4">
      {/* Profile Summary */}
      {userProfile && (
        <div className="bg-gradient-glass border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Your Intelligence Profile</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Personalized for {userProfile.role}
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium mb-2">Focus Areas:</p>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.slice(0, 5).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {userProfile.interests.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{userProfile.interests.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feed Header */}
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
    </div>
  );
}