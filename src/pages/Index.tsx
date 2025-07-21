import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  console.log('Index component rendered, onboarding complete:', isOnboardingComplete);

  if (!isOnboardingComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Welcome to Seer AI</h1>
          <p className="text-muted-foreground">Let's get you started</p>
          <Button 
            onClick={() => {
              console.log('Button clicked, completing onboarding');
              setIsOnboardingComplete(true);
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Your Feed</h1>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg bg-card">
            <h3 className="font-semibold">Test Story 1</h3>
            <p className="text-sm text-muted-foreground">This is a test story</p>
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <h3 className="font-semibold">Test Story 2</h3>
            <p className="text-sm text-muted-foreground">This is another test story</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
