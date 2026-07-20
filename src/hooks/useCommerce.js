import { useCallback, useEffect, useState } from 'react';
import { orderApi, productApi } from '../api.js';

export function useCommerce(user) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busyAction, setBusyAction] = useState('');
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    if (!user) return;

    const [productData, orderData] = await Promise.all([
      productApi.list(),
      orderApi.list(),
    ]);

    setProducts(productData.products);
    setOrders(orderData.orders);
  }, [user]);

  useEffect(() => {
    let active = true;

    if (!user) {
      setProducts([]);
      setOrders([]);
      setError('');
      return undefined;
    }

    setLoading(true);
    setError('');

    Promise.all([productApi.list(), orderApi.list()])
      .then(([productData, orderData]) => {
        if (!active) return;
        setProducts(productData.products);
        setOrders(orderData.orders);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  async function runAction(actionName, request) {
    setBusyAction(actionName);
    setError('');

    try {
      await request();
      await refresh();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setBusyAction('');
    }
  }

  function createProduct(product) {
    return runAction('create-product', () => productApi.create(product));
  }

  function deleteProduct(id) {
    return runAction(`delete-product-${id}`, () => productApi.remove(id));
  }

  function createOrder(order) {
    return runAction('create-order', () => orderApi.create(order));
  }

  return {
    products,
    orders,
    loading,
    busyAction,
    error,
    createProduct,
    deleteProduct,
    createOrder,
  };
}
