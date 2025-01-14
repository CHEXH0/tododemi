import { Button } from "@/components/ui/button";
import { Paintbrush, Square, Circle as CircleIcon, Eraser } from "lucide-react";

interface DrawingToolsProps {
  activeTool: "draw" | "rectangle" | "circle" | "eraser";
  onToolClick: (tool: "draw" | "rectangle" | "circle" | "eraser") => void;
}

export const DrawingTools = ({ activeTool, onToolClick }: DrawingToolsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={activeTool === "draw" ? "default" : "outline"}
        size="icon"
        onClick={() => onToolClick("draw")}
      >
        <Paintbrush className="h-4 w-4" />
      </Button>
      <Button
        variant={activeTool === "rectangle" ? "default" : "outline"}
        size="icon"
        onClick={() => onToolClick("rectangle")}
      >
        <Square className="h-4 w-4" />
      </Button>
      <Button
        variant={activeTool === "circle" ? "default" : "outline"}
        size="icon"
        onClick={() => onToolClick("circle")}
      >
        <CircleIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={activeTool === "eraser" ? "default" : "outline"}
        size="icon"
        onClick={() => onToolClick("eraser")}
      >
        <Eraser className="h-4 w-4" />
      </Button>
    </div>
  );
};