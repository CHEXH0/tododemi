
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoursesList } from "./CoursesList";
import { ScheduleInfo } from "./ScheduleInfo";
import { PricingInfo } from "./PricingInfo";
import { useIsMobile } from "@/hooks/use-mobile";

export const CoursesTabs = () => {
  const isMobile = useIsMobile();
  
  return (
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
        <CoursesList />
      </TabsContent>
      <TabsContent value="schedule" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
        <ScheduleInfo />
      </TabsContent>
      <TabsContent value="pricing" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
        <PricingInfo />
      </TabsContent>
    </Tabs>
  );
};
