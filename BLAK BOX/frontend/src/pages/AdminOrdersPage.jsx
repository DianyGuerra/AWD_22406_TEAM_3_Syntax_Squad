import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import '../styles/AdminOrdersPage.css';

const ORDERS_URL = 'https://awd-22406-team-3-syntax-squad.onrender.com/blakbox/orders';
const USERS_URL = 'https://awd-22406-team-3-syntax-squad.onrender.com/blakbox/users';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUsers = async () => {
    try {
      const { data } = await client.get(USERS_URL);
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error fetching users', e);
      setUsers([]);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { data } = await client.get(ORDERS_URL);
      const ordersList = Array.isArray(data) ? data : [];

      // Enriquecer órdenes con datos de usuario
      const enriched = ordersList.map((o) => {
        const user = users.find((u) => u._id === o.userId);

        let fullName = '';
        if (user) {
          const firstName = user.firstName || '';
          const lastName = user.lastName || '';
          fullName = `${firstName} ${lastName}`.trim();
          if (!fullName) {
            fullName = user.email || o.userId;
          }
        } else {
          fullName = o.userId;
        }

        return {
          ...o,
          customerName: fullName,
          customerEmail: user?.email || '',
        };
      });

      setOrders(enriched);
    } catch (err) {
      console.error(err);
      setErrorMsg('Error cargando órdenes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Primero cargamos usuarios y luego órdenes
    const init = async () => {
      await fetchUsers();
      await fetchOrders();
    };
    init();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta orden?')) return;
    try {
      await client.delete(`${ORDERS_URL}/${orderId}`);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      alert('Orden eliminada exitosamente.');
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar la orden.');
    }
  };

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
                <th>Customer</th>
                <th>Order Date</th>
                <th>Status</th>
                <th style={{ width: 110 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>
                    <div className="customer">
                      <span className="name">{o.customerName}</span>
                      {o.customerEmail && <span className="email">{o.customerEmail}</span>}
                    </div>
                  </td>
                  <td>{new Date(o.orderDate).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(o.status)}`}>
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
                    <button
                      className="action-btn delete"
                      title="Eliminar orden"
                      onClick={() => handleDeleteOrder(o._id)}
                      style={{ marginLeft: '6px', background: '#ff4d4d', color: '#fff' }}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', opacity: 0.7 }}>
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
