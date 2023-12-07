import { OAuth2Token } from "@badgateway/oauth2-client";
import React from "react";
import { useContext, useState } from "react";

interface IAuthProvider {
  token?: OAuth2Token;
  setToken: (newToken: OAuth2Token) => void;
}

const AuthProviderContext = React.createContext<IAuthProvider>({
  token: undefined,
  setToken: (newToken: OAuth2Token) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setActiveToken] = useState<OAuth2Token>();

  const setToken = (new_token: OAuth2Token) => {
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
