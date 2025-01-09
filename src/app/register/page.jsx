'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState(''); // Correo electrónico
  const [password, setPassword] = useState(''); // Contraseña
  const [name, setName] = useState(''); // Nombre completo
  const [error, setError] = useState(''); // Mensaje de error
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // Configuración de headers
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Datos dinámicos del formulario
      const raw = JSON.stringify({
        email: email,
        password: password,
        name: name,
      });

      // Opciones de la solicitud
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // Comunicación con la API
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/register", requestOptions);

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      // Si el registro es exitoso, redirigir a la página de inicio de sesión
      router.push('/login');
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
      setError('No se pudo registrar. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <h1>Crear Cuenta</h1>
      <input
        type="text"
        placeholder="Nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
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
      <button onClick={handleRegister} className="button primary">
        Registrarse
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
