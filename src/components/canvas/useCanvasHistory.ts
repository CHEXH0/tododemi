import { useState } from "react";
import { Canvas, Image } from "fabric";
import { CanvasHistoryManager } from "./types";
import { toast } from "sonner";

export const useCanvasHistory = (): CanvasHistoryManager => {
  const [history, setHistory] = useState<string[]>([]);

  const addToHistory = (canvas: Canvas) => {
    const state = canvas.toDataURL();
    setHistory(prev => [...prev, state]);
  };

  const undo = (canvas: Canvas) => {
    if (history.length < 2) return;

    try {
      const previousState = history[history.length - 2];
      Image.fromURL(previousState, {
        crossOrigin: 'anonymous',
        onload: (img) => {
          canvas.clear();
          canvas.add(img);
          canvas.renderAll();
        }
      });
      setHistory(prev => prev.slice(0, -1));
    } catch (error) {
      console.error("Error undoing action:", error);
      toast.error("Failed to undo last action.");
    }
  };

  const canUndo = () => history.length > 1;

  return { addToHistory, undo, canUndo };
};