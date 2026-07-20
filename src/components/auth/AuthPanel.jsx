import { useState } from 'react';

const EMPTY_FORM = { name: '', email: '', password: '' };

export function AuthPanel({ busy, onSubmit }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(EMPTY_FORM);

  function changeMode(nextMode) {
    setMode(nextMode);
    setForm(EMPTY_FORM);
  }

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit(mode, form);
  }

  return (
    <section className="auth-layout" aria-labelledby="auth-title">
      <div className="auth-intro">
        <p className="section-label">PRIVATE WORKSPACE</p>
        <h1 id="auth-title">Small services.<br />Clear boundaries.</h1>
        <p>
          One minimal workspace for products, orders, and the request path between them.
        </p>
      </div>

      <div className="auth-panel">
        <div className="auth-tabs" aria-label="Authentication mode">
          <button
            type="button"
            className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => changeMode('login')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => changeMode('register')}
          >
            Create account
          </button>
        </div>

        <form className="form-stack" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label className="field">
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                autoComplete="name"
                required
              />
            </label>
          )}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={updateField}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength="8"
              required
            />
          </label>

          <button className="primary-button" type="submit" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'login' ? 'Enter workspace' : 'Create account'}
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
