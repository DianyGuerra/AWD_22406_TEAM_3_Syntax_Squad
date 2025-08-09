import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleHeaderResponsiveUser.css';

const HeaderResponsiveUser = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav className="mobile-navbar">
        <div className="navbar-container">
          <a href="/user/home" className="navbar-brand">
            <img
              src="/Images/Logoblanco-removebg-preview.png"
              alt="Blak Box Logo"
              className="navbar-logo"
            />
          </a>
          <button
            className="hamburger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            &#9776;
          </button>
        </div>
      </nav>

      <div className={`offcanvas-menu ${open ? 'open' : ''}`}>
        <div className="offcanvas-header">
          <h5>Menu</h5>
          <button
            className="close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav-list">
            <li><a href="/user/home"><i className="bi bi-house-door-fill"></i> Home</a></li>
            <li><a href="/user/products"><i className="bi bi-box-seam"></i> Products</a></li>
            <li><a href="/user/cart"><i className="bi bi-cart3"></i> Cart</a></li>
            <li><a href="/user/profile"><i className="bi bi-person-circle"></i> Profile</a></li>
            <li><a href="#" className="text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Log out</a></li>
          </ul>
        </div>
      </div>

      {/* Overlay when offcanvas is open */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default HeaderResponsiveUser;
