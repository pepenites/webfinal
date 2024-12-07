'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('https://bildy-rpmaya.koyeb.app/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('jwt');
        router.push('/login');
      });
  }, [router]);

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <nav>
        <a href="/clients">Clientes</a>
        <br />
        <a href="/projects">Proyectos</a>
        <br />
        <a href="/deliverynotes">Albaranes</a>
      </nav>
    </div>
  );
}
