import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ImageUpload";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Paintbrush, Image as ImageIcon } from "lucide-react";

interface FormData {
  name: string;
  age: string;
  country: string;
  languages: string;
  hobbies: string;
  dreams: string;
}

interface MediaContent {
  [key: string]: {
    drawings: string[];
    images: string[];
  };
}

export const PersonalInfoForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    country: "",
    languages: "",
    hobbies: "",
    dreams: "",
  });

  const [mediaContent, setMediaContent] = useState<MediaContent>({
    name: { drawings: [], images: [] },
    age: { drawings: [], images: [] },
    country: { drawings: [], images: [] },
    languages: { drawings: [], images: [] },
    hobbies: { drawings: [], images: [] },
    dreams: { drawings: [], images: [] },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, mediaContent });
    toast("Information saved successfully!");
  };

  const handleDrawingSave = (field: string, dataUrl: string) => {
    setMediaContent(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        drawings: [...prev[field].drawings, dataUrl]
      }
    }));
  };

  const handleImageUpload = (field: string, dataUrl: string) => {
    setMediaContent(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        images: [...prev[field].images, dataUrl]
      }
    }));
  };

  const shapes = {
    name: "rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
    age: "rounded-lg transform rotate-3 bg-gradient-to-br from-green-400 to-blue-500",
    country: "clip-path-pentagon bg-gradient-to-tl from-yellow-400 via-red-500 to-pink-500",
    languages: "rounded-tr-[4rem] rounded-bl-[4rem] bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500",
    hobbies: "clip-path-hexagon bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
    dreams: "clip-path-star bg-gradient-to-tr from-pink-400 via-red-500 to-yellow-500"
  };

  const InputWithFeatures = ({ 
    label, 
    name, 
    value, 
    type = "text", 
    isTextarea = false 
  }: { 
    label: string;
    name: string;
    value: string;
    type?: string;
    isTextarea?: boolean;
  }) => {
    const InputComponent = isTextarea ? Textarea : Input;
    
    return (
      <div className={`space-y-4 p-6 mb-8 shadow-lg ${shapes[name as keyof typeof shapes]} animate-fade-in`}>
        <Label htmlFor={name} className="text-white font-bold text-lg">{label}</Label>
        <div className="flex gap-2">
          <div className="flex-1 bg-white/90 rounded-lg p-2">
            <InputComponent
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={`Your ${label.toLowerCase()}`}
              type={type}
              required
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
              <DrawingCanvas onSave={(dataUrl) => handleDrawingSave(name, dataUrl)} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon" className="flex-shrink-0 hover:bg-white/20">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ImageUpload onUpload={(dataUrl) => handleImageUpload(name, dataUrl)} />
            </DialogContent>
          </Dialog>
        </div>
        {(mediaContent[name].drawings.length > 0 || mediaContent[name].images.length > 0) && (
          <div className="grid grid-cols-2 gap-4 mt-4 bg-white/90 p-4 rounded-lg">
            {mediaContent[name].drawings.map((drawing, idx) => (
              <img key={`drawing-${idx}`} src={drawing} alt={`Drawing for ${label}`} className="w-full rounded-lg" />
            ))}
            {mediaContent[name].images.map((image, idx) => (
              <img key={`image-${idx}`} src={image} alt={`Image for ${label}`} className="w-full rounded-lg" />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputWithFeatures label="Name" name="name" value={formData.name} />
      <InputWithFeatures label="Age" name="age" value={formData.age} type="number" />
      <InputWithFeatures label="Country" name="country" value={formData.country} />
      <InputWithFeatures label="Languages" name="languages" value={formData.languages} />
      <InputWithFeatures 
        label="Hobbies" 
        name="hobbies" 
        value={formData.hobbies} 
        isTextarea={true}
      />
      <InputWithFeatures 
        label="Dreams and Goals" 
        name="dreams" 
        value={formData.dreams} 
        isTextarea={true}
      />

      <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3">
        Save Information
      </Button>
    </form>
  );
};