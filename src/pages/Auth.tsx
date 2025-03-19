
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-white/90 backdrop-blur-sm border-2 border-purple-200">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Bienvenido de Nuevo
        </h1>
        <SupabaseAuth 
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#9333ea',
                  brandAccent: '#a855f7'
                }
              }
            }
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: "Correo electrónico",
                password_label: "Contraseña",
                button_label: "Iniciar sesión",
                loading_button_label: "Iniciando sesión...",
                social_provider_text: "Iniciar sesión con {{provider}}",
                link_text: "¿Ya tienes una cuenta? Inicia sesión"
              },
              sign_up: {
                email_label: "Correo electrónico",
                password_label: "Contraseña",
                button_label: "Registrarse",
                loading_button_label: "Registrando...",
                social_provider_text: "Registrarse con {{provider}}",
                link_text: "¿No tienes una cuenta? Regístrate"
              },
              forgotten_password: {
                email_label: "Correo electrónico",
                button_label: "Enviar instrucciones",
                loading_button_label: "Enviando instrucciones...",
                link_text: "¿Olvidaste tu contraseña?",
                confirmation_text: "Revisa tu correo electrónico para obtener el enlace de restablecimiento de contraseña"
              },
              update_password: {
                password_label: "Nueva contraseña",
                button_label: "Actualizar contraseña",
                loading_button_label: "Actualizando contraseña...",
                confirmation_text: "Tu contraseña ha sido actualizada"
              },
              verify_otp: {
                email_input_label: "Correo electrónico",
                phone_input_label: "Número de teléfono",
                token_input_label: "Token",
                button_label: "Verificar",
                loading_button_label: "Verificando...",
              }
            }
          }}
        />
      </Card>
    </div>
  );
};

export default Auth;
