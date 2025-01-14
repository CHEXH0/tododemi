import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { InputWithFeatures } from "./form/InputWithFeatures";
import { shapes } from "./form/FormShapes";
import { FormData, PersonalInfoFormProps } from "./form/types";

export const PersonalInfoForm = ({ onNameChange, onSubmit }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<FormData>({
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
    if (name === 'name' && onNameChange) {
      onNameChange(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    toast("Information saved successfully!");
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
        />
      ))}

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
      >
        Save Information
      </Button>
    </form>
  );
};