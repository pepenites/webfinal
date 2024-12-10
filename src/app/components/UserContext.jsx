'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Solo accede a localStorage en el cliente
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('jwt') || '';
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('jwt', newToken);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('jwt');
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
