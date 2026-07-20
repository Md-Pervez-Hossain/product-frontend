import { formatMoney } from '../../lib/format.js';
import { OrderHistory } from '../orders/OrderHistory.jsx';
import { ProductForm } from '../products/ProductForm.jsx';
import { ProductList } from '../products/ProductList.jsx';
import { DashboardMetric } from './DashboardMetric.jsx';

export function AdminDashboard({
  user,
  products,
  orders,
  productsLoading,
  ordersLoading,
  busyAction,
  onCreate,
  onDelete,
}) {
  const units = products.reduce((sum, product) => sum + Number(product.stock), 0);
  const revenue = orders.reduce((sum, order) => sum + Number(order.total_price), 0);

  return (
    <div className="store-container page-section dashboard-page">
      <header className="account-page-header">
        <div>
          <p className="eyebrow">Administrator / {user.name}</p>
          <h1>Admin dashboard</h1>
        </div>
        <p>Full catalog and order access</p>
      </header>

      <section className="dashboard-metrics" aria-label="Store overview">
        <DashboardMetric label="Products" value={products.length} note="Catalog entries" />
        <DashboardMetric label="Stock" value={units} note="Available units" />
        <DashboardMetric label="Total orders" value={orders.length} note="All customers" />
        <DashboardMetric label="Order value" value={formatMoney(revenue)} note="Confirmed total" />
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <p className="eyebrow">Product service</p>
            <h2>Catalog management</h2>
          </div>
          <p>Only administrators can make these changes.</p>
        </div>
        <div className="manage-grid">
          <section className="manage-card">
            <header><p className="eyebrow">New product</p><h3>Add to catalog</h3></header>
            <ProductForm busy={busyAction === 'create-product'} onCreate={onCreate} />
          </section>
          <section className="manage-card inventory-list-card">
            <header><p className="eyebrow">Current catalog</p><h3>Products</h3></header>
            <ProductList
              products={products}
              loading={productsLoading}
              busyAction={busyAction}
              onDelete={onDelete}
            />
          </section>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <p className="eyebrow">Order service</p>
            <h2>All orders</h2>
          </div>
          <p>{orders.length} across all customer accounts</p>
        </div>
        <OrderHistory orders={orders} loading={ordersLoading} showCustomer />
      </section>
    </div>
  );
}
