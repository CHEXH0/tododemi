import React from 'react';
import { Card } from '@/components/ui/card';
import { PersonalInfo } from './PersonalInfo';
import { SubmissionMedia } from './SubmissionMedia';
import { SubmissionActions } from './SubmissionActions';
import { Database } from '@/integrations/supabase/types';

type SubmissionRow = Database['public']['Tables']['submissions']['Row'];

interface Submission extends Omit<SubmissionRow, 'canvas_data'> {
  canvas_data: Record<string, { drawings: string[]; images: string[]; }>;
}

interface SubmissionCardProps {
  submission: Submission;
  currentUserId: string | null;
  onEdit: (submission: Submission) => void;
  onDelete: (id: string, userId: string) => void;
}

export const SubmissionCard = ({ 
  submission, 
  currentUserId, 
  onEdit, 
  onDelete 
}: SubmissionCardProps) => {
  return (
    <Card key={submission.id} className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{submission.name}'s Story</h2>
          <p className="text-sm text-gray-500">
            Created on {new Date(submission.created_at).toLocaleDateString()}
          </p>
        </div>
        <SubmissionActions
          canEdit={currentUserId === submission.user_id}
          onEdit={() => onEdit(submission)}
          onDelete={() => onDelete(submission.id, submission.user_id)}
        />
      </div>

      <PersonalInfo
        age={submission.age}
        country={submission.country}
        languages={submission.languages}
        hobbies={submission.hobbies}
        dreams={submission.dreams}
      />

      {submission.canvas_data && Object.entries(submission.canvas_data).map(([field, media]) => (
        <SubmissionMedia key={field} field={field} media={media} />
      ))}
    </Card>
  );
};