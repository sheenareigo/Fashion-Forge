

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
  }, [cookies, currentUser]);

  const login = (user) => {
    setCurrentUser(user);
    setCookie('currentUser', user, { path: '/', maxAge: 30 * 24 * 60 * 60 }); // 30 days
  };

  const logout = () => {
    setCurrentUser(null);
    removeCookie('currentUser', { path: '/' });
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
