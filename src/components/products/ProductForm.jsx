import { useState } from 'react';

const EMPTY_PRODUCT = { name: '', description: '', price: '', stock: '' };

export function ProductForm({ busy, onCreate }) {
  const [form, setForm] = useState(EMPTY_PRODUCT);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const created = await onCreate({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock || 0),
    });

    if (created) setForm(EMPTY_PRODUCT);
  }

  return (
    <form className="compact-form" onSubmit={handleSubmit}>
      <label className="field field-wide">
        <span>Product name</span>
        <input name="name" value={form.name} onChange={updateField} required />
      </label>
      <label className="field field-wide">
        <span>Description <em>optional</em></span>
        <input name="description" value={form.description} onChange={updateField} />
      </label>
      <label className="field">
        <span>Price</span>
        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          value={form.price}
          onChange={updateField}
          required
        />
      </label>
      <label className="field">
        <span>Stock</span>
        <input
          type="number"
          name="stock"
          min="0"
          step="1"
          value={form.stock}
          onChange={updateField}
        />
      </label>
      <button className="primary-button field-wide" type="submit" disabled={busy}>
        {busy ? 'Adding…' : 'Add product'} <span aria-hidden="true">+</span>
      </button>
    </form>
  );
}
