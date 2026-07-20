const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  return data;
}

export const authApi = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/auth/me'),
};

export const productApi = {
  list: () => request('/products/products'),
  create: (body) => request('/products/products', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) =>
    request(`/products/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id) => request(`/products/products/${id}`, { method: 'DELETE' }),
};

export const orderApi = {
  list: () => request('/orders/orders'),
  create: (body) => request('/orders/orders', { method: 'POST', body: JSON.stringify(body) }),
};
