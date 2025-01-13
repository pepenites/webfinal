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
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('jwt') || '';
      setToken(storedToken);

      // Decodificar el token para obtener información del usuario
      if (storedToken) {
        try {
          const payload = JSON.parse(atob(storedToken.split('.')[1])); // Decodificar el payload del JWT
          setUser({ email: payload.email }); // Suponiendo que el correo está en el token
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          setUser(null); // Limpia el estado si el token no es válido
        }
      }
    }
  }, []);

  const login = (newToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', newToken);
      setToken(newToken);

      // Decodificar el token para establecer el usuario
      try {
        const payload = JSON.parse(atob(newToken.split('.')[1]));
        setUser({ email: payload.email });
      } catch (error) {
        console.error('Error al decodificar el token después del login:', error);
        setUser(null);
      }
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
    <UserContext.Provider value={{ token, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}