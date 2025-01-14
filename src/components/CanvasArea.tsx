import { useRef, useEffect, useState } from "react";
import * as fabric from "fabric";
import { Button } from "@/components/ui/button";
import { Paintbrush, Square, Circle as CircleIcon, Eraser, Download, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

interface CanvasAreaProps {
  position: "left" | "right";
  onSave: (dataUrl: string) => void;
}

export const CanvasArea = ({ position, onSave }: CanvasAreaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"draw" | "rectangle" | "circle" | "eraser">("draw");
  const [brushSize, setBrushSize] = useState(2);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 300,
      height: window.innerHeight - 100,
      backgroundColor: "#ffffff",
      isDrawingMode: activeTool === "draw" || activeTool === "eraser"
    });

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = brushSize;
    canvas.freeDrawingBrush.color = activeColor;
    
    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw" || activeTool === "eraser";
    
    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeTool === "eraser" ? "#ffffff" : activeColor;
      fabricCanvas.freeDrawingBrush.width = activeTool === "eraser" ? brushSize * 2 : brushSize;
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (tool === "rectangle") {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 50 * (brushSize / 2),
        height: 50 * (brushSize / 2),
      });
      fabricCanvas?.add(rect);
    } else if (tool === "circle") {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 25 * (brushSize / 2),
      });
      fabricCanvas?.add(circle);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast("Canvas cleared!");
  };

  const handleSave = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL();
    onSave(dataURL);
    toast("Drawing saved!");
  };

  return (
    <div className={`fixed ${position}-0 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg z-10 animate-fade-in`}>
      <div className="flex flex-col gap-4">
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
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setBrushSize(Math.max(1, brushSize - 1))}>
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
          <Button variant="outline" size="icon" onClick={() => setBrushSize(Math.min(20, brushSize + 1))}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={activeColor}
            onChange={(e) => setActiveColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
          <Button variant="outline" size="sm" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="outline" size="icon" onClick={handleSave}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  );
};