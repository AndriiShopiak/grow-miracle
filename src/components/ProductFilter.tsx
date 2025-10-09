"use client";

import { useState } from "react";
import { getAllFilterOptions } from "@/utils/productUtils";
import { Cultivar } from "@/data/products";

export type FilterOptions = {
  rootSystem: string;
  category: string;
};

type ProductFilterProps = {
  onFilterChange: (filters: FilterOptions) => void;
  totalCount: number;
  filteredCount: number;
  products: Cultivar[];
  initialFilters?: FilterOptions;
};

export default function ProductFilter({ onFilterChange, totalCount, filteredCount, products, initialFilters }: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters || {
    rootSystem: 'all',
    category: 'all'
  });

  // Отримуємо всі можливі опції фільтрів динамічно
  const filterOptions = getAllFilterOptions(products);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      rootSystem: 'all',
      category: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-secondary">Фільтри</h3>
        <div className="text-sm text-gray-600">
          Показано {filteredCount} з {totalCount} продуктів
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Фільтр по категорії */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Категорія
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="all">Всі</option>
            {filterOptions.categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Фільтр по кореневій системі */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Коренева система
          </label>
          <select
            value={filters.rootSystem}
            onChange={(e) => handleFilterChange('rootSystem', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="all">Всі</option>
            {filterOptions.rootSystems.map(system => (
              <option key={system} value={system}>
                {system === 'open' ? 'Відкрита' : 'Закрита'}
              </option>
            ))}
          </select>
        </div>

      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm text-accent hover:text-secondary underline"
          >
            Очистити фільтри
          </button>
        </div>
      )}
    </div>
  );
}
