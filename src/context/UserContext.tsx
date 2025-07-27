import { UserInfo } from "@vkontakte/vk-bridge";
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface UserContext {
  user: UserInfo | undefined;
  setUser: (user: UserInfo) => void;
}

const UserContext = createContext<UserContext | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
