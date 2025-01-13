'use client';

import { useState, useEffect } from 'react';

export default function ClientsPage() {
  const [clients, setClients] = useState([]); // Lista de clientes
  const [newClient, setNewClient] = useState({
    name: '',
    cif: '',
    address: { street: '', number: '', postal: '', city: '', province: '' },
  });
  const [searchId, setSearchId] = useState(''); // ID para buscar cliente
  const [searchedClient, setSearchedClient] = useState(null); // Cliente encontrado por ID
  const [editingClient, setEditingClient] = useState(null); // Cliente en edición
  const [error, setError] = useState('');

  // Obtener la lista de clientes al cargar la página
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const myHeaders = new Headers();
        const token = localStorage.getItem('jwt');
        if (token) {
          myHeaders.append('Authorization', `Bearer ${token}`);
        }

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', requestOptions);

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

  // Crear un nuevo cliente
  const handleAddClient = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const token = localStorage.getItem('jwt');
      if (token) {
        myHeaders.append('Authorization', `Bearer ${token}`);
      }

      const raw = JSON.stringify(newClient);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', requestOptions);

      if (!response.ok) {
        throw new Error('Error al crear el cliente');
      }

      const createdClient = await response.json();
      setClients([...clients, createdClient]);
      setNewClient({
        name: '',
        cif: '',
        address: { street: '', number: '', postal: '', city: '', province: '' },
      });
    } catch (err) {
      console.error('Error al crear el cliente:', err);
      setError('No se pudo crear el cliente.');
    }
  };

  // Buscar cliente por ID
  const handleSearchClient = async () => {
    try {
      const myHeaders = new Headers();
      const token = localStorage.getItem('jwt');
      if (token) {
        myHeaders.append('Authorization', `Bearer ${token}`);
      }

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${searchId}`, requestOptions);

      if (!response.ok) {
        throw new Error('Error al buscar el cliente');
      }

      const data = await response.json();
      setSearchedClient(data);
      setError('');
    } catch (err) {
      console.error('Error al buscar el cliente:', err);
      setError('No se pudo encontrar el cliente.');
    }
  };

  // Editar un cliente existente
  const handleEditClient = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const token = localStorage.getItem('jwt');
      if (token) {
        myHeaders.append('Authorization', `Bearer ${token}`);
      }

      const raw = JSON.stringify(editingClient);

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/client/${editingClient.id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error('Error al editar el cliente');
      }

      const updatedClient = await response.json();
      setClients(clients.map(client => client.id === updatedClient.id ? updatedClient : client));
      setEditingClient(null);
    } catch (err) {
      console.error('Error al editar el cliente:', err);
      setError('No se pudo editar el cliente.');
    }
  };

  // Eliminar un cliente
  const handleDeleteClient = async (clientId) => {
    try {
      const myHeaders = new Headers();
      const token = localStorage.getItem('jwt');
      if (token) {
        myHeaders.append('Authorization', `Bearer ${token}`);
      }

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/client/${clientId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error('Error al eliminar el cliente');
      }

      setClients(clients.filter(client => client.id !== clientId));
    } catch (err) {
      console.error('Error al eliminar el cliente:', err);
      setError('No se pudo eliminar el cliente.');
    }
  };

  // Configurar cliente en edición
  const startEditingClient = (client) => {
    setEditingClient({ ...client });
  };

  return (
    <div className="container">
      <h1>Gestión de Clientes</h1>

      {/* Formulario para buscar cliente */}
      <div className="search-client-form">
        <h2>Buscar Cliente</h2>
        <input
          type="text"
          placeholder="ID del Cliente"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSearchClient} className="button primary">
          Buscar Cliente
        </button>
      </div>

      {/* Mostrar cliente encontrado */}
      {searchedClient && (
        <div className="searched-client">
          <h2>Cliente Encontrado:</h2>
          <p><strong>Nombre:</strong> {searchedClient.name}</p>
          <p><strong>CIF:</strong> {searchedClient.cif}</p>
          <p>
            <strong>Dirección:</strong> {searchedClient.address.street}, {searchedClient.address.number},{' '}
            {searchedClient.address.city}, {searchedClient.address.province} ({searchedClient.address.postal})
          </p>
        </div>
      )}

      {/* Formulario para crear cliente */}
      <div className="new-client-form">
        <h2>Crear Cliente</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="CIF"
          value={newClient.cif}
          onChange={(e) => setNewClient({ ...newClient, cif: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Calle"
          value={newClient.address.street}
          onChange={(e) =>
            setNewClient({ ...newClient, address: { ...newClient.address, street: e.target.value } })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Número"
          value={newClient.address.number}
          onChange={(e) =>
            setNewClient({ ...newClient, address: { ...newClient.address, number: e.target.value } })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Código Postal"
          value={newClient.address.postal}
          onChange={(e) =>
            setNewClient({ ...newClient, address: { ...newClient.address, postal: e.target.value } })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={newClient.address.city}
          onChange={(e) =>
            setNewClient({ ...newClient, address: { ...newClient.address, city: e.target.value } })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Provincia"
          value={newClient.address.province}
          onChange={(e) =>
            setNewClient({ ...newClient, address: { ...newClient.address, province: e.target.value } })
          }
          className="input-field"
        />
        <button onClick={handleAddClient} className="button primary">
          Crear Cliente
        </button>
      </div>

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
            <button onClick={() => handleDeleteClient(client.id)} className="button danger">
              Eliminar Cliente
            </button>
          </li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
