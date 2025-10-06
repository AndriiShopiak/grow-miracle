"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";

export default function CartLink() {
  const { totalItems } = useCart();
  return (
    <Link href="/cart" className="relative inline-flex items-center gap-2 text-white">
      <span className="hidden sm:inline">Кошик</span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-sm">
        {totalItems}
      </span>
    </Link>
  );
}



