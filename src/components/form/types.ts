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
  onSubmissionComplete?: () => void;
  initialData?: FormData & {
    id?: string;
    canvas_data?: Record<string, { drawings: string[]; images: string[]; }>;
  };
}