import { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { Paintbrush, Square, Circle as CircleIcon, Eraser, Download } from "lucide-react";
import { toast } from "sonner";

interface CanvasAreaProps {
  position: "top" | "left" | "right" | "bottom";
  onSave: (dataUrl: string) => void;
}

export const CanvasArea = ({ position, onSave }: CanvasAreaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"draw" | "rectangle" | "circle" | "eraser">("draw");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: position === "left" || position === "right" ? 200 : 600,
      height: position === "top" || position === "bottom" ? 200 : 400,
      backgroundColor: "#ffffff",
      isDrawingMode: activeTool === "draw" || activeTool === "eraser"
    });

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color = activeColor;
    
    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [position]);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw" || activeTool === "eraser";
    
    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeTool === "eraser" ? "#ffffff" : activeColor;
      fabricCanvas.freeDrawingBrush.width = activeTool === "eraser" ? 20 : 2;
    }
  }, [activeTool, activeColor, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);
  };

  const handleSave = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL();
    onSave(dataURL);
    toast("Drawing saved!");
  };

  return (
    <div className={`fixed ${position}-0 p-4 bg-white rounded-lg shadow-lg z-10`}>
      <div className="flex gap-2 mb-2">
        <Button
          variant={activeTool === "draw" ? "default" : "outline"}
          size="icon"
          onClick={() => handleToolClick("draw")}
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
        <input
          type="color"
          value={activeColor}
          onChange={(e) => setActiveColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
        />
        <Button variant="outline" size="icon" onClick={handleSave}>
          <Download className="h-4 w-4" />
        </Button>
      </div>
      <canvas ref={canvasRef} className="border border-gray-200 rounded-lg" />
    </div>
  );
};