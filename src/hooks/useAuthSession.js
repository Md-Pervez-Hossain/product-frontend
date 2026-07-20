import { useEffect, useState } from 'react';
import { authApi, clearToken, getToken, setToken } from '../api.js';

export function useAuthSession() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      if (!getToken()) {
        setInitializing(false);
        return;
      }

      try {
        const data = await authApi.me();
        if (active) {
          if (data.token) setToken(data.token);
          setUser(data.user);
        }
      } catch {
        clearToken();
      } finally {
        if (active) setInitializing(false);
      }
    }

    restoreSession();
    return () => {
      active = false;
    };
  }, []);

  async function authenticate(mode, form) {
    setBusy(true);
    setError('');

    try {
      const data = mode === 'login'
        ? await authApi.login({ email: form.email, password: form.password })
        : await authApi.register(form);

      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    clearToken();
    setUser(null);
    setError('');
  }

  function clearError() {
    setError('');
  }

  return { user, initializing, busy, error, authenticate, logout, clearError };
}
