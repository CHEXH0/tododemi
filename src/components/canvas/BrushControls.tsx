import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Minus, Plus } from "lucide-react";

interface BrushControlsProps {
  brushSize: number;
  setBrushSize: (size: number) => void;
}

export const BrushControls = ({ brushSize, setBrushSize }: BrushControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setBrushSize(Math.max(1, brushSize - 1))}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Slider
        value={[brushSize]}
        onValueChange={(value) => setBrushSize(value[0])}
        min={1}
        max={20}
        step={1}
        className="w-24"
      />
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setBrushSize(Math.min(20, brushSize + 1))}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};