'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>Bienvenido a Gestión de Albaranes</h1>
      <p className="subtitle">Elige una opción para comenzar</p>
      <div className="button-container">
        <Link href="/login">
          <button className="primary-button">Iniciar Sesión</button>
        </Link>
        <Link href="/register">
          <button className="secondary-button">Crear Cuenta</button>
        </Link>
      </div>
    </div>
  );
}
