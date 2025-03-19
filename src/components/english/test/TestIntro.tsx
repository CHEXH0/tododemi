
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CircleHelp } from "lucide-react";
import { levelDescriptions } from "./testData";

interface TestIntroProps {
  onStartTest: () => void;
}

export const TestIntro = ({ onStartTest }: TestIntroProps) => {
  return (
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
          onClick={onStartTest}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
        >
          Start Test
        </Button>
      </CardFooter>
    </Card>
  );
};
