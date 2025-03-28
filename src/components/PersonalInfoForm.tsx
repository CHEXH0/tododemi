
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FormData, PersonalInfoFormProps } from "./form/types";
import { supabase } from "@/integrations/supabase/client";
import { FormField } from "./form/FormField";
import { FormSubmitButton } from "./form/FormSubmitButton";
import { useFormMediaHandler } from "./form/FormMediaHandler";

export const PersonalInfoForm = ({ 
  onNameChange, 
  initialData,
  onSubmissionComplete 
}: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    age: initialData?.age || "",
    country: initialData?.country || "",
    languages: initialData?.languages || "",
    hobbies: initialData?.hobbies || "",
    dreams: initialData?.dreams || "",
  });
  
  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        age: initialData.age || "",
        country: initialData.country || "",
        languages: initialData.languages || "",
        hobbies: initialData.hobbies || "",
        dreams: initialData.dreams || "",
      });
      if (onNameChange && initialData.name) {
        onNameChange(initialData.name);
      }
    }
  }, [initialData, onNameChange]);

  const { mediaContent, handleDrawingSave, handleImageUpload, handleImageRemove } = useFormMediaHandler(initialData?.canvas_data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'name' && onNameChange) {
      onNameChange(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Por favor inicia sesión para guardar tu envío");
      return;
    }

    const submissionData = {
      ...formData,
      canvas_data: mediaContent,
      user_id: user.id,
    };

    try {
      let { error } = initialData?.id 
        ? await supabase
            .from("submissions")
            .update(submissionData)
            .eq('id', initialData.id)
        : await supabase
            .from("submissions")
            .insert(submissionData);
  
      if (error) {
        console.error("Error saving submission:", error);
        toast.error("Error al guardar el envío");
        return;
      }
  
      toast.success(initialData?.id ? "¡Envío actualizado exitosamente!" : "¡Envío guardado exitosamente!");
      if (onSubmissionComplete) {
        onSubmissionComplete();
      }
    } catch (error) {
      console.error("Exception when saving:", error);
      toast.error("Error inesperado al guardar");
    }
  };

  const formFields = [
    { label: "Full Name", name: "name", value: formData.name },
    { label: "Age", name: "age", value: formData.age, type: "number" },
    { label: "Country", name: "country", value: formData.country },
    { label: "Languages", name: "languages", value: formData.languages },
    { label: "Hobbies", name: "hobbies", value: formData.hobbies, isTextarea: true },
    { label: "Dreams and Goals", name: "dreams", value: formData.dreams, isTextarea: true },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formFields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          onChange={handleChange}
          mediaContent={mediaContent[field.name] || { drawings: [], images: [] }}
          onDrawingSave={(dataUrl) => handleDrawingSave(field.name, dataUrl)}
          onImageUpload={(dataUrl) => handleImageUpload(field.name, dataUrl)}
          onImageRemove={(index) => handleImageRemove(field.name, index)}
        />
      ))}
      <FormSubmitButton isEditing={!!initialData?.id} />
    </form>
  );
};
