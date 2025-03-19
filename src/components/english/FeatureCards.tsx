
import { Globe, MapPin, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Comunicación Fluida
          </CardTitle>
          <CardDescription className="text-white/90">
            Desarrolla habilidades prácticas de idioma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Nuestras clases se centran en desarrollar habilidades de comunicación real que puedes usar en contextos profesionales y sociales.
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#0EA5E9] to-[#6366F1] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Grupos Pequeños y Privados
          </CardTitle>
          <CardDescription className="text-white/90">
            Atención personalizada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Elige entre clases en grupos pequeños (máximo 4 estudiantes) o lecciones privadas individuales personalizadas según tus objetivos específicos.
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Ubicación Conveniente
          </CardTitle>
          <CardDescription className="text-white/90">
            Centro de Bogotá
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Nuestras clases se imparten en un lugar cómodo y accesible en el corazón de Bogotá, con opciones de aprendizaje en línea también.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
