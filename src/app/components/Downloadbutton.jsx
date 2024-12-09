'use client';

export default function DownloadButton() {
  const handleDownload = () => {
    // Aquí debes implementar la lógica de descarga
    alert('Descargando albarán...');
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
    >
      Descargar Albarán
    </button>
  );
}
