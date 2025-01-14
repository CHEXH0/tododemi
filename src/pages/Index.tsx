import { useState } from "react";
import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { Card } from "@/components/ui/card";
import { CanvasArea } from "@/components/CanvasArea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [userName, setUserName] = useState("");
  const [canvasData, setCanvasData] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleNameChange = (name: string) => {
    setUserName(name);
  };

  const handleCanvasSave = (position: string, dataUrl: string) => {
    setCanvasData(prev => ({
      ...prev,
      [position]: dataUrl
    }));
  };

  const handleSubmit = async (formData: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please sign in to save your submission");
      return;
    }

    const submission = {
      user_id: user.id,
      ...formData,
      canvas_data: canvasData
    };

    const { error } = await supabase
      .from("submissions")
      .insert(submission);

    if (error) {
      toast.error("Error saving submission");
      return;
    }

    toast.success("Submission saved successfully!");
    navigate("/submissions");
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
      return;
    }
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

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
          <p className="mt-2 text-sm text-gray-400 md:hidden">
            Please use a desktop device to access the drawing features.
          </p>
        </div>

        <div className="hidden md:block">
          <CanvasArea position="left" onSave={(dataUrl) => handleCanvasSave("left", dataUrl)} />
          <CanvasArea position="right" onSave={(dataUrl) => handleCanvasSave("right", dataUrl)} />
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <PersonalInfoForm onNameChange={handleNameChange} onSubmit={handleSubmit} />
        </Card>
      </div>
    </div>
  );
};

export default Index;