'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import DownloadButton from '@/components/DownloadButton';

export default function DeliveryNotesPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <main className="p-4">
          <h2 className="text-2xl font-bold mb-4">Gestión de Albaranes</h2>
          <p>Aquí puedes descargar y gestionar los albaranes.</p>
          <DownloadButton />
        </main>
        <Footer />
      </div>
    </div>
  );
}
