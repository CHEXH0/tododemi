import { InputWithFeatures } from "./InputWithFeatures";
import { shapes } from "./FormShapes";

interface FormFieldProps {
  field: {
    label: string;
    name: string;
    value: string;
    type?: string;
    isTextarea?: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  mediaContent: {
    drawings: string[];
    images: string[];
  };
  onDrawingSave: (dataUrl: string) => void;
  onImageUpload: (dataUrl: string) => void;
}

export const FormField = ({
  field,
  onChange,
  mediaContent,
  onDrawingSave,
  onImageUpload,
}: FormFieldProps) => {
  return (
    <InputWithFeatures
      {...field}
      onChange={onChange}
      shape={shapes[field.name as keyof typeof shapes]}
      mediaContent={mediaContent}
      onDrawingSave={onDrawingSave}
      onImageUpload={onImageUpload}
    />
  );
};