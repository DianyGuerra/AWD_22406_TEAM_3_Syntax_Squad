import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  FaClipboardList,
  FaDollarSign,
  FaClock,
  FaUserCircle
} from 'react-icons/fa'
import client from '../api/client'

export default function OrderHistoryPage() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)

  // 1) Fetch user data (first name, last name, email, phone)
  useEffect(() => {
    client
      .get(`/blakbox/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(() =>
        setUser({
          name: '—',
          lastName: '',
          email: '—',
          phone: '—'
        })
      )
  }, [userId])

  // 2) Fetch order history
  useEffect(() => {
    client
      .get(`/blakbox/orders/history/${userId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [userId])

  // 3) Guard: si no tenemos user o data o totalSpent no es número, mostramos loading
  if (!user || !data || typeof data.totalSpent !== 'number') {
    return (
      <div className="order-history-container">
        Loading order history…
      </div>
    )
  }

  const { totalOrders, totalSpent, lastOrderDate, history } = data

  return (
    <div className="order-history-container">
      <h1 className="order-history-title">Order History</h1>

      {/* Profile Section */}
      <div className="profile-card">
        <FaUserCircle className="profile-avatar" />
        <div className="profile-info">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
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
            <p className="card-value">
              {new Date(lastOrderDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Order History */}
      {Object.entries(history).map(([year, months]) =>
        Object.entries(months).map(([month, orders]) => (
          <section key={`${year}-${month}`} className="order-section">
            <h2>
              {year} — {month}
            </h2>
            <div className="order-cards">
              {orders.map(o => (
                <div key={o.orderId} className="order-card">
                  <h4>Order #{o.orderId.slice(-6)}</h4>
                  <p>
                    <strong>Date:</strong>{' '}
                    {new Date(o.orderDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ${o.total.toFixed(2)}
                  </p>
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
  )
}
