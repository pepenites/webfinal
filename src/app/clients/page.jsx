'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');
  const [newClient, setNewClient] = useState({
    name: '',
    address: '',
    cif: '',
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch('/api/client', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Error al obtener los clientes');
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        console.error('Error al obtener los clientes:', err);
        setError('Error al obtener los clientes.');
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = async () => {
    if (!newClient.name || !newClient.address) {
      setError('El nombre y la dirección son obligatorios.');
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) {
        throw new Error('Error al crear el cliente');
      }

      const createdClient = await response.json();
      setClients([...clients, createdClient]);
      setNewClient({ name: '', address: '', cif: '' });
      setError('');
    } catch (err) {
      console.error('Error al crear el cliente:', err);
      setError('No se pudo crear el cliente.');
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Clientes</h1>

      <div className="new-client-form">
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={newClient.name}
          onChange={(e) =>
            setNewClient({ ...newClient, name: e.target.value })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Dirección del cliente"
          value={newClient.address}
          onChange={(e) =>
            setNewClient({ ...newClient, address: e.target.value })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="CIF o Documento de Identidad (opcional)"
          value={newClient.cif}
          onChange={(e) =>
            setNewClient({ ...newClient, cif: e.target.value })
          }
          className="input-field"
        />
        <button onClick={handleAddClient} className="button primary">
          Añadir Cliente
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <ul className="clients-list">
        {clients.map((client) => (
          <li key={client.id}>
            <p>
              <strong>Nombre:</strong> {client.name}
            </p>
            <p>
              <strong>Dirección:</strong> {client.address}
            </p>
            <p>
              <strong>CIF/ID:</strong> {client.cif || 'No proporcionado'}
            </p>
          </li>
        ))}
      </ul>

      <div className="button-container">
        <Link href="/" className="button secondary">
          Volver
        </Link>
      </div>
    </div>
  );
}
