
import { GraduationCap, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const CoursesList = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Inglés para Principiantes
          </CardTitle>
          <CardDescription>Para quienes comienzan su viaje en inglés</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Vocabulario y frases básicas</li>
            <li>Estructuras gramaticales esenciales</li>
            <li>Práctica de conversación simple</li>
            <li>Comprensión auditiva y pronunciación</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Inglés Intermedio
          </CardTitle>
          <CardDescription>Para quienes tienen conocimientos básicos y buscan mejorar</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Ampliación de vocabulario</li>
            <li>Gramática más compleja</li>
            <li>Práctica de conversación fluida</li>
            <li>Comprensión lectora</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Inglés Avanzado
          </CardTitle>
          <CardDescription>Para quienes desean perfeccionar sus habilidades</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Expresiones matizadas y modismos</li>
            <li>Dominio de gramática avanzada</li>
            <li>Habilidades de debate y presentación</li>
            <li>Escritura para propósitos académicos/empresariales</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Inglés de Negocios
          </CardTitle>
          <CardDescription>Cursos especializados para profesionales</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Vocabulario profesional</li>
            <li>Redacción de correos e informes</li>
            <li>Habilidades para reuniones y negociaciones</li>
            <li>Técnicas de presentación</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
