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
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [levelCounts, setLevelCounts] = useState<Record<EnglishLevel, number>>({
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0,
    C2: 0,
    "": 0
  });
  
  const handleSelectAnswer = (questionId: number, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const calculateResults = () => {
    // Count correct answers
    let correctCount = 0;
    const levelCorrectCounts: Record<EnglishLevel, number> = {
      A1: 0,
      A2: 0,
      B1: 0,
      B2: 0,
      C1: 0,
      C2: 0,
      "": 0
    };
    
    questions.forEach(question => {
      if (answers[question.id] === question.correctOptionId) {
        correctCount++;
        levelCorrectCounts[question.level]++;
      }
    });
    
    // Set the exact count of correct answers
    setCorrectAnswerCount(correctCount);
    setLevelCounts(levelCorrectCounts);
    
    const level = calculateEnglishLevel(answers, questions);
    setResultLevel(level);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateResults();
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
    setCorrectAnswerCount(0);
    setLevelCounts({
      A1: 0,
      A2: 0,
      B1: 0,
      B2: 0,
      C1: 0,
      C2: 0,
      "": 0
    });
  };

  const restartTest = () => {
    setIsDialogOpen(false);
    setCurrentStep(0);
    setAnswers({});
    setResultLevel("");
    setCorrectAnswerCount(0);
    setLevelCounts({
      A1: 0,
      A2: 0,
      B1: 0,
      B2: 0,
      C1: 0,
      C2: 0,
      "": 0
    });
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
        correctAnswers={correctAnswerCount}
        totalQuestions={questions.length}
        levelCounts={levelCounts}
      />
    </div>
  );
};
