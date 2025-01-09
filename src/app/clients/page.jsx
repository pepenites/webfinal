'use client';

import { useState, useEffect } from 'react';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    cif: '',
    address: { street: '', number: '', postal: '', city: '', province: '' },
  });
  const [error, setError] = useState('');
  const [editingClient, setEditingClient] = useState(null); // Cliente en edición

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const myHeaders = new Headers();
        const token = localStorage.getItem('jwt');
        if (token) {
          myHeaders.append("Authorization", `Bearer ${token}`);
        }

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", requestOptions);

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

  // Función para editar un cliente
  const handleEditClient = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(editingClient);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${editingClient.id}`, requestOptions);

      if (!response.ok) {
        throw new Error("Error al editar el cliente");
      }

      const updatedClient = await response.json();
      setClients(clients.map(client => client.id === updatedClient.id ? updatedClient : client)); // Actualizar estado
      setEditingClient(null); // Limpiar cliente en edición
    } catch (error) {
      console.error("Error al editar el cliente:", error);
      setError("No se pudo editar el cliente.");
    }
  };

  // Configurar cliente en edición
  const startEditingClient = (client) => {
    setEditingClient({ ...client }); // Copiar cliente actual
  };

  return (
    <div className="container">
      <h1>Gestión de Clientes</h1>

      {/* Formulario para editar cliente */}
      {editingClient && (
        <div className="edit-client-form">
          <h2>Editar Cliente</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={editingClient.name}
            onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="CIF"
            value={editingClient.cif}
            onChange={(e) => setEditingClient({ ...editingClient, cif: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Calle"
            value={editingClient.address.street}
            onChange={(e) =>
              setEditingClient({ ...editingClient, address: { ...editingClient.address, street: e.target.value } })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Número"
            value={editingClient.address.number}
            onChange={(e) =>
              setEditingClient({ ...editingClient, address: { ...editingClient.address, number: e.target.value } })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Código Postal"
            value={editingClient.address.postal}
            onChange={(e) =>
              setEditingClient({ ...editingClient, address: { ...editingClient.address, postal: e.target.value } })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Ciudad"
            value={editingClient.address.city}
            onChange={(e) =>
              setEditingClient({ ...editingClient, address: { ...editingClient.address, city: e.target.value } })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Provincia"
            value={editingClient.address.province}
            onChange={(e) =>
              setEditingClient({ ...editingClient, address: { ...editingClient.address, province: e.target.value } })
            }
            className="input-field"
          />
          <button onClick={handleEditClient} className="button primary">
            Guardar Cambios
          </button>
          <button onClick={() => setEditingClient(null)} className="button secondary">
            Cancelar
          </button>
        </div>
      )}

      {/* Lista de clientes */}
      <ul className="clients-list">
        {clients.map((client) => (
          <li key={client.id}>
            <strong>{client.name}</strong>
            <p>CIF: {client.cif}</p>
            <p>
              Dirección: {client.address.street}, {client.address.number},{' '}
              {client.address.city}, {client.address.province} ({client.address.postal})
            </p>
            <button onClick={() => startEditingClient(client)} className="button primary">
              Editar Cliente
            </button>
          </li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
