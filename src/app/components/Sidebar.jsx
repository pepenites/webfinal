import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="horizontal-navbar">
      <ul className="nav-links">
        <li>
          <Link href="/" className="nav-link">
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/clients" className="nav-link">
            Clientes
          </Link>
        </li>
        <li>
          <Link href="/projects" className="nav-link">
            Proyectos
          </Link>
        </li>
        <li>
          <Link href="/deliverynotes" className="nav-link">
            Albaranes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
