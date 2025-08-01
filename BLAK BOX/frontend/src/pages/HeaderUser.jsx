import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HeaderUser = () => {
  return (
    <aside className="bg-dark text-white p-3 sidebar d-none d-lg-block">
      <div className="text-center mb-4">
        <img
          src="../../Images/Logoblanco-removebg-preview.png"
          alt="Blak Box Logo"
          className="img-fluid"
          style={{ maxHeight: '150px', filter: 'invert(1) brightness(2)' }}
        />
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link text-white" href="/homeUser">
            <i className="bi bi-house-door-fill me-2"></i> Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/productsUser">
            <i className="bi bi-box-seam me-2"></i> Products
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="">
            <i className="bi bi-cart3 me-2"></i> Cart
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/profileUser">
            <i className="bi bi-person-circle me-2"></i> Profile
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-danger"
            href=""
          >
            <i className="bi bi-box-arrow-right me-2"></i> Log out
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default HeaderUser;
