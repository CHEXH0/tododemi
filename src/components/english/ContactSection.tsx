
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl sm:text-2xl">¿Listo para mejorar tu inglés?</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Contáctanos hoy para programar una evaluación gratuita y comenzar tu viaje lingüístico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium text-sm sm:text-base">Detalles de Contacto</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-medium">Email:</span> 
                <span>english.bogota@example.com</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-medium">Teléfono:</span> 
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-medium">WhatsApp:</span> 
                <span>+57 300 123 4567</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-sm sm:text-base">Ubicación</h3>
            <p className="text-sm sm:text-base">Carrera 7 #71-21, Oficina 802<br />Bogotá, Colombia</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full py-5 sm:py-6 text-sm sm:text-base">Programa Tu Evaluación Gratuita</Button>
      </CardFooter>
    </Card>
  );
};
