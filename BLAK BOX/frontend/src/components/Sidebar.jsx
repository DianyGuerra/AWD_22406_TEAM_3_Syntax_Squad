// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FaBoxOpen, FaUserShield, FaClipboardList, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <div className="logo">BLΛK BOX</div>
      <nav className="nav-links">
        <Link to="/admin/dashboard" className={isActive('/admin/dashboard') ? 'active' : ''}>
          <FaUserShield /> Dashboard
        </Link>
        <Link to="/admin/products" className={isActive('/admin/products') ? 'active' : ''}>
          <FaBoxOpen /> Products
        </Link>
        <Link to="/admin/orders" className={isActive('/admin/orders') ? 'active' : ''}>
          <FaClipboardList /> Orders
        </Link>
        <Link to="/admin/profile" className={isActive('/admin/profile') ? 'active' : ''}>
          <FaUser /> Profile
        </Link>
      </nav>
      <div className="logout">
        <Link to="/logout">
          <FaSignOutAlt /> Log out
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
