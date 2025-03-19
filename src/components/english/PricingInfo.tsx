
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const PricingInfo = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Clases Grupales</CardTitle>
          <CardDescription>2-4 estudiantes por grupo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Clase Individual (2 horas)</span>
              <span className="font-medium">$95,000 COP</span>
            </div>
            <div className="flex justify-between">
              <span>Paquete de 10 Clases</span>
              <span className="font-medium">$800,000 COP</span>
            </div>
            <div className="flex justify-between">
              <span>Mensual (3 veces por semana)</span>
              <span className="font-medium">$1,024,000 COP</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clases Privadas</CardTitle>
          <CardDescription>Instrucción personalizada uno a uno</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Clase Individual (1 hora)</span>
              <span className="font-medium">$100,000 COP</span>
            </div>
            <div className="flex justify-between">
              <span>Paquete de 10 Clases</span>
              <span className="font-medium">$875,000 COP</span>
            </div>
            <div className="flex justify-between">
              <span>Mensual (3 veces por semana)</span>
              <span className="font-medium">$1,125,000 COP</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Todos los materiales están incluidos en el precio</li>
            <li>El pago puede realizarse en Pesos Colombianos al tipo de cambio actual</li>
            <li>Descuentos especiales disponibles para estudiantes y grupos corporativos</li>
            <li>Clase de prueba disponible a una tarifa reducida de $60,000 COP</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
