
import { useState } from "react";
import * as fabric from "fabric";
import { toast } from "sonner";
import { CanvasToolbar } from "./canvas/CanvasToolbar";
import { BrushControls } from "./canvas/BrushControls";
import { ColorPicker } from "./canvas/ColorPicker";
import { FabricCanvas } from "./canvas/FabricCanvas";
import { Button } from "./ui/button";
import { Trash2, Edit } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isEditing, setIsEditing] = useState(true);
  const isMobile = useIsMobile();

  const handleToolClick = (tool: typeof activeTool) => {
    if (!isEditing) return;
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
    fabricCanvas.clear();
    
    fabric.Image.fromURL(previousState, {
      crossOrigin: 'anonymous'
    }).then((img) => {
      if (!fabricCanvas) return;
      
      // Set scaling after image is loaded
      img.scaleX = fabricCanvas.width! / img.width!;
      img.scaleY = fabricCanvas.height! / img.height!;
      
      fabricCanvas.backgroundImage = img;
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
    setIsEditing(false);
    toast("Drawing saved!");
  };

  const handleDelete = () => {
    if (!fabricCanvas) return;
    handleClear();
    setIsEditing(true);
    toast("Canvas content deleted!");
  };

  const handleEdit = () => {
    setIsEditing(true);
    toast("You can now edit the canvas!");
  };

  const positionClass = isMobile 
    ? "fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm rounded-t-lg shadow-lg z-20 animate-fade-in"
    : `fixed ${position}-0 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg z-10 animate-fade-in`;

  return (
    <div className={positionClass}>
      <div className="flex flex-col gap-4">
        {isEditing ? (
          <>
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
              <CanvasToolbar
                activeTool={activeTool}
                handleToolClick={handleToolClick}
                handleClear={handleClear}
                handleSave={handleSave}
                handleUndo={handleUndo}
                canUndo={canvasHistory.length > 1}
              />

              <div className={`flex ${isMobile ? 'flex-row justify-between mt-2' : ''} gap-2 items-center`}>
                <BrushControls
                  brushSize={brushSize}
                  setBrushSize={setBrushSize}
                />

                <ColorPicker
                  activeColor={activeColor}
                  setActiveColor={setActiveColor}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              {!isMobile && "Edit"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {!isMobile && "Delete"}
            </Button>
          </div>
        )}

        <FabricCanvas
          fabricCanvas={fabricCanvas}
          setFabricCanvas={setFabricCanvas}
          activeTool={activeTool}
          activeColor={activeColor}
          brushSize={brushSize}
          onHistoryUpdate={(dataUrl) => setCanvasHistory(prev => [...prev, dataUrl])}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};
