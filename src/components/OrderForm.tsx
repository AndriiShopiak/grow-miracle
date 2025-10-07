"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";

interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  comments?: string;
}

interface OrderFormProps {
  onOrderSent?: () => void;
}

export default function OrderForm({ onOrderSent }: OrderFormProps) {
  const { items, clear } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    comments: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customerInfo,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        clear();
        if (onOrderSent) {
          onOrderSent();
        }
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow">
        <p className="text-gray-700 mb-4">Ваш кошик порожній</p>
        <a href="/" className="inline-block rounded-lg bg-primary px-5 py-2 text-white hover:bg-secondary transition-colors">
          До каталогу
        </a>
      </div>
    );
  }

  if (submitStatus === "success") {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-secondary mb-4">Замовлення відправлено!</h3>
        <p className="text-gray-700 mb-6">
          Дякуємо за замовлення! Ми зв'яжемося з вами найближчим часом.
        </p>
        <a href="/" className="inline-block rounded-lg bg-primary px-5 py-2 text-white hover:bg-secondary transition-colors">
          Продовжити покупки
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="text-2xl font-bold text-secondary mb-6">Оформити замовлення</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ім'я *
          </label>
          <input
            type="text"
            id="name"
            required
            value={customerInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ваше ім'я"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон *
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={customerInfo.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="+380 50 123 45 67"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Адреса доставки
          </label>
          <textarea
            id="address"
            value={customerInfo.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
            placeholder="Вкажіть адресу доставки"
          />
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
            Коментарі до замовлення
          </label>
          <textarea
            id="comments"
            value={customerInfo.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
            placeholder="Додаткові побажання або коментарі"
          />
        </div>

        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            Помилка при відправці замовлення. Спробуйте ще раз або зв'яжіться з нами по телефону.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-3 px-4 rounded-md font-semibold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Відправляємо..." : "Відправити замовлення"}
        </button>
      </form>
    </div>
  );
}
