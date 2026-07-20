import { useEffect, useState } from 'react';
import { ModalShell } from '../ui/ModalShell.jsx';

const EMPTY_FORM = { name: '', email: '', password: '' };

export function AuthModal({ open, busy, error, onClose, onSubmit }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!open) setForm(EMPTY_FORM);
  }, [open]);

  function changeMode(nextMode) {
    setMode(nextMode);
    setForm(EMPTY_FORM);
  }

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const authenticated = await onSubmit(mode, form);
    if (authenticated) onClose();
  }

  return (
    <ModalShell
      open={open}
      title={mode === 'login' ? 'Welcome back' : 'Join FORM'}
      label="Your account"
      onClose={onClose}
    >
      <div className="auth-switch" aria-label="Authentication mode">
        <button
          type="button"
          className={mode === 'login' ? 'active' : ''}
          onClick={() => changeMode('login')}
        >
          Sign in
        </button>
        <button
          type="button"
          className={mode === 'register' ? 'active' : ''}
          onClick={() => changeMode('register')}
        >
          Register
        </button>
      </div>

      {error && <p className="modal-error" role="alert">{error}</p>}

      <form className="modal-form" onSubmit={handleSubmit} data-testid="auth-form">
        {mode === 'register' && (
          <label className="form-field">
            <span>Name</span>
            <input name="name" value={form.name} onChange={updateField} autoComplete="name" required />
          </label>
        )}
        <label className="form-field">
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
        <label className="form-field">
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
        <button className="button button-dark button-full" type="submit" disabled={busy}>
          {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          <span>→</span>
        </button>
      </form>
    </ModalShell>
  );
}
