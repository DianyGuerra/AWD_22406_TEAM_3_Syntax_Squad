import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderUser           from './HeaderUser';
import HeaderResponsiveUser from './HeaderResponsiveUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styleUser.css';
import client               from '../api/client';

function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

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
    <div className="bg-purple-darker text-white min-vh-100">
      <HeaderResponsiveUser />
      <div className="d-flex flex-column flex-lg-row min-vh-100">
        <HeaderUser />
        <main className="flex-fill bg-purple-darker p-4">
          <div className="container">
            <div className="mb-4 bg-purple-mid text-white p-3 rounded shadow-sm">
              <h2 className="m-0">Hi, {user.firstName} {user.lastName}</h2>
              <h2 className="m-0">Welcome to Blak Box</h2>
            </div>
            {/* ...el resto de tu dashboard... */}
          </div>
        </main>
      </div>
    </div>
  );
}
