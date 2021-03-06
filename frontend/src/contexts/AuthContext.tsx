import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../services/apiClient";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("Erro ao terminar sessão");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    // take something from our cookies
    const { "@nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/userinfo")
        .then((response) => {
          const { id, name, email } = response.data;

          setUser({
            id,
            name,
            email,
          });
        })
        .catch(() => {
          // If it was a problem, logoff
          signOut();
        });
    }
  }, []);
  // Sign in
  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      // console.log(response.data);
      const { id, name, token } = response.data;
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 1 mês
        path: "/", // Caminhos de acesso ao token
      });

      setUser({
        id,
        name,
        email,
      });

      // Passar o token para as próximas requisições
      api.defaults.headers[`Authorization`] = `Bearer ${token}`;

      toast.success("Login successful!");
      //  Redirecionar o utilizador para o dashboard
      Router.push("/dashboard");
    } catch (err) {
      toast.error("Login session error");
      console.log("Erro ao iniciar sessão: ", err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    toast.success("Success creating the account!");
    try {
      const response = await api.post("/users", { name, email, password });
      console.log("Success registering the user");
      Router.push("/");
    } catch (err) {
      toast.error("Error signing up");
      console.log("Error signing Up ", err);
    }
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
