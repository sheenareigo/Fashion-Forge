import React, { createContext, useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);

  useEffect(() => {
    if (cookies.currentUser && !currentUser) {
      setCurrentUser(cookies.currentUser);
    }
  }, [cookies.currentUser, currentUser]);

  const logout = () => {
    setCurrentUser(null);
    removeCookie('currentUser', { path: '/' });
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
