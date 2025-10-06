"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";

export default function CartLink() {
  const { totalItems } = useCart();
  
  return (
    <Link 
      href="/cart" 
      className={`fixed bottom-6 right-6 z-50 bg-accent hover:bg-light-accent text-white p-4 rounded-full shadow-lg transition-all duration-500 hover:scale-110 group ${
        totalItems > 0 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
      title="Кошик"
    >
      <div className="relative">
        {/* Іконка кошика */}
        <Image 
          src="/icons/grocery-store.png" 
          alt="Кошик" 
          width={24} 
          height={24}
          className="w-6 h-6"
        />
        
        {/* Лічильник товарів */}
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
}



