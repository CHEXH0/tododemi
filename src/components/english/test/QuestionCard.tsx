
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "./testData";

interface QuestionCardProps {
  question: Question;
  currentStep: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onSelectAnswer: (answerId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const QuestionCard = ({ 
  question, 
  currentStep, 
  totalQuestions,
  selectedAnswer, 
  onSelectAnswer, 
  onNext, 
  onPrevious 
}: QuestionCardProps) => {
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  const isAnswered = selectedAnswer !== undefined;

  return (
    <Card className="mt-8 bg-white/80 backdrop-blur-sm border-purple-100 dark:border-purple-900/50 shadow-md">
      <CardHeader>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <CardTitle className="text-lg md:text-xl text-purple-900 dark:text-purple-100">
          Question {currentStep + 1} of {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-base md:text-lg font-medium mb-4">{question.text}</h3>
          <RadioGroup
            value={selectedAnswer || ""}
            onValueChange={onSelectAnswer}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 rounded-md p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="border-purple-200 dark:border-purple-800"
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!isAnswered}
          className={`${isAnswered ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'}`}
        >
          {currentStep < totalQuestions - 1 ? 'Next' : 'Finish'}
        </Button>
      </CardFooter>
    </Card>
  );
};
