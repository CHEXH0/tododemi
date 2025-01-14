import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Paintbrush, Image as ImageIcon } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { DrawingCanvas } from "@/components/DrawingCanvas";

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
  onImageUpload
}: InputWithFeaturesProps) => {
  const InputComponent = isTextarea ? Textarea : Input;

  return (
    <div className={`space-y-4 p-6 mb-8 shadow-lg ${shape} animate-fade-in`}>
      <Label htmlFor={name} className="text-white font-bold text-lg">{label}</Label>
      <div className="flex gap-2">
        <div className="flex-1 bg-white/90 rounded-lg p-2">
          <InputComponent
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={`Your ${label.toLowerCase()}`}
            type={type}
            className={`${isTextarea ? "min-h-[100px]" : ""} bg-transparent`}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="icon" className="flex-shrink-0 hover:bg-white/20">
              <Paintbrush className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DrawingCanvas onSave={onDrawingSave} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="icon" className="flex-shrink-0 hover:bg-white/20">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ImageUpload onUpload={onImageUpload} />
          </DialogContent>
        </Dialog>
      </div>
      {(mediaContent.drawings.length > 0 || mediaContent.images.length > 0) && (
        <div className="grid grid-cols-2 gap-4 mt-4 bg-white/90 p-4 rounded-lg">
          {mediaContent.drawings.map((drawing, idx) => (
            <img key={`drawing-${idx}`} src={drawing} alt={`Drawing for ${label}`} className="w-full rounded-lg" />
          ))}
          {mediaContent.images.map((image, idx) => (
            <img key={`image-${idx}`} src={image} alt={`Image for ${label}`} className="w-full rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
};