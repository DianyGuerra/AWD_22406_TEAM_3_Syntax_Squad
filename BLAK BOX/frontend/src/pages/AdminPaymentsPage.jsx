import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import '../styles/AdminPaymentsPage.css';

const PAYMENTS_URL = 'https://awd-22406-team-3-syntax-squad.onrender.com/blakbox/payments';
const USER_URL = (userId) =>
  `https://awd-22406-team-3-syntax-squad.onrender.com/blakbox/users/${userId}`;

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchPayments = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { data } = await client.get(PAYMENTS_URL);
      const list = Array.isArray(data) ? data : [];

      const enriched = await Promise.all(
        list.map(async (p) => {
          const user = await fetchUserById(p.userId);
          let fullName = '';
          if (user) {
            const fn = user.firstName || '';
            const ln = user.lastName || '';
            fullName = `${fn} ${ln}`.trim();
            if (!fullName) fullName = user.email || p.userId;
          } else {
            fullName = p.userId;
          }

          return {
            ...p,
            customerName: fullName,
            customerEmail: user?.email || '',
          };
        })
      );

      setPayments(enriched);
    } catch (err) {
      console.error(err);
      setErrorMsg('Error cargando pagos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'refunded':
        return 'status-refunded';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'credit_card':
        return <i className="fas fa-credit-card" />;
      case 'debit_card':
        return <i className="far fa-credit-card" />;
      case 'bank_transfer':
        return <i className="fas fa-university" />;
      case 'paypal':
        return <i className="fab fa-paypal" />;
      case 'cash':
        return <i className="fas fa-money-bill-wave" />;
      default:
        return <i className="fas fa-wallet" />;
    }
  };

  return (
    <div className="payments-page-container">
      <Sidebar />
      <div className="payments-content">
        <div className="payments-header">
          <h1>Payments Manager</h1>
          <button className="refresh-btn" onClick={fetchPayments} title="Refrescar">
            <i className="fas fa-sync-alt" />
          </button>
        </div>

        {loading && <div className="payments-loading">Loading payments…</div>}
        {errorMsg && <div className="payments-error">{errorMsg}</div>}

        {!loading && !errorMsg && (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Order</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
                <th>Txn</th>
                <th style={{ width: 90 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="customer">
                      <span className="name">{p.customerName}</span>
                      {p.customerEmail && <span className="email">{p.customerEmail}</span>}
                    </div>
                  </td>
                  <td className="mono">{p.orderId}</td>
                  <td className="amount">${Number(p.amount || 0).toFixed(2)}</td>
                  <td className="method">
                    <span className="method-chip">
                      {getMethodIcon(p.paymentMethod)}{' '}
                      <span className="method-label">{p.paymentMethod || '—'}</span>
                    </span>
                  </td>
                  <td>{p.paymentDate ? new Date(p.paymentDate).toLocaleString() : '—'}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(p.status)}`}>
                      {p.status || 'pending'}
                    </span>
                  </td>
                  <td className="mono">{p.transactionId || '—'}</td>
                  <td className="actions">
                    <Link
                      to={`/admin/orders/${p.orderId}`}
                      className="action-btn view"
                      title="Ver orden"
                    >
                      <i className="fas fa-eye" />
                    </Link>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', opacity: 0.7 }}>
                    No payments found
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
