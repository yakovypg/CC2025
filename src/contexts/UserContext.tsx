import { UserInfo } from "@vkontakte/vk-bridge";
import { Context, FC, ReactNode, createContext, useContext, useState } from "react";

export interface UserContext {
  user: UserInfo | undefined;
  setUser: (user: UserInfo) => void;
}

const userContext: Context<UserContext | undefined> = createContext<UserContext | undefined>(
  undefined
);

export interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
};

export const useUser = (): UserContext => {
  const context: UserContext | undefined = useContext(userContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
