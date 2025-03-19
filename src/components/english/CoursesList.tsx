
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, GraduationCap, Headphones, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Inglés Básico (A1-A2)",
    description: "Desarrolla habilidades fundamentales de comunicación en inglés para principiantes.",
    features: [
      "Vocabulario esencial y gramática básica",
      "Conversación introductoria y comprensión auditiva",
      "Lectura y escritura de textos simples",
    ],
    icon: Book,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Inglés Intermedio (B1-B2)",
    description: "Mejora tu fluidez y precisión para comunicarte en situaciones cotidianas.",
    features: [
      "Gramática y vocabulario avanzados",
      "Conversación fluida sobre temas diversos",
      "Comprensión de medios de comunicación en inglés",
    ],
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Inglés Avanzado (C1-C2)",
    description: "Perfecciona tu inglés a nivel nativo con expresiones idiomáticas y matices culturales.",
    features: [
      "Expresiones idiomáticas y vocabulario especializado",
      "Debates y presentaciones avanzadas",
      "Comprensión de contenido académico y profesional",
    ],
    icon: GraduationCap,
    color: "from-orange-500 to-pink-500",
  },
  {
    title: "Inglés para Objetivos Específicos",
    description: "Cursos especializados para profesionales y necesidades específicas.",
    features: [
      "Inglés para negocios y entornos corporativos",
      "Preparación para exámenes internacionales (TOEFL, IELTS, Cambridge)",
      "Inglés para sectores específicos (turismo, tecnología, etc.)",
    ],
    icon: Headphones,
    color: "from-emerald-500 to-teal-500",
  },
];

export const CoursesList = ({ openContactDialog }) => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
      {courses.map((course, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${course.color} mb-3`}>
              <course.icon className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {course.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className={`bg-gradient-to-r ${course.color} bg-clip-text text-transparent mr-2`}>•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90`}
              onClick={openContactDialog}
            >
              Más Información
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
