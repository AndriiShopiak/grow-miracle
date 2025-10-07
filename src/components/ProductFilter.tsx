"use client";

import { useState } from "react";

export type FilterOptions = {
  rootSystem: 'all' | 'open' | 'closed';
  species: 'all' | 'хурма гібридна' | 'хурма східна';
  frostResistance: 'all' | 'high' | 'medium' | 'low';
};

type ProductFilterProps = {
  onFilterChange: (filters: FilterOptions) => void;
  totalCount: number;
  filteredCount: number;
};

export default function ProductFilter({ onFilterChange, totalCount, filteredCount }: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    rootSystem: 'all',
    species: 'all',
    frostResistance: 'all'
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value as any };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      rootSystem: 'all' as const,
      species: 'all' as const,
      frostResistance: 'all' as const
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.rootSystem !== 'all' || filters.species !== 'all' || filters.frostResistance !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-secondary">Фільтри</h3>
        <div className="text-sm text-gray-600">
          Показано {filteredCount} з {totalCount} продуктів
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <option value="open">Відкрита</option>
            <option value="closed">Закрита</option>
          </select>
        </div>

        {/* Фільтр по виду */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Вид
          </label>
          <select
            value={filters.species}
            onChange={(e) => handleFilterChange('species', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="all">Всі</option>
            <option value="хурма гібридна">Хурма гібридна</option>
            <option value="хурма східна">Хурма східна</option>
          </select>
        </div>

        {/* Фільтр по морозостійкості */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Морозостійкість
          </label>
          <select
            value={filters.frostResistance}
            onChange={(e) => handleFilterChange('frostResistance', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="all">Всі</option>
            <option value="high">Висока (до -25°C і нижче)</option>
            <option value="medium">Середня (-20°C до -25°C)</option>
            <option value="low">Низька (вище -20°C)</option>
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
