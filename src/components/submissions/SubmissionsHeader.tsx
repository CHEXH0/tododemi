import { Button } from "@/components/ui/button";

interface SubmissionsHeaderProps {
  onCreateNew: () => void;
}

export const SubmissionsHeader = ({ onCreateNew }: SubmissionsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
        All Submissions
      </h1>
      <Button 
        onClick={onCreateNew}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold transform hover:scale-105 transition-all duration-300 animate-pulse-rainbow"
      >
        Create New
      </Button>
    </div>
  );
};