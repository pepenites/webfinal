'use client';

import Link from 'next/link';
import React from 'react';
import { useUser } from './UserContext'; // Asegúrate de que la ruta sea correcta

export default function Sidebar() {
  const { user, logout } = useUser();

  return (
    <div className="sidebar">
      <Link href="/">Inicio</Link>
      <Link href="/">Inicio</Link>
      <Link href="/clients">Clientes</Link>
      <Link href="/projects">Proyectos</Link>
      <Link href="/deliverynotes">Albaranes</Link>
      {user ? (
        <div className="user-info">
          <span>Bienvenido, {user.name}</span>
          <button className="logout-button" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <Link href="/login">Iniciar Sesión</Link>
      )}
    </div>
  );
}