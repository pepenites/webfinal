'use client';

import Header from '../components/Header'; // Ruta corregida
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function ClientsPage() {
  return (
    <div className="clients-page">
      <Header />
      <div className="content">
        <Sidebar />
        <main className="main-content">
          <h1>Gestión de Clientes</h1>
          <p>Aquí puedes gestionar tus clientes.</p>
        </main>
      </div>
      <Footer />
    </div>
  );
}
