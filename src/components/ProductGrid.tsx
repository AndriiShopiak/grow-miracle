"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cultivars } from "@/data/products";
import { useCart } from "@/components/cart/CartContext";
import Pagination from "./Pagination";
import ProductFilter, { FilterOptions } from "./ProductFilter";

export default function ProductGrid() {
  const { add, items } = useCart();
  const itemIdsInCart = useMemo(() => new Set(items.map((i) => i.id)), [items]);
  const [justAddedIds, setJustAddedIds] = useState<Set<number>>(new Set());
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid
  
  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    rootSystem: 'all',
    category: 'all'
  });

  useEffect(() => {
    // If an item is in the cart, remove it from justAdded after hydrate inconsistencies
    if (justAddedIds.size === 0) return;
    const toRemove: number[] = [];
    justAddedIds.forEach((id) => {
      if (itemIdsInCart.has(id)) toRemove.push(id);
    });
    if (toRemove.length) {
      const next = new Set(justAddedIds);
      toRemove.forEach((id) => next.delete(id));
      setJustAddedIds(next);
    }
  }, [itemIdsInCart, justAddedIds]);

  const markJustAdded = (id: number) => {
    const next = new Set(justAddedIds);
    next.add(id);
    setJustAddedIds(next);
    setTimeout(() => {
      setJustAddedIds((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
    }, 1800);
  };

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return cultivars.filter(item => {
      // Filter by root system
      if (filters.rootSystem !== 'all' && item.rootSystem !== filters.rootSystem) {
        return false;
      }
      
      // Filter by category
      if (filters.category !== 'all') {
        if (filters.category === 'хурма' && !item.species.includes('хурма')) {
          return false;
        }
        if (filters.category === 'персик' && item.species !== 'персик') {
          return false;
        }
        if (filters.category === 'абрикос' && item.species !== 'абрикос') {
          return false;
        }
      }
      
      
      return true;
    });
  }, [filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };
  return (
    <div>
      {/* Filter component */}
      <ProductFilter 
        onFilterChange={handleFilterChange}
        totalCount={cultivars.length}
        filteredCount={filteredProducts.length}
      />
      
      {/* Products info */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Показано {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} з {filteredProducts.length} продуктів
        </p>
      </div>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((item) => (
        <div
          key={item.id}
          className="group bg-white rounded-2xl shadow-md ring-1 ring-black/5 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5"
        >
          <div className="relative h-56">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-90" />
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
              <h4 className="text-white text-xl font-semibold drop-shadow">{item.title}</h4>
            </div>
            {(itemIdsInCart.has(item.id) || justAddedIds.has(item.id)) && (
              <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-600/90 text-white text-xs font-medium px-2.5 py-1 shadow">
                <span>✓</span>
                <span>Додано</span>
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-light-green/60 text-secondary text-xs font-medium px-2.5 py-1">
                {item.species}
              </span>
              <span className={`inline-flex items-center rounded-full text-xs font-medium px-2.5 py-1 ${
                item.rootSystem === 'open' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {item.rootSystem === 'open' ? 'Відкрита коренева система' : 'Закрита коренева система'}
              </span>
            </div>
            <p
              className="text-gray-700 text-sm leading-6"
              style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              {item.fruits}
            </p>
            <div className="mt-5">
              <div className="flex gap-2">
                <Link
                  href={`/products/${item.id}`}
                  className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white text-sm font-medium transition-colors hover:bg-secondary"
                >
                  Деталі
                </Link>
                {itemIdsInCart.has(item.id) ? (
                  <button
                    disabled
                    className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-gray-500 text-sm font-medium cursor-default"
                  >
                    В кошику
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const price = item.price ? parseInt(item.price.replace(/\D/g, '')) : 800;
                      add({ id: item.id, title: item.title, image: item.image, price });
                      markJustAdded(item.id);
                    }}
                    className="inline-flex items-center rounded-lg border border-primary px-4 py-2 text-primary text-sm font-medium transition-colors hover:bg-light-green/40"
                  >
                    До кошика
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
      
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}


