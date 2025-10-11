"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import OrderForm from "@/components/OrderForm";
import { useState } from "react";

export default function CartPage() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { items, inc, dec, remove, clear, totalItems } = useCart();
  const formatCurrency = (value: number) => `${value.toLocaleString("uk-UA")} грн`;
  const totalAmount = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const isEmpty = items.length === 0;

  if (submitStatus === "success") {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow mt-10">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-secondary mb-4">Замовлення прийнято!</h3>
        <p className="text-gray-700 mb-6">
          Дякуємо за замовлення! Ми зв&apos;яжемося з вами найближчим часом.
        </p>
        <Link href="/" onClick={clear} className="inline-block rounded-lg bg-primary px-5 py-2 text-white hover:bg-secondary transition-colors">
          Продовжити покупки
        </Link>
      </div>
    );
  }
  if (submitStatus === "error") {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Помилка при відправці замовлення. Спробуйте ще раз або зв&apos;яжіться з нами по телефону.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">Кошик</h1>
      {isEmpty ? (
        <div className="bg-white rounded-xl p-8 text-center shadow">
          <p className="text-gray-700 mb-4">Ваш кошик порожній</p>
          <Link href="/" className="inline-block rounded-lg bg-primary px-5 py-2 text-white hover:bg-secondary transition-colors">
            До каталогу
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 sm:gap-4 bg-white rounded-xl p-3 sm:p-4 shadow items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-secondary truncate">{item.title}</h2>
                  <div className="mt-1 text-xs sm:text-sm text-gray-600">Ціна: <span className="font-medium text-secondary">{formatCurrency(item.price)}</span></div>
                  <div className="mt-2 inline-flex items-center rounded-md border border-gray-300">
                    <button onClick={() => dec(item.id)} className="px-2 sm:px-3 py-1 hover:bg-gray-100 text-sm">-</button>
                    <span className="px-2 sm:px-4 text-sm">{item.qty}</span>
                    <button onClick={() => inc(item.id)} className="px-2 sm:px-3 py-1 hover:bg-gray-100 text-sm">+</button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs sm:text-sm text-gray-500">Сума</div>
                  <div className="text-sm sm:text-base font-semibold text-secondary">{formatCurrency(item.qty * item.price)}</div>
                </div>
                <button onClick={() => remove(item.id)} className="text-xs sm:text-sm text-red-600 hover:underline flex-shrink-0">Видалити</button>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-xl font-semibold text-secondary mb-4">Підсумок</h3>
              <p className="text-gray-700">Позицій: {totalItems}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-gray-700">До сплати:</span>
                <span className="text-2xl font-bold text-secondary">{formatCurrency(totalAmount)}</span>
              </div>
              <button onClick={clear} className="w-full rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                Очистити кошик
              </button>
            </div>
            <OrderForm setSubmitStatus={setSubmitStatus} />
          </div>
        </div>
      )}
    </div>
  );
}



