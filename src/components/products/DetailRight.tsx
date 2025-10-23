"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { useMemo, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Cultivar } from "@/data/products";
import { getProductPrice, getProductPriceOptions, getProductPriceByHeight } from "@/utils/productUtils";
import HeightSelector from "../HeightSelector";

function BackButton() {
  const searchParams = useSearchParams();
  
  // Build back URL with current filters and pagination
  const buildBackUrl = () => {
    const params = new URLSearchParams();
    
    const rootSystem = searchParams.get('rootSystem');
    const category = searchParams.get('category');
    const page = searchParams.get('page');
    
    if (rootSystem && rootSystem !== 'all') {
      params.set('rootSystem', rootSystem);
    }
    if (category && category !== 'all') {
      params.set('category', category);
    }
    if (page && page !== '1') {
      params.set('page', page);
    }
    
    const queryString = params.toString();
    return queryString ? `/?${queryString}#products` : '/#products';
  };

  return (
    <Link 
      href={buildBackUrl()}
      className="flex-1 rounded-lg bg-primary px-6 py-3 text-white hover:bg-secondary transition-all duration-200 text-center font-medium shadow-sm hover:shadow-md text-lg"
    >
      Назад до продуктів
    </Link>
  );
}

// Helper function to check if a field should be rendered
const shouldRenderField = (value: string | undefined): boolean => {
  return value !== undefined && value.trim() !== "" && value.trim() !== "—";
};

