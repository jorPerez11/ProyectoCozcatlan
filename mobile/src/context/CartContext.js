import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext(null);
const CART_KEY = "cozcatlan_cart";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};

// items: [{ id, quantity }]
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(CART_KEY);
        setItems(raw ? JSON.parse(raw) : []);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = useCallback(async (next) => {
    setItems(next);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(next));
  }, []);

  // Devuelve { ok: true } o { ok: false, reason } si excede el stock disponible.
  const addItem = useCallback(
    async (productId, quantity, stock) => {
      const existing = items.find((item) => item.id === productId);
      const currentInCart = existing ? existing.quantity : 0;
      const proposed = currentInCart + quantity;

      if (typeof stock === "number" && proposed > stock) {
        const available = stock - currentInCart;
        return { ok: false, available: Math.max(available, 0) };
      }

      const next = existing
        ? items.map((item) => (item.id === productId ? { ...item, quantity: proposed } : item))
        : [...items, { id: productId, quantity }];

      await persist(next);
      return { ok: true };
    },
    [items, persist],
  );

  const updateQuantity = useCallback(
    async (productId, delta) => {
      const next = items.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
      );
      await persist(next);
    },
    [items, persist],
  );

  const removeItem = useCallback(
    async (productId) => {
      await persist(items.filter((item) => item.id !== productId));
    },
    [items, persist],
  );

  const clear = useCallback(async () => {
    await persist([]);
  }, [persist]);

  return (
    <CartContext.Provider value={{ items, loaded, addItem, updateQuantity, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
