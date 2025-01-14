import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CanvasActionButtonsProps } from "./types";

export const CanvasActionButtons = ({ 
  activeColor, 
  setActiveColor, 
  onClear, 
  onSave 
}: CanvasActionButtonsProps) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="color"
        value={activeColor}
        onChange={(e) => setActiveColor(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer"
      />
      <Button variant="outline" size="sm" onClick={onClear}>
        Clear
      </Button>
      <Button variant="outline" size="icon" onClick={onSave}>
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};