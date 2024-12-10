'use client';
import React, { useState, useEffect } from 'react';

export default function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch('/api/client', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Error al cargar clientes');
        const data = await response.json();
        setClients(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, clientId }),
      });
      if (!response.ok) throw new Error('Error al crear el proyecto');
      setSuccess('Proyecto creado con éxito');
      setError('');
    } catch (err) {
      setError('Error: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <div className="centered-container">
      <form className="card" onSubmit={handleCreateProject}>
        <h1>Crear Proyecto</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <label>Nombre del Proyecto:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label>Cliente:</label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
        >
          <option value="">Seleccionar Cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <button type="submit" className="button-primary">Crear Proyecto</button>
      </form>
    </div>
  );
}
