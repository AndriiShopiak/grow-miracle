"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { getProductPrice } from "@/utils/productUtils";
import { cultivars } from "@/data/products";

export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  qty: number;
  availability: 'in_stock' | 'out_of_stock' | 'limited';
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "add"; item: Omit<CartItem, "qty">; qty?: number }
  | { type: "remove"; id: number }
  | { type: "inc"; id: number }
  | { type: "dec"; id: number }
  | { type: "clear" };

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      // Перевіряємо наявність товару перед додаванням
      if (action.item.availability === 'out_of_stock') {
        return state; // Не додаємо товар, якого немає в наявності
      }
      
      const qtyToAdd = action.qty ?? 1;
      const idx = state.items.findIndex((i) => i.id === action.item.id);
      if (idx >= 0) {
        const newItems = [...state.items];
        newItems[idx] = { ...newItems[idx], qty: newItems[idx].qty + qtyToAdd };
        return { items: newItems };
      }
      return { items: [...state.items, { ...action.item, qty: qtyToAdd }] };
    }
    case "remove":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "inc":
      return {
        items: state.items.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i)),
      };
    case "dec":
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
          .filter((i) => i.qty > 0),
      };
    case "clear":
      return initialState;
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: number) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load from localStorage after hydration
    try {
      const raw = localStorage.getItem("cart:v1");
      if (raw) {
        const savedState = JSON.parse(raw) as CartState;
        if (savedState.items.length > 0) {
          // Restore saved state with dynamic pricing and availability
          savedState.items.forEach(item => {
            // Find the product in our database to get the current price and availability
            const product = cultivars.find(p => p.id === item.id);
            const price = product ? getProductPrice(product) : (item.price || 800);
            const availability = product ? product.availability : 'in_stock';
            
            // Додаємо товар тільки якщо він є в наявності
            if (availability !== 'out_of_stock') {
              dispatch({ type: "add", item: { id: item.id, title: item.title, image: item.image, price, availability }, qty: item.qty });
            }
          });
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("cart:v1", JSON.stringify(state));
    } catch {}
  }, [state, isHydrated]);

  const value = useMemo<CartContextType>(() => {
    const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
    return {
      items: state.items,
      totalItems: isHydrated ? totalItems : 0,
      add: (item, qty) => dispatch({ type: "add", item, qty }),
      remove: (id) => dispatch({ type: "remove", id }),
      inc: (id) => dispatch({ type: "inc", id }),
      dec: (id) => dispatch({ type: "dec", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state, isHydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}



