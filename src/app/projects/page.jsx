"use client";

import { useState, useEffect } from "react";


export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    projectCode: "",
    email: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
    code: "",
    clientId: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [searchId, setSearchId] = useState(""); // Para búsqueda por ID


  
  useEffect(() => {
    const fetchClientsAndProjects = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const myHeaders = new Headers();
        if (token) {
          myHeaders.append("Authorization", `Bearer ${token}`);
        }

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const [clientsRes, projectsRes] = await Promise.all([
          fetch("https://bildy-rpmaya.koyeb.app/api/client", requestOptions),
          fetch("https://bildy-rpmaya.koyeb.app/api/project", requestOptions),
        ]);

        if (!clientsRes.ok || !projectsRes.ok) {
          throw new Error("Error al obtener datos.");
        }

        const [clientsData, projectsData] = await Promise.all([
          clientsRes.json(),
          projectsRes.json(),
        ]);

        setClients(clientsData);
        setProjects(projectsData);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    fetchClientsAndProjects();
  }, []);


  const handleAddProject = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      // const raw = JSON.stringify(newProject);
      const raw = JSON.stringify({
        "name": newProject.name,
        "projectCode": newProject.projectCode,
        "email": newProject.email,
        "address": {
          "street": newProject.street,
          "number": newProject.number,
          "postal": newProject.postal,
          "city": newProject.city,
          "province": newProject.province
        },
        "code": newProject.code,
        "clientId": newProject.clientId
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/project",
        requestOptions
      );

      if (!response.ok) throw new Error("Error en la respuesta API al agregar el proyecto.");
      const addedProject = await response.json();
      setProjects([...projects, addedProject]);
    } catch (err) {
      console.error("Error al agregar proyecto:", err);
    }
  };

  const handleEditProject = async () => {
    // Validar que editingProject y su ID sean válidos
    if (!editingProject || !editingProject._id) {
      console.error("No hay proyecto válido seleccionado para editar.");
      return;
    }
  
    try {
      const token = localStorage.getItem("jwt");
  
      // Verificar que el token esté disponible
      if (!token) {
        console.error("No se encontró el token de autenticación.");
        return;
      }
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      // Crear el cuerpo de la solicitud con validaciones para address
      const raw = JSON.stringify({
        name: editingProject.name || "",
        code: editingProject.code || "",
        projectCode: editingProject.projectCode || "",
        email: editingProject.email || "",
        clientId: editingProject.clientId || "",
        address: {
          street: editingProject.address?.street || "",
          number: editingProject.address?.number || "",
          postal: editingProject.address?.postal || "",
          city: editingProject.address?.city || "",
          province: editingProject.address?.province || "",
        },
        notes: editingProject.notes || "",
      });
  
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      console.log("Enviando datos para editar el proyecto:", raw);
  
      // Realizar la solicitud a la API
      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/project/${editingProject._id}`,
        requestOptions
      );
  
      // Manejar errores de respuesta
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Error en la respuesta de la API: ${response.status} - ${errorDetails}`
        );
      }
  
      const updatedProject = await response.json();
      console.log("Proyecto actualizado exitosamente:", updatedProject);
  
      // Actualizar el estado de los proyectos en el frontend
      setProjects(
        projects.map((project) =>
          project._id === updatedProject._id ? updatedProject : project
        )
      );
  
      setEditingProject(null); // Salir del modo de edición
    } catch (error) {
      console.error("Error al editar proyecto:", error);
    }
  };
  
  
  
  
  const handleDeleteProject = async (projectId) => {
    if (!projectId) {
      console.error("No se proporcionó un ID de proyecto válido.");
      return;
    }
  
    try {
      const token = localStorage.getItem("jwt");
  
      if (!token) {
        alert("No se encontró el token de autenticación.");
        return;
      }
  
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/project/${projectId}`,
        {
          method: "DELETE",
          headers: myHeaders,
        }
      );
  
      if (!response.ok) {
        throw new Error(
          `Error al eliminar el proyecto: ${response.status} - ${response.statusText}`
        );
      }
  
      // Filtrar el proyecto eliminado de la lista
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
  
      alert("Proyecto eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
      alert("Hubo un error al intentar eliminar el proyecto.");
    }
  };
  
  
  
  
  
  

  const handleSearchProject = () => {
    const foundProject = projects.find((project) => project.id === searchId);
    if (foundProject) {
      alert(`Proyecto encontrado: ${foundProject.name}`);
    } else {
      alert("Proyecto no encontrado.");
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Proyectos</h1>

      <div>
        <h2>Añadir Proyecto</h2>
        <input
          type="text"
          placeholder="Nombre del Proyecto"
          value={newProject.name}
          onChange={(e) =>
            setNewProject({ ...newProject, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Código del Proyecto"
          value={newProject.projectCode}
          onChange={(e) =>
            setNewProject({ ...newProject, projectCode: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newProject.email}
          onChange={(e) =>
            setNewProject({ ...newProject, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Calle"
          value={newProject.address.street}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              address: { ...newProject.address, street: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="Número"
          value={newProject.address.number}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              address: { ...newProject.address, number: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="Código Postal"
          value={newProject.address.postal}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              address: { ...newProject.address, postal: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={newProject.address.city}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              address: { ...newProject.address, city: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="Provincia"
          value={newProject.address.province}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              address: { ...newProject.address, province: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="Código Interno"
          value={newProject.code}
          onChange={(e) =>
            setNewProject({ ...newProject, code: e.target.value })
          }
        />
        <select
          value={newProject.clientId}
          onChange={(e) =>
            setNewProject({ ...newProject, clientId: e.target.value })
          }
        >
          <option value="">Selecciona un Cliente</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
        <button className="button" onClick={handleAddProject}>
          Guardar Proyecto
        </button>
      </div>

      {editingProject && (
        <div>
          <h2>Editar Proyecto</h2>
          <input
            type="text"
            placeholder="Nombre del Proyecto"
            value={editingProject.name}
            onChange={(e) =>
              setEditingProject({ ...editingProject, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Código del Proyecto"
            value={editingProject.projectCode}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                projectCode: e.target.value,
              })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={editingProject.email}
            onChange={(e) =>
              setEditingProject({ ...editingProject, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Calle"
            value={editingProject.address.street}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                address: { ...editingProject.address, street: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Número"
            value={editingProject.address.number}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                address: { ...editingProject.address, number: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Código Postal"
            value={editingProject.address.postal}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                address: { ...editingProject.address, postal: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Ciudad"
            value={editingProject.address.city}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                address: { ...editingProject.address, city: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Provincia"
            value={editingProject.address.province}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                address: {
                  ...editingProject.address,
                  province: e.target.value,
                },
              })
            }
          />
          <button className="button" onClick={handleEditProject}>
            Guardar Cambios
          </button>
        </div>
      )}

      <div>
        <h2>Búsqueda de Proyecto por ID</h2>
        <input
          type="text"
          placeholder="ID del Proyecto"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearchProject}>Buscar</button>
      </div>

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <span>{project.name}</span>
            <button onClick={() => setEditingProject(project)}>Editar</button>
            <button onClick={() => handleDeleteProject(project.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}