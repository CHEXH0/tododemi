import { useState } from "react";

interface MediaContent {
  [key: string]: {
    drawings: string[];
    images: string[];
  };
}

export const useFormMediaHandler = (initialData?: Record<string, { drawings: string[]; images: string[]; }>) => {
  const [mediaContent, setMediaContent] = useState<MediaContent>(initialData || {});

  const handleDrawingSave = (fieldName: string, dataUrl: string) => {
    setMediaContent(prev => ({
      ...prev,
      [fieldName]: {
        drawings: [...(prev[fieldName]?.drawings || []), dataUrl],
        images: prev[fieldName]?.images || []
      }
    }));
  };

  const handleImageUpload = (fieldName: string, dataUrl: string) => {
    setMediaContent(prev => ({
      ...prev,
      [fieldName]: {
        drawings: prev[fieldName]?.drawings || [],
        images: [...(prev[fieldName]?.images || []), dataUrl]
      }
    }));
  };

  const handleImageRemove = (fieldName: string, imageIndex: number) => {
    setMediaContent(prev => ({
      ...prev,
      [fieldName]: {
        drawings: prev[fieldName]?.drawings || [],
        images: prev[fieldName]?.images.filter((_, idx) => idx !== imageIndex)
      }
    }));
  };

  return {
    mediaContent,
    handleDrawingSave,
    handleImageUpload,
    handleImageRemove
  };
};