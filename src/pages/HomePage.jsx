import { Link } from 'react-router';
import { ProductGrid } from '../components/catalog/ProductGrid.jsx';
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder.jsx';

export function HomePage({ products, loading, onAddToCart }) {
  return (
    <>
      <section className="home-hero store-container">
        <div className="hero-copy">
          <p className="eyebrow">Collection 01 / Everyday essentials</p>
          <h1>Simple objects<br />for daily use.</h1>
          <p className="hero-description">
            A focused collection of useful products, presented through a storefront powered by
            independent authentication, product, and order services.
          </p>
          <Link className="button button-dark" to="/shop">
            Shop all products <span>→</span>
          </Link>
        </div>

        <ImagePlaceholder
          className="hero-image-placeholder"
          label="Home page hero image placeholder"
          hint="Recommended 1600 × 1200"
        />
      </section>

      <section className="featured-section store-container">
        <header className="section-heading">
          <div>
            <p className="eyebrow">Featured products</p>
            <h2>Shop the collection</h2>
          </div>
          <Link className="text-link" to="/shop">View all products</Link>
        </header>

        <ProductGrid
          products={products.slice(0, 4)}
          loading={loading}
          onAddToCart={onAddToCart}
        />

        <div className="home-notes">
          <p>Secure sign-in through Auth Gateway</p>
          <p>Live inventory from Product Service</p>
          <p>Order history from Order Service</p>
        </div>
      </section>
    </>
  );
}
