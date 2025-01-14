import { SubmissionCard } from "./SubmissionCard";
import { Database } from "@/integrations/supabase/types";

type SubmissionRow = Database['public']['Tables']['submissions']['Row'];

interface Submission extends Omit<SubmissionRow, 'canvas_data'> {
  canvas_data: Record<string, { drawings: string[]; images: string[]; }>;
}

interface SubmissionsListProps {
  submissions: Submission[];
  currentUserId: string | null;
  onEdit: (submission: Submission) => void;
  onDelete: (id: string, userId: string) => void;
}

export const SubmissionsList = ({
  submissions,
  currentUserId,
  onEdit,
  onDelete
}: SubmissionsListProps) => {
  return (
    <div className="space-y-6">
      {submissions.map((submission) => (
        <SubmissionCard
          key={submission.id}
          submission={submission}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};