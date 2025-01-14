import { Button } from "@/components/ui/button";

interface SubmissionsHeaderProps {
  onCreateNew: () => void;
}

export const SubmissionsHeader = ({ onCreateNew }: SubmissionsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-100 bg-clip-text text-transparent">
        All Submissions
      </h1>
      <Button 
        onClick={onCreateNew}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold"
      >
        Create New
      </Button>
    </div>
  );
};