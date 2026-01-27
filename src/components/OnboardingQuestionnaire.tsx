import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { onboardingQuestions, UserPreferences } from "@/lib/agentPersonality";

interface OnboardingQuestionnaireProps {
  onComplete: (preferences: UserPreferences) => void;
  onSkip?: () => void;
}

export function OnboardingQuestionnaire({ onComplete, onSkip }: OnboardingQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const question = onboardingQuestions[currentStep];
  const progress = ((currentStep + 1) / onboardingQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < onboardingQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete - convert answers to UserPreferences
      const preferences: UserPreferences = {
        communicationStyle: answers.communicationStyle as UserPreferences['communicationStyle'],
        humorStyle: answers.humorStyle as UserPreferences['humorStyle'],
        responseLength: answers.responseLength as UserPreferences['responseLength'],
        tone: answers.tone as UserPreferences['tone'],
        interests: answers.interests?.split(',').map((i) => i.trim()).filter(Boolean),
        goals: answers.goals?.split(',').map((g) => g.trim()).filter(Boolean),
      };
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isLastStep = currentStep === onboardingQuestions.length - 1;
  const canProceed = answers[question.id]?.trim();

  return (
    <div className="min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Let's personalize your experience</h2>
        <p className="text-muted-foreground">Answer a few questions so our agents can serve you better</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentStep + 1} of {onboardingQuestions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-medium text-foreground">{question.question}</h3>

            {question.type === 'text' ? (
              <Input
                placeholder={question.placeholder}
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                className="text-base"
              />
            ) : (
              <div className="grid gap-3">
                {question.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all",
                      answers[question.id] === option.value
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {answers[question.id] === option.value && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <div>
          {currentStep > 0 ? (
            <Button variant="ghost" onClick={handleBack}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : onSkip ? (
            <Button variant="ghost" onClick={onSkip}>
              Skip for now
            </Button>
          ) : null}
        </div>
        <Button onClick={handleNext} disabled={!canProceed}>
          {isLastStep ? (
            <>
              Complete
              <Check className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
