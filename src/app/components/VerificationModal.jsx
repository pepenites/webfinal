'use client';

import React, { useState } from 'react';

export default function ValidationModal({ verificationToken, email, onClose }) {
  const [code, setCode] = useState(''); // Código ingresado por el usuario
  const [error, setError] = useState(null); // Mensajes de error

  const handleVerify = async () => {
    try {
      setError(null); // Limpia errores previos

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${verificationToken}`);
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({ code });

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/validation', requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al verificar el código');
      }

      alert('Cuenta verificada exitosamente. Por favor, inicia sesión.');
      onClose(); // Cierra el modal
      window.location.href = '/login'; // Redirige al login
    } catch (err) {
      setError(err.message); // Muestra el error al usuario
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Verificar Código</h2>
        <p>
          Introduce el código enviado al correo electrónico: <strong>{email}</strong>
        </p>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de verificación"
        />
        <button className="primary" onClick={handleVerify}>
          Verificar
        </button>
      </div>
    </div>
  );
}
