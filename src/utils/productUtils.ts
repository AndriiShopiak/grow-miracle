import { Cultivar } from '@/data/products';

// Динамічне визначення всіх унікальних категорій з бази продуктів
export function getUniqueCategories(products: Cultivar[]): string[] {
  const categories = new Set<string>();
  
  products.forEach(product => {
    // Витягуємо основну категорію з поля species
    const species = product.species.toLowerCase();
    
    // Визначаємо категорію на основі species
    if (species.includes('хурма')) {
      categories.add('хурма');
    } else if (species.includes('персик')) {
      categories.add('персик');
    } else if (species.includes('абрикос')) {
      categories.add('абрикос');
    } else {
      // Якщо не вдалося визначити, додаємо як є
      categories.add(product.species);
    }
  });
  
  return Array.from(categories).sort();
}

// Динамічне визначення всіх унікальних типів кореневої системи
export function getUniqueRootSystems(products: Cultivar[]): string[] {
  const rootSystems = new Set<string>();
  
  products.forEach(product => {
    rootSystems.add(product.rootSystem);
  });
  
  return Array.from(rootSystems).sort();
}

// Динамічне визначення всіх унікальних підщеп
export function getUniqueRootstocks(products: Cultivar[]): string[] {
  const rootstocks = new Set<string>();
  
  products.forEach(product => {
    if (product.rootstock && product.rootstock !== '—') {
      rootstocks.add(product.rootstock);
    }
  });
  
  return Array.from(rootstocks).sort();
}

// Динамічне визначення всіх унікальних термінів дозрівання
export function getUniqueRipeningTerms(products: Cultivar[]): string[] {
  const terms = new Set<string>();
  
  products.forEach(product => {
    if (product.ripeningTerm && product.ripeningTerm !== '—') {
      // Розбиваємо на окремі терміни
      const termParts = product.ripeningTerm.split(/[,\s]+/).filter(part => 
        part.length > 2 && !part.includes('—')
      );
      termParts.forEach(part => terms.add(part.trim()));
    }
  });
  
  return Array.from(terms).sort();
}

// Динамічне визначення всіх унікальних рівнів морозостійкості
export function getUniqueFrostResistance(products: Cultivar[]): string[] {
  const resistance = new Set<string>();
  
  products.forEach(product => {
    if (product.frostResistance && product.frostResistance !== '—') {
      // Витягуємо рівень морозостійкості
      const frostText = product.frostResistance.toLowerCase();
      
      if (frostText.includes('висока') || frostText.includes('дуже висока')) {
        resistance.add('висока');
      } else if (frostText.includes('середня') || frostText.includes('помірна')) {
        resistance.add('середня');
      } else if (frostText.includes('низька') || frostText.includes('нижче середнього')) {
        resistance.add('низька');
      } else if (frostText.includes('хороша')) {
        resistance.add('хороша');
      }
    }
  });
  
  return Array.from(resistance).sort();
}

// Динамічне визначення всіх унікальних рівнів врожайності
export function getUniqueYield(products: Cultivar[]): string[] {
  const yields = new Set<string>();
  
  products.forEach(product => {
    if (product.yield && product.yield !== '—') {
      const yieldText = product.yield.toLowerCase();
      
      if (yieldText.includes('дуже висока')) {
        yields.add('дуже висока');
      } else if (yieldText.includes('висока')) {
        yields.add('висока');
      } else if (yieldText.includes('хороша')) {
        yields.add('хороша');
      } else if (yieldText.includes('стабільно висока')) {
        yields.add('стабільно висока');
      }
    }
  });
  
  return Array.from(yields).sort();
}

// Функція для визначення ціни продукту (з fallback на уніфіковану ціну)
export function getProductPrice(product: Cultivar): number {
  if (product.price) {
    const priceMatch = product.price.match(/\d+/);
    if (priceMatch) {
      return parseInt(priceMatch[0]);
    }
  }
  
  // Fallback на уніфіковану ціну
  return 800;
}

// Функція для отримання варіантів цін для продукту
export function getProductPriceOptions(product: Cultivar): { height: string; price: number; label: string }[] {
  if (!product.price) {
    return [{ height: "standard", price: 800, label: "800 грн/шт" }];
  }

  // Перевіряємо чи є диференційовані ціни
  const priceText = product.price;
  
  // Якщо є диференційовані ціни (формат: "600 грн/шт (1м) / 800 грн/шт (1,4м+)")
  if (priceText.includes('/') && priceText.includes('м')) {
    const prices = priceText.split('/').map(part => part.trim());
    const options = [];
    
    for (const pricePart of prices) {
      // Покращений регулярний вираз для парсингу
      const priceMatch = pricePart.match(/(\d+)\s*грн.*?\(([^)]+)\)/);
      if (priceMatch) {
        const price = parseInt(priceMatch[1]);
        const height = priceMatch[2];
        options.push({
          height: height,
          price: price,
          label: `${price} грн/шт (${height})`
        });
        } else {
          // Спробуємо альтернативний парсинг для випадків без дужок
          const simpleMatch = pricePart.match(/(\d+)\s*грн/);
          if (simpleMatch) {
            const price = parseInt(simpleMatch[1]);
            // Визначаємо висоту на основі ціни
            const height = price <= 600 ? '1м' : '1,4м+';
            options.push({
              height: height,
              price: price,
              label: `${price} грн/шт (${height})`
            });
          }
        }
    }
    
    return options.length > 0 ? options : [{ height: "standard", price: 800, label: "800 грн/шт" }];
  }
  
  // Якщо звичайна ціна
  const priceMatch = priceText.match(/\d+/);
  const price = priceMatch ? parseInt(priceMatch[0]) : 800;
  return [{ height: "standard", price: price, label: `${price} грн/шт` }];
}

// Функція для отримання ціни за висотою саджанця
export function getProductPriceByHeight(product: Cultivar, height: string = "standard"): number {
  const options = getProductPriceOptions(product);
  const option = options.find(opt => opt.height === height);
  return option ? option.price : options[0]?.price || 800;
}

// Функція для перевірки чи продукт належить до категорії
export function isProductInCategory(product: Cultivar, category: string): boolean {
  if (category === 'all') return true;
  
  const species = product.species.toLowerCase();
  
  switch (category) {
    case 'хурма':
      return species.includes('хурма');
    case 'персик':
      return species.includes('персик');
    case 'абрикос':
      return species.includes('абрикос');
    default:
      return species.includes(category.toLowerCase());
  }
}

// Функція для фільтрації продуктів за різними критеріями
export function filterProducts(
  products: Cultivar[], 
  filters: {
    category?: string;
    rootSystem?: string;
  }
): Cultivar[] {
  return products.filter(product => {
    // Фільтр по категорії
    if (filters.category && !isProductInCategory(product, filters.category)) {
      return false;
    }
    
    // Фільтр по кореневій системі
    if (filters.rootSystem && filters.rootSystem !== 'all' && product.rootSystem !== filters.rootSystem) {
      return false;
    }
    
    return true;
  });
}

// Функція для отримання всіх можливих фільтрів
export function getAllFilterOptions(products: Cultivar[]) {
  return {
    categories: getUniqueCategories(products),
    rootSystems: getUniqueRootSystems(products),
    rootstocks: getUniqueRootstocks(products),
    ripeningTerms: getUniqueRipeningTerms(products),
    frostResistance: getUniqueFrostResistance(products),
    yields: getUniqueYield(products)
  };
}
