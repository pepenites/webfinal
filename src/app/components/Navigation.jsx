'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div>
        <Link href="/" className="font-bold text-xl">Inicio</Link>
      </div>
      <div className="space-x-4">
        <Link href="/clients">Clientes</Link>
        <Link href="/projects">Proyectos</Link>
        <Link href="/deliverynotes">Albaranes</Link>
      </div>
    </nav>
  );
}
