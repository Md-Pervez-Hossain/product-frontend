import { useEffect, useState } from 'react';
import { authApi, clearToken, getToken, orderApi, productApi, setToken } from './api.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', stock: '' });
  const [orderForm, setOrderForm] = useState({ product_id: '', quantity: '1' });

  async function loadData(currentUser) {
    const productData = await productApi.list();
    setProducts(productData.products);

    if (currentUser) {
      const orderData = await orderApi.list();
      setOrders(orderData.orders);
    } else {
      setOrders([]);
    }
  }

  useEffect(() => {
    async function bootstrap() {
      if (!getToken()) return;

      try {
        const data = await authApi.me();
        setUser(data.user);
        await loadData(data.user);
      } catch {
        clearToken();
      }
    }

    bootstrap();
  }, []);

  async function handleAuth(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data =
        authMode === 'login'
          ? await authApi.login({ email: form.email, password: form.password })
          : await authApi.register(form);

      setToken(data.token);
      setUser(data.user);
      await loadData(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearToken();
    setUser(null);
    setOrders([]);
    setError('');
  }

  async function handleCreateProduct(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await productApi.create({
        name: productForm.name,
        description: productForm.description,
        price: Number(productForm.price),
        stock: Number(productForm.stock || 0),
      });
      setProductForm({ name: '', description: '', price: '', stock: '' });
      await loadData(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduct(id) {
    setError('');
    setLoading(true);

    try {
      await productApi.remove(id);
      await loadData(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateOrder(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await orderApi.create({
        // MongoDB identifiers are strings; converting this to Number produced null/NaN.
        product_id: orderForm.product_id,
        quantity: Number(orderForm.quantity),
      });
      setOrderForm({ product_id: '', quantity: '1' });
      await loadData(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Nginx + Docker Learning Project</p>
          <h1>Multi-Service Deployment Demo</h1>
          <p className="subtitle">
            Frontend → Main Server (Auth) → Product / Order services → MongoDB
          </p>
        </div>
        {user && (
          <div className="user-chip">
            <span>{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      {error && <div className="error-banner">{error}</div>}

      {!user ? (
        <section className="card">
          <div className="tabs">
            <button
              className={authMode === 'login' ? 'active' : ''}
              onClick={() => setAuthMode('login')}
            >
              Login
            </button>
            <button
              className={authMode === 'register' ? 'active' : ''}
              onClick={() => setAuthMode('register')}
            >
              Register
            </button>
          </div>
          <form onSubmit={handleAuth} className="stack">
            {authMode === 'register' && (
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button disabled={loading}>{authMode === 'login' ? 'Login' : 'Register'}</button>
          </form>
        </section>
      ) : (
        <div className="grid">
          <section className="card">
            <h2>Products</h2>
            <form onSubmit={handleCreateProduct} className="stack compact">
              <input
                placeholder="Name"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                required
              />
              <input
                placeholder="Description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              />
              <div className="row">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                />
              </div>
              <button disabled={loading}>Create Product</button>
            </form>
            <ul className="list">
              {products.map((product) => (
                <li key={product.id}>
                  <div>
                    <strong>{product.name}</strong>
                    <p>${Number(product.price).toFixed(2)} · stock {product.stock}</p>
                  </div>
                  <button className="danger" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2>Orders</h2>
            <form onSubmit={handleCreateOrder} className="stack compact">
              <select
                value={orderForm.product_id}
                onChange={(e) => setOrderForm({ ...orderForm, product_id: e.target.value })}
                required
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (${Number(product.price).toFixed(2)})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={orderForm.quantity}
                onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                required
              />
              <button disabled={loading}>Create Order</button>
            </form>
            <ul className="list">
              {orders.map((order) => (
                <li key={order.id}>
                  <div>
                    <strong>{order.product_name}</strong>
                    <p>
                      Qty {order.quantity} · ${Number(order.total_price).toFixed(2)} · {order.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      
    </div>
  );
}
