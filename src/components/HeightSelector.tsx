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
  const [selected, setSelected] = useState(selectedHeight || priceOptions[0]?.height || "standard");

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
            className={`px-3 py-2 rounded-md border text-sm font-medium transition-all text-center ${
              selected === option.height
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-gray-300 bg-white text-gray-700 hover:border-primary hover:bg-light-green/10'
            }`}
          >
            <div className="font-semibold text-sm">{option.height}</div>
            <div className="text-xs font-medium mt-0.5">{option.price} грн/шт</div>
          </button>
        ))}
      </div>
    </div>
  );
}
