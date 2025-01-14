import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { InputWithFeatures } from "./form/InputWithFeatures";
import { shapes } from "./form/FormShapes";
import { FormData, PersonalInfoFormProps } from "./form/types";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PersonalInfoForm = ({ onNameChange, onSubmit }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    country: "",
    languages: "",
    hobbies: "",
    dreams: "",
  });

  const [mediaContent, setMediaContent] = useState<Record<string, { drawings: string[]; images: string[]; }>>({});
  const [templateName, setTemplateName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'name' && onNameChange) {
      onNameChange(value);
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    toast("Information saved successfully!");
  };

  const saveAsTemplate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to save templates");
        return;
      }

      const { error } = await supabase.from('templates').insert({
        name: templateName,
        user_id: user.id,
        canvas_data: mediaContent
      });

      if (error) throw error;

      toast.success("Template saved successfully!");
      setIsDialogOpen(false);
      setTemplateName("");
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error("Failed to save template");
    }
  };

  const formFields = [
    { label: "Name", name: "name", value: formData.name },
    { label: "Age", name: "age", value: formData.age, type: "number" },
    { label: "Country", name: "country", value: formData.country },
    { label: "Languages", name: "languages", value: formData.languages },
    { label: "Hobbies", name: "hobbies", value: formData.hobbies, isTextarea: true },
    { label: "Dreams and Goals", name: "dreams", value: formData.dreams, isTextarea: true },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formFields.map((field) => (
        <InputWithFeatures
          key={field.name}
          {...field}
          onChange={handleChange}
          shape={shapes[field.name as keyof typeof shapes]}
          mediaContent={mediaContent[field.name] || { drawings: [], images: [] }}
          onDrawingSave={(dataUrl) => handleDrawingSave(field.name, dataUrl)}
          onImageUpload={(dataUrl) => handleImageUpload(field.name, dataUrl)}
        />
      ))}

      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
        >
          Save Information
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              type="button"
              variant="outline"
              className="flex-1"
            >
              Save as Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save as Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter template name"
                />
              </div>
              <Button 
                onClick={saveAsTemplate}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Save Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </form>
  );
};