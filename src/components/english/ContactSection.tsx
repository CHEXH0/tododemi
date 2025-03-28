
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
                <span>sergio.ramrz21@gmail.com</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-medium">Teléfono:</span> 
                <span>+1 909 384 2193</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-medium">WhatsApp:</span> 
                <span>+1 909 384 2193</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-sm sm:text-base">Ubicación</h3>
            <p className="text-sm sm:text-base">Los Cerros, La Felicidad<br />Bogotá, Colombia</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/english-test" className="w-full">
          <Button className="w-full py-5 sm:py-6 text-sm sm:text-base">Evaluación de Nivel de Inglés</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
