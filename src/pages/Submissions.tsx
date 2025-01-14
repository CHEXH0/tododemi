import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface Submission {
  id: string;
  name: string;
  age: string;
  country: string;
  languages: string;
  hobbies: string;
  dreams: string;
  created_at: string;
  canvas_data: Record<string, { drawings: string[]; images: string[]; }>;
  user_id: string;
}

export const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user?.id || null);
  };

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching submissions");
      return;
    }

    setSubmissions(data || []);
  };

  const handleDelete = async (id: string, userId: string) => {
    if (currentUser !== userId) {
      toast.error("You can only delete your own submissions");
      return;
    }

    const { error } = await supabase
      .from("submissions")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting submission");
      return;
    }

    toast.success("Submission deleted");
    fetchSubmissions();
  };

  const renderMediaContent = (fieldName: string, content: { drawings: string[]; images: string[]; }) => {
    return (
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700 capitalize">{fieldName} Media</h4>
        <div className="grid grid-cols-2 gap-2">
          {content.drawings.map((drawing, idx) => (
            <div key={`drawing-${idx}`} className="relative">
              <img 
                src={drawing} 
                alt={`Drawing for ${fieldName}`} 
                className="w-full h-40 object-cover rounded-lg"
              />
              <span className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                Drawing
              </span>
            </div>
          ))}
          {content.images.map((image, idx) => (
            <div key={`image-${idx}`} className="relative">
              <img 
                src={image} 
                alt={`Image for ${fieldName}`} 
                className="w-full h-40 object-cover rounded-lg"
              />
              <span className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                Image
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Submissions</h1>
        <Button 
          onClick={() => navigate("/")}
          variant="outline"
          className="hover:bg-purple-100"
        >
          Create New Submission
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {submissions.map((submission) => (
          <Card key={submission.id} className="p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold text-purple-600">{submission.name}'s Story</h2>
                <div className="text-sm text-gray-500">
                  {new Date(submission.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Age</h3>
                    <p className="text-gray-600">{submission.age}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Country</h3>
                    <p className="text-gray-600">{submission.country}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Languages</h3>
                    <p className="text-gray-600">{submission.languages}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Hobbies</h3>
                    <p className="text-gray-600">{submission.hobbies}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Dreams and Goals</h3>
                    <p className="text-gray-600">{submission.dreams}</p>
                  </div>
                </div>
              </div>

              {submission.canvas_data && (
                <div className="space-y-4 mt-6">
                  {Object.entries(submission.canvas_data).map(([fieldName, content]) => (
                    <div key={fieldName}>
                      {renderMediaContent(fieldName, content)}
                    </div>
                  ))}
                </div>
              )}

              {currentUser === submission.user_id && (
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(submission.id, submission.user_id)}
                    className="mt-4"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Submissions;