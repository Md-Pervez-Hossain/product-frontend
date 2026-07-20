import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { AuthModal } from './components/auth/AuthModal.jsx';
import { CartDrawer } from './components/cart/CartDrawer.jsx';
import { StoreFooter } from './components/layout/StoreFooter.jsx';
import { StoreHeader } from './components/layout/StoreHeader.jsx';
import { FeedbackBanner } from './components/ui/FeedbackBanner.jsx';
import { PageLoader } from './components/ui/PageLoader.jsx';
import { useAuthSession } from './hooks/useAuthSession.js';
import { useCart } from './hooks/useCart.js';
import { useCommerce } from './hooks/useCommerce.js';
import { HomePage } from './pages/HomePage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { ShopPage } from './pages/ShopPage.jsx';

export default function App() {
  const navigate = useNavigate();
  const session = useAuthSession();
  const commerce = useCommerce(session.user);
  const cart = useCart(commerce.products);
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const error = session.error || commerce.error;

  if (session.initializing) return <PageLoader />;

  function openAuth() {
    session.clearError();
    setAuthOpen(true);
  }

  async function checkout() {
    if (!session.user) {
      setCartOpen(false);
      openAuth();
      return;
    }

    const result = await commerce.checkout(cart.items);
    cart.removeMany(result.completedProductIds);

    if (result.success) {
      setCartOpen(false);
      navigate('/dashboard');
    }
  }

  function dismissError() {
    session.clearError();
    commerce.clearError();
  }

  return (
    <div className="store-app">
      <StoreHeader
        user={session.user}
        cartCount={cart.itemCount}
        onOpenAuth={openAuth}
        onOpenCart={() => setCartOpen(true)}
        onLogout={session.logout}
      />

      {error && <FeedbackBanner message={error} onDismiss={dismissError} />}

      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage
                products={commerce.products}
                loading={commerce.productsLoading}
                onAddToCart={cart.add}
              />
            )}
          />
          <Route
            path="/shop"
            element={(
              <ShopPage
                products={commerce.products}
                loading={commerce.productsLoading}
                onAddToCart={cart.add}
              />
            )}
          />
          <Route
            path="/products/:productId"
            element={(
              <ProductPage
                products={commerce.products}
                loading={commerce.productsLoading}
                onSetCartQuantity={cart.setProductQuantity}
                onOpenCart={() => setCartOpen(true)}
              />
            )}
          />
          <Route
            path="/dashboard"
            element={(
              <DashboardPage
                user={session.user}
                products={commerce.products}
                orders={commerce.orders}
                productsLoading={commerce.productsLoading}
                ordersLoading={commerce.ordersLoading}
                busyAction={commerce.busyAction}
                onCreate={commerce.createProduct}
                onDelete={commerce.deleteProduct}
                onOpenAuth={openAuth}
              />
            )}
          />
          <Route path="/orders" element={<Navigate to="/dashboard" replace />} />
          <Route path="/manage" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <StoreFooter />

      <AuthModal
        open={authOpen}
        busy={session.busy}
        error={session.error}
        onClose={() => setAuthOpen(false)}
        onSubmit={session.authenticate}
      />
      <CartDrawer
        open={cartOpen}
        user={session.user}
        items={cart.items}
        itemCount={cart.itemCount}
        subtotal={cart.subtotal}
        busy={commerce.busyAction === 'checkout'}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.remove}
        onCheckout={checkout}
      />
    </div>
  );
}
