import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Дозволяємо оптимізацію зображень
    unoptimized: false,
    
    // Формати зображень для оптимізації
    formats: ['image/webp', 'image/avif'],
    
    // Розміри зображень для різних пристроїв
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Розміри зображень для різних екранів
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Дозволені якості зображень (для Next.js 16+)
    qualities: [70, 75, 80, 85, 90],
    
    // Мінімальний розмір кешування (1 день)
    minimumCacheTTL: 86400,
    
    // Домени для зовнішніх зображень (якщо потрібно)
    domains: [],
    
    // Дозволяємо зовнішні зображення (якщо потрібно)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Експериментальні функції
  experimental: {
    // Оптимізація CSS (тимчасово відключено через проблеми з critters)
    // optimizeCss: true,
  },
  
  // Компресія
  compress: true,
  
  // SEO оптимізації
  trailingSlash: false,
  
  // Налаштування для уникнення переспрямувань
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      // Спеціальні заголовки для продуктів
      {
        source: '/products/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
