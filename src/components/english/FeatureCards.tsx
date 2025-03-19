
import { Globe, MapPin, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-trippy-gradient-3 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Comunicación Fluida
          </CardTitle>
          <CardDescription className="text-white/80">
            Desarrolla habilidades prácticas de idioma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Nuestras clases se centran en desarrollar habilidades de comunicación real que puedes usar en contextos profesionales y sociales.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-trippy-gradient-1 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Grupos Pequeños y Privados
          </CardTitle>
          <CardDescription className="text-white/80">
            Atención personalizada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Elige entre clases en grupos pequeños (máximo 4 estudiantes) o lecciones privadas individuales personalizadas según tus objetivos específicos.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-trippy-gradient-2 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Ubicación Conveniente
          </CardTitle>
          <CardDescription className="text-white/80">
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
