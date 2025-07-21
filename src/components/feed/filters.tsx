import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedImpact: string;
  onImpactChange: (value: string) => void;
  selectedTimeframe: string;
  onTimeframeChange: (value: string) => void;
  selectedIndustry: string;
  onIndustryChange: (value: string) => void;
}

export function Filters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedImpact,
  onImpactChange,
  selectedTimeframe,
  onTimeframeChange,
  selectedIndustry,
  onIndustryChange
}: FiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search intelligence..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/50 backdrop-blur-sm border-border focus:border-primary"
        />
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-medium">
          <SlidersHorizontal className="h-4 w-4" />
          Filters:
        </div>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[140px] bg-background/50 backdrop-blur-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="computer-vision">Computer Vision</SelectItem>
            <SelectItem value="llms">LLMs</SelectItem>
            <SelectItem value="robotics">Robotics</SelectItem>
            <SelectItem value="cloud-ai">Cloud AI</SelectItem>
            <SelectItem value="mlops">MLOps</SelectItem>
            <SelectItem value="edge-computing">Edge Computing</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedImpact} onValueChange={onImpactChange}>
          <SelectTrigger className="w-[120px] bg-background/50 backdrop-blur-sm">
            <SelectValue placeholder="Impact" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Impact</SelectItem>
            <SelectItem value="high">High Impact</SelectItem>
            <SelectItem value="medium">Medium Impact</SelectItem>
            <SelectItem value="low">Low Impact</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedTimeframe} onValueChange={onTimeframeChange}>
          <SelectTrigger className="w-[120px] bg-background/50 backdrop-blur-sm">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedIndustry} onValueChange={onIndustryChange}>
          <SelectTrigger className="w-[130px] bg-background/50 backdrop-blur-sm">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent className="bg-background z-50">
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="automotive">Automotive</SelectItem>
            <SelectItem value="energy">Energy</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  );
}