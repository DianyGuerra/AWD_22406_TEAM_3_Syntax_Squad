import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styleLogin.css';
import { FaGoogle } from 'react-icons/fa';
import HomeNavBar from '../components/HomeNavBar';
import Footer     from '../components/Footer';
import { loginWithEmail } from '../api/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form,  setForm]  = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const ADMIN_EMAIL = "lassosebastian66@gmail.com";

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      setError('');
      const { token, user } = await loginWithEmail(email, password);

      // Redirigir según el correo
      if (email === ADMIN_EMAIL) {
        window.location.href = '/admin/profile';
      } else {
        window.location.href = '/user/home';
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
};

  const handleGoogle = () => {
    const apiRoot = import.meta.env.VITE_API_URL || 'http://localhost:3007';
    window.location.href = `${apiRoot}/blakbox/auth/google`;
  };

  return (
    <div className="login-page">
      <HomeNavBar />

      <div className="login-hero">
        <div className="login-card">
          <h2 className="login-card__title">Log In</h2>

          <button
            type="button"
            className="btn-google"
            onClick={handleGoogle}
          >
            <FaGoogle className="btn-google__icon" />
            Login with Google
          </button>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-submit">
              Log In
            </button>
          </form>

          {error && (
            <div className="login-alert-error">
              <span className="alert-icon" role="img" aria-label="Error">🔒</span>
              <span>{error}</span>
              <button className="close-btn" onClick={() => setError('')} title="Close">&times;</button>
            </div>
          )}


          <p className="login-card__footer">
            Don’t have an account yet?{' '}
            <Link to="/signup" className="login-card__link">
              Register here
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
