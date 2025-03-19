
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { EnglishLevel, levelDescriptions } from "./testData";

interface TestResultsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resultLevel: EnglishLevel;
  onRestartTest: () => void;
}

export const TestResults = ({ 
  isOpen, 
  onOpenChange, 
  resultLevel, 
  onRestartTest 
}: TestResultsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              {levelDescriptions[resultLevel]}
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
            onClick={onRestartTest}
          >
            Restart Test
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
