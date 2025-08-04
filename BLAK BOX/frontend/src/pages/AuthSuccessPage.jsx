// src/pages/AuthSuccessPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get('token');

    if (token) {
      // 1) Guardar el token
      localStorage.setItem('token', token);
      // 2) Ir a la página de usuario
      navigate('/homeUser');
    } else {
      // Si algo falla, volver al login
      navigate('/login');
    }
  }, [navigate]);

  return <p>Logging you in…</p>;
}
