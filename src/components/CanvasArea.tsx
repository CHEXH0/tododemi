import { useState } from "react";
import * as fabric from "fabric";
import { toast } from "sonner";
import { CanvasToolbar } from "./canvas/CanvasToolbar";
import { BrushControls } from "./canvas/BrushControls";
import { ColorPicker } from "./canvas/ColorPicker";
import { FabricCanvas } from "./canvas/FabricCanvas";

interface CanvasAreaProps {
  position: "left" | "right";
  onSave: (dataUrl: string) => void;
}

export const CanvasArea = ({ position, onSave }: CanvasAreaProps) => {
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"draw" | "rectangle" | "circle" | "eraser">("draw");
  const [brushSize, setBrushSize] = useState(2);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);

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

  const handleUndo = () => {
    if (!fabricCanvas || canvasHistory.length <= 1) return;
    
    const previousState = canvasHistory[canvasHistory.length - 2];
    fabric.loadSVGFromString(previousState, (objects, options) => {
      if (!fabricCanvas) return;
      fabricCanvas.clear();
      objects.forEach((obj: fabric.Object) => {
        fabricCanvas.add(obj);
      });
      fabricCanvas.renderAll();
    });
    
    setCanvasHistory(prev => prev.slice(0, -1));
    toast("Action undone!");
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    setCanvasHistory([fabricCanvas.toDataURL()]);
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
        <CanvasToolbar
          activeTool={activeTool}
          handleToolClick={handleToolClick}
          handleClear={handleClear}
          handleSave={handleSave}
          handleUndo={handleUndo}
          canUndo={canvasHistory.length > 1}
        />

        <BrushControls
          brushSize={brushSize}
          setBrushSize={setBrushSize}
        />

        <div className="flex gap-2 items-center">
          <ColorPicker
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
        </div>

        <FabricCanvas
          fabricCanvas={fabricCanvas}
          setFabricCanvas={setFabricCanvas}
          activeTool={activeTool}
          activeColor={activeColor}
          brushSize={brushSize}
          onHistoryUpdate={(dataUrl) => setCanvasHistory(prev => [...prev, dataUrl])}
        />
      </div>
    </div>
  );
};