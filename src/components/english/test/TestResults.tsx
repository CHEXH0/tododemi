
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { EnglishLevel, levelDescriptions } from "./testData";
import { Progress } from "@/components/ui/progress";

interface TestResultsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resultLevel: EnglishLevel;
  onRestartTest: () => void;
  correctAnswers: number;
  totalQuestions: number;
  levelCounts: Record<EnglishLevel, number>;
}

export const TestResults = ({ 
  isOpen, 
  onOpenChange, 
  resultLevel, 
  onRestartTest,
  correctAnswers,
  totalQuestions,
  levelCounts
}: TestResultsProps) => {
  // Ensure we show exactly 100% when all answers are correct
  const percentCorrect = correctAnswers === totalQuestions 
    ? 100 
    : Math.round((correctAnswers / totalQuestions) * 100);
  
  const spanishLevelDescriptions: Record<EnglishLevel, string> = {
    A1: "Principiante: Puedes entender y usar frases y expresiones básicas.",
    A2: "Elemental: Puedes comunicarte en tareas simples que requieren un intercambio directo de información.",
    B1: "Intermedio: Puedes lidiar con la mayoría de las situaciones durante un viaje y describir experiencias, eventos y ambiciones.",
    B2: "Intermedio Alto: Puedes interactuar con un grado de fluidez y espontaneidad que hace posible la interacción sin tensión.",
    C1: "Avanzado: Puedes expresar ideas con fluidez y espontaneidad sin buscar expresiones de manera obvia.",
    C2: "Competente: Puedes entender con facilidad prácticamente todo lo que escuchas o lees.",
    "": ""
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            ¡Prueba Completada!
          </DialogTitle>
          <DialogDescription>
            Basado en tus respuestas, hemos determinado tu nivel de inglés.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-5xl font-bold text-purple-600 dark:text-purple-400">
              {resultLevel}
            </div>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              {spanishLevelDescriptions[resultLevel]}
            </p>
            
            <div className="w-full mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Puntuación:</span>
                <span className="font-medium">{correctAnswers} de {totalQuestions} ({percentCorrect}%)</span>
              </div>
              <Progress value={percentCorrect} className="h-2" />
            </div>
            
            <div className="w-full mt-2 text-sm">
              <h4 className="font-semibold mb-2 text-left">Respuestas correctas por nivel:</h4>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(levelCounts)
                  .filter(([level]) => level !== "") // Filter out empty level
                  .map(([level, count]) => (
                    <div key={level} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-center">
                      <div className="font-medium">{level}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {count > 0 ? `✓ Correcto` : `✗ Incorrecto`}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="w-full mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md text-sm">
              <div className="flex items-start gap-2 mb-2">
                <CircleAlert className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300 text-left">
                  Esta evaluación es una visión general rápida de tus habilidades en inglés. Para una evaluación más completa, te recomendamos programar una evaluación personal con uno de nuestros especialistas en idiomas.
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
            Reiniciar Prueba
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            onClick={() => onOpenChange(false)}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
