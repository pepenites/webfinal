'use client';

import { useState, useEffect } from 'react';

export default function DeliveryNotesPage() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setError('Token no encontrado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/deliverynote', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los albaranes');
        }

        const data = await response.json();
        setNotes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los albaranes:', error);
        setError('No se pudieron cargar los albaranes.');
        setLoading(false);
      }
    };

    fetchDeliveryNotes();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h1>Albaranes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.name}</li>
        ))}
      </ul>
    </div>
  );
}
