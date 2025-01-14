import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Plus, Minus } from "lucide-react";

interface BrushSizeControlProps {
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

export const BrushSizeControl = ({ brushSize, onBrushSizeChange }: BrushSizeControlProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onBrushSizeChange(Math.max(1, brushSize - 1))}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Slider
        value={[brushSize]}
        onValueChange={(value) => onBrushSizeChange(value[0])}
        min={1}
        max={20}
        step={1}
        className="w-24"
      />
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onBrushSizeChange(Math.min(20, brushSize + 1))}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};