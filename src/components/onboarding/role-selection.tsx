import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Brain, 
  Database, 
  Cpu,
  User
} from "lucide-react";

const roles = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "Transform data into actionable insights",
    icon: BarChart3,
  },
  {
    id: "data-scientist", 
    title: "Data Scientist",
    description: "Uncover insights from complex datasets",
    icon: Brain,
  },
  {
    id: "data-engineer",
    title: "Data Engineer", 
    description: "Build robust data infrastructure and pipelines",
    icon: Database,
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    description: "Build and deploy intelligent systems",
    icon: Cpu,
  },
];

interface RoleSelectionProps {
  selectedRole: string | null;
  onRoleSelect: (role: string) => void;
  otherRole: string;
  onOtherRoleChange: (value: string) => void;
}

export function RoleSelection({ 
  selectedRole, 
  onRoleSelect, 
  otherRole, 
  onOtherRoleChange 
}: RoleSelectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">What's your role?</h2>
        <p className="text-muted-foreground text-lg">
          Help us understand how you work with data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {roles.map((role) => (
          <Card
            key={role.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-medium hover:scale-[1.02]",
              "border-2 bg-card/80 backdrop-blur-sm",
              selectedRole === role.id 
                ? "border-primary shadow-glow animate-glow-pulse" 
                : "border-border hover:border-primary/50"
            )}
            onClick={() => onRoleSelect(role.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-lg transition-all duration-200",
                  selectedRole === role.id 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "bg-muted"
                )}>
                  <role.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{role.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {role.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Other option */}
      <div className="max-w-2xl mx-auto">
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-medium",
            "border-2 bg-card/80 backdrop-blur-sm",
            selectedRole === "other" 
              ? "border-primary shadow-glow animate-glow-pulse" 
              : "border-border hover:border-primary/50"
          )}
          onClick={() => onRoleSelect("other")}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={cn(
                "p-3 rounded-lg transition-all duration-200",
                selectedRole === "other" 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "bg-muted"
              )}>
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Other</h3>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Founder, Consultant, Product Manager, etc."
                    value={otherRole}
                    onChange={(e) => onOtherRoleChange(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
