'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      if (!response.ok) throw new Error('Error al registrar el usuario');
      router.push('/login'); // Redirigir al inicio de sesión
    } catch (err) {
      setError('Error al registrar: ' + err.message);
    }
  };

  return (
    <div className="centered-container">
      <form className="card" onSubmit={handleRegister}>
        <h1>Registro</h1>
        {error && <p className="error">{error}</p>}
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button-primary">Registrar</button>
      </form>
    </div>
  );
}
