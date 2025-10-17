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
