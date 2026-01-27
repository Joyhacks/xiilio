import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OnboardingQuestionnaire } from "@/components/OnboardingQuestionnaire";
import { UserPreferences } from "@/lib/agentPersonality";
import { useToast } from "@/hooks/use-toast";

export default function Onboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleComplete = (preferences: UserPreferences) => {
    // Store preferences in localStorage (could also be saved to Supabase)
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    localStorage.setItem('onboardingComplete', 'true');
    
    toast({
      title: "Welcome aboard! 🎉",
      description: "Your preferences have been saved. Our agents are ready to serve you!",
    });
    
    navigate('/');
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl border border-border/50 p-8">
            <OnboardingQuestionnaire onComplete={handleComplete} onSkip={handleSkip} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
