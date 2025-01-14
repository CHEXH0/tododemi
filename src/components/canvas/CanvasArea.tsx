import { useRef, useEffect, useState } from "react";
import { Canvas, PencilBrush, Rect, Circle } from "fabric";
import { toast } from "sonner";
import { CanvasTool } from "./types";
import { CanvasToolbar } from "./CanvasToolbar";
import { CanvasSizeControls } from "./CanvasSizeControls";
import { CanvasActionButtons } from "./CanvasActionButtons";
import { useCanvasHistory } from "./useCanvasHistory";

interface CanvasAreaProps {
  position: "left" | "right";
  onSave: (dataUrl: string) => void;
}

export const CanvasArea = ({ position, onSave }: CanvasAreaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<CanvasTool>("draw");
  const [brushSize, setBrushSize] = useState(2);
  const { addToHistory, undo, canUndo } = useCanvasHistory();

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const canvas = new Canvas(canvasRef.current, {
        width: 300,
        height: window.innerHeight - 100,
        backgroundColor: "#ffffff",
        isDrawingMode: activeTool === "draw" || activeTool === "eraser"
      });

      canvas.freeDrawingBrush = new PencilBrush(canvas);
      canvas.freeDrawingBrush.width = brushSize;
      canvas.freeDrawingBrush.color = activeColor;
      
      canvas.on('object:added', () => {
        addToHistory(canvas);
      });

      setFabricCanvas(canvas);

      return () => {
        canvas.dispose();
      };
    } catch (error) {
      console.error("Error initializing canvas:", error);
      toast.error("Failed to initialize canvas. Please refresh the page.");
    }
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    try {
      fabricCanvas.isDrawingMode = activeTool === "draw" || activeTool === "eraser";
      
      if (fabricCanvas.freeDrawingBrush) {
        fabricCanvas.freeDrawingBrush.color = activeTool === "eraser" ? "#ffffff" : activeColor;
        fabricCanvas.freeDrawingBrush.width = activeTool === "eraser" ? brushSize * 2 : brushSize;
      }
    } catch (error) {
      console.error("Error updating canvas settings:", error);
      toast.error("Failed to update drawing settings.");
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  const handleToolClick = (tool: CanvasTool) => {
    try {
      setActiveTool(tool);

      if (!fabricCanvas) return;

      if (tool === "rectangle") {
        const rect = new Rect({
          left: 100,
          top: 100,
          fill: activeColor,
          width: 50 * (brushSize / 2),
          height: 50 * (brushSize / 2),
        });
        fabricCanvas.add(rect);
      } else if (tool === "circle") {
        const circle = new Circle({
          left: 100,
          top: 100,
          fill: activeColor,
          radius: 25 * (brushSize / 2),
        });
        fabricCanvas.add(circle);
      }
    } catch (error) {
      console.error("Error handling tool click:", error);
      toast.error("Failed to switch drawing tool.");
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    try {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = "#ffffff";
      fabricCanvas.renderAll();
      toast("Canvas cleared!");
    } catch (error) {
      console.error("Error clearing canvas:", error);
      toast.error("Failed to clear canvas.");
    }
  };

  const handleSave = () => {
    if (!fabricCanvas) return;
    try {
      const dataURL = fabricCanvas.toDataURL();
      onSave(dataURL);
      toast.success("Drawing saved!");
    } catch (error) {
      console.error("Error saving canvas:", error);
      toast.error("Failed to save drawing.");
    }
  };

  const handleUndo = () => {
    if (!fabricCanvas) return;
    undo(fabricCanvas);
  };

  return (
    <div className={`fixed ${position}-0 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg z-10 animate-fade-in`}>
      <div className="flex flex-col gap-4">
        <CanvasToolbar
          activeTool={activeTool}
          onToolClick={handleToolClick}
          canUndo={canUndo()}
          onUndo={handleUndo}
        />
        <CanvasSizeControls
          brushSize={brushSize}
          setBrushSize={setBrushSize}
        />
        <CanvasActionButtons
          activeColor={activeColor}
          setActiveColor={setActiveColor}
          onClear={handleClear}
          onSave={handleSave}
        />
      </div>
      <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  );
};