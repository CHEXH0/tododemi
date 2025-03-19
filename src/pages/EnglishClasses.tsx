
import React from "react";
import { Link } from "react-router-dom";
import { Globe, MapPin, GraduationCap, MessageSquare, Users, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EnglishClasses = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            Inicio
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">Clases de Inglés</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Clases de Inglés en Bogotá, Colombia
          </h1>
          <p className="text-lg text-muted-foreground">
            Instrucción profesional de inglés adaptada a tus necesidades
          </p>
        </div>

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

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="schedule">Horarios</TabsTrigger>
            <TabsTrigger value="pricing">Precios</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="space-y-6 mt-6">
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
          </TabsContent>
          <TabsContent value="schedule" className="space-y-6 mt-6">
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
            </Card>
          </TabsContent>
          <TabsContent value="pricing" className="space-y-6 mt-6">
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
                      <span className="font-medium">$30 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paquete de 10 Clases</span>
                      <span className="font-medium">$250 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mensual (3 veces por semana)</span>
                      <span className="font-medium">$320 USD</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Inscribirse Ahora
                  </Button>
                </CardFooter>
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
                      <span className="font-medium">$40 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paquete de 10 Clases</span>
                      <span className="font-medium">$350 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mensual (3 veces por semana)</span>
                      <span className="font-medium">$450 USD</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Reservar Clase Privada</Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Información Adicional</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Todos los materiales están incluidos en el precio</li>
                  <li>El pago puede realizarse en Pesos Colombianos al tipo de cambio actual</li>
                  <li>Descuentos especiales disponibles para estudiantes y grupos corporativos</li>
                  <li>Clase de prueba disponible a una tarifa reducida de $15 USD</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Contactar para Tarifas Especiales</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

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
      </div>
    </div>
  );
};

export default EnglishClasses;
