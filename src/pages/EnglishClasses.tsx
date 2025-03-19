
import React from "react";
import { Breadcrumb } from "@/components/english/Breadcrumb";
import { ClassesHeader } from "@/components/english/ClassesHeader";
import { FeatureCards } from "@/components/english/FeatureCards";
import { CoursesTabs } from "@/components/english/CoursesTabs";
import { ContactSection } from "@/components/english/ContactSection";

const EnglishClasses = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        <Breadcrumb />
        <ClassesHeader />
        <FeatureCards />
        <CoursesTabs />
        <ContactSection />
      </div>
    </div>
  );
};

export default EnglishClasses;
