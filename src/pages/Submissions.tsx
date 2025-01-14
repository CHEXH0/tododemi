import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";
import { Pencil } from "lucide-react";

type SubmissionRow = Database['public']['Tables']['submissions']['Row'];

interface Submission extends Omit<SubmissionRow, 'canvas_data'> {
  canvas_data: Record<string, { drawings: string[]; images: string[]; }>;
}

export const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAndSubmissions();
  }, []);

  const fetchUserAndSubmissions = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
    
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching submissions");
      return;
    }

    const typedSubmissions = (data || []).map(submission => ({
      ...submission,
      canvas_data: submission.canvas_data as Record<string, { drawings: string[]; images: string[]; }>
    }));

    setSubmissions(typedSubmissions);
  };

  const handleDelete = async (id: string, userId: string) => {
    if (!currentUserId || currentUserId !== userId) {
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

    toast.success("Submission deleted successfully");
    fetchUserAndSubmissions();
  };

  const handleEdit = (submission: Submission) => {
    if (!currentUserId || currentUserId !== submission.user_id) {
      toast.error("You can only edit your own submissions");
      return;
    }

    navigate('/', { 
      state: { 
        editMode: true,
        submissionData: {
          name: submission.name,
          age: submission.age,
          country: submission.country,
          languages: submission.languages,
          hobbies: submission.hobbies,
          dreams: submission.dreams,
          canvas_data: submission.canvas_data
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Submissions</h1>
          <Button onClick={() => navigate('/')}>Create New</Button>
        </div>

        <div className="space-y-6">
          {submissions.map((submission) => (
            <Card key={submission.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{submission.name}'s Story</h2>
                  <p className="text-sm text-gray-500">
                    Created on {new Date(submission.created_at).toLocaleDateString()}
                  </p>
                </div>
                {currentUserId === submission.user_id && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(submission)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(submission.id, submission.user_id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Age</dt>
                      <dd className="text-gray-900">{submission.age}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Country</dt>
                      <dd className="text-gray-900">{submission.country}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Languages</dt>
                      <dd className="text-gray-900">{submission.languages}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Hobbies</dt>
                      <dd className="text-gray-900">{submission.hobbies}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Dreams and Goals</dt>
                      <dd className="text-gray-900">{submission.dreams}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {submission.canvas_data && Object.entries(submission.canvas_data).map(([field, media]) => (
                <div key={field} className="mt-6">
                  <h3 className="font-semibold mb-4 capitalize">{field} Media</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {media.drawings.map((drawing, idx) => (
                      <div key={`drawing-${idx}`} className="relative aspect-square">
                        <img 
                          src={drawing} 
                          alt={`Drawing for ${field}`} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <span className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          Drawing
                        </span>
                      </div>
                    ))}
                    {media.images.map((image, idx) => (
                      <div key={`image-${idx}`} className="relative aspect-square">
                        <img 
                          src={image} 
                          alt={`Image for ${field}`} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <span className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          Image
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Submissions;