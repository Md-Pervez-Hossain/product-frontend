import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { formatMoney } from '../../lib/format.js';

export function CartDrawer(props) {
  useEffect(() => {
    if (!props.open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') props.onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.open, props.onClose]);

  if (!props.open) return null;

  return createPortal(
    <div className="drawer-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) props.onClose();
    }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <header className="drawer-header">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2>Bag <span>{props.itemCount}</span></h2>
          </div>
          <button className="close-button" type="button" aria-label="Close bag" onClick={props.onClose}>×</button>
        </header>

        <div className="cart-lines" data-testid="cart-lines">
          {!props.items.length ? (
            <div className="cart-empty">
              <span>0</span>
              <h3>Your bag is empty</h3>
              <p>Thoughtful objects are waiting in the shop.</p>
              <button className="text-link" type="button" onClick={props.onClose}>Continue shopping</button>
            </div>
          ) : props.items.map((item) => (
            <article className="cart-line" key={item.product.id}>
              <div className="cart-thumb" aria-hidden="true">
                {item.product.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="cart-line-copy">
                <h3>{item.product.name}</h3>
                <p>{formatMoney(item.product.price)}</p>
                <div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                  <button
                    type="button"
                    aria-label={`Decrease ${item.product.name} quantity`}
                    onClick={() => props.onUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >−</button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.product.name} quantity`}
                    onClick={() => props.onUpdateQuantity(item.product.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                  >+</button>
                </div>
              </div>
              <button
                className="remove-line"
                type="button"
                onClick={() => props.onRemove(item.product.id)}
              >Remove</button>
            </article>
          ))}
        </div>

        {!!props.items.length && (
          <footer className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <strong>{formatMoney(props.subtotal)}</strong>
            </div>
            <p>Taxes and delivery are calculated for this learning demo at checkout.</p>
            <button
              className="button button-dark button-full"
              type="button"
              data-testid="checkout-button"
              disabled={props.busy}
              onClick={props.onCheckout}
            >
              {props.busy ? 'Processing…' : props.user ? 'Place order' : 'Sign in to checkout'}
              <span>→</span>
            </button>
          </footer>
        )}
      </aside>
    </div>,
    document.body
  );
}
