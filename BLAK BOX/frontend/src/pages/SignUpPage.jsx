// src/pages/SignUpPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styleSignUp.css";  // Tus estilos
import { FaGoogle } from "react-icons/fa";
import HomeNavBar from "../components/HomeNavBar";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });

  // 1) Control de inputs
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 2) Submit del form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registrando usuario:", form);
    // aquí va tu fetch / EmailJS / Formmy…
  };

  // 3) Stub para el botón de Google (evita el error de referencia)
  const handleGoogle = () => {
    console.log("Google OAuth triggered");
    // más adelante pones tu lógica real
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
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="lastname">Lastname:</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Your lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0123456789"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-submit">
              Register
            </button>
          </form>

          <div className="login-card__footer">
            Already have an account?{" "}
            <Link to="/login" className="login-card__link">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
