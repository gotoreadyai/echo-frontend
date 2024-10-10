import { createContext, useState, useEffect, ReactNode } from "react";
import { getEncodedToken, signOut } from "../services/authServices";
import { decodeJwt } from "../utils/auth";

interface User {
  id: string;
  email: string;
  role: string;
  exp: number;
}

interface UserContextType {
  user: User | null;
  setUserToContext: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultUserContext: UserContextType = {
  user: null,
  setUserToContext: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserToContext] = useState<User | null>(null);

  useEffect(() => {
    const token = getEncodedToken();
    if (token) {
      const decodedUser = decodeJwt(token);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedUser.exp < currentTime) {
        alert("Token wygasł. Proszę zaloguj się ponownie.");
        setUserToContext(null);
        signOut()
      } else {
        setUserToContext(decodedUser);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserToContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
