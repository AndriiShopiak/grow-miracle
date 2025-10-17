// Утиліти для оптимізації зображень

/**
 * Генерує blur placeholder для зображень
 * Використовується для покращення UX під час завантаження
 */
export const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  }
  
  canvas.width = width;
  canvas.height = height;
  
  // Створюємо градієнтний blur
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * Стандартний blur placeholder для використання в компонентах
 */
export const DEFAULT_BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

/**
 * Оптимізовані розміри для різних типів зображень
 */
export const IMAGE_SIZES = {
  // Логотипи та іконки
  LOGO: '(max-width: 640px) 48px, 64px',
  ICON: '28px',
  
  // Продуктові зображення
  PRODUCT_CARD: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  PRODUCT_DETAIL: '(max-width: 768px) 100vw, 50vw',
  PRODUCT_THUMBNAIL: '80px',
  CART_ITEM: '(max-width: 640px) 80px, 96px',
  
  // Галерея
  GALLERY: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  
  // Hero та фонові зображення
  HERO: '100vw',
  BACKGROUND: '(min-width: 768px) 50vw, 100vw',
} as const;

/**
 * Налаштування якості для різних типів зображень
 * Відповідає конфігурації qualities в next.config.ts
 */
export const IMAGE_QUALITY = {
  HIGH: 90,      // Логотипи, іконки
  MEDIUM: 80,    // Продуктові зображення, hero
  STANDARD: 75,  // Галерея, картки
  LOW: 70,       // Мініатюри, прев'ю
} as const;

/**
 * Дозволені якості (мають відповідати next.config.ts)
 */
export const ALLOWED_QUALITIES = [70, 75, 80, 85, 90] as const;

/**
 * Отримує оптимальні параметри для зображення залежно від типу
 */
export const getImageProps = (type: keyof typeof IMAGE_SIZES, priority: boolean = false) => ({
  sizes: IMAGE_SIZES[type],
  quality: type.includes('LOGO') || type.includes('ICON') ? IMAGE_QUALITY.HIGH : 
           type.includes('DETAIL') || type.includes('HERO') ? IMAGE_QUALITY.MEDIUM :
           type.includes('THUMBNAIL') || type.includes('CART') ? IMAGE_QUALITY.LOW : 
           IMAGE_QUALITY.STANDARD,
  priority,
  placeholder: 'blur' as const,
  blurDataURL: DEFAULT_BLUR_DATA_URL,
});

/**
 * Перевіряє, чи підтримує браузер WebP формат
 */
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Отримує оптимальний формат зображення для поточного браузера
 */
export const getOptimalImageFormat = (): string[] => {
  if (supportsWebP()) {
    return ['image/webp', 'image/avif'];
  }
  return ['image/jpeg', 'image/png'];
};
