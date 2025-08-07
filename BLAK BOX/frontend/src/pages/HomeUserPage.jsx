import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderUser from './HeaderUser';
import HeaderResponsiveUser from './HeaderResponsiveUser';
import '../styles/styleHomeUser.css';
import client from '../api/client';
import { decodeJwt } from "../utils/auth";

export default function HomeUserPage() {
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const decoded = decodeJwt(token);
    if (!decoded?.id) return navigate('/login');

    const userId = decoded.id;

    client
      .get(`/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          navigate('/login');
        } else {
          setUser({ firstName: 'Error loading', lastName: '', email: '' });
        }
      });
  }, [navigate]);

  if (!user) {
    return <div className="loading-message">Loading user data...</div>;
  }

  return (
    <div className="user-dashboard-bg">
      {isMobile && <HeaderResponsiveUser />}
      <div className="user-dashboard-layout">
        {!isMobile && <HeaderUser />}
        <main className="dashboard-main">
          <div className="dashboard-welcome-card">
            <div className="user-avatar">{(user.firstName?.[0] || "U").toUpperCase()}</div>
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
}
