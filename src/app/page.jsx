'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Gestión de Albaranes</h1>
      <nav>
        <Link href="/login">Iniciar Sesión</Link>
        <br />
        <Link href="/register">Crear Cuenta</Link>
      </nav>
    </div>
  );
}
