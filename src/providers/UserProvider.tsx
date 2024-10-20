import { createContext, useState, useEffect, ReactNode, useRef } from "react";
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
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getEncodedToken();
      if (token) {
        const decodedUser = decodeJwt(token);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedUser.exp < currentTime) {
          // Token wygasł
          setUserToContext(null);
          signOut();
        } else {
          setUserToContext(decodedUser);
          // Ustaw timer
          const timeUntilExpiration = (decodedUser.exp - currentTime) * 1000;
          logoutTimerRef.current = setTimeout(() => {
            

            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('rightbar', 'user');
            window.history.pushState({}, '', currentUrl);
            
            setUserToContext(null);
            signOut();
          }, timeUntilExpiration);
        }
      } else {
        setUserToContext(null);
      }
    };

    initializeAuth();

    // Sprzątanie przy odmontowaniu komponentu
    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, []);

  const updateUserContext: React.Dispatch<React.SetStateAction<User | null>> = (value) => {
    // Aktualizujemy stan użytkownika
    setUserToContext(value);

    // Ustalamy nową wartość użytkownika
    const newUser = typeof value === 'function' ? value(user) : value;

    // Czyścimy poprzedni timer
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }

    // Jeśli newUser nie jest null, ustawiamy nowy timer
    if (newUser) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiration = (newUser.exp - currentTime) * 1000;
      logoutTimerRef.current = setTimeout(() => {
        
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('rightbar', 'user');
        window.history.pushState({}, '', currentUrl);

        setUserToContext(null);
        signOut();
      }, timeUntilExpiration);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUserToContext: updateUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
