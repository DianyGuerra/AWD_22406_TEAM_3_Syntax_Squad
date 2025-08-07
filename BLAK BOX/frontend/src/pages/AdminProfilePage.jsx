// src/pages/AdminProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import { decodeJwt } from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styleUser.css'; // Usa el mismo estilo que HomeUserPage

const AdminProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found, redirecting to login');
      return navigate('/login');
    }

    const decoded = decodeJwt(token);
    if (!decoded?.id) {
      console.warn('Token invalid or malformed, redirecting to login');
      return navigate('/login');
    }

    const userId = decoded.id;

    client
      .get(`/users/${userId}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        const status = err.response?.status;
        console.error('❌ Error fetching admin user:', status, err);
        if (status === 401 || status === 403) {
          navigate('/login');
        } else {
          setUser({ firstName: 'Error', lastName: 'Admin', email: 'unknown@error.com' });
        }
      });
  }, [navigate]);

  if (!user) {
    return <div className="user-dashboard-bg">Cargando datos del administrador...</div>;
  }

  return (
    <div className="user-dashboard-bg">
      <div className="user-dashboard-layout">
        <Sidebar /> {/* Sidebar reutilizado */}
        <main className="dashboard-main">
          <div className="dashboard-welcome-card">
            <div className="user-avatar">
              {(user.firstName?.[0] || 'A').toUpperCase()}
            </div>
            <h2 className="welcome-title">
              Hi, <span className="highlight">{user.firstName} {user.lastName}</span>
            </h2>
            <div className="dashboard-email">{user.email}</div>
            <div className="dashboard-line" />
            <div className="dashboard-actions">
              <button
                className="btn-dashboard-logout"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProfilePage;
