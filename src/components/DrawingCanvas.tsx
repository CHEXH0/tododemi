
import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { toast } from "sonner";
import { DrawingTools } from "./canvas/DrawingTools";
import { CanvasControls } from "./canvas/CanvasControls";
import { BrushSizeControl } from "./canvas/BrushSizeControl";
import { ColorPickerControl } from "./canvas/ColorPickerControl";
import { useIsMobile } from "@/hooks/use-mobile";

interface DrawingCanvasProps {
  onSave?: (dataUrl: string) => void;
}

export const DrawingCanvas = ({ onSave }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"draw" | "rectangle" | "circle" | "eraser">("draw");
  const [brushSize, setBrushSize] = useState(2);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth;
    // Use smaller height on mobile
    const canvasHeight = isMobile ? 350 : 500;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: containerWidth,
      height: canvasHeight,
      backgroundColor: "#ffffff",
      isDrawingMode: activeTool === "draw" || activeTool === "eraser"
    });

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = brushSize;
    canvas.freeDrawingBrush.color = activeColor;
    
    setFabricCanvas(canvas);
    setCanvasHistory([canvas.toDataURL()]);

    canvas.on('object:added', () => {
      setCanvasHistory(prev => [...prev, canvas.toDataURL()]);
    });

    canvas.on('object:modified', () => {
      setCanvasHistory(prev => [...prev, canvas.toDataURL()]);
    });

    // Resize handler to keep canvas responsive
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      canvas.setWidth(newWidth);
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, [isMobile]);

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
    if (onSave) {
      onSave(dataURL);
      toast("Drawing saved!");
    } else {
      const link = document.createElement("a");
      link.download = "my-drawing.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast("Drawing downloaded!");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg animate-fade-in">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 items-center justify-between flex-wrap`}>
        <DrawingTools 
          activeTool={activeTool}
          onToolClick={handleToolClick}
        />
        <div className={`flex ${isMobile ? 'flex-row' : ''} gap-2 items-center flex-wrap`}>
          <BrushSizeControl 
            brushSize={brushSize}
            onBrushSizeChange={setBrushSize}
          />
          <ColorPickerControl
            activeColor={activeColor}
            onColorChange={setActiveColor}
          />
          <CanvasControls
            onUndo={handleUndo}
            onClear={handleClear}
            onSave={handleSave}
            canUndo={canvasHistory.length > 1}
          />
        </div>
      </div>
      <div ref={containerRef} className="border border-gray-200 rounded-lg overflow-hidden w-full">
        <canvas ref={canvasRef} className="w-full" />
      </div>
    </div>
  );
};
