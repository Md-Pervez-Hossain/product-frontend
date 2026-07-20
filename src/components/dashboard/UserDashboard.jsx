import { formatMoney } from '../../lib/format.js';
import { OrderHistory } from '../orders/OrderHistory.jsx';
import { DashboardMetric } from './DashboardMetric.jsx';

export function UserDashboard({ user, orders, loading }) {
  const total = orders.reduce((sum, order) => sum + Number(order.total_price), 0);
  const items = orders.reduce((sum, order) => sum + Number(order.quantity), 0);

  return (
    <div className="store-container page-section dashboard-page">
      <header className="account-page-header">
        <div>
          <p className="eyebrow">Customer account / {user.name}</p>
          <h1>Your dashboard</h1>
        </div>
        <p>{user.email}</p>
      </header>

      <section className="dashboard-metrics user-dashboard-metrics" aria-label="Order overview">
        <DashboardMetric label="Orders" value={orders.length} note="Your purchases" />
        <DashboardMetric label="Items" value={items} note="Units ordered" />
        <DashboardMetric label="Total spent" value={formatMoney(total)} note="Confirmed value" />
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <p className="eyebrow">Order service</p>
            <h2>Your orders</h2>
          </div>
          <p>Only orders belonging to your account are shown.</p>
        </div>
        <OrderHistory orders={orders} loading={loading} />
      </section>
    </div>
  );
}
