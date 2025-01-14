import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Submission {
  id: string;
  name: string;
  created_at: string;
  canvas_data: any;
  user_id: string;
}

export const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Student Submissions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((submission) => (
          <div key={submission.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{submission.name}</h2>
            <p className="text-gray-500 mb-4">
              {new Date(submission.created_at).toLocaleDateString()}
            </p>
            {submission.canvas_data && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.values(submission.canvas_data).map((dataUrl: string, index: number) => (
                  <img
                    key={index}
                    src={dataUrl}
                    alt={`Canvas ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
            )}
            {(currentUser === submission.user_id) && (
              <Button
                variant="destructive"
                onClick={() => handleDelete(submission.id, submission.user_id)}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;