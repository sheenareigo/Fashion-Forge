

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
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 2); // Set expiration to 2 minutes from now
    setCookie('currentUser', user, { path: '/', expires: expirationDate });
    setCookie('currentUserExpires', expirationDate.toISOString(), { path: '/' });
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
