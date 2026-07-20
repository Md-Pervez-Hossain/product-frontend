import { AppHeader } from './components/layout/AppHeader.jsx';
import { AuthPanel } from './components/auth/AuthPanel.jsx';
import { Dashboard } from './components/dashboard/Dashboard.jsx';
import { FeedbackBanner } from './components/ui/FeedbackBanner.jsx';
import { PageLoader } from './components/ui/PageLoader.jsx';
import { useAuthSession } from './hooks/useAuthSession.js';
import { useCommerce } from './hooks/useCommerce.js';

export default function App() {
  const session = useAuthSession();
  const commerce = useCommerce(session.user);
  const error = session.error || commerce.error;

  if (session.initializing) {
    return <PageLoader />;
  }

  return (
    <div className="page-shell">
      <AppHeader user={session.user} onLogout={session.logout} />

      <main className="page-content">
        {error && <FeedbackBanner message={error} />}

        {session.user ? (
          <Dashboard
            products={commerce.products}
            orders={commerce.orders}
            loading={commerce.loading}
            busyAction={commerce.busyAction}
            onCreateProduct={commerce.createProduct}
            onDeleteProduct={commerce.deleteProduct}
            onCreateOrder={commerce.createOrder}
          />
        ) : (
          <AuthPanel busy={session.busy} onSubmit={session.authenticate} />
        )}
      </main>
    </div>
  );
}
