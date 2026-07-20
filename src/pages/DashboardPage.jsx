import { ProtectedPrompt } from '../components/auth/ProtectedPrompt.jsx';
import { AdminDashboard } from '../components/dashboard/AdminDashboard.jsx';
import { UserDashboard } from '../components/dashboard/UserDashboard.jsx';

export function DashboardPage(props) {
  if (!props.user) {
    return (
      <ProtectedPrompt
        eyebrow="Account dashboard"
        title="Your account lives here."
        copy="Sign in to access the dashboard assigned to your account role."
        onOpenAuth={props.onOpenAuth}
      />
    );
  }

  if (props.user.role === 'admin') {
    return (
      <AdminDashboard
        user={props.user}
        products={props.products}
        orders={props.orders}
        productsLoading={props.productsLoading}
        ordersLoading={props.ordersLoading}
        busyAction={props.busyAction}
        onCreate={props.onCreate}
        onDelete={props.onDelete}
      />
    );
  }

  return <UserDashboard user={props.user} orders={props.orders} loading={props.ordersLoading} />;
}
