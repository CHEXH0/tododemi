
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
      toast.error("Error al obtener envíos");
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
      toast.error("Solo puedes eliminar tus propios envíos");
      return;
    }

    const { error } = await supabase
      .from("submissions")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error al eliminar el envío");
      return;
    }

    toast.success("Envío eliminado exitosamente");
    fetchUserAndSubmissions();
  };

  const handleEdit = (submission: Submission) => {
    if (!currentUserId || currentUserId !== submission.user_id) {
      toast.error("Solo puedes editar tus propios envíos");
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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 animate-[gradient_8s_ease-in-out_infinite] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-rotate-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-rotate-slow" style={{ animationDelay: "-3s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl animate-fade-in">
          <SubmissionsHeader onCreateNew={() => navigate('/')} />
          <SubmissionsList
            submissions={submissions}
            currentUserId={currentUserId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Submissions;
