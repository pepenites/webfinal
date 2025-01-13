'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Configuración de headers
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Datos dinámicos del formulario
      const raw = JSON.stringify({
        email: email,
        password: password,
      });

      // Opciones de la solicitud
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // Comunicación con la API
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/login", requestOptions);

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const result = await response.json();
      localStorage.setItem('jwt', result.token);
      router.push('/');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="button primary">
        Iniciar Sesión
      </button>
      {error && <p className="error">{error}</p>}
      <p>
        ¿No tienes cuenta? <a href="/register">Crear una cuenta</a>
      </p>
    </div>
  );
}
