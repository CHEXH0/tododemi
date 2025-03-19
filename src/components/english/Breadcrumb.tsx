
import { Link } from "react-router-dom";

export const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
        Inicio
      </Link>
      <span className="text-muted-foreground">/</span>
      <span className="text-sm font-medium">Clases de Inglés</span>
    </div>
  );
};
