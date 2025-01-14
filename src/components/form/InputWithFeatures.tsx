import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Paintbrush, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CanvasArea } from "@/components/CanvasArea";
import { ImageUpload } from "@/components/ImageUpload";

interface InputWithFeaturesProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  isTextarea?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  shape?: string;
  mediaContent: {
    drawings: string[];
    images: string[];
  };
  onDrawingSave: (dataUrl: string) => void;
  onImageUpload: (dataUrl: string) => void;
  onMediaDelete?: (type: "drawing" | "image", index: number) => void;
}

export const InputWithFeatures = ({
  label,
  name,
  value,
  type = "text",
  isTextarea,
  onChange,
  shape,
  mediaContent,
  onDrawingSave,
  onImageUpload,
  onMediaDelete,
}: InputWithFeaturesProps) => {
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);

  const handleDrawingSave = (dataUrl: string) => {
    onDrawingSave(dataUrl);
    setIsDrawingOpen(false);
  };

  const handleImageUpload = (dataUrl: string) => {
    onImageUpload(dataUrl);
    setIsImageUploadOpen(false);
  };

  const handleDelete = (type: "drawing" | "image", index: number) => {
    if (onMediaDelete) {
      onMediaDelete(type, index);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        {isTextarea ? (
          <Textarea
            name={name}
            value={value}
            onChange={onChange}
            className="min-h-[100px]"
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
        ) : (
          <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
        )}
        <Dialog open={isDrawingOpen} onOpenChange={setIsDrawingOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Paintbrush className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <CanvasArea position="left" onSave={handleDrawingSave} />
          </DialogContent>
        </Dialog>
        <Dialog open={isImageUploadOpen} onOpenChange={setIsImageUploadOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <ImagePlus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ImageUpload onUpload={handleImageUpload} />
          </DialogContent>
        </Dialog>
      </div>
      {(mediaContent.drawings.length > 0 || mediaContent.images.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {mediaContent.drawings.map((drawing, index) => (
            <div key={`drawing-${index}`} className="relative group">
              <img
                src={drawing}
                alt={`Drawing ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete("drawing", index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {mediaContent.images.map((image, index) => (
            <div key={`image-${index}`} className="relative group">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete("image", index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      {shape && <div className="mt-2 text-sm text-gray-500">{shape}</div>}
    </div>
  );
};