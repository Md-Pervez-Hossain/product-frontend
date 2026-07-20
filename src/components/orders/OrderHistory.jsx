import { formatMoney } from '../../lib/format.js';

function formatDate(value) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

export function OrderHistory({ orders, loading, showCustomer = false }) {
  if (loading) return <div className="route-loading">Loading orders…</div>;

  if (!orders.length) {
    return (
      <div className="account-empty">
        <span>00</span>
        <h2>No orders yet.</h2>
        <p>Completed checkout history will appear here.</p>
      </div>
    );
  }

  return (
    <div className={`order-table${showCustomer ? ' order-table-admin' : ''}`}>
      <div className="order-table-head">
        <span>Product</span>
        {showCustomer && <span>Customer</span>}
        <span>Date</span>
        <span>Status</span>
        <span>Total</span>
      </div>
      {orders.map((order) => (
        <article className="order-entry" key={order.id}>
          <div>
            <strong>{order.product_name}</strong>
            <small>Qty {order.quantity} · #{order.id.slice(-6).toUpperCase()}</small>
          </div>
          {showCustomer && <span className="customer-id">…{order.user_id.slice(-8)}</span>}
          <span>{formatDate(order.created_at)}</span>
          <span className="status-pill">{order.status}</span>
          <strong>{formatMoney(order.total_price)}</strong>
        </article>
      ))}
    </div>
  );
}
