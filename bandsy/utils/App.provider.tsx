import React from 'react';
import { createContext } from 'react';

type AppContextType = {
  sessionToken: string;
  isLoggedIn: boolean;
  toggleLogin: () => void;
  setSessionToken: React.Dispatch<React.SetStateAction<string>>;
  // setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextType>({
  sessionToken: 'no',
  isLoggedIn: false,
  toggleLogin: () => {},
  setSessionToken: () => {},
  // setIsLoggedIn: () => {},
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [sessionToken, setSessionToken] = React.useState('');

  const toggleLogin = React.useCallback(() => {
    setIsLoggedIn(current => {
      if (current) {
        return false;
      } else {
        return true;
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ isLoggedIn, toggleLogin, sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
