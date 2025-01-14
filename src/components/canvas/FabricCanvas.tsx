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
    onHistoryUpdate(canvas.toDataURL());

    canvas.on('object:added', () => {
      onHistoryUpdate(canvas.toDataURL());
    });

    canvas.on('object:modified', () => {
      onHistoryUpdate(canvas.toDataURL());
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = (activeTool === "draw" || activeTool === "eraser") && isEditing;
    fabricCanvas.selection = isEditing;
    fabricCanvas.interactive = isEditing;
    
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
    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  );
};