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
          Welcome Back
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
        />
      </Card>
    </div>
  );
};

export default Auth;