import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderUser           from './HeaderUser';
import HeaderResponsiveUser from './HeaderResponsiveUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styleUser.css';
import client               from '../api/client';
import { decodeJwt } from "../utils/auth"; 

export default function HomeUserPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //alert('HomeUserPage mounted!');
    const token = localStorage.getItem('token');
    console.log('GENERATED TOKEN:', token);
    if (!token) {
      console.warn('No token found, redirecting to login');
      return navigate('/login');
    }

    const decoded = decodeJwt(token);
    console.log('DECODED TOKEN:', token);
    if (!decoded?.id) {
      console.warn('Token invalid or malformed, redirecting to login');
      return navigate('/login');
    }
    const userId = decoded.id;

    client
      .get(`/users/${userId}`)
      .then(res => {
        console.log('✅ Fetched user:', res.data);
        setUser(res.data);
      })
      .catch(err => {
        const status = err.response?.status;
        console.error('❌ Error fetching user:', status, err);
        if (status === 401 || status === 403) {
          navigate('/login');
        } else {
          setUser({ firstName: 'Error loading', lastName: '', email: '' });
        }
      });
  }, [navigate]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="user-dashboard-bg">
      <HeaderResponsiveUser />
      <div className="user-dashboard-layout">
        <HeaderUser /> {/* Sidebar */}
        <main className="dashboard-main">
          <div className="dashboard-welcome-card">
            <div className="user-avatar">{(user.firstName?.[0] || "U").toUpperCase()}</div>
            <h2 className="welcome-title">Hi, <span className="highlight">{user.firstName} {user.lastName}</span></h2>
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
