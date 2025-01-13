'use client';

import React from 'react';
import { useUser } from './UserContext'; // Asegúrate de que la ruta sea correcta

export default function Sidebar() {
  const { user, logout } = useUser();

  return (
    <div className="sidebar">
      <a href="/">Inicio</a>
      <a href="/clients">Clientes</a>
      <a href="/projects">Proyectos</a>
      <a href="/deliverynotes">Albaranes</a>
      {user ? (
        <div className="user-info">
          <span>Bienvenido, {user.name}</span>
          <button className="logout-button" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <a href="/login">Iniciar Sesión</a>
      )}
    </div>
  );
}
