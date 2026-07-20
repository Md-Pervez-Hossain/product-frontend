import { useState } from 'react';

const EMPTY_ORDER = { product_id: '', quantity: '1' };

export function OrderForm({ products, busy, onCreate }) {
  const [form, setForm] = useState(EMPTY_ORDER);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const created = await onCreate({
      product_id: form.product_id,
      quantity: Number(form.quantity),
    });

    if (created) setForm(EMPTY_ORDER);
  }

  return (
    <form className="compact-form order-form" onSubmit={handleSubmit}>
      <label className="field field-wide">
        <span>Product</span>
        <select
          name="product_id"
          value={form.product_id}
          onChange={updateField}
          disabled={!products.length}
          required
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id} disabled={product.stock < 1}>
              {product.name} — {product.stock} available
            </option>
          ))}
        </select>
      </label>
      <label className="field field-wide">
        <span>Quantity</span>
        <input
          type="number"
          name="quantity"
          min="1"
          step="1"
          value={form.quantity}
          onChange={updateField}
          required
        />
      </label>
      <button className="secondary-button field-wide" type="submit" disabled={busy || !products.length}>
        {busy ? 'Placing…' : 'Place order'} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
