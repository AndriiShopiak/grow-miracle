"use client";

import { useState } from "react";
import type { Cultivar } from "@/data/products";
import { getProductPriceOptions, getProductPriceByHeight } from "@/utils/productUtils";

interface HeightSelectorProps {
  product: Cultivar;
  onHeightSelect: (height: string, price: number, priceLabel: string) => void;
  selectedHeight?: string;
}

export default function HeightSelector({ product, onHeightSelect, selectedHeight }: HeightSelectorProps) {
  const priceOptions = getProductPriceOptions(product);

  // Знаходимо першу доступну опцію для дефолтного вибору, якщо поточна недоступна
  const firstAvailable = priceOptions.find(opt => opt.available)?.height;
  const currentSelectedIsAvailable = priceOptions.find(opt => opt.height === (selectedHeight || "standard"))?.available;

  // Якщо переданий selectedHeight недоступний, або не переданий, беремо перший доступний
  const initialSelection = (selectedHeight && currentSelectedIsAvailable)
    ? selectedHeight
    : (firstAvailable || priceOptions[0]?.height || "standard");

  const [selected, setSelected] = useState(initialSelection);

  // Якщо тільки один варіант ціни, не показуємо селектор
  if (priceOptions.length <= 1) {
    return null;
  }

  const handleHeightChange = (height: string) => {
    setSelected(height);
    const price = getProductPriceByHeight(product, height);
    const option = priceOptions.find(opt => opt.height === height);
    const priceLabel = option?.label || `${price} грн/шт`;
    onHeightSelect(height, price, priceLabel);
  };

  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Висота саджанця:
      </label>
      <div className="grid grid-cols-2 gap-2">
        {priceOptions.map((option) => (
          <button
            key={option.height}
            onClick={() => handleHeightChange(option.height)}
            disabled={!option.available}
            className={`px-3 py-2 rounded-md border text-sm font-medium transition-all text-center ${!option.available
                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                : selected === option.height
                  ? 'border-primary bg-primary text-white shadow-sm'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-primary hover:bg-light-green/10'
              }`}
          >
            <div className="font-semibold text-sm">{option.height}</div>
            <div className="text-xs font-medium mt-0.5">
              {option.available ? `${option.price} грн/шт` : 'Немає в наявності'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
