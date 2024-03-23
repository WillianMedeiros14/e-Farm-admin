"use client";
import { queryClient } from "@/app/providers";
import { TypeSignIn } from "@/components/organism/modal-login";
import { useToast } from "@/components/ui/use-toast";
import { getUserDetailsService } from "@/services/getUserDetails.service";
import { signInService } from "@/services/signIn.service";

import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, createContext, useEffect } from "react";

interface AuthContextData {
  SignIn: (credentials: TypeSignIn) => void;
  SignOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);
export let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const { toast } = useToast();
  const { replace } = useRouter();

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signIn":
          window.location.href = "/products";

          break;
        case "signOut":
          destroyCookie(undefined, "user", { path: "/" });
          window.location.href = "/";
          replace("/");
          break;
        default:
          break;
      }
    };
  }, [replace]);

  async function SignIn({ email, password }: TypeSignIn) {
    try {
      const result = await signInService({
        email,
        password,
      });

      const userId = result.user.uid;

      const dataUser = await getUserDetailsService({
        userId: userId,
      });

      if (dataUser?.type === "admin") {
        setCookie(undefined, "user", userId, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });

        authChannel.postMessage("signIn");

        window.location.href = "/products";

        toast({
          description: "Sign-in realizado com sucesso.",
          className: "bg-green-600 text-white",
        });
      } else {
        toast({
          description: "Credenciais inválidas!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "Credenciais inválidas!",
        variant: "destructive",
      });
    }
  }

  async function SignOut() {
    queryClient.clear();
    toast({
      description: "Vicê foi deslogado",
      className: "bg-green-600 text-white",
    });

    destroyCookie(undefined, "user", { path: "/" });

    replace("/");
    authChannel.postMessage("signOut");
  }

  return (
    <AuthContext.Provider value={{ SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
}
