
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FileText, 
  GraduationCap, 
  LogOut,
  LogIn,
  TestTube
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavigationProps {
  isAuthenticated: boolean | null;
}

export const Navigation = ({ isAuthenticated }: NavigationProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="border-b w-full py-2 overflow-x-hidden">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg whitespace-nowrap">
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
                      <Home className="h-4 w-4" />
                      {!isMobile && <span className="ml-2">Todo Sobre Mí</span>}
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
                      <FileText className="h-4 w-4" />
                      {!isMobile && <span className="ml-2">Envíos</span>}
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
                  <GraduationCap className="h-4 w-4" />
                  {!isMobile && <span className="ml-2">Clases de Inglés</span>}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/english-test">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === "/english-test" && "bg-accent text-accent-foreground"
                  )}
                >
                  <TestTube className="h-4 w-4" />
                  {!isMobile && <span className="ml-2">Test de Inglés</span>}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        {isAuthenticated ? (
          <Button variant="ghost" size="sm" onClick={handleLogout} className="whitespace-nowrap">
            <LogOut className="h-4 w-4" />
            {!isMobile && <span className="ml-2">Cerrar Sesión</span>}
          </Button>
        ) : (
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              <LogIn className="h-4 w-4" />
              {!isMobile && <span className="ml-2">Iniciar Sesión</span>}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;
