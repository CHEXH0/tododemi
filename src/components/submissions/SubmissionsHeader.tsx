import { Button } from "@/components/ui/button";

interface SubmissionsHeaderProps {
  onCreateNew: () => void;
}

export const SubmissionsHeader = ({ onCreateNew }: SubmissionsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">All Submissions</h1>
      <Button onClick={onCreateNew}>Create New</Button>
    </div>
  );
};