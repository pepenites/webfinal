'use client';

import React, { useState } from 'react';

export default function VerificationModal({ verificationToken, email, onClose }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    try {
      setError(null);

      // Validar si el token de verificación está disponible
      if (!verificationToken) {
        throw new Error('Token de verificación no encontrado. Intente iniciar sesión nuevamente.');
      }

      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/validation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${verificationToken}`,
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al verificar el código');
      }

      alert('Cuenta verificada exitosamente. Por favor, inicia sesión.');
      onClose();
      window.location.href = '/login';
    } catch (err) {
      setError(err.message);
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
