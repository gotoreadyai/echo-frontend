/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";

interface UserContextType {
  user: any; // Zmień 'any' na bardziej konkretny typ w zależności od struktury danych użytkownika
  setUserToContext: React.Dispatch<React.SetStateAction<any>>;
}
const defaultUserContext: UserContextType = {
  user: null,
  setUserToContext: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserToContext] = useState<any>(null); 

  return (
    <UserContext.Provider value={{ user, setUserToContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
