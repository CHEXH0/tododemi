
import { Globe, MapPin, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
            Comunicación Fluida
          </CardTitle>
          <CardDescription className="text-white/90 text-xs sm:text-sm">
            Desarrolla habilidades prácticas de idioma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base">
            Nuestras clases se centran en desarrollar habilidades de comunicación real que puedes usar en contextos profesionales y sociales.
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#0EA5E9] to-[#6366F1] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            Grupos Pequeños y Privados
          </CardTitle>
          <CardDescription className="text-white/90 text-xs sm:text-sm">
            Atención personalizada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base">
            Elige entre clases en grupos pequeños (máximo 4 estudiantes) o lecciones privadas individuales personalizadas según tus objetivos específicos.
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] text-white sm:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
            Ubicación Conveniente
          </CardTitle>
          <CardDescription className="text-white/90 text-xs sm:text-sm">
            Centro de Bogotá
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base">
            Nuestras clases se imparten en un lugar cómodo y accesible en el corazón de Bogotá, con opciones de aprendizaje en línea también.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
