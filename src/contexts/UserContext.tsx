import { UserInfo } from "@vkontakte/vk-bridge";
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface UserContext {
  user: UserInfo | undefined;
  setUser: (user: UserInfo) => void;
}

const userContext = createContext<UserContext | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
};

export const useUser = () => {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
