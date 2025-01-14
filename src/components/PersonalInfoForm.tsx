import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { InputWithFeatures } from "./form/InputWithFeatures";
import { shapes } from "./form/FormShapes";
import { FormData, PersonalInfoFormProps } from "./form/types";
import { supabase } from "@/integrations/supabase/client";

export const PersonalInfoForm = ({ onNameChange, onSubmit, initialData }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    age: initialData?.age || "",
    country: initialData?.country || "",
    languages: initialData?.languages || "",
    hobbies: initialData?.hobbies || "",
    dreams: initialData?.dreams || "",
  });

  const [mediaContent, setMediaContent] = useState<Record<string, { drawings: string[]; images: string[]; }>>(
    initialData?.canvas_data || {}
  );

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please sign in to save your submission");
      return;
    }

    const submissionData = {
      ...formData,
      canvas_data: mediaContent,
      user_id: user.id,
    };

    let { error } = initialData?.id 
      ? await supabase
          .from("submissions")
          .update(submissionData)
          .eq('id', initialData.id)
      : await supabase
          .from("submissions")
          .insert(submissionData);

    if (error) {
      toast.error("Error saving submission");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    toast.success("Information saved successfully!");
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

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
      >
        {initialData?.id ? 'Update Information' : 'Save Information'}
      </Button>
    </form>
  );
};