import { useState } from "react";
import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [userName, setUserName] = useState("");

  const handleNameChange = (name: string) => {
    setUserName(name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          {userName && (
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              {userName}'s Story
            </h2>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            All About Me
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Create your personal profile and share your story with others!
          </p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <PersonalInfoForm onNameChange={handleNameChange} />
        </Card>
      </div>
    </div>
  );
};

export default Index;