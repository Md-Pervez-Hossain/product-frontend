import { ProductForm } from './ProductForm.jsx';
import { ProductList } from './ProductList.jsx';

export function ProductSection({ products, loading, busyAction, onCreate, onDelete }) {
  return (
    <section className="workspace-panel" aria-labelledby="products-title">
      <div className="panel-heading">
        <div>
          <p className="section-label">PRODUCT SERVICE / 3002</p>
          <h2 id="products-title">Products</h2>
        </div>
        <span>{products.length.toString().padStart(2, '0')}</span>
      </div>

      <ProductForm busy={busyAction === 'create-product'} onCreate={onCreate} />
      <ProductList
        products={products}
        loading={loading}
        busyAction={busyAction}
        onDelete={onDelete}
      />
    </section>
  );
}
