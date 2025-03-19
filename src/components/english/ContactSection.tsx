
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>¿Listo para mejorar tu inglés?</CardTitle>
        <CardDescription>
          Contáctanos hoy para programar una evaluación gratuita y comenzar tu viaje lingüístico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">Detalles de Contacto</h3>
            <ul className="space-y-1">
              <li>Email: english.bogota@example.com</li>
              <li>Teléfono: +57 300 123 4567</li>
              <li>WhatsApp: +57 300 123 4567</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Ubicación</h3>
            <p>Carrera 7 #71-21, Oficina 802<br />Bogotá, Colombia</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Programa Tu Evaluación Gratuita</Button>
      </CardFooter>
    </Card>
  );
};
