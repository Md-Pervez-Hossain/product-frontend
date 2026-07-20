import { formatMoney } from '../../lib/format.js';
import { EmptyState } from '../ui/EmptyState.jsx';

export function OrderList({ orders, loading }) {
  if (loading) return <p className="loading-copy">Loading orders…</p>;
  if (!orders.length) return <EmptyState message="No orders yet." />;

  return (
    <ul className="record-list">
      {orders.map((order) => (
        <li key={order.id} className="record-row order-row">
          <div className="record-main">
            <strong>{order.product_name}</strong>
            <p>Quantity {order.quantity}</p>
          </div>
          <div className="record-metric">
            <span>{formatMoney(order.total_price)}</span>
            <small>{order.status}</small>
          </div>
        </li>
      ))}
    </ul>
  );
}
