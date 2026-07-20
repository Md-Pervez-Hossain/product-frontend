import { useState } from 'react';
import { Link, NavLink } from 'react-router';

export function StoreHeader({ user, cartCount, onOpenAuth, onOpenCart, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function navClass({ isActive }) {
    return isActive ? 'store-nav-link active' : 'store-nav-link';
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="announcement">Independent services. One considered storefront.</div>
      <header className="store-header">
        <Link className="store-logo" to="/" onClick={closeMenu}>
          FORM<span>®</span>
        </Link>

        <nav className={menuOpen ? 'store-nav open' : 'store-nav'} aria-label="Main navigation">
          <NavLink className={navClass} to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink className={navClass} to="/shop" onClick={closeMenu}>Shop</NavLink>
          <NavLink className={navClass} to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="account-action">
              <span>{user.name} · {user.role}</span>
              <button type="button" onClick={onLogout}>Log out</button>
            </div>
          ) : (
            <button className="header-action" type="button" onClick={onOpenAuth}>
              Sign in
            </button>
          )}
          <button
            className="header-action bag-action"
            type="button"
            data-testid="open-cart"
            onClick={onOpenCart}
          >
            Bag <span>{cartCount}</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>
    </>
  );
}
