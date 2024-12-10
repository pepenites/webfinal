'use client';

import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch('/api/client', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener los clientes.');
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
        setError('No se pudieron cargar los clientes.');
      }
    };
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newClient),
      });
      if (!response.ok) {
        throw new Error('Error al agregar el cliente.');
      }
      const createdClient = await response.json();
      setClients([...clients, createdClient]);
      setNewClient({ name: '', email: '', phone: '', address: '' });
      setSuccess('Cliente agregado exitosamente.');
      setError('');
    } catch (error) {
      console.error('Error al agregar el cliente:', error);
      setError('No se pudo agregar el cliente.');
      setSuccess('');
    }
  };

  return (
    <>
      <Navigation />
      <main className="page-content">
        <h1>Clientes</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="client-form">
          <h2>Agregar Cliente</h2>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={newClient.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newClient.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={newClient.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={newClient.address}
            onChange={handleInputChange}
          />
          <button onClick={handleAddClient}>Guardar Cliente</button>
        </div>
        <ul className="client-list">
          {clients.map((client) => (
            <li key={client.id}>
              <h3>{client.name}</h3>
              <p>Email: {client.email}</p>
              <p>Teléfono: {client.phone}</p>
              <p>Dirección: {client.address}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
