import React, { useState } from 'react';

export default function VerificationModal({ onClose }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/authorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error al validar el código');
      }

      alert('Cuenta validada exitosamente. Por favor, inicia sesión.');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Verificar Código</h2>
        <p>Introduce el código enviado a tu correo electrónico para completar el registro.</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleVerifyCode}>
          <input
            type="text"
            name="verificationCode"
            placeholder="Código de Verificación"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button type="submit" className="primary">
            Verificar
          </button>
        </form>
      </div>
    </div>
  );
}
