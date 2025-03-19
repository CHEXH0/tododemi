
import { Button } from "@/components/ui/button";

interface FormSubmitButtonProps {
  isEditing: boolean;
}

export const FormSubmitButton = ({ isEditing }: FormSubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
    >
      {isEditing ? 'Actualizar Información' : 'Guardar Información'}
    </Button>
  );
};
