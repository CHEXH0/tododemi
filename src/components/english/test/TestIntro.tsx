
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Clock, CheckCircle } from "lucide-react";

interface TestIntroProps {
  onStartTest: () => void;
}

export const TestIntro = ({ onStartTest }: TestIntroProps) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl text-center">
          Prueba de Nivel de Inglés
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <p className="text-center text-muted-foreground">
          Descubre tu nivel actual de inglés con nuestra prueba rápida y precisa.
        </p>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <Clock className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-semibold">10 Minutos</h3>
            <p className="text-sm text-muted-foreground">
              Completa la prueba rápidamente
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <CheckCircle className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-semibold">10 Preguntas</h3>
            <p className="text-sm text-muted-foreground">
              Preguntas de opción múltiple
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <GraduationCap className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-semibold">Resultados Instantáneos</h3>
            <p className="text-sm text-muted-foreground">
              Obtén tu nivel según MCER
            </p>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Instrucciones:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Lee cada pregunta cuidadosamente</li>
            <li>Selecciona la mejor respuesta para cada pregunta</li>
            <li>No uses diccionarios u otras ayudas</li>
            <li>Al finalizar, recibirás tu nivel según el Marco Común Europeo de Referencia (MCER)</li>
          </ul>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onStartTest} 
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
        >
          Comenzar Prueba
        </Button>
      </CardFooter>
    </Card>
  );
};
