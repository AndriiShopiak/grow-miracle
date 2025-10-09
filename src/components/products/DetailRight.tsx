"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { useMemo } from "react";
import type { Cultivar } from "@/data/products";
import { getProductPrice } from "@/utils/productUtils";

export default function DetailRight({ item }: { item: Cultivar }) {
  const { add, items } = useCart();
  const isInCart = useMemo(() => items.some((i) => i.id === item.id), [items, item.id]);
  return (
    <div className="space-y-6">
      {/* Заголовок та ціна */}
      <div className="bg-gradient-to-r from-light-green/20 to-accent/10 rounded-2xl p-6 border border-light-green/30">
        <h1 className="text-4xl font-bold text-secondary mb-4">{item.title}</h1>
        <div className="inline-flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-sm px-4 py-3 ring-2 ring-accent shadow-lg">
          <span className="text-4xl font-extrabold text-secondary">
            {getProductPrice(item)} грн/шт
          </span>
          <span className="text-sm font-medium uppercase tracking-wide text-accent bg-accent/10 rounded px-2 py-1">за одиницю</span>
        </div>
      </div>

      {/* Теги характеристик */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-light-green/70 text-secondary text-base font-medium px-4 py-2 shadow-sm">
            {item.species}
          </span>
          <span className="inline-flex items-center rounded-full bg-accent/15 text-accent text-base font-medium px-4 py-2 shadow-sm">
            Дозрівання: {item.ripeningTerm}
          </span>
          <span className={`inline-flex items-center rounded-full text-base font-medium px-4 py-2 shadow-sm ${
            item.rootSystem === 'open' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            {item.rootSystem === 'open' ? 'Відкрита коренева система' : 'Закрита коренева система'}
          </span>
        </div>
      </div>

      {/* Опис плодів */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200/50">
        <h3 className="text-xl font-semibold text-secondary mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          Опис плодів
        </h3>
        <p className="text-gray-800 leading-8 text-lg">{item.fruits}</p>
      </div>

      {/* Характеристики продукту */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200/50">
        <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          Характеристики
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
            <dt className="font-semibold text-blue-800 text-base mb-1">Смак</dt>
            <dd className="text-gray-800 text-base">{item.taste}</dd>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
            <dt className="font-semibold text-blue-800 text-base mb-1">Самоплідність</dt>
            <dd className="text-gray-800 text-base">{item.selfFertility}</dd>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
            <dt className="font-semibold text-blue-800 text-base mb-1">Врожайність</dt>
            <dd className="text-gray-800 text-base">{item.yield}</dd>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
            <dt className="font-semibold text-blue-800 text-base mb-1">Морозостійкість</dt>
            <dd className="text-gray-800 text-base">{item.frostResistance}</dd>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
            <dt className="font-semibold text-blue-800 text-base mb-1">Підщепа</dt>
            <dd className="text-gray-800 text-base">{item.rootstock}</dd>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
            <dt className="font-semibold text-blue-800 text-base mb-1">Висота саджанця</dt>
            <dd className="text-gray-800 text-base">{item.height}</dd>
          </div>
        </dl>
      </div>

      {/* Особливості вирощування */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200/50">
        <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          Особливості вирощування
        </h3>
        <div className="space-y-3">
          <div className="bg-white/70 rounded-lg p-3 border border-green-100/50">
            <span className="font-semibold text-green-800 text-base">Посадка:</span>
            <p className="text-gray-800 text-base mt-1">{item.cultivation.planting}</p>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-green-100/50">
            <span className="font-semibold text-green-800 text-base">Догляд:</span>
            <p className="text-gray-800 text-base mt-1">{item.cultivation.care}</p>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-green-100/50">
            <span className="font-semibold text-green-800 text-base">Період плодоношення:</span>
            <p className="text-gray-800 text-base mt-1">{item.cultivation.bearingPeriod}</p>
          </div>
        </div>
        
        
      </div>

      {/* Кнопки дій */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200/50">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/" 
            className="flex-1 rounded-lg bg-primary px-6 py-3 text-white hover:bg-secondary transition-all duration-200 text-center font-medium shadow-sm hover:shadow-md text-lg"
          >
            На головну
          </Link>
          {isInCart ? (
            <button
              disabled
              className="flex-1 rounded-lg border-2 border-green-300 bg-green-100 px-6 py-3 text-green-700 cursor-default font-medium shadow-sm text-lg"
            >
              ✓ В кошику
            </button>
          ) : (
            <button
              onClick={() => {
                const price = getProductPrice(item);
                add({ id: item.id, title: item.title, image: item.image, price });
              }}
              className="flex-1 rounded-lg border-2 border-primary bg-white px-6 py-3 text-primary hover:bg-light-green/20 transition-all duration-200 font-medium shadow-sm hover:shadow-md text-lg"
            >
              Додати до кошика
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


