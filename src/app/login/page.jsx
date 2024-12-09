'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Intentar leer la respuesta como JSON o texto
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText); // Si es JSON válido
          throw new Error(errorJson.message || 'Error desconocido');
        } catch {
          throw new Error(errorText || 'Error al iniciar sesión');
        }
      }

      const data = await response.json(); // Parsear el JSON si es exitoso
      alert('Inicio de sesión exitoso');
      localStorage.setItem('token', data.token);
      router.push('/dashboard'); // Redirigir al dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="centered-container">
      <div className="card">
        <h1>Iniciar Sesión</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="primary">Iniciar Sesión</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          ¿No tienes cuenta?{' '}
          <Link href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Crea una aquí</Link>
        </p>
        <button onClick={() => router.back()} className="back-button">Volver atrás</button>
      </div>
    </div>
  );
}
