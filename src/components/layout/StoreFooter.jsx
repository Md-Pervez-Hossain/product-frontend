import { Link } from 'react-router';

export function StoreFooter() {
  return (
    <footer className="store-footer">
      <div>
        <Link className="footer-logo" to="/">FORM®</Link>
        <p>A learning storefront built on independent services.</p>
      </div>
      <div className="footer-links">
        <Link to="/shop">Shop</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="service-note">
        <span>AUTH / 3000</span>
        <span>PRODUCT / 3002</span>
        <span>ORDER / 3003</span>
      </div>
    </footer>
  );
}
