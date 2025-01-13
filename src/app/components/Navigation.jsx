'use client';

import Link from 'next/link';
import { useUser } from './UserContext';

export default function Navigation() {
  const { user, logout } = useUser();

  return (
    <nav className="navigation">
      <div className="nav-left">
        {user ? (
          <>
            <span className="welcome-text">Bienvenido, {user.email}</span>
            {/* Mostramos el correo del usuario autenticado */}
            <button className="logout-button" onClick={logout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link href="/login" className="login-button">
            Iniciar Sesión
          </Link>
        )}
      </div>
      <ul className="nav-links">
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/clients">Clientes</Link></li>
        <li><Link href="/projects">Proyectos</Link></li>
        <li><Link href="/deliverynotes">Albaranes</Link></li>
      </ul>
    </nav>
  );
}