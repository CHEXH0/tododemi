export interface FormData {
  name: string;
  age: string;
  country: string;
  languages: string;
  hobbies: string;
  dreams: string;
}

export interface MediaContent {
  [key: string]: {
    drawings: string[];
    images: string[];
  };
}

export interface PersonalInfoFormProps {
  onNameChange?: (name: string) => void;
  onSubmit?: (formData: FormData) => void;
  initialData?: FormData & {
    canvas_data?: Record<string, { drawings: string[]; images: string[]; }>;
  };
}