'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function ProjectDetails({ params: { id } }) {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Configuración de headers
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

        // Comunicación con la API
        const response = await fetch(
          `https://bildy-rpmaya.koyeb.app/api/project/${id}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error('Error al obtener el proyecto');
        }

        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error('Error al obtener el proyecto:', err);
        setError('No se pudo cargar el proyecto.');
      }
    };

    fetchProject();
  }, [id]);

  if (!project && !error) return <p>Cargando...</p>;

  return (
    <div className="main-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <button className="back-button" onClick={() => router.push('/projects')}>
          Volver
        </button>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </>
        )}
      </div>
    </div>
  );
}
