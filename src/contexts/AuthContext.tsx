import { createContext, ReactNode, useEffect, useState } from "react";

import { parseCookies, destroyCookie, setCookie } from "nookies";

import { login } from "../services/auth.service";
import { verifyToken } from "../services/auth.service";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signInByEmail: (email: string, password: string) => Promise<boolean>;
  signOutData: () => Promise<void>;
  user: ReadUsersDto | undefined;
  isAuthenticated: boolean;
  controllerAtt: boolean;
  setControllerAtt: (value: boolean) => void;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export async function signOutData() {
  destroyCookie(undefined, "auth.token", {
    path: "/",
  });
  window.location.href = "/";
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ReadUsersDto>();
  const [controllerAtt, setControllerAtt] = useState(false);

  const isAuthenticated = !!user;

  const getUserInfos = async () => {
    const { "auth.token": token } = parseCookies();

    if (token) {
      try {
        const response: ReadUsersDto | undefined = await verifyToken();

        if (response) {
          const { uuid, name, email, createdAt, updatedAt } = response;

          setUser({ uuid, name, email, createdAt, updatedAt });
        }
      } catch (error) {
        signOutData();
      }
    }
  };

  async function signInByEmail(
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const response: VerifyAuthDto | undefined = await login({
        email: email,
        password: password,
      });

      if (!response) return false;

      const { accessToken, userData } = response;

      setCookie(undefined, "auth.token", accessToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      if (userData) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOutData();
          break;

        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInByEmail,
        signOutData,
        isAuthenticated,
        user,
        controllerAtt,
        setControllerAtt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
