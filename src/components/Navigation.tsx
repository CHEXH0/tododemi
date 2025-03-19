
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FileText, 
  GraduationCap, 
  LogOut,
  LogIn
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";

interface NavigationProps {
  isAuthenticated: boolean | null;
}

export const Navigation = ({ isAuthenticated }: NavigationProps) => {
  const location = useLocation();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="border-b w-full py-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg">
          Mi Aplicación
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            {isAuthenticated && (
              <>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === "/" && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Inicio
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/submissions">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === "/submissions" && "bg-accent text-accent-foreground"
                      )}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Envíos
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
            
            <NavigationMenuItem>
              <Link to="/english-classes">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === "/english-classes" && "bg-accent text-accent-foreground"
                  )}
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Clases de Inglés
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        {isAuthenticated ? (
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        ) : (
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;
