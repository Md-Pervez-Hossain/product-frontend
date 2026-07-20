import { Link } from 'react-router';
import { formatMoney } from '../../lib/format.js';
import { ProductArtwork } from './ProductArtwork.jsx';

export function ProductCard({ product, onAddToCart }) {
  const soldOut = Number(product.stock) < 1;

  return (
    <article className="product-card" data-testid={`product-card-${product.id}`}>
      <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <ProductArtwork product={product} />
      </Link>
      <div className="product-card-copy">
        <div>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
          <p>{product.description || 'A considered everyday object.'}</p>
        </div>
        <strong>{formatMoney(product.price)}</strong>
      </div>
      <button
        className="card-add"
        type="button"
        disabled={soldOut}
        onClick={() => onAddToCart(product)}
      >
        {soldOut ? 'Sold out' : 'Add to bag'} <span>{soldOut ? '—' : '+'}</span>
      </button>
    </article>
  );
}
