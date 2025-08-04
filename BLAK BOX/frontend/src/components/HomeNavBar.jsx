import React from 'react'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import '../styles/styleHomeNavBar.css'

export default function HomeNavBar() {
  return (
    <nav className="navbar-home">
      <div className="nav-container">
        <Link to="/" className="navbar-brand">
          <img src="/Images/logo.png" alt="Blak Box Logo" className="brand-logo" />
          BLAK BOX
        </Link>

        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/store">Store</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="nav-buttons">
          <Link to="/login" className="btn-nav btn-login">
            <FaSignInAlt /> Login
          </Link>
          <Link to="/signup" className="btn-nav btn-signup">
            <FaUserPlus /> Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
