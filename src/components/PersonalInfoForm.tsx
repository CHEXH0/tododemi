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

export const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    country: "",
    languages: "",
    hobbies: "",
    dreams: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast("Information saved successfully!");
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
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <div className="flex gap-2">
          <div className="flex-1">
            <InputComponent
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={`Your ${label.toLowerCase()}`}
              type={type}
              required
              className={isTextarea ? "min-h-[100px]" : ""}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Paintbrush className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DrawingCanvas />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ImageUpload />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
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

      <Button type="submit" className="w-full">
        Save Information
      </Button>
    </form>
  );
};