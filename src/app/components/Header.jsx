'use client';

import React from 'react';
import { useUser } from './UserContext';

export default function Header() {
  const { user, logout } = useUser();

  return (
    <header className="header">
      <h1>Gestión de Albaranes</h1>
      {user ? (
        <div className="user-info">
          <span>Bienvenido Usuario {user.name}</span>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <a href="/login">Iniciar Sesión</a>
      )}
    </header>
  );
}