export default function DetailRight({ item }: { item: Cultivar }) {
  const { add, items } = useCart();
  const isInCart = useMemo(() => items.some((i) => i.id === item.id), [items, item.id]);
  const [selectedHeight, setSelectedHeight] = useState<string>("standard");
  const [currentPrice, setCurrentPrice] = useState<number>(getProductPrice(item));
  const [priceLabel, setPriceLabel] = useState<string>(`${getProductPrice(item)} грн/шт`);
  return (
    <div className="space-y-6">
      {/* Заголовок та ціна */}
      <div className="bg-gradient-to-r from-light-green/20 to-accent/10 rounded-2xl p-6 border border-light-green/30">
        <h1 className="text-4xl font-bold text-secondary mb-4">{item.title}</h1>
        <div className="inline-flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-sm px-4 py-3 ring-2 ring-accent shadow-lg">
          <span className="text-3xl font-extrabold text-secondary">
            {currentPrice} грн
          </span>
          <span className="text-sm font-medium uppercase tracking-wide text-white bg-accent rounded px-2 py-1 shadow-sm">за одиницю</span>
        </div>
        {/* Індикатор наявності */}
        <div className="mt-3">
          {item.availability === 'in_stock' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-800 text-sm font-medium px-3 py-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              В наявності
            </span>
          )}
          {item.availability === 'limited' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Обмежена наявність
            </span>
          )}
          {item.availability === 'out_of_stock' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 text-red-800 text-sm font-medium px-3 py-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Немає в наявності
            </span>
          )}
        </div>
        
        {/* Селектор висоти саджанця */}
        <div className="mt-4">
          <HeightSelector
            product={item}
            selectedHeight={selectedHeight}
            onHeightSelect={(height, price, label) => {
              setSelectedHeight(height);
              setCurrentPrice(price);
              setPriceLabel(label);
            }}
          />
        </div>
      </div>

      {/* Теги характеристик */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-light-green/70 text-secondary text-base font-medium px-4 py-2 shadow-sm">
            {item.species}
          </span>
          <span className="inline-flex items-center rounded-lg bg-accent/20 text-secondary text-base font-medium px-4 py-2 shadow-sm border border-accent/30">
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
      {shouldRenderField(item.fruits) && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200/50">
          <h3 className="text-xl font-semibold text-secondary mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            Опис плодів
          </h3>
          <p className="text-gray-800 leading-8 text-lg">{item.fruits}</p>
        </div>
      )}

      {/* Характеристики продукту */}
      {(shouldRenderField(item.taste) || shouldRenderField(item.selfFertility) || shouldRenderField(item.yield) || shouldRenderField(item.frostResistance) || shouldRenderField(item.rootstock) || shouldRenderField(item.height)) && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200/50">
          <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            Характеристики
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shouldRenderField(item.taste) && (
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
              <dt className="font-semibold text-blue-800 text-base mb-1">Смак</dt>
              <dd className="text-gray-800 text-base">{item.taste}</dd>
            </div>
          )}
          {shouldRenderField(item.selfFertility) && (
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
              <dt className="font-semibold text-blue-800 text-base mb-1">Самоплідність</dt>
              <dd className="text-gray-800 text-base">{item.selfFertility}</dd>
            </div>
          )}
          {shouldRenderField(item.yield) && (
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
              <dt className="font-semibold text-blue-800 text-base mb-1">Врожайність</dt>
              <dd className="text-gray-800 text-base">{item.yield}</dd>
            </div>
          )}
          {shouldRenderField(item.frostResistance) && (
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
              <dt className="font-semibold text-blue-800 text-base mb-1">Морозостійкість</dt>
              <dd className="text-gray-800 text-base">{item.frostResistance}</dd>
            </div>
          )}
          {shouldRenderField(item.rootstock) && (
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
              <dt className="font-semibold text-blue-800 text-base mb-1">Підщепа</dt>
              <dd className="text-gray-800 text-base">{item.rootstock}</dd>
            </div>
          )}
          {shouldRenderField(item.height) && (
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100/50">
              <dt className="font-semibold text-blue-800 text-base mb-1">Висота саджанця</dt>
              <dd className="text-gray-800 text-base">{item.height}</dd>
            </div>
          )}
          </dl>
        </div>
      )}

      {/* Особливості вирощування */}
      {(shouldRenderField(item.cultivation.planting) || shouldRenderField(item.cultivation.care) || shouldRenderField(item.cultivation.bearingPeriod)) && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200/50">
          <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Особливості вирощування
          </h3>
          <div className="space-y-3">
          {shouldRenderField(item.cultivation.planting) && (
            <div className="bg-white/70 rounded-lg p-3 border border-green-100/50">
              <span className="font-semibold text-green-800 text-base">Посадка:</span>
              <p className="text-gray-800 text-base mt-1">{item.cultivation.planting}</p>
            </div>
          )}
          {shouldRenderField(item.cultivation.care) && (
            <div className="bg-white/70 rounded-lg p-3 border border-green-100/50">
              <span className="font-semibold text-green-800 text-base">Догляд:</span>
              <p className="text-gray-800 text-base mt-1">{item.cultivation.care}</p>
            </div>
          )}
          {shouldRenderField(item.cultivation.bearingPeriod) && (
            <div className="bg-white/70 rounded-lg p-3 border border-green-100/50">
              <span className="font-semibold text-green-800 text-base">Період плодоношення:</span>
              <p className="text-gray-800 text-base mt-1">{item.cultivation.bearingPeriod}</p>
            </div>
          )}
          </div>
        </div>
      )}

      {/* Кнопки дій */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200/50">
        <div className="flex flex-col sm:flex-row gap-3">
          <Suspense fallback={
            <div className="flex-1 rounded-lg bg-gray-300 px-6 py-3 text-center font-medium text-lg animate-pulse">
              Завантаження...
            </div>
          }>
            <BackButton />
          </Suspense>
          {isInCart ? (
            <button
              disabled
              className="flex-1 rounded-lg border-2 border-green-300 bg-green-100 px-6 py-3 text-green-700 cursor-default font-medium shadow-sm text-lg"
            >
              ✓ В кошику
            </button>
          ) : item.availability === 'out_of_stock' ? (
            <button
              disabled
              className="flex-1 rounded-lg border-2 border-gray-300 bg-gray-100 px-6 py-3 text-gray-500 cursor-default font-medium shadow-sm text-lg"
            >
              Немає в наявності
            </button>
          ) : (
            <button
              onClick={() => {
                add({ 
                  id: item.id, 
                  title: item.title, 
                  image: item.image, 
                  price: currentPrice, 
                  availability: item.availability,
                  height: selectedHeight,
                  priceLabel: priceLabel
                });
              }}
              className={`flex-1 rounded-lg border-2 px-6 py-3 font-medium shadow-sm hover:shadow-md text-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                item.availability === 'limited'
                  ? 'border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100 focus:ring-orange-500/50'
                  : 'border-primary bg-white text-primary hover:bg-light-green/20 focus:ring-primary/50'
              }`}
            >
              {item.availability === 'limited' ? 'Обмежена наявність - Додати до кошика' : 'Додати до кошика'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


