
import { GraduationCap } from "lucide-react";

export const ClassesHeader = () => {
  return (
    <div className="space-y-4">
      <div className="inline-block mb-2 p-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500">
        <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        Clases de Inglés en Bogotá, Colombia
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground">
        Instrucción profesional de inglés adaptada a tus necesidades
      </p>
    </div>
  );
};
