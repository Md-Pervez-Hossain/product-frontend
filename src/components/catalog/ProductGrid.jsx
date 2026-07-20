import { ProductCard } from './ProductCard.jsx';

export function ProductGrid({ products, loading, onAddToCart }) {
  if (loading) {
    return (
      <div className="product-grid" aria-label="Loading products">
        {[0, 1, 2, 3].map((item) => <div className="product-skeleton" key={item} />)}
      </div>
    );
  }

  if (!products.length) {
    return <div className="catalog-empty">No products match your selection.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard product={product} onAddToCart={onAddToCart} key={product.id} />
      ))}
    </div>
  );
}
