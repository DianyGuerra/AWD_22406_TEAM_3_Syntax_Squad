// src/components/Footer.jsx
import React from "react";
import "../styles/styleFooter.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* primero la ola */}
      <div className="footer-wave" />

      {/* luego todo tu contenido dentro de .footer-content */}
      <div className="footer-content">
        <img src="/Images/logo.png" alt="Blak Box logo" width="80" />
        <div className="social-links">
          {/* usa tus iconos */}
          <a href="https://facebook.com"><i className="bi bi-facebook color-black"></i></a>
          <a href="https://twitter.com"><i className="bi bi-twitter"></i></a>
          <a href="https://linkedin.com"><i className="bi bi-linkedin"></i></a>
        </div>
        <p className="rights">© 2025 BLAK BOX Tech Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
