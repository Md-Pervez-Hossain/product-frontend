import { OrderSection } from '../orders/OrderSection.jsx';
import { ProductSection } from '../products/ProductSection.jsx';
import { StatStrip } from './StatStrip.jsx';

export function Dashboard(props) {
  const totalStock = props.products.reduce((sum, product) => sum + Number(product.stock), 0);

  return (
    <div className="dashboard">
      <section className="dashboard-heading">
        <div>
          <p className="section-label">OPERATIONS</p>
          <h1>Inventory & orders</h1>
        </div>
        <p>Manage two services through one authenticated gateway.</p>
      </section>

      <StatStrip
        productCount={props.products.length}
        totalStock={totalStock}
        orderCount={props.orders.length}
      />

      <div className="workspace-grid">
        <ProductSection
          products={props.products}
          loading={props.loading}
          busyAction={props.busyAction}
          onCreate={props.onCreateProduct}
          onDelete={props.onDeleteProduct}
        />
        <OrderSection
          products={props.products}
          orders={props.orders}
          loading={props.loading}
          busy={props.busyAction === 'create-order'}
          onCreate={props.onCreateOrder}
        />
      </div>
    </div>
  );
}
