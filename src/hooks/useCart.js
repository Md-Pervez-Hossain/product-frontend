import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'form-store-cart';

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function useCart(products) {
  const [lines, setLines] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const items = useMemo(
    () => lines
      .map((line) => ({
        ...line,
        product: products.find((product) => product.id === line.productId),
      }))
      .filter((line) => line.product),
    [lines, products]
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  function add(product, quantity = 1) {
    if (product.stock < 1) return false;

    setLines((current) => {
      const existing = current.find((line) => line.productId === product.id);
      const nextQuantity = Math.min(
        Number(product.stock),
        (existing?.quantity || 0) + Number(quantity)
      );

      if (existing) {
        return current.map((line) => (
          line.productId === product.id ? { ...line, quantity: nextQuantity } : line
        ));
      }

      return [...current, { productId: product.id, quantity: nextQuantity }];
    });

    return true;
  }

  function setProductQuantity(product, quantity) {
    if (product.stock < 1) return false;

    const safeQuantity = Math.max(
      1,
      Math.min(Number(product.stock), Number(quantity) || 1)
    );

    setLines((current) => {
      const existing = current.some((line) => line.productId === product.id);

      if (existing) {
        return current.map((line) => (
          line.productId === product.id ? { ...line, quantity: safeQuantity } : line
        ));
      }

      return [...current, { productId: product.id, quantity: safeQuantity }];
    });

    return true;
  }

  function updateQuantity(productId, quantity) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const safeQuantity = Math.max(1, Math.min(Number(product.stock), Number(quantity)));
    setLines((current) => current.map((line) => (
      line.productId === productId ? { ...line, quantity: safeQuantity } : line
    )));
  }

  function remove(productId) {
    setLines((current) => current.filter((line) => line.productId !== productId));
  }

  function removeMany(productIds) {
    const completed = new Set(productIds);
    setLines((current) => current.filter((line) => !completed.has(line.productId)));
  }

  return {
    items,
    itemCount,
    subtotal,
    add,
    setProductQuantity,
    updateQuantity,
    remove,
    removeMany,
  };
}
