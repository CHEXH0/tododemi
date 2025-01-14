import { useState } from "react";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { ImageUpload } from "@/components/ImageUpload";
import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            All About Me
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Create your personal profile and share your story with others!
          </p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="drawing">Drawing</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <PersonalInfoForm />
            </TabsContent>

            <TabsContent value="drawing">
              <DrawingCanvas />
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <ImageUpload />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Index;