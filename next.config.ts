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
};

export default nextConfig;
