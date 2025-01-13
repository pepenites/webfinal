'use client';

import { useState } from 'react';
import VerificationModal from '../components/VerificationModal'; // Importa el componente para el modal
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    setError(''); // Limpiar errores previos

    // Validar campos
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Configuración de headers
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // Datos enviados
    const raw = JSON.stringify({ email, password });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    console.log('Datos enviados:', { email, password });

    // Comunicación con la API
    fetch('https://bildy-rpmaya.koyeb.app/api/user/register', requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || 'Error al registrar usuario.');
          });
        }
        return response.json(); // Intentamos parsear la respuesta como JSON
      })
      .then((result) => {
        console.log('Registro exitoso:', result);

        if (!result.token) {
          throw new Error('No se recibió un token de verificación.');
        }

        // Guardar token de verificación
        setVerificationToken(result.token);

        // Mostrar modal de verificación
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.error('Error al registrar el usuario:', err);
        setError(err.message || 'No se pudo registrar. Por favor, inténtalo de nuevo.');
      });
  };

  return (
    <div className="container">
      <h1>Crear Cuenta</h1>
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
      <p>
        ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
      </p>

      {isModalOpen && (
        <VerificationModal
          verificationToken={verificationToken}
          email={email}
          onClose={() => {
            setIsModalOpen(false);
            router.push('/login'); // Redirigir al login
          }}
        />
      )}
    </div>
  );
}
