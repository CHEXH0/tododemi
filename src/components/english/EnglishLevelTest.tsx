
import React, { useState } from "react";
import { TestIntro } from "./test/TestIntro";
import { QuestionCard } from "./test/QuestionCard";
import { TestResults } from "./test/TestResults";
import { questions } from "./test/testData";
import { calculateEnglishLevel } from "./test/testUtils";
import type { EnglishLevel } from "./test/testData";

interface EnglishLevelTestProps {
  startExpanded?: boolean;
}

export const EnglishLevelTest = ({ startExpanded = false }: EnglishLevelTestProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [resultLevel, setResultLevel] = useState<EnglishLevel>("");
  const [showTest, setShowTest] = useState<boolean>(startExpanded);
  
  const handleSelectAnswer = (questionId: number, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const level = calculateEnglishLevel(answers, questions);
      setResultLevel(level);
      setIsDialogOpen(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const startTest = () => {
    setShowTest(true);
    setCurrentStep(0);
    setAnswers({});
    setResultLevel("");
  };

  const restartTest = () => {
    setIsDialogOpen(false);
    setCurrentStep(0);
    setAnswers({});
    setResultLevel("");
  };

  const currentQuestion = questions[currentStep];
  
  if (!showTest) {
    return <TestIntro onStartTest={startTest} />;
  }
  
  return (
    <div className="w-full">
      <QuestionCard
        question={currentQuestion}
        currentStep={currentStep}
        totalQuestions={questions.length}
        selectedAnswer={answers[currentQuestion.id]}
        onSelectAnswer={(answerId) => handleSelectAnswer(currentQuestion.id, answerId)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      
      <TestResults
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        resultLevel={resultLevel}
        onRestartTest={restartTest}
      />
    </div>
  );
};
