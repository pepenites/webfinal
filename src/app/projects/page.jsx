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

      const raw = JSON.stringify(newProject);

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

      if (!response.ok) throw new Error("Error al agregar el proyecto.");
      const addedProject = await response.json();
      setProjects([...projects, addedProject]);
      setNewProject({
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
    } catch (err) {
      console.error("Error al agregar proyecto:", err);
    }
  };

  const handleEditProject = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify(editingProject);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/project/${editingProject.id}`,
        requestOptions
      );

      if (!response.ok) throw new Error("Error al editar el proyecto.");

      const updatedProject = await response.json();
      setProjects(
        projects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        )
      );
      setEditingProject(null);
    } catch (err) {
      console.error("Error al editar proyecto:", err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("jwt");
      const myHeaders = new Headers();
      if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
      }

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/project/${projectId}`,
        requestOptions
      );

      if (!response.ok) throw new Error("Error al eliminar el proyecto.");

      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (err) {
      console.error("Error al eliminar proyecto:", err);
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
            <option key={client.id} value={client.id}>
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
          <input
            type="text"
            placeholder="Notas"
            value={editingProject.notes}
            onChange={(e) =>
              setEditingProject({ ...editingProject, notes: e.target.value })
            }
          />
          <button className="button" onClick={handleEditProject}>
            Guardar Cambios
          </button>
        </div>
      )}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
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
