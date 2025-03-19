import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle2, CircleAlert, CircleHelp } from "lucide-react";

type AnswerOption = {
  id: string;
  text: string;
};

type Question = {
  id: number;
  text: string;
  options: AnswerOption[];
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  correctOptionId: string;
};

const questions: Question[] = [
  {
    id: 1,
    text: "What ___ your name?",
    options: [
      { id: "a", text: "are" },
      { id: "b", text: "is" },
      { id: "c", text: "am" },
      { id: "d", text: "be" }
    ],
    level: "A1",
    correctOptionId: "b"
  },
  {
    id: 2,
    text: "She ___ to the store yesterday.",
    options: [
      { id: "a", text: "go" },
      { id: "b", text: "goes" },
      { id: "c", text: "went" },
      { id: "d", text: "going" }
    ],
    level: "A1",
    correctOptionId: "c"
  },
  {
    id: 3,
    text: "I ___ never been to Paris.",
    options: [
      { id: "a", text: "have" },
      { id: "b", text: "has" },
      { id: "c", text: "had" },
      { id: "d", text: "having" }
    ],
    level: "A2",
    correctOptionId: "a"
  },
  {
    id: 4,
    text: "By the time we arrived, the movie ___.",
    options: [
      { id: "a", text: "already started" },
      { id: "b", text: "has already started" },
      { id: "c", text: "had already started" },
      { id: "d", text: "was already starting" }
    ],
    level: "B1",
    correctOptionId: "c"
  },
  {
    id: 5,
    text: "If I ___ rich, I would travel the world.",
    options: [
      { id: "a", text: "am" },
      { id: "b", text: "was" },
      { id: "c", text: "were" },
      { id: "d", text: "be" }
    ],
    level: "B1",
    correctOptionId: "c"
  },
  {
    id: 6,
    text: "She ___ the report by tomorrow morning.",
    options: [
      { id: "a", text: "will finish" },
      { id: "b", text: "will have finished" },
      { id: "c", text: "is finishing" },
      { id: "d", text: "finishes" }
    ],
    level: "B2",
    correctOptionId: "b"
  },
  {
    id: 7,
    text: "I wish I ___ to the party last night.",
    options: [
      { id: "a", text: "went" },
      { id: "b", text: "have gone" },
      { id: "c", text: "would go" },
      { id: "d", text: "had gone" }
    ],
    level: "B2",
    correctOptionId: "d"
  },
  {
    id: 8,
    text: "The novel, ___ was set in Victorian England, received critical acclaim.",
    options: [
      { id: "a", text: "that" },
      { id: "b", text: "who" },
      { id: "c", text: "which" },
      { id: "d", text: "what" }
    ],
    level: "C1",
    correctOptionId: "c"
  },
  {
    id: 9,
    text: "Had I known about the traffic, I ___ earlier.",
    options: [
      { id: "a", text: "would leave" },
      { id: "b", text: "had left" },
      { id: "c", text: "would have left" },
      { id: "d", text: "will have left" }
    ],
    level: "C1",
    correctOptionId: "c"
  },
  {
    id: 10,
    text: "Not only ___ the exam, but he also received the highest score.",
    options: [
      { id: "a", text: "he passed" },
      { id: "b", text: "did he pass" },
      { id: "c", text: "he did pass" },
      { id: "d", text: "passed he" }
    ],
    level: "C2",
    correctOptionId: "b"
  }
];

type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "";

const levelDescriptions = {
  A1: "Beginner: You can understand and use basic phrases and expressions.",
  A2: "Elementary: You can communicate in simple tasks requiring a direct exchange of information.",
  B1: "Intermediate: You can deal with most situations while traveling and describe experiences, events, and ambitions.",
  B2: "Upper Intermediate: You can interact with a degree of fluency and spontaneity that makes interaction possible without strain.",
  C1: "Advanced: You can express ideas fluently and spontaneously without much obvious searching for expressions.",
  C2: "Proficient: You can understand with ease virtually everything heard or read."
};

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
      calculateResult();
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

  const calculateResult = () => {
    // Count correct answers by level
    const levelCounts: Record<EnglishLevel, number> = {
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
        levelCounts[question.level]++;
      }
    });
    
    // Calculate total score
    const totalCorrect = Object.values(levelCounts).reduce((sum, count) => sum + count, 0);
    
    // Determine level based on pattern of correct answers
    let resultLevel: EnglishLevel = "";
    
    if (totalCorrect <= 3) {
      resultLevel = "A1";
    } else if (totalCorrect <= 5) {
      resultLevel = "A2";
    } else if (totalCorrect <= 7) {
      resultLevel = "B1";
    } else if (totalCorrect <= 8) {
      resultLevel = "B2";
    } else if (totalCorrect === 9) {
      resultLevel = "C1";
    } else {
      resultLevel = "C2";
    }
    
    // Adjust based on specific level performance
    if (resultLevel === "B1" && levelCounts["B2"] + levelCounts["C1"] + levelCounts["C2"] >= 3) {
      resultLevel = "B2";
    } else if (resultLevel === "B2" && levelCounts["C1"] + levelCounts["C2"] >= 2) {
      resultLevel = "C1";
    }
    
    setResultLevel(resultLevel);
  };
  
  const currentQuestion = questions[currentStep];
  const isAnswered = currentQuestion && answers[currentQuestion.id] !== undefined;
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="w-full">
      {!showTest ? (
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-purple-100 dark:border-purple-900/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-purple-900 dark:text-purple-100">Evaluate Your English Level</CardTitle>
            <CardDescription>Take this quick test to determine your current English proficiency level.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base mb-4">
              This test consists of 10 questions covering different levels of English proficiency from beginner (A1) to proficient (C2).
              The questions will adapt to your skill level and provide you with an accurate assessment at the end.
            </p>
            
            <Collapsible className="w-full mb-4">
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 mb-2">
                <CircleHelp className="h-4 w-4" />
                <span>What do the levels mean?</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md text-sm space-y-2 mt-2">
                  {Object.entries(levelDescriptions).map(([level, description]) => (
                    <div key={level} className="mb-2">
                      <span className="font-bold">{level}:</span> {description}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={startTest}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            >
              Start Test
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-purple-100 dark:border-purple-900/50 shadow-md">
          <CardHeader>
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <CardTitle className="text-lg md:text-xl text-purple-900 dark:text-purple-100">
              Question {currentStep + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-medium mb-4">{currentQuestion.text}</h3>
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleSelectAnswer(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
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
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-purple-200 dark:border-purple-800"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`${isAnswered ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'}`}
            >
              {currentStep < questions.length - 1 ? 'Next' : 'Finish'}
            </Button>
          </CardFooter>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Test Completed!
            </DialogTitle>
            <DialogDescription>
              Based on your responses, we've determined your English level.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-5xl font-bold text-purple-600 dark:text-purple-400">
                {resultLevel}
              </div>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                {levelDescriptions[resultLevel as keyof typeof levelDescriptions]}
              </p>
              
              <div className="w-full mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md text-sm">
                <div className="flex items-start gap-2 mb-2">
                  <CircleAlert className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300 text-left">
                    This assessment is a quick overview of your English abilities. For a more comprehensive evaluation, we recommend scheduling a personal evaluation with one of our language specialists.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex sm:flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 border-purple-200 dark:border-purple-800"
              onClick={restartTest}
            >
              Restart Test
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
