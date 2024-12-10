'use client';

import { useState, useEffect } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', clientId: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientsAndProjects = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const [clientsRes, projectsRes] = await Promise.all([
          fetch('https://bildy-rpmaya.koyeb.app/api/client', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('https://bildy-rpmaya.koyeb.app/api/project', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!clientsRes.ok || !projectsRes.ok)
          throw new Error('Error al obtener datos.');
        const [clientsData, projectsData] = await Promise.all([
          clientsRes.json(),
          projectsRes.json(),
        ]);

        setClients(clientsData);
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClientsAndProjects();
  }, []);

  const handleAddProject = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) throw new Error('Error al agregar el proyecto.');
      const addedProject = await response.json();
      setProjects([...projects, addedProject]);
      setNewProject({ name: '', clientId: '' });
    } catch (err) {
      setError(err.message);
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
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <select
          value={newProject.clientId}
          onChange={(e) => setNewProject({ ...newProject, clientId: e.target.value })}
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
      {error && <p className="error">{error}</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
