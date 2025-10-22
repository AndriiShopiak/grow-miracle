/**
 * SEO утиліти для уникнення переспрямувань та покращення індексації
 */

/**
 * Створює canonical URL без параметрів запиту
 */
export function createCanonicalUrl(baseUrl: string, pathname: string): string {
  return `${baseUrl}${pathname}`;
}

/**
 * Перевіряє, чи URL містить параметри запиту
 */
export function hasQueryParams(url: string): boolean {
  return url.includes('?');
}

/**
 * Видаляє параметри запиту з URL
 */
export function removeQueryParams(url: string): string {
  return url.split('?')[0];
}

/**
 * Створює мета-дані для сторінок з параметрами
 */
export function createPageMetadata(
  title: string,
  description: string,
  canonicalUrl: string,
  additionalMeta?: Record<string, string>
) {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: "index, follow",
    ...additionalMeta,
  };
}

/**
 * Налаштування для уникнення переспрямувань
 */
export const SEO_CONFIG = {
  baseUrl: "https://sad-olega.com",
  defaultCanonical: "https://sad-olega.com/",
  robots: "index, follow",
} as const;

/**
 * Генерація мета-даних для продуктів з покращеним SEO
 */
export function createProductMetadata(
  title: string,
  description: string,
  canonicalUrl: string,
  productId: number,
  additionalMeta?: Record<string, string>
) {
  return {
    title,
    description,
    keywords: `саджанці, ${title}, сад, Закарпаття, доставка, плодові культури`,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Сад Олега",
      locale: "uk_UA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      "product:id": productId.toString(),
      "product:category": "саджанці",
      "product:brand": "Сад Олега",
    },
    ...additionalMeta,
  };
}