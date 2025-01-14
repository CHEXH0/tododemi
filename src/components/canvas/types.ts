import { Canvas, Image } from "fabric";

export type CanvasTool = "draw" | "rectangle" | "circle" | "eraser";

export interface CanvasToolbarProps {
  activeTool: CanvasTool;
  onToolClick: (tool: CanvasTool) => void;
  canUndo: boolean;
  onUndo: () => void;
}

export interface CanvasSizeControlsProps {
  brushSize: number;
  setBrushSize: (size: number) => void;
}

export interface CanvasActionButtonsProps {
  activeColor: string;
  setActiveColor: (color: string) => void;
  onClear: () => void;
  onSave: () => void;
}

export interface CanvasHistoryManager {
  addToHistory: (canvas: Canvas) => void;
  undo: (canvas: Canvas) => void;
  canUndo: () => boolean;
}