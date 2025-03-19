
import React from "react";
import { Breadcrumb } from "@/components/english/Breadcrumb";
import { EnglishLevelTest } from "@/components/english/EnglishLevelTest";

const EnglishTest = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background -z-10" />
      <div className="container mx-auto py-6 md:py-8 px-4 md:px-6">
        <div className="flex flex-col space-y-8 md:space-y-10">
          <Breadcrumb />
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 dark:text-purple-100">
              English Level Assessment
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Discover your current English proficiency level with our comprehensive test
            </p>
          </div>
          <EnglishLevelTest startExpanded={true} />
        </div>
      </div>
    </div>
  );
};

export default EnglishTest;
