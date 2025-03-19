
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoursesList } from "./CoursesList";
import { ScheduleInfo } from "./ScheduleInfo";
import { PricingInfo } from "./PricingInfo";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, Mail, MapPin } from "lucide-react";

export const CoursesTabs = () => {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const openContactDialog = () => {
    setDialogOpen(true);
  };
  
  return (
    <>
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3 p-1 bg-purple-100 dark:bg-purple-900/30">
          <TabsTrigger 
            value="courses" 
            className="text-xs sm:text-sm py-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
          >
            Cursos
          </TabsTrigger>
          <TabsTrigger 
            value="schedule" 
            className="text-xs sm:text-sm py-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            Horarios
          </TabsTrigger>
          <TabsTrigger 
            value="pricing" 
            className="text-xs sm:text-sm py-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            Precios
          </TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <CoursesList openContactDialog={openContactDialog} />
        </TabsContent>
        <TabsContent value="schedule" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <ScheduleInfo openContactDialog={openContactDialog} />
        </TabsContent>
        <TabsContent value="pricing" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <PricingInfo openContactDialog={openContactDialog} />
        </TabsContent>
      </Tabs>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Contacto para Clases de Inglés
            </DialogTitle>
            <DialogDescription>
              Póngase en contacto con nosotros para más información o para reservar una clase.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Mail className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">english.bogota@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <PhoneCall className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="font-medium">Teléfono & WhatsApp</p>
                <p className="text-sm text-muted-foreground">+57 300 123 4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="font-medium">Ubicación</p>
                <p className="text-sm text-muted-foreground">
                  Carrera 7 #71-21, Oficina 802<br />
                  Bogotá, Colombia
                </p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Programar Evaluación Gratuita
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
