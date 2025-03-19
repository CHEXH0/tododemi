
import { useState, useEffect } from "react";
import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = location.state?.editMode;
  const submissionData = location.state?.submissionData;

  useEffect(() => {
    if (editMode && submissionData) {
      setUserName(submissionData.name || "");
    }
  }, [editMode, submissionData]);

  const handleNameChange = (name: string) => {
    setUserName(name);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/submissions')}
            className="bg-white/80 hover:bg-white/90 border-purple-200"
          >
            View Submissions
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="bg-white/80 hover:bg-white/90 border-purple-200"
          >
            Sign Out
          </Button>
        </div>

        <div className="text-center mb-8">
          {userName && (
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-100 mb-4">
              {userName}'s Story
            </h2>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {editMode ? 'Edit Your Story' : 'All About Me'}
          </h1>
          <p className="mt-3 text-lg text-white/80">
            {editMode ? 'Update your personal profile and story!' : 'Create your personal profile and share your story with others!'}
          </p>
        </div>

        <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-purple-200">
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
