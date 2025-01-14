import { Button } from "@/components/ui/button";
import { Paintbrush, Square, Circle as CircleIcon, Eraser, Undo2 } from "lucide-react";
import { CanvasToolbarProps } from "./types";

export const CanvasToolbar = ({ activeTool, onToolClick, canUndo, onUndo }: CanvasToolbarProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant={activeTool === "draw" ? "default" : "outline"}
        size="icon"
        onClick={() => onToolClick("draw")}
        className="group"
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
      <Button
        variant="outline"
        size="icon"
        onClick={onUndo}
        disabled={!canUndo}
      >
        <Undo2 className="h-4 w-4" />
      </Button>
    </div>
  );
};