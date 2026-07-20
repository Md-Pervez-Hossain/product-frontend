import { useMemo, useState } from 'react';
import { ProductGrid } from '../components/catalog/ProductGrid.jsx';

export function ShopPage({ products, loading, onAddToCart }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => (
      product.name.toLowerCase().includes(normalizedQuery)
      || (product.description || '').toLowerCase().includes(normalizedQuery)
    ));

    return [...filtered].sort((left, right) => {
      if (sort === 'price-low') return Number(left.price) - Number(right.price);
      if (sort === 'price-high') return Number(right.price) - Number(left.price);
      if (sort === 'name') return left.name.localeCompare(right.name);
      return 0;
    });
  }, [products, query, sort]);

  return (
    <div className="store-container page-section">
      <header className="catalog-header">
        <div>
          <p className="eyebrow">All objects / {visibleProducts.length}</p>
          <h1>Shop</h1>
          <p>Useful essentials selected without noise.</p>
        </div>
        <div className="catalog-controls">
          <label>
            <span>Search</span>
            <input
              type="search"
              placeholder="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label>
            <span>Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </header>
      <ProductGrid products={visibleProducts} loading={loading} onAddToCart={onAddToCart} />
    </div>
  );
}
