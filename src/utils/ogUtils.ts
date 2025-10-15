import { Cultivar } from '@/data/products';

// Базові Open Graph теги для сайту
export const baseOGTags = {
  siteName: 'Сад Олега',
  locale: 'uk_UA',
  type: 'website' as const,
  url: 'https://sad-olega.com',
  image: 'https://sad-olega.com/products/18.jpg', // Красиве фото з головної
  imageAlt: 'Сад Олега - саджанці плодових культур',
  description: 'Вирощування саджанців плодових і екзотичних культур: хурма, азіміна, інжир, гранат, ківі. Доставка по всій Україні.',
};

// Генерація Open Graph тегів для головної сторінки
export function generateHomeOGTags() {
  return {
    title: 'Сад Олега - Тут росте диво | Саджанці плодових культур',
    description: '🌱 Саджанці хурми, персика, абрикоса, інжиру з Закарпаття. Високоякісні сорти з відкритою та закритою кореневою системою. Доставка по всій Україні. ☎️ +380 68 524 93 82',
    image: baseOGTags.image,
    imageAlt: baseOGTags.imageAlt,
    url: baseOGTags.url,
    type: baseOGTags.type,
    siteName: baseOGTags.siteName,
    locale: baseOGTags.locale,
  };
}

// Генерація Open Graph тегів для продукту
export function generateProductOGTags(product: Cultivar) {
  const title = `${product.title} - ${product.species} | Сад Олега`;
  const price = product.price || '800 грн/шт';
  const description = `🌱 ${product.species} "${product.title}". ${product.taste}. ${product.frostResistance}. Ціна: ${price}. Доставка по Україні. ☎️ +380 68 524 93 82`;
  
  return {
    title,
    description,
    image: `https://sad-olega.com${product.image}`,
    imageAlt: `${product.title} - ${product.species}`,
    url: `https://sad-olega.com/products/${product.id}`,
    type: 'website' as const, // Змінюємо на website, оскільки Next.js не підтримує 'product'
    siteName: baseOGTags.siteName,
    locale: baseOGTags.locale,
    // Додаткові теги для продуктів
    product: {
      price: product.price || '800 грн/шт',
      currency: 'UAH',
      availability: 'in stock',
      condition: 'new',
      brand: 'Сад Олега',
    },
  };
}

// Генерація Open Graph тегів для галереї
export function generateGalleryOGTags() {
  return {
    title: 'Галерея саду | Сад Олега - Фото нашого господарства',
    description: '📸 Фото з нашого саду та господарства в Закарпатті. Подивіться, як ми вирощуємо саджанці плодових культур. Високоякісні сорти хурми, персика, абрикоса.',
    image: 'https://sad-olega.com/gallery/15.jpg', // Красиве фото з галереї
    imageAlt: 'Галерея саду - Сад Олега',
    url: 'https://sad-olega.com/gallery',
    type: baseOGTags.type,
    siteName: baseOGTags.siteName,
    locale: baseOGTags.locale,
  };
}

// Генерація Open Graph тегів для кошика
export function generateCartOGTags() {
  return {
    title: 'Кошик | Сад Олега - Оформлення замовлення',
    description: 'Оформіть замовлення саджанців плодових культур. Доставка по всій Україні.',
    image: baseOGTags.image,
    imageAlt: 'Кошик - Сад Олега',
    url: 'https://sad-olega.com/cart',
    type: baseOGTags.type,
    siteName: baseOGTags.siteName,
    locale: baseOGTags.locale,
  };
}

// Функція для генерації мета-тегів у форматі Next.js
export function generateOGMetaTags(ogData: ReturnType<typeof generateHomeOGTags | typeof generateProductOGTags | typeof generateGalleryOGTags | typeof generateCartOGTags>) {
  const tags = [
    { property: 'og:title', content: ogData.title },
    { property: 'og:description', content: ogData.description },
    { property: 'og:image', content: ogData.image },
    { property: 'og:image:alt', content: ogData.imageAlt },
    { property: 'og:url', content: ogData.url },
    { property: 'og:type', content: ogData.type },
    { property: 'og:site_name', content: ogData.siteName },
    { property: 'og:locale', content: ogData.locale },
    
    // Twitter Card теги
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: ogData.title },
    { name: 'twitter:description', content: ogData.description },
    { name: 'twitter:image', content: ogData.image },
    { name: 'twitter:image:alt', content: ogData.imageAlt },
    
    // Додаткові теги
    { name: 'description', content: ogData.description },
    { name: 'keywords', content: 'саджанці, хурма, персик, абрикос, інжир, сад, Закарпаття, доставка' },
  ];

  // Додаємо специфічні теги для продуктів
  if ('product' in ogData && ogData.product) {
    tags.push(
      { property: 'product:price:amount', content: ogData.product.price },
      { property: 'product:price:currency', content: ogData.product.currency },
      { property: 'product:availability', content: ogData.product.availability },
      { property: 'product:condition', content: ogData.product.condition },
      { property: 'product:brand', content: ogData.product.brand },
    );
  }

  return tags;
}
