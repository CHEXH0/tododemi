
import React from "react";
import { Breadcrumb } from "@/components/english/Breadcrumb";
import { ClassesHeader } from "@/components/english/ClassesHeader";
import { FeatureCards } from "@/components/english/FeatureCards";
import { CoursesTabs } from "@/components/english/CoursesTabs";
import { ContactSection } from "@/components/english/ContactSection";
import { EnglishLevelTest } from "@/components/english/EnglishLevelTest";

const EnglishClasses = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background -z-10" />
      <div className="container mx-auto py-6 md:py-8 px-4 md:px-6">
        <div className="flex flex-col space-y-8 md:space-y-10">
          <Breadcrumb />
          <ClassesHeader />
          <EnglishLevelTest />
          <FeatureCards />
          <div className="relative py-6 md:py-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-xl -z-10" />
            <CoursesTabs />
          </div>
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default EnglishClasses;
