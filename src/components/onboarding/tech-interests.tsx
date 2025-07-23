import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const techInterests = [
  "LLMs",
  "Snowflake", 
  "Computer Vision",
  "Robotics",
  "Cloud AI",
  "Data Visualization",
  "AI Agents",
  "Edge Computing", 
  "Quantum Computing",
  "Blockchain",
  "AutoML",
  "NLP",
  "Time Series",
  "Deep Learning",
  "Feature Engineering",
  "Data Warehousing"
];

interface TechInterestsProps {
  selectedInterests: string[];
  onInterestToggle: (interest: string) => void;
  otherInterests: string;
  onOtherInterestsChange: (value: string) => void;
}

export function TechInterests({ 
  selectedInterests, 
  onInterestToggle, 
  otherInterests, 
  onOtherInterestsChange 
}: TechInterestsProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Your tech interests</h2>
        <p className="text-muted-foreground text-lg">
          Select the technologies and trends you want to follow
        </p>
      </div>

      <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-2 shadow-soft">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {techInterests.map((interest) => (
              <Badge
                key={interest}
                variant={selectedInterests.includes(interest) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer justify-center p-3 text-sm transition-all duration-200",
                  "hover:scale-105 hover:shadow-soft",
                  selectedInterests.includes(interest) 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => onInterestToggle(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <label className="block text-sm font-medium mb-2">
              Other interests:
            </label>
            <input
              type="text"
              placeholder="The more information you provide, the better your personalization..."
              value={otherInterests}
              onChange={(e) => onOtherInterestsChange(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}