// src/pages/OrderHistoryPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';

export default function OrderHistoryPage() {
  const { userId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .get(`/blakbox/orders/history/${userId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  if (!data) return <div className="p-4">Cargando historial…</div>;

  const { totalOrders, totalSpent, lastOrderDate, history } = data;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Historial de Órdenes (Usuario {data.userId})</h1>

      {/* Estadísticas generales */}
      <div className="flex space-x-8">
        <div>
          <p className="font-semibold">Total de órdenes:</p>
          <p>{totalOrders}</p>
        </div>
        <div>
          <p className="font-semibold">Total gastado:</p>
          <p>${totalSpent.toFixed(2)}</p>
        </div>
        <div>
          <p className="font-semibold">Última orden:</p>
          <p>{new Date(lastOrderDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Historial agrupado por año → mes */}
      {Object.entries(history).map(([year, months]) => (
        <div key={year} className="mt-4">
          <h2 className="text-xl font-semibold">Año {year}</h2>

          {Object.entries(months).map(([month, orders]) => (
            <div key={month} className="ml-4 mt-2">
              <h3 className="text-lg font-medium">{month}</h3>
              <ul className="list-disc list-inside">
                {orders.map(o => (
                  <li key={o.orderId} className="mt-1">
                    <span className="font-semibold">{new Date(o.orderDate).toLocaleDateString()}:</span>{' '}
                    ${o.total.toFixed(2)} — <em>{o.status}</em>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
