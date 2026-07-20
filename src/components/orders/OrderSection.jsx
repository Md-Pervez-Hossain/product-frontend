import { OrderForm } from './OrderForm.jsx';
import { OrderList } from './OrderList.jsx';

export function OrderSection({ products, orders, loading, busy, onCreate }) {
  return (
    <section className="workspace-panel" aria-labelledby="orders-title">
      <div className="panel-heading">
        <div>
          <p className="section-label">ORDER SERVICE / 3003</p>
          <h2 id="orders-title">Orders</h2>
        </div>
        <span>{orders.length.toString().padStart(2, '0')}</span>
      </div>

      <OrderForm products={products} busy={busy} onCreate={onCreate} />
      <OrderList orders={orders} loading={loading} />
    </section>
  );
}
