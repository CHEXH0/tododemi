import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";
import { SubmissionsList } from "@/components/submissions/SubmissionsList";
import { SubmissionsHeader } from "@/components/submissions/SubmissionsHeader";

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
          id: submission.id,
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
        <SubmissionsHeader onCreateNew={() => navigate('/')} />
        <SubmissionsList
          submissions={submissions}
          currentUserId={currentUserId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Submissions;