import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import '../styles/AdminOrdersPage.css';

const ORDERS_URL = 'https://awd-22406-team-3-syntax-squad.onrender.com/blakbox/orders';
const USER_URL = (userId) => `https://awd-22406-team-3-syntax-squad.onrender.com/users/${userId}`;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // cache para no repetir pedidos de /users/:id
  const usersCache = useMemo(() => new Map(), []);

  const fetchUserById = async (userId) => {
    if (!userId) return null;
    if (usersCache.has(userId)) return usersCache.get(userId);
    try {
      const { data } = await client.get(USER_URL(userId));
      usersCache.set(userId, data);
      return data;
    } catch (e) {
      usersCache.set(userId, null);
      return null;
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { data } = await client.get(ORDERS_URL); // absoluto: ignora baseURL si la tienes
      // Enriquecer con nombre de usuario
      const enriched = await Promise.all(
        (Array.isArray(data) ? data : []).map(async (o) => {
          const user = await fetchUserById(o.userId);
          const fullName = user
            ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || o.userId
            : o.userId;
          return {
            ...o,
            customerName: fullName,
            customerEmail: user?.email || '',
          };
        })
      );
      setOrders(enriched);
    } catch (err) {
      console.error(err);
      setErrorMsg('Error cargando órdenes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="orders-page-container">
      <Sidebar />
      <div className="orders-content">
        <div className="orders-header">
          <h1>Orders Manager</h1>
          <button className="refresh-btn" onClick={fetchOrders} title="Refrescar">
            <i className="fas fa-sync-alt" />
          </button>
        </div>

        {loading && <div className="orders-loading">Loading orders…</div>}
        {errorMsg && <div className="orders-error">{errorMsg}</div>}

        {!loading && !errorMsg && (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Total</th>
                <th>Status</th>
                <th style={{ width: 80 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td className="mono">{o._id}</td>
                  <td>
                    <div className="customer">
                      <span className="name">{o.customerName}</span>
                      {o.customerEmail && <span className="email">{o.customerEmail}</span>}
                    </div>
                  </td>
                  <td>{new Date(o.orderDate).toLocaleString()}</td>
                  <td>${Number(o.total || 0).toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${o.status || 'pending'}`}>
                      {o.status || 'pending'}
                    </span>
                  </td>
                  <td className="actions">
                    <Link
                      to={`/admin/orders/${o._id}`}
                      className="action-btn view"
                      title="Ver detalles"
                    >
                      <i className="fas fa-eye" />
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', opacity: 0.7 }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
