import { createContext, useState, useContext } from "react";

// 1. Create Context
const UserContext = createContext();

// 2. Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook for ease of use
export const useUser = () => useContext(UserContext);
