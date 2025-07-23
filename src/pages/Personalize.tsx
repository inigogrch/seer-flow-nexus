import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RoleSelection } from "@/components/onboarding/role-selection";
import { TechInterests } from "@/components/onboarding/tech-interests";
import { ProjectsPriorities } from "@/components/onboarding/projects-priorities";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Personalize() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [otherInterests, setOtherInterests] = useState("");
  const [projects, setProjects] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleProjectsComplete = async () => {
    await handleGenerateFeed();
  };

  const handleGenerateFeed = async () => {
    setIsSubmitting(true);
    
    try {
      // Save preferences to localStorage
      const finalRole = selectedRole === "other" ? otherRole : selectedRole;
      const finalInterests = otherInterests ? [...selectedInterests, ...otherInterests.split(',').map(i => i.trim())] : selectedInterests;
      
      const preferences = {
        role: finalRole,
        interests: finalInterests,
        projects: projects,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('user_preferences', JSON.stringify(preferences));
      
      // TODO: Send to backend API
      const response = await fetch('/api/user/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }
      
      // Redirect to feed
      navigate('/feed');
    } catch (error) {
      console.error('Failed to save preferences:', error);
      // Still redirect to feed with localStorage data
      navigate('/feed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedRole !== "" && (selectedRole !== "other" || otherRole.trim() !== "");
      case 2: return selectedInterests.length > 0 || otherInterests.trim() !== "";
      case 3: return projects.trim() !== "";
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <RoleSelection
            selectedRole={selectedRole}
            onRoleSelect={setSelectedRole}
            otherRole={otherRole}
            onOtherRoleChange={setOtherRole}
          />
        );
      case 2:
        return (
          <TechInterests
            selectedInterests={selectedInterests}
            onInterestToggle={handleInterestToggle}
            otherInterests={otherInterests}
            onOtherInterestsChange={setOtherInterests}
          />
        );
      case 3:
        return (
          <ProjectsPriorities
            projects={projects}
            onProjectsChange={setProjects}
            onComplete={handleProjectsComplete}
            isLoading={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Personalize Your Feed</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Help us curate the most relevant content for your interests and goals
          </p>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${stepNumber <= step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {stepNumber < step ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < totalSteps && (
                  <div className={`
                    w-12 h-0.5 mx-2
                    ${stepNumber < step ? 'bg-primary' : 'bg-muted'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
          {renderStepContent()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/feed')}
            className="bg-background/50 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step > 1 ? 'Previous' : 'Skip'}
          </Button>

          {step < totalSteps ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-gradient-primary text-primary-foreground"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleGenerateFeed}
              disabled={!canProceed() || isSubmitting}
              className="bg-gradient-primary text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Feed
                </>
              )}
            </Button>
          )}
        </div>

        {/* TODO: Add migration note */}
        {/* 
        MIGRATION TODO:
        1. Connect to actual user profile storage (database)
        2. Implement preference validation and sanitization
        3. Add preference update/edit functionality
        4. Implement preference-based content ranking algorithms
        5. Add analytics tracking for onboarding completion
        */}
      </div>
    </AppLayout>
  );
}