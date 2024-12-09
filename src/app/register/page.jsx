'use client';

import React, { useState } from 'react';
import VerificationModal from '../components/VerificationModal';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error al registrar la cuenta');
      }

      alert('Registro exitoso. Verifica tu correo para completar el registro.');
      setIsVerificationModalOpen(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="centered-container">
      <div className="card">
        <h1>Crear Cuenta</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu correo"
          />
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
          />
          <button className="primary" onClick={handleRegister}>
            Registrar
          </button>
          <button className="back-button" onClick={() => window.history.back()}>
            Volver atrás
          </button>
        </form>
      </div>
      {isVerificationModalOpen && <VerificationModal onClose={() => setIsVerificationModalOpen(false)} />}
    </div>
  );
}
