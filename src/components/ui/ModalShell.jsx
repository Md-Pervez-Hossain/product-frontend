import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function ModalShell({ open, title, label, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-label={label || title}>
        <header className="modal-header">
          <div>
            {label && <p className="eyebrow">{label}</p>}
            <h2>{title}</h2>
          </div>
          <button className="close-button" type="button" aria-label="Close" onClick={onClose}>×</button>
        </header>
        {children}
      </section>
    </div>,
    document.body
  );
}
