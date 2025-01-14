import { useState, useEffect } from "react";
import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { Card } from "@/components/ui/card";
import { CanvasArea } from "@/components/CanvasArea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [userName, setUserName] = useState("");
  const [canvasData, setCanvasData] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = location.state?.editMode;
  const submissionData = location.state?.submissionData;

  useEffect(() => {
    if (editMode && submissionData) {
      setUserName(submissionData.name || "");
      setCanvasData(submissionData.canvas_data || {});
    }
  }, [editMode, submissionData]);

  const handleNameChange = (name: string) => {
    setUserName(name);
  };

  const handleCanvasSave = (position: string, dataUrl: string) => {
    setCanvasData(prev => ({
      ...prev,
      [position]: dataUrl
    }));
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
        <div className="flex justify-between mb-4">
          <Button variant="outline" onClick={() => navigate('/submissions')}>
            View Submissions
          </Button>
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
            {editMode ? 'Edit Your Story' : 'All About Me'}
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            {editMode ? 'Update your personal profile and story!' : 'Create your personal profile and share your story with others!'}
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
          <PersonalInfoForm 
            onNameChange={handleNameChange}
            initialData={editMode ? { ...submissionData, id: submissionData.id } : undefined}
            onSubmissionComplete={() => navigate("/submissions")}
          />
        </Card>
      </div>
    </div>
  );
};

export default Index;