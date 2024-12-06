'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await response.json();
      alert('Inicio de sesión exitoso');
      localStorage.setItem('jwt', data.token); // Guardar token en localStorage
      window.location.href = '/dashboard'; // Redirigir al dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
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
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Iniciar Sesión
      </button>
    </div>
  );
}
