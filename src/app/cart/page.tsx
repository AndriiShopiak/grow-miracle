"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import OrderForm from "@/components/OrderForm";

export default function CartPage() {
  const { items, inc, dec, remove, clear, totalItems } = useCart();

  const isEmpty = items.length === 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-secondary mb-6">Кошик</h1>
      {isEmpty ? (
        <div className="bg-white rounded-xl p-8 text-center shadow">
          <p className="text-gray-700 mb-4">Ваш кошик порожній</p>
          <Link href="/" className="inline-block rounded-lg bg-primary px-5 py-2 text-white hover:bg-secondary transition-colors">
            До каталогу
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white rounded-xl p-4 shadow items-center">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-secondary">{item.title}</h2>
                  <div className="mt-2 inline-flex items-center rounded-md border border-gray-300">
                    <button onClick={() => dec(item.id)} className="px-3 py-1 hover:bg-gray-100">-</button>
                    <span className="px-4">{item.qty}</span>
                    <button onClick={() => inc(item.id)} className="px-3 py-1 hover:bg-gray-100">+</button>
                  </div>
                </div>
                <button onClick={() => remove(item.id)} className="text-sm text-red-600 hover:underline">Видалити</button>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-xl font-semibold text-secondary mb-4">Підсумок</h3>
              <p className="text-gray-700 mb-6">Позицій: {totalItems}</p>
              <button onClick={clear} className="w-full rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                Очистити кошик
              </button>
            </div>
            <OrderForm />
          </div>
        </div>
      )}
    </div>
  );
}



