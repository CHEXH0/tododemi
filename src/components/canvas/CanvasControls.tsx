import { Button } from "@/components/ui/button";
import { Undo, Download } from "lucide-react";

interface CanvasControlsProps {
  onUndo: () => void;
  onClear: () => void;
  onSave: () => void;
  canUndo: boolean;
}

export const CanvasControls = ({ onUndo, onClear, onSave, canUndo }: CanvasControlsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onUndo}
        disabled={!canUndo}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={onClear}>
        Clear
      </Button>
      <Button variant="outline" size="icon" onClick={onSave}>
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};