import { NextResponse } from 'next/server';
import { cultivars } from '@/data/products';

export async function GET() {
  const baseUrl = 'https://sad-olega.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // Генерація URL для всіх продуктів
  const productUrls = cultivars.map(product => ({
    url: `${baseUrl}/products/${product.id}`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  }));

  // Основні сторінки
  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/gallery`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    }
  ];

  // Об'єднуємо всі URL
  const allUrls = [...staticUrls, ...productUrls];

  // Генерація XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Кешуємо на 24 години
    },
  });
}
