import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HeaderResponsiveUser = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark d-lg-none">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="../../public/Images/Logoblanco-removebg-preview.png"
              alt="Blak Box Logo"
              style={{ height: '50px', filter: 'invert(1) brightness(2)' }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="offcanvasMenu"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
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
              <a className="nav-link text-danger" href="">
                <i className="bi bi-box-arrow-right me-2"></i> Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HeaderResponsiveUser;
