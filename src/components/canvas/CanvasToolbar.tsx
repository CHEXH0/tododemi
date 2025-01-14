import { Button } from "@/components/ui/button";
import { Paintbrush, Square, Circle as CircleIcon, Eraser, Download, Undo } from "lucide-react";

interface CanvasToolbarProps {
  activeTool: "draw" | "rectangle" | "circle" | "eraser";
  handleToolClick: (tool: "draw" | "rectangle" | "circle" | "eraser") => void;
  handleClear: () => void;
  handleSave: () => void;
  handleUndo: () => void;
  canUndo: boolean;
}

export const CanvasToolbar = ({
  activeTool,
  handleToolClick,
  handleClear,
  handleSave,
  handleUndo,
  canUndo
}: CanvasToolbarProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant={activeTool === "draw" ? "default" : "outline"}
        size="icon"
        onClick={() => handleToolClick("draw")}
        className="group"
      >
        <Paintbrush className="h-4 w-4" />
      </Button>
      <Button
        variant={activeTool === "rectangle" ? "default" : "outline"}
        size="icon"
        onClick={() => handleToolClick("rectangle")}
      >
        <Square className="h-4 w-4" />
      </Button>
      <Button
        variant={activeTool === "circle" ? "default" : "outline"}
        size="icon"
        onClick={() => handleToolClick("circle")}
      >
        <CircleIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={activeTool === "eraser" ? "default" : "outline"}
        size="icon"
        onClick={() => handleToolClick("eraser")}
      >
        <Eraser className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleUndo}
        disabled={!canUndo}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={handleClear}>
        Clear
      </Button>
      <Button variant="outline" size="icon" onClick={handleSave}>
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};