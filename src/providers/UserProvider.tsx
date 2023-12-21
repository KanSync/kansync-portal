import React from "react";
import { useContext, useState } from "react";

interface IUser {
  nickname?: string;
}

interface IUserProvider {
  user: IUser;
  setNickname: (nickname: string) => void;
}

const UserProviderContext = React.createContext<IUserProvider>({
  user: {},
  setNickname: () => {
    throw new Error(`[UserProvider] setNickname() not implemented`);
  },
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({});

  const setNickname = (nickname: string) => {
    setUser({
      nickname: nickname,
    });
  };

  return (
    <UserProviderContext.Provider
      value={{
        user,
        setNickname,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};

const useUser = () => useContext(UserProviderContext);

export { UserProvider, useUser };
