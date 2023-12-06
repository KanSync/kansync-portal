import React from "react";
import { useContext, useState } from "react";

interface IAuthProvider {
  token?: string;
  setToken: (newToken: string) => void;
}

const AuthProviderContext = React.createContext<IAuthProvider>({
  token: undefined,
  setToken: (newToken: string) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setActiveToken] = useState<string>();

  const setToken = (new_token: string) => {
    setActiveToken(new_token);
  };

  return (
    <AuthProviderContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

const useAuth = () => useContext(AuthProviderContext);

export { AuthProvider, useAuth };
