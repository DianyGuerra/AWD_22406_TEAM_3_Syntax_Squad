import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FaBoxOpen, FaUserShield, FaClipboardList, FaSignOutAlt, FaUser, FaDollarSign } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = (e) => {
    alert("Intentando logout");
    e.preventDefault();
    console.log("Antes:", localStorage.getItem('token'));
    localStorage.removeItem('token');
    console.log("Después:", localStorage.getItem('token'));
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="logo">BLΛK BOX</div>
      <nav className="nav-links">
        
        <Link to="/admin/products" className={isActive('/admin/products') ? 'active' : ''}>
          <FaBoxOpen /> Products
        </Link>
        <Link to="/admin/orders" className={isActive('/admin/orders') ? 'active' : ''}>
          <FaClipboardList /> Orders
        </Link>
        <Link to="/admin/payments" className={isActive('/admin/payments') ? 'active' : ''}>
          <FaDollarSign /> Payments
        </Link>
        <Link to="/admin/profile" className={isActive('/admin/profile') ? 'active' : ''}>
          <FaUser /> Profile
        </Link>
        
      </nav>
      <div className="logout">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
