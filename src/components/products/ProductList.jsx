import { formatMoney } from '../../lib/format.js';
import { EmptyState } from '../ui/EmptyState.jsx';

export function ProductList({ products, loading, busyAction, onDelete }) {
  if (loading) return <p className="loading-copy">Loading products…</p>;
  if (!products.length) return <EmptyState message="No products yet." />;

  return (
    <ul className="record-list">
      {products.map((product) => {
        const deleting = busyAction === `delete-product-${product.id}`;

        return (
          <li key={product.id} className="record-row">
            <div className="record-main">
              <strong>{product.name}</strong>
              <p>{product.description || 'No description'}</p>
            </div>
            <div className="record-metric">
              <span>{formatMoney(product.price)}</span>
              <small>{product.stock} in stock</small>
            </div>
            <button
              className="icon-button"
              type="button"
              aria-label={`Delete ${product.name}`}
              title={`Delete ${product.name}`}
              disabled={deleting}
              onClick={() => onDelete(product.id)}
            >
              {deleting ? '…' : '×'}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
