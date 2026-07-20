import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ProductArtwork } from '../components/catalog/ProductArtwork.jsx';
import { formatMoney } from '../lib/format.js';

export function ProductPage({ products, loading, onSetCartQuantity, onOpenCart }) {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((item) => item.id === productId);

  if (loading) return <div className="route-loading">Loading product…</div>;

  if (!product) {
    return (
      <section className="not-found store-container">
        <p className="eyebrow">Product unavailable</p>
        <h1>This object could not be found.</h1>
        <Link className="button button-dark" to="/shop">Return to shop <span>→</span></Link>
      </section>
    );
  }

  function addProduct() {
    if (onSetCartQuantity(product, quantity)) onOpenCart();
  }

  return (
    <div className="store-container product-detail-page">
      <div className="product-detail-art">
        <ProductArtwork product={product} size="detail" />
      </div>
      <section className="product-detail-copy">
        <Link className="back-link" to="/shop">← Back to shop</Link>
        <p className="eyebrow">FORM OBJECT / {product.id.slice(-4).toUpperCase()}</p>
        <h1>{product.name}</h1>
        <p className="detail-price">{formatMoney(product.price)}</p>
        <p className="detail-description">
          {product.description || 'A considered everyday object chosen for usefulness and clarity.'}
        </p>
        <dl className="product-facts">
          <div><dt>Availability</dt><dd>{product.stock > 0 ? `${product.stock} in stock` : 'Sold out'}</dd></div>
          <div><dt>Service</dt><dd>Product / 3002</dd></div>
          <div><dt>Identifier</dt><dd>{product.id.slice(-8).toUpperCase()}</dd></div>
        </dl>
        <div className="detail-purchase">
          <label>
            <span>Quantity</span>
            <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
              {Array.from({ length: Math.min(product.stock, 10) }, (_, index) => index + 1).map((value) => (
                <option value={value} key={value}>{value}</option>
              ))}
            </select>
          </label>
          <button
            className="button button-dark button-grow"
            type="button"
            disabled={product.stock < 1}
            onClick={addProduct}
          >
            {product.stock < 1 ? 'Sold out' : 'Add to bag'} <span>+</span>
          </button>
        </div>
        <div className="detail-note">
          <span>01</span>
          <p>Adding to your bag is local. Inventory is reserved only when checkout reaches Order Service.</p>
        </div>
      </section>
    </div>
  );
}
