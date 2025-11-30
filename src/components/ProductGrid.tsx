"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cultivars } from "@/data/products";
import { useCart } from "@/components/cart/CartContext";
import Pagination from "./Pagination";
import ProductFilter, { FilterOptions } from "./ProductFilter";
import { filterProducts, getProductPrice, getProductPriceOptions } from "@/utils/productUtils";
import HeightSelector from "./HeightSelector";

function ProductGridWithSearchParams() {
  const { add, items } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemIdsInCart = useMemo(() => new Set(items.map((i) => i.id)), [items]);
  const [justAddedIds, setJustAddedIds] = useState<Set<number>>(new Set());
  const [selectedHeights, setSelectedHeights] = useState<Record<number, string>>({});

  const itemsPerPage = 9; // 3x3 grid

  // Get initial state from URL params
  const getInitialFilters = (): FilterOptions => ({
    rootSystem: searchParams.get('rootSystem') || 'all',
    category: searchParams.get('category') || 'all'
  });

  const getInitialPage = (): number => {
    const page = searchParams.get('page');
    return page ? Math.max(1, parseInt(page, 10)) : 1;
  };

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>(getInitialFilters);
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Function to update URL parameters
  const updateURL = (newFilters: FilterOptions, newPage: number) => {
    const params = new URLSearchParams();

    if (newFilters.rootSystem !== 'all') {
      params.set('rootSystem', newFilters.rootSystem);
    }
    if (newFilters.category !== 'all') {
      params.set('category', newFilters.category);
    }
    if (newPage > 1) {
      params.set('page', newPage.toString());
    }

    const queryString = params.toString();
    const newURL = queryString ? `/?${queryString}` : '/';

    // Use push instead of replace to avoid redirect issues
    // This creates proper browser history without causing redirects
    router.push(newURL, { scroll: false });
  };

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

  // Filter products based on current filters using the utility function
  const filteredProducts = useMemo(() => {
    return filterProducts(cultivars, filters);
  }, [filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(filters, page);
    // Scroll to top of products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    updateURL(newFilters, 1);
  };
  return (
    <div>
      {/* Filter component */}
      <ProductFilter
        onFilterChange={handleFilterChange}
        totalCount={cultivars.length}
        filteredCount={filteredProducts.length}
        products={cultivars}
        initialFilters={filters}
      />

      {/* Products info */}
      <div className="mb-6 text-center">
        <p className="text-xs sm:text-sm text-gray-600 px-2">
          Показано {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} з {filteredProducts.length} продуктів
        </p>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((item) => (
          <div
            key={item.id}
            className={`group bg-white rounded-2xl shadow-md ring-1 ring-black/5 overflow-hidden transition-all ${item.availability === 'out_of_stock'
                ? 'opacity-60 grayscale-[0.3]'
                : item.availability === 'limited'
                  ? 'ring-orange-200/50 shadow-orange-100/50 hover:shadow-xl hover:-translate-y-0.5'
                  : 'hover:shadow-xl hover:-translate-y-0.5'
              }`}
          >
            <div className="relative h-56">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-90" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <h4 className="text-white text-sm sm:text-xl font-semibold drop-shadow line-clamp-2">{item.title}</h4>
              </div>
              {(itemIdsInCart.has(item.id) || justAddedIds.has(item.id)) && (
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-600/90 text-white text-xs font-medium px-2.5 py-1 shadow">
                  <span>✓</span>
                  <span>Додано</span>
                </div>
              )}
              {item.availability === 'out_of_stock' && (
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-red-600/90 text-white text-xs font-medium px-2.5 py-1 shadow">
                  <span>Немає в наявності</span>
                </div>
              )}
              {item.availability === 'limited' && !itemIdsInCart.has(item.id) && !justAddedIds.has(item.id) && (
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-orange-600/90 text-white text-xs font-medium px-2.5 py-1 shadow">
                  <span>⚠</span>
                  <span>Обмежено</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-light-green/60 text-secondary text-xs font-medium px-2.5 py-1">
                  {item.species}
                </span>
                <span className={`inline-flex items-center rounded-full text-xs font-medium px-2.5 py-1 ${item.rootSystem === 'open'
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
                {/* Селектор висоти саджанця */}
                <HeightSelector
                  product={item}
                  selectedHeight={selectedHeights[item.id]}
                  onHeightSelect={(height) => {
                    setSelectedHeights(prev => ({ ...prev, [item.id]: height }));
                  }}
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`/products/${item.id}`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg bg-primary px-3 sm:px-4 py-2 text-white text-xs sm:text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    Деталі
                  </Link>
                  {itemIdsInCart.has(item.id) ? (
                    <button
                      disabled
                      className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 sm:px-4 py-2 text-gray-500 text-xs sm:text-sm font-medium cursor-default"
                    >
                      В кошику
                    </button>
                  ) : item.availability === 'out_of_stock' ? (
                    <button
                      disabled
                      className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 sm:px-4 py-2 text-gray-500 text-xs sm:text-sm font-medium cursor-default"
                    >
                      Немає в наявності
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const priceOptions = getProductPriceOptions(item);
                        const firstAvailable = priceOptions.find(opt => opt.available);
                        const defaultHeight = firstAvailable?.height || priceOptions[0]?.height || "standard";
                        const selectedHeight = selectedHeights[item.id] || defaultHeight;

                        const price = priceOptions.find(opt => opt.height === selectedHeight)?.price || getProductPrice(item);
                        const priceLabel = priceOptions.find(opt => opt.height === selectedHeight)?.label || `${price} грн/шт`;

                        add({
                          id: item.id,
                          title: item.title,
                          image: item.image,
                          price,
                          availability: item.availability,
                          height: selectedHeight,
                          priceLabel
                        });
                        markJustAdded(item.id);
                      }}
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg border px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${item.availability === 'limited'
                          ? 'border-orange-300 text-orange-600 hover:bg-orange-50'
                          : 'border-primary text-primary hover:bg-light-green/40'
                        }`}
                    >
                      {item.availability === 'limited' ? 'Обмежена наявність' : 'До кошика'}
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

export default function ProductGrid() {
  return (
    <Suspense fallback={
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-gray-600">Завантаження продуктів...</p>
      </div>
    }>
      <ProductGridWithSearchParams />
    </Suspense>
  );
}


