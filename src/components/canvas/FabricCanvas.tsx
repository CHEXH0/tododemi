import { useEffect, useRef } from "react";
import * as fabric from "fabric";

interface FabricCanvasProps {
  fabricCanvas: fabric.Canvas | null;
  setFabricCanvas: (canvas: fabric.Canvas) => void;
  activeTool: "draw" | "rectangle" | "circle" | "eraser";
  activeColor: string;
  brushSize: number;
  onHistoryUpdate: (dataUrl: string) => void;
  isEditing: boolean;
}

export const FabricCanvas = ({
  fabricCanvas,
  setFabricCanvas,
  activeTool,
  activeColor,
  brushSize,
  onHistoryUpdate,
  isEditing,
}: FabricCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth;
    const canvasHeight = 400; // Fixed height, adjust as needed

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
    onHistoryUpdate(canvas.toDataURL());

    canvas.on('object:added', () => {
      onHistoryUpdate(canvas.toDataURL());
    });

    canvas.on('object:modified', () => {
      onHistoryUpdate(canvas.toDataURL());
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
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = (activeTool === "draw" || activeTool === "eraser") && isEditing;
    fabricCanvas.selection = isEditing;
    
    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeTool === "eraser" ? "#ffffff" : activeColor;
      fabricCanvas.freeDrawingBrush.width = activeTool === "eraser" ? brushSize * 2 : brushSize;
    }

    // Disable all objects' controls when not editing
    fabricCanvas.getObjects().forEach((obj) => {
      obj.selectable = isEditing;
      obj.evented = isEditing;
    });

    fabricCanvas.renderAll();
  }, [activeTool, activeColor, brushSize, fabricCanvas, isEditing]);

  return (
    <div ref={containerRef} className="mt-4 border border-gray-200 rounded-lg overflow-hidden w-full">
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
};
