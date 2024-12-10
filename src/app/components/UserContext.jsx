'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Asegúrate de que estás en el cliente antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('jwt') || '';
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', newToken);
      setToken(newToken);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      setToken('');
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ token, user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
