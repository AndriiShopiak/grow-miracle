/**
 * Утиліти для перевірки SEO налаштувань
 */

export interface SEOValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

/**
 * Перевіряє базові SEO вимоги для сторінки продукту
 */
export function validateProductSEO(product: {
  title: string;
  description?: string;
  image: string;
  price?: string;
}): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Перевірка заголовка
  if (!product.title || product.title.length < 10) {
    errors.push('Заголовок занадто короткий (мінімум 10 символів)');
  }
  if (product.title && product.title.length > 60) {
    warnings.push('Заголовок занадто довгий (рекомендовано до 60 символів)');
  }

  // Перевірка опису
  if (!product.description) {
    errors.push('Відсутній опис продукту');
  } else if (product.description.length < 120) {
    errors.push('Опис занадто короткий (мінімум 120 символів)');
  } else if (product.description.length > 160) {
    warnings.push('Опис занадто довгий (рекомендовано до 160 символів)');
  }

  // Перевірка зображення
  if (!product.image) {
    errors.push('Відсутнє зображення продукту');
  }

  // Перевірка ціни
  if (!product.price) {
    warnings.push('Відсутня ціна продукту');
  }

  // Додаткові перевірки
  if (product.title && !product.title.includes('саджанці')) {
    suggestions.push('Рекомендується додати слово "саджанці" до заголовка');
  }

  if (product.description && !product.description.includes('Закарпаття')) {
    suggestions.push('Рекомендується додати географічну прив\'язку "Закарпаття"');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

/**
 * Перевіряє URL на коректність для SEO
 */
export function validateURL(url: string): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  if (!url) {
    errors.push('URL не може бути порожнім');
    return { isValid: false, errors, warnings, suggestions };
  }

  // Перевірка на наявність параметрів запиту
  if (url.includes('?')) {
    warnings.push('URL містить параметри запиту, що може вплинути на SEO');
  }

  // Перевірка на trailing slash
  if (url.endsWith('/') && url !== 'https://sad-olega.com/') {
    warnings.push('URL закінчується слешем, що може створити дублікати');
  }

  // Перевірка на HTTPS
  if (!url.startsWith('https://')) {
    errors.push('URL повинен використовувати HTTPS');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

/**
 * Генерує звіт про SEO стан сайту
 */
interface Product {
  id: number;
  title: string;
  description?: string;
  image: string;
  price?: string;
}

export function generateSEOReport(products: Product[]): {
  totalProducts: number;
  validProducts: number;
  commonIssues: string[];
  recommendations: string[];
} {
  const validProducts = products.filter(product => {
    const validation = validateProductSEO(product);
    return validation.isValid;
  }).length;

  const commonIssues: string[] = [];
  const recommendations: string[] = [];

  // Аналіз загальних проблем
  const shortTitles = products.filter(p => !p.title || p.title.length < 10).length;
  if (shortTitles > 0) {
    commonIssues.push(`${shortTitles} продуктів мають занадто короткі заголовки`);
  }

  const missingImages = products.filter(p => !p.image).length;
  if (missingImages > 0) {
    commonIssues.push(`${missingImages} продуктів не мають зображень`);
  }

  // Рекомендації
  if (validProducts < products.length * 0.8) {
    recommendations.push('Понад 20% продуктів мають SEO проблеми - потрібна оптимізація');
  }

  recommendations.push('Регулярно оновлюйте sitemap.xml');
  recommendations.push('Додайте більше внутрішніх посилань між продуктами');
  recommendations.push('Оптимізуйте зображення для швидкості завантаження');

  return {
    totalProducts: products.length,
    validProducts,
    commonIssues,
    recommendations,
  };
}
