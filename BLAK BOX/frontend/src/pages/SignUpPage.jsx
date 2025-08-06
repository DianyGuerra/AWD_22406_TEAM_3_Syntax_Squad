import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";
import "../styles/styleSignUp.css";
import { FaGoogle } from "react-icons/fa";
import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";

export default function SignUpPage() {
  const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);
    try {
      const res = await client.post('/users', form);
      console.log('Backend response:', res);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('Registration failed. Please try again.');
      }
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
          <h2 className="login-card__title">Sign up</h2>
          <button type="button" className="btn-google" onClick={handleGoogle}>
            <FaGoogle className="btn-google__icon" />
            Sign Up with Google
          </button>

          <form className="login-form" onSubmit={handleSubmit}>

            <label htmlFor="firstName">Name:</label>
            <input id="firstName" name="firstName" type="text" placeholder="Your name" value={form.firstName} onChange={handleChange} required />

            <label htmlFor="lastName">Lastname:</label>
            <input id="lastName" name="lastName" type="text" placeholder="Your lastname" value={form.lastName} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />

            <label htmlFor="phoneNumber">Phone:</label>
            <input id="phoneNumber" name="phoneNumber" type="tel" placeholder="0123456789" value={form.phoneNumber} onChange={handleChange} required />

            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
              
            <button type="submit" className="btn-submit">
              Register
            </button>
          </form>

          {errorMsg && (
            <div className="signup-alert-error">
              <span className="alert-icon" role="img" aria-label="Error">🔒</span>
              <span>{errorMsg.includes('password') ? "Password must be at least 6 characters." : errorMsg}</span>
              <button className="close-btn" onClick={() => setErrorMsg('')} title="Close">&times;</button>
            </div>
          )}
          {success && <div className="success-msg">User registered! Redirecting to login...</div>}

          <div className="login-card__footer">
            Already have an account?{" "}
            <Link to="/login" className="login-card__link">Log In</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
