import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import '../styles/AdminOrderDetailPage.css';

const ORDER_PRODUCTS_URL = 'https://awd-22406-team-3-syntax-squad.onrender.com/blakbox/orderProducts';
const ORDERS_URL = 'https://awd-22406-team-3-syntax-squad.onrender.com/blakbox/orders';
const USER_URL = (userId) => `https://awd-22406-team-3-syntax-squad.onrender.com/blakbox/users/${userId}`;
const ORDER_HISTORY_URL = (userId) => `https://awd-22406-team-3-syntax-squad.onrender.com/blakbox/orders/history/${userId}`;

export default function AdminOrderDetailPage() {
  const { orderId } = useParams();

  const [items, setItems] = useState([]);
  const [orderMeta, setOrderMeta] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [statusDraft, setStatusDraft] = useState('');
  const [orderHistory, setOrderHistory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const usersCache = useMemo(() => new Map(), []);

  const fetchUserById = async (userId) => {
    if (!userId) return null;
    if (usersCache.has(userId)) return usersCache.get(userId);
    try {
      const { data } = await client.get(USER_URL(userId));
      const userData = data.user || data;
      usersCache.set(userId, userData);
      return userData;
    } catch (e) {
      console.error('Error fetching user', e);
      usersCache.set(userId, null);
      return null;
    }
  };

  const fetchOrderMeta = async (id) => {
    try {
      const { data } = await client.get(`${ORDERS_URL}/${id}`);
      return data.order || data;
    } catch {
      const { data } = await client.get(ORDERS_URL);
      const list = Array.isArray(data) ? data : [];
      return list.find((o) => o._id === id) || null;
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { data: opData } = await client.get(ORDER_PRODUCTS_URL);
      const allOP = Array.isArray(opData) ? opData : [];
      const itemsForOrder = allOP.filter((r) => r?.orderId?._id === orderId);
      setItems(itemsForOrder);

      const meta = await fetchOrderMeta(orderId);
      setOrderMeta(meta || null);
      setStatusDraft(meta?.status || 'pending');

      if (meta?.userId) {
        const u = await fetchUserById(meta.userId);
        setCustomer(u || null);

        // 🔹 Fetch order history
        try {
          const { data: historyData } = await client.get(ORDER_HISTORY_URL(meta.userId));
          setOrderHistory(historyData);
        } catch (err) {
          console.error('Error fetching order history', err);
        }
      } else {
        setCustomer(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('No se pudo cargar el detalle de la orden.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderId]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, it) => {
      const price = Number(it?.productId?.price || 0);
      const qty = Number(it?.quantity || 0);
      return acc + price * qty;
    }, 0);
  }, [items]);

  const fullName = useMemo(() => {
    if (!customer) return '';
    const fn = customer.firstName || '';
    const ln = customer.lastName || '';
    const name = `${fn} ${ln}`.trim();
    return name || customer.email || '';
  }, [customer]);

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

  const handleSaveStatus = async () => {
    if (!orderMeta?._id) return;
    setSaving(true);
    try {
      try {
        await client.put(`${ORDERS_URL}/${orderMeta._id}`, { status: statusDraft });
      } catch {
        await client.patch(`${ORDERS_URL}/${orderMeta._id}`, { status: statusDraft });
      }
      setOrderMeta((prev) => ({ ...prev, status: statusDraft }));
      alert('Estado actualizado correctamente.');
    } catch (e) {
      console.error(e);
      alert('No se pudo actualizar el estado.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="order-detail-page">
      <Sidebar />
      <div className="order-detail-content">
        <div className="od-header">
          <div className="left">
            <h1>Order Detail</h1>
            <p className="breadcrumb">
              <Link to="/admin/orders">← Back to Orders</Link>
            </p>
          </div>
          {!loading && orderMeta && (
            <div className="right">
              <span className={`status-badge ${getStatusClass(orderMeta.status)}`}>
                {orderMeta.status || 'pending'}
              </span>
            </div>
          )}
        </div>

        {loading && <div className="od-loading">Loading order…</div>}
        {errorMsg && <div className="od-error">{errorMsg}</div>}

        {!loading && !errorMsg && (
          <>
            {/* Invoice card */}
            <div className="invoice-card">
              <div className="invoice-row">
                <div>
                  <h3>Customer</h3>
                  <div className="inv-customer">
                    <div className="name">{fullName || '—'}</div>
                    {customer?.email && <div className="email">{customer.email}</div>}
                  </div>
                </div>
                <div>
                  <h3>Order Info</h3>
                  <div className="inv-info">
                    <div><span className="label">Order #:</span> {orderMeta?._id}</div>
                    <div><span className="label">Date:</span> {orderMeta?.orderDate ? new Date(orderMeta.orderDate).toLocaleString() : '—'}</div>
                    <div><span className="label">Status:</span> {orderMeta?.status || 'pending'}</div>
                  </div>
                </div>
              </div>

              {/* Items table */}
              <table className="inv-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Product</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => {
                    const name = it?.productId?.name || '—';
                    const price = Number(it?.productId?.price || 0);
                    const qty = Number(it?.quantity || 0);
                    const line = price * qty;
                    return (
                      <tr key={it._id}>
                        <td className="prod-name">{name}</td>
                        <td>${price.toFixed(2)}</td>
                        <td>{qty}</td>
                        <td>${line.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', opacity: 0.7 }}>
                        No items found for this order
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="total-label">Subtotal</td>
                    <td className="total-value">${subtotal.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Update order status */}
            <div className="status-panel">
              <h3>Update Order Status</h3>
              <div className="status-row">
                <select
                  value={statusDraft}
                  onChange={(e) => setStatusDraft(e.target.value)}
                  className="status-select"
                >
                  <option value="pending">pending</option>
                  <option value="paid">paid</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                </select>

                <button
                  className="save-status-btn"
                  onClick={handleSaveStatus}
                  disabled={saving}
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>

            {/* Order history section */}
            {orderHistory && (
              <div className="order-history-card">
                <h3>Order History for {fullName}</h3>
                <p><strong>Total Orders:</strong> {orderHistory.totalOrders}</p>
                <p><strong>Total Spent:</strong> ${orderHistory.totalSpent.toFixed(2)}</p>
                <p><strong>Last Order:</strong> {new Date(orderHistory.lastOrderDate).toLocaleString()}</p>

                {Object.entries(orderHistory.history).map(([year, months]) => (
                  <div key={year} className="year-section">
                    <h4>{year}</h4>
                    {Object.entries(months).map(([month, orders]) => (
                      <div key={month} className="month-section">
                        <h5>{month}</h5>
                        <table className="history-table">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Date</th>
                              <th>Total</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((o) => (
                              <tr key={o.orderId}>
                                <td>{o.orderId}</td>
                                <td>{new Date(o.orderDate).toLocaleString()}</td>
                                <td>${o.total.toFixed(2)}</td>
                                <td>{o.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
