'use client';

import React, { useState, useEffect } from "react";

export default function DeliveryNotesPage({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState("");

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value); // Cambiar el estado con el proyecto seleccionado
  };

  const handleDownload = async () => {
    if (!selectedProject) {
      alert("Por favor, selecciona un proyecto antes de descargar el albarán.");
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

      // Realizar la solicitud al endpoint de descarga del albarán
      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${selectedProject}`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error al descargar el albarán: ${response.status} - ${response.statusText}`
        );
      }

      // Convertir la respuesta en un blob
      const blob = await response.blob();

      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `albaran-${selectedProject}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      alert("Descarga completada.");
    } catch (error) {
      console.error("Error al descargar el albarán:", error);
      alert("Hubo un error al intentar descargar el albarán.");
    }
  };

  useEffect(() => {
    console.log("Proyectos recibidos:", projects); // Depuración para verificar proyectos
  }, [projects]);

  return (
    <div className="container">
      <h1>Gestión de Albaranes</h1>
      {projects && projects.length > 0 ? (
        <>
          <select
            value={selectedProject}
            onChange={handleSelectChange}
            className="p-2 border rounded mb-4"
          >
            <option value="" disabled>
              Selecciona un proyecto
            </option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleDownload}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Descargar Albarán
          </button>
        </>
      ) : (
        <p>No hay proyectos disponibles para mostrar.</p>
      )}
    </div>
  );
}
