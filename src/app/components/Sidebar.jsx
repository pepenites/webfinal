'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="bg-gray-200 p-4 w-60 h-full">
      <nav>
        <ul className="space-y-4">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/clients">Clientes</Link></li>
          <li><Link href="/projects">Proyectos</Link></li>
          <li><Link href="/deliverynotes">Albaranes</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
