
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface SubmissionActionsProps {
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const SubmissionActions = ({ canEdit, onEdit, onDelete }: SubmissionActionsProps) => {
  if (!canEdit) return null;

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4 mr-2" />
        Editar
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
      >
        Eliminar
      </Button>
    </div>
  );
};
