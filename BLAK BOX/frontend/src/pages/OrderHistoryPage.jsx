import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaClipboardList,
  FaDollarSign,
  FaClock,
  FaUserCircle
} from 'react-icons/fa';
import client from '../api/client';
import { decodeJwt } from '../utils/auth'; 

export default function OrderHistoryPage() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = decodeJwt(token);
    if (!decoded?.id) {
      navigate("/login");
      return;
    }

    setUserId(decoded.id);
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    client
      .get(`/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(() =>
        setUser({
          name: '—',
          lastName: '',
          email: '—',
          phone: '—'
        })
      );
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    client
      .get(`/orders/history/${userId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  if (!user || !data || typeof data.totalSpent !== 'number') {
    return <div className="order-history-container">Loading order history…</div>;
  }

  const { totalOrders, totalSpent, lastOrderDate, history } = data;

  return (
    <div className="order-history-container">
      <Link to="/user/profile" className="text-accent mb-4 d-inline-block text-decoration-none">
        ← Back to Profile
      </Link>
      <h1 className="order-history-title">Order History</h1>

      {/* Profile Section */}
      <div className="profile-card">
        <FaUserCircle className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.firstName} {user.lastName}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="order-summary">
        <div className="summary-card card-orders">
          <FaClipboardList className="card-icon" />
          <div>
            <p className="card-label">Total Orders</p>
            <p className="card-value">{totalOrders}</p>
          </div>
        </div>
        <div className="summary-card card-spent">
          <FaDollarSign className="card-icon" />
          <div>
            <p className="card-label">Total Spent</p>
            <p className="card-value">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
        <div className="summary-card card-last">
          <FaClock className="card-icon" />
          <div>
            <p className="card-label">Last Order</p>
            <p className="card-value">{new Date(lastOrderDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Order History */}
      {Object.entries(history).map(([year, months]) =>
        Object.entries(months).map(([month, orders]) => (
          <section key={`${year}-${month}`} className="order-section">
            <h2>{year} — {month}</h2>
            <div className="order-cards">
              {orders.map(o => (
                <div key={o.orderId} className="order-card">
                  <h4>Order #{o.orderId.slice(-6)}</h4>
                  <p><strong>Date:</strong> {new Date(o.orderDate).toLocaleDateString()}</p>
                  <p><strong>Total:</strong> ${o.total.toFixed(2)}</p>
                  <p className={`order-status status-${o.status}`}>
                    {o.status.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
