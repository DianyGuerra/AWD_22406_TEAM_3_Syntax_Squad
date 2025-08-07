import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/styleHeaderUser.css'; 

const HeaderUser = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <img
        src="/Images/Logoblanco-removebg-preview.png"
        alt="Blak Box Logo"
        className="logo"
      />
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/user/home">
            <i className="bi bi-house-door-fill"></i> Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/user/products">
            <i className="bi bi-box-seam"></i> Products
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/user/cart">
            <i className="bi bi-cart3"></i> Cart
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/user/profile">
            <i className="bi bi-person-circle"></i> Profile
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-danger" href="#" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Log out
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default HeaderUser;
