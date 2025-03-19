
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoursesList } from "./CoursesList";
import { ScheduleInfo } from "./ScheduleInfo";
import { PricingInfo } from "./PricingInfo";

export const CoursesTabs = () => {
  return (
    <Tabs defaultValue="courses" className="w-full">
      <TabsList className="w-full max-w-md grid grid-cols-3">
        <TabsTrigger value="courses">Cursos</TabsTrigger>
        <TabsTrigger value="schedule">Horarios</TabsTrigger>
        <TabsTrigger value="pricing">Precios</TabsTrigger>
      </TabsList>
      <TabsContent value="courses" className="space-y-6 mt-6">
        <CoursesList />
      </TabsContent>
      <TabsContent value="schedule" className="space-y-6 mt-6">
        <ScheduleInfo />
      </TabsContent>
      <TabsContent value="pricing" className="space-y-6 mt-6">
        <PricingInfo />
      </TabsContent>
    </Tabs>
  );
};
