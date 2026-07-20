import { useCallback, useEffect, useState } from 'react';
import { orderApi, productApi } from '../api.js';

export function useCommerce(user) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [busyAction, setBusyAction] = useState('');
  const [error, setError] = useState('');

  const refreshProducts = useCallback(async () => {
    const data = await productApi.list();
    setProducts(data.products);
  }, []);

  const refreshOrders = useCallback(async () => {
    if (!user) {
      setOrders([]);
      return;
    }

    const data = await orderApi.list();
    setOrders(data.orders);
  }, [user]);

  useEffect(() => {
    let active = true;
    setProductsLoading(true);

    productApi.list()
      .then((data) => {
        if (active) setProducts(data.products);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setProductsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    if (!user) {
      setOrders([]);
      setOrdersLoading(false);
      return undefined;
    }

    setOrdersLoading(true);
    orderApi.list()
      .then((data) => {
        if (active) setOrders(data.orders);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setOrdersLoading(false);
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
      await refreshProducts();
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

  async function checkout(items) {
    setBusyAction('checkout');
    setError('');
    const completedProductIds = [];

    try {
      for (const item of items) {
        await orderApi.create({ product_id: item.product.id, quantity: item.quantity });
        completedProductIds.push(item.product.id);
      }

      await Promise.all([refreshProducts(), refreshOrders()]);
      return { success: true, completedProductIds };
    } catch (requestError) {
      setError(
        completedProductIds.length
          ? `${requestError.message}. Completed items were removed from your bag.`
          : requestError.message
      );
      await Promise.allSettled([refreshProducts(), refreshOrders()]);
      return { success: false, completedProductIds };
    } finally {
      setBusyAction('');
    }
  }

  function clearError() {
    setError('');
  }

  return {
    products,
    orders,
    productsLoading,
    ordersLoading,
    busyAction,
    error,
    createProduct,
    deleteProduct,
    checkout,
    clearError,
  };
}
