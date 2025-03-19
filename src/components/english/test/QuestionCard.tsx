
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { Question } from "./testData";
import { Progress } from "@/components/ui/progress";

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
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-2">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Pregunta {currentStep + 1} de {totalQuestions}
            </span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
              Nivel: {question.level}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div className="text-lg font-medium">{question.text}</div>
          
          <RadioGroup 
            value={selectedAnswer} 
            onValueChange={onSelectAnswer}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <RadioGroupItem value={option.id} id={`option-${option.id}`} className="mt-1" />
                <Label 
                  htmlFor={`option-${option.id}`}
                  className="cursor-pointer flex-1 text-base font-normal py-2 px-3 rounded-md hover:bg-muted transition-colors"
                >
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
        >
          Anterior
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!selectedAnswer}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
        >
          {currentStep === totalQuestions - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </CardFooter>
    </Card>
  );
};
