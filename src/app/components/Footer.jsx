'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Gestión de Albaranes. Todos los derechos reservados.</p>
    </footer>
  );
}
