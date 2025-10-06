"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  id: number;
  title: string;
  image: string;
  qty: number;
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
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window === "undefined") return initialState;
    try {
      const raw = localStorage.getItem("cart:v1");
      return raw ? (JSON.parse(raw) as CartState) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<CartContextType>(() => {
    const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
    return {
      items: state.items,
      totalItems,
      add: (item, qty) => dispatch({ type: "add", item, qty }),
      remove: (id) => dispatch({ type: "remove", id }),
      inc: (id) => dispatch({ type: "inc", id }),
      dec: (id) => dispatch({ type: "dec", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}



