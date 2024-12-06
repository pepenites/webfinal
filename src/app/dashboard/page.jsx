'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      window.location.href = '/login';
    } else {
      // Simulación de llamada para obtener datos del usuario
      fetch('https://bildy-rpmaya.koyeb.app/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem('jwt');
          window.location.href = '/login';
        });
    }
  }, []);

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Bienvenido, {user.name}</h1>
      <p>Selecciona una sección del menú:</p>
      <ul className="mt-4">
        <li>
          <a href="/clients" className="text-blue-500 hover:underline">
            Gestión de Clientes
          </a>
        </li>
        <li>
          <a href="/projects" className="text-blue-500 hover:underline">
            Gestión de Proyectos
          </a>
        </li>
        <li>
          <a href="/deliverynotes" className="text-blue-500 hover:underline">
            Gestión de Albaranes
          </a>
        </li>
      </ul>
    </div>
  );
}
