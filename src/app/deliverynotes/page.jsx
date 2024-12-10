'use client';

import { useState, useEffect } from 'react';

export default function DeliveryNotesPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Error al obtener proyectos.');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProjects();
  }, []);

  const handleDownload = () => {
    if (selectedProject) {
      alert(`Descargando albarán para el proyecto: ${selectedProject}`);
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Albaranes</h1>
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
      >
        <option value="">Selecciona un Proyecto</option>
        {projects.map((project) => (
          <option key={project.id} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>
      <button className="button" onClick={handleDownload}>
        Descargar Albarán
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
