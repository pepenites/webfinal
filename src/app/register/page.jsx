'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      alert('Registro exitoso. Por favor verifica tu correo.');
      window.location.href = '/login'; // Redirigir al login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium">Correo Electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
      <button
        onClick={handleRegister}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Crear Cuenta
      </button>
    </div>
  );
}
