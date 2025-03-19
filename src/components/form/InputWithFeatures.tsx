
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Paintbrush, Image as ImageIcon, X } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface MediaContent {
  drawings: string[];
  images: string[];
}

interface InputWithFeaturesProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  isTextarea?: boolean;
  shape: string;
  mediaContent: MediaContent;
  onDrawingSave: (dataUrl: string) => void;
  onImageUpload: (dataUrl: string) => void;
  onImageRemove?: (index: number) => void;
}

export const InputWithFeatures = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  isTextarea = false,
  shape,
  mediaContent,
  onDrawingSave,
  onImageUpload,
  onImageRemove
}: InputWithFeaturesProps) => {
  const InputComponent = isTextarea ? Textarea : Input;
  const isMobile = useIsMobile();

  const handleImageRemove = (index: number) => {
    onImageRemove?.(index);
    toast.success("¡Imagen eliminada exitosamente!");
  };

  return (
    <div className={`space-y-4 p-6 mb-8 shadow-lg ${shape} animate-fade-in`}>
      <Label htmlFor={name} className="text-white font-bold text-lg">{label}</Label>
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
        <div className="flex-1 bg-white/90 rounded-lg p-2">
          <InputComponent
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={`Tu ${label.toLowerCase()}`}
            type={type}
            className={`${isTextarea ? "min-h-[100px]" : ""} bg-transparent`}
          />
        </div>
        <div className={`flex ${isMobile ? 'flex-row mt-2 justify-end' : ''} gap-2`}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon" className="flex-shrink-0 hover:bg-white/20">
                <Paintbrush className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw]' : 'max-w-4xl'}`}>
              <DialogTitle className="text-lg font-semibold">Dibuja Algo</DialogTitle>
              <DrawingCanvas onSave={onDrawingSave} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon" className="flex-shrink-0 hover:bg-white/20">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className={isMobile ? 'w-[95vw] max-w-[95vw]' : ''}>
              <DialogTitle className="text-lg font-semibold">Sube una Imagen</DialogTitle>
              <ImageUpload onUpload={onImageUpload} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {(mediaContent.drawings.length > 0 || mediaContent.images.length > 0) && (
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mt-4 bg-white/90 p-4 rounded-lg`}>
          {mediaContent.drawings.map((drawing, idx) => (
            <img key={`drawing-${idx}`} src={drawing} alt={`Dibujo para ${label}`} className="w-full rounded-lg" />
          ))}
          {mediaContent.images.map((image, idx) => (
            <div key={`image-${idx}`} className="relative">
              <img src={image} alt={`Imagen para ${label}`} className="w-full rounded-lg" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleImageRemove(idx)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
