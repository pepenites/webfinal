"use client";

import { useState, useEffect } from "react";

export default function ClientsPage() {
  const [clients, setClients] = useState([]); // Lista de clientes
  const [newClient, setNewClient] = useState({
    name: "",
    cif: "",
    address: { street: "", number: "", postal: "", city: "", province: "" },
  });
  const [showNewClientForm, setShowNewClientForm] = useState(false); // Mostrar/ocultar formulario de creación
  const [editingClient, setEditingClient] = useState(null); // Cliente en edición
  const [detailsClient, setDetailsClient] = useState(null); // Cliente en detalles
  const [searchId, setSearchId] = useState(""); // Para guardar el ID ingresado
  const [searchedClient, setSearchedClient] = useState(null); // Para guardar el cliente encontrado

  // Usamos useEffect para obtener los clientes al cargar la página
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token)
          throw new Error("Token no encontrado. Inicia sesión nuevamente.");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          "https://bildy-rpmaya.koyeb.app/api/client",
          requestOptions
        );
        if (!response.ok) throw new Error("Error al obtener los clientes");

        const data = await response.json();
        console.log("Clientes obtenidos:", data); // Verificamos que los clientes tienen el campo _id
        setClients(data); // Guardamos los clientes con su _id incluido
      } catch (err) {
        console.error("Error al obtener los clientes:", err);
        alert(err.message);
      }
    };

    fetchClients();
  }, []);

  // Función para añadir un nuevo cliente
  const handleAddClient = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token)
        throw new Error("Token no encontrado. Inicia sesión nuevamente.");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify(newClient);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/client",
        requestOptions
      );
      if (!response.ok) throw new Error("Error al crear el cliente");

      const createdClient = await response.json();
      setClients([...clients, createdClient]); // Actualizamos la lista de clientes con el nuevo cliente, incluyendo su _id
      setNewClient({
        name: "",
        cif: "",
        address: { street: "", number: "", postal: "", city: "", province: "" },
      });
      setShowNewClientForm(false); // Ocultar formulario después de crear el cliente
    } catch (err) {
      console.error("Error al crear el cliente:", err);
      alert(err.message);
    }
  };

  // Función para editar un cliente
  const handleEditClient = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token)
        throw new Error("Token no encontrado. Inicia sesión nuevamente.");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify(editingClient);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/client/${editingClient._id}`, // Usamos _id del cliente para editar
        requestOptions
      );

      if (!response.ok)
        throw new Error("Error en la respuesta API al editar el cliente");

      const updatedClient = await response.json();
      setClients(
        clients.map((client) =>
          client._id === updatedClient._id ? updatedClient : client
        )
      ); // Actualizamos el cliente en la lista con el nuevo _id
      setEditingClient(null); // Ocultar formulario de edición
    } catch (err) {
      console.error("Error al editar el cliente:", err);
      alert(err.message);
    }
  };

  const handleSearchById = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token)
        throw new Error("Token no encontrado. Inicia sesión nuevamente.");

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/client/${searchId}`,
        requestOptions
      );

      if (!response.ok) {
        setSearchedClient(null); // Si no se encuentra, limpia el cliente
        throw new Error("Cliente no encontrado.");
      }

      const data = await response.json();
      setSearchedClient(data); // Guarda el cliente encontrado
    } catch (err) {
      console.error("Error al buscar cliente por ID:", err);
      alert(err.message);
    }
  };

  // Función para eliminar un cliente
  const handleDeleteClient = async (clientId) => {
    try {
      console.log("Eliminando cliente con ID:", clientId); // Verifica el _id que se está pasando para eliminar
      if (!clientId) {
        console.error("clientId es undefined o null");
        alert("El ID del cliente no está definido.");
        return;
      }

      const token = localStorage.getItem("jwt");
      if (!token)
        throw new Error("Token no encontrado. Inicia sesión nuevamente.");

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/client/${clientId}`, // Usamos _id del cliente para eliminar
        requestOptions
      );

      // Verifica si la respuesta es OK
      if (!response.ok) {
        const errorMessage = await response.text(); // Obtener el mensaje de error de la respuesta
        console.error("Error de la API:", errorMessage);
        throw new Error("Error al eliminar el cliente");
      }

      setClients(clients.filter((client) => client._id !== clientId)); // Filtramos el cliente eliminado de la lista
    } catch (err) {
      console.error("Error al eliminar el cliente:", err);
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Clientes</h1>
      {/* Barra de búsqueda por ID */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar cliente por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSearchById} className="button primary">
          Buscar
        </button>
      </div>
      {/* Mostrar cliente encontrado */}
      {searchedClient && (
        <div className="client-details">
          <h2>Cliente Encontrado</h2>
          <p>
            <strong>ID:</strong> {searchedClient._id}
          </p>
          <p>
            <strong>Nombre:</strong> {searchedClient.name}
          </p>
          <p>
            <strong>CIF:</strong> {searchedClient.cif}
          </p>
          <p>
            <strong>Dirección:</strong> {searchedClient.address.street},{" "}
            {searchedClient.address.city}
          </p>
          <button
            onClick={() => setSearchedClient(null)}
            className="button secondary"
          >
            Limpiar Búsqueda
          </button>
        </div>
      )}

      <button
        onClick={() => setShowNewClientForm(!showNewClientForm)}
        className="button primary"
      >
        {showNewClientForm ? "Cancelar" : "Crear Cliente"}
      </button>

      {showNewClientForm && (
        <div className="new-client-form">
          <h2>Crear Cliente</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={newClient.name}
            onChange={(e) =>
              setNewClient({ ...newClient, name: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="CIF"
            value={newClient.cif}
            onChange={(e) =>
              setNewClient({ ...newClient, cif: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Calle"
            value={newClient.address.street}
            onChange={(e) =>
              setNewClient({
                ...newClient,
                address: { ...newClient.address, street: e.target.value },
              })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Número"
            value={newClient.address.number}
            onChange={(e) =>
              setNewClient({
                ...newClient,
                address: { ...newClient.address, number: e.target.value },
              })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Código Postal"
            value={newClient.address.postal}
            onChange={(e) =>
              setNewClient({
                ...newClient,
                address: { ...newClient.address, postal: e.target.value },
              })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Ciudad"
            value={newClient.address.city}
            onChange={(e) =>
              setNewClient({
                ...newClient,
                address: { ...newClient.address, city: e.target.value },
              })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Provincia"
            value={newClient.address.province}
            onChange={(e) =>
              setNewClient({
                ...newClient,
                address: { ...newClient.address, province: e.target.value },
              })
            }
            className="input-field"
          />
          <button onClick={handleAddClient} className="button primary">
            Guardar Cliente
          </button>
        </div>
      )}

      {editingClient && (
        <div className="edit-client-form">
          <h2>Editar Cliente</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={editingClient.name}
            onChange={(e) =>
              setEditingClient({ ...editingClient, name: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="CIF"
            value={editingClient.cif}
            onChange={(e) =>
              setEditingClient({ ...editingClient, cif: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Calle"
            value={editingClient.address.street}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                address: { ...editingClient.address, street: e.target.value },
              })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Número"
            value={editingClient.address.number}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                address: { ...editingClient.address, number: e.target.value },
              })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Código Postal"
            value={editingClient.address.postal}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                address: { ...editingClient.address, postal: e.target.value },
              })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Ciudad"
            value={editingClient.address.city}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                address: { ...editingClient.address, city: e.target.value },
              })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Provincia"
            value={editingClient.address.province}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                address: { ...editingClient.address, province: e.target.value },
              })
            }
            className="input-field"
          />
          <button onClick={handleEditClient} className="button primary">
            Guardar Cambios
          </button>
          <button
            onClick={() => setEditingClient(null)}
            className="button secondary"
          >
            Cancelar
          </button>
        </div>
      )}

      <ul className="clients-list">
        {clients.map((client) => (
          <li key={client._id}>
            {" "}
            {/* Usamos _id en lugar de id */}
            <strong>ID:</strong> {client._id}{" "}
            {/* Mostrar el _id del cliente aquí */}
            <p>
              <strong>Nombre:</strong> {client.name}
            </p>
            <p>CIF: {client.cif}</p>
            <button
              onClick={() => setDetailsClient(client)}
              className="button secondary"
            >
              Ver Detalles
            </button>
            <button
              onClick={() => setEditingClient(client)}
              className="button primary"
            >
              Editar Cliente
            </button>
            <button
              onClick={() => handleDeleteClient(client._id)}
              className="button danger"
            >
              Eliminar Cliente
            </button>
          </li>
        ))}
      </ul>

      {detailsClient && (
        <div className="client-details">
          <h2>Detalles del Cliente</h2>
          <p>
            <strong>ID:</strong> {detailsClient._id}
          </p>
          <p>
            <strong>Nombre:</strong> {detailsClient.name}
          </p>
          <p>
            <strong>CIF:</strong> {detailsClient.cif}
          </p>
          <p>
            <strong>Calle:</strong> {detailsClient.address.street}
          </p>
          <p>
            <strong>Número:</strong> {detailsClient.address.number}
          </p>
          <p>
            <strong>Código Postal:</strong> {detailsClient.address.postal}
          </p>
          <p>
            <strong>Ciudad:</strong> {detailsClient.address.city}
          </p>
          <p>
            <strong>Provincia:</strong> {detailsClient.address.province}
          </p>
          <button
            onClick={() => setDetailsClient(null)}
            className="button secondary"
          >
            Cerrar Detalles
          </button>
        </div>
      )}
    </div>
  );
}
