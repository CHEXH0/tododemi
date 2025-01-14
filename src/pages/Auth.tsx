import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
      if (event === "USER_UPDATED" || event === "SIGNED_OUT") {
        setErrorMessage("");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const handleAuthError = () => {
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error instanceof AuthApiError) {
          switch (error.message) {
            case "Invalid login credentials":
              setErrorMessage("The email or password you entered is incorrect. Please try again.");
              break;
            case "User already registered":
              setErrorMessage("This email is already registered. Please try logging in instead.");
              break;
            case "Email signups are disabled":
            case "Email logins are disabled":
              setErrorMessage("Email authentication is currently disabled. Please contact the administrator.");
              break;
            default:
              if (error.message.includes("invalid_credentials")) {
                setErrorMessage("The email or password you entered is incorrect. Please try again.");
              } else if (error.message.includes("email_provider_disabled")) {
                setErrorMessage("Email authentication is currently disabled. Please contact the administrator.");
              } else {
                setErrorMessage(error.message);
              }
          }
        }
      });
    };

    handleAuthError();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Sign in to create and share your story!
          </p>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#6366f1',
                    brandAccent: '#4f46e5',
                  },
                },
              },
            }}
            providers={[]}
          />
        </Card>
      </div>
    </div>
  );
};

export default Auth;