
import { Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ScheduleInfo = ({ openContactDialog }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Horario de Clases
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Sesiones Matutinas</h3>
              <ul className="space-y-1">
                <li>Lunes - Viernes: 7:00 AM - 9:00 AM</li>
                <li>Sábado: 9:00 AM - 12:00 PM</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Sesiones Vespertinas</h3>
              <ul className="space-y-1">
                <li>Lunes - Viernes: 2:00 PM - 4:00 PM</li>
                <li>Sábado: 2:00 PM - 5:00 PM</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Sesiones Nocturnas</h3>
              <ul className="space-y-1">
                <li>Lunes - Viernes: 6:00 PM - 8:00 PM</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Sesiones en Línea</h3>
              <ul className="space-y-1">
                <li>Horarios flexibles disponibles</li>
                <li>Personalizados a tu zona horaria</li>
              </ul>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              * Las clases privadas pueden programarse a tu conveniencia, sujeto a disponibilidad del instructor.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" 
          onClick={openContactDialog}
        >
          Consultar Disponibilidad
        </Button>
      </CardFooter>
    </Card>
  );
};
