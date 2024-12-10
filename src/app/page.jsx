'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="homepage-container">

      {/* Contenido principal */}
      <main className="main-content">
        <h2 className="welcome-title">Bienvenido</h2>
        <p className="welcome-text">Selecciona una de las opciones para gestionar tus datos:</p>

        <div className="button-container">
          <Link href="/clients" className="main-button">
            Gestión de Clientes
          </Link>
          <Link href="/projects" className="main-button">
            Gestión de Proyectos
          </Link>
          <Link href="/deliverynotes" className="main-button">
            Gestión de Albaranes
          </Link>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Pepecorporation. Todos los derechos reservados.
      </footer>
    </div>
  );
}
