
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  onUpload?: (dataUrl: string) => void;
}

export const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      toast.error("Solo se permiten archivos de imagen (jpg, png, gif)");
      return;
    }
    
    const file = acceptedFiles[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        onUpload?.(dataUrl);
        toast.success("Imagen subida correctamente");
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        toast.error("Error al procesar la imagen");
        setIsLoading(false);
      };
      
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
    disabled: isLoading,
  });

  const removeImage = () => {
    setPreview(null);
    toast.success("Imagen eliminada");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive ? "border-primary bg-primary/5" : isLoading ? "border-gray-300 bg-gray-50" : "border-gray-300 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              <p className="mt-2 text-sm text-gray-600">Procesando imagen...</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {isDragActive ? "Suelta tu imagen aquí..." : "Arrastra y suelta una imagen, o haz clic para seleccionar"}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
