
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const Breadcrumb = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center gap-2 mb-4 overflow-x-hidden">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary whitespace-nowrap">
        {isMobile ? "Home" : "All About Me"}
      </Link>
      <span className="text-muted-foreground">/</span>
      <span className="text-sm font-medium whitespace-nowrap">
        {isMobile ? "English" : "Clases de Inglés"}
      </span>
    </div>
  );
};
