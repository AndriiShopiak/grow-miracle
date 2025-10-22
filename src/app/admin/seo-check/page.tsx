'use client';

import { useState, useEffect } from 'react';
import { cultivars } from '@/data/products';
import { validateProductSEO, generateSEOReport } from '@/utils/seoValidation';

export default function SEOCheckPage() {
  const [report, setReport] = useState<{
    totalProducts: number;
    validProducts: number;
    commonIssues: string[];
    recommendations: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Генеруємо звіт про SEO
    const seoReport = generateSEOReport(cultivars);
    setReport(seoReport);
    setLoading(false);
  }, []);

  if (loading || !report) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Перевірка SEO</h1>
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Звіт про SEO стан сайту</h1>
      
      {/* Загальна статистика */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Загальна статистика</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-semibold text-blue-800">Всього продуктів</h3>
            <p className="text-2xl font-bold text-blue-600">{report.totalProducts}</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <h3 className="font-semibold text-green-800">Валідних продуктів</h3>
            <p className="text-2xl font-bold text-green-600">{report.validProducts}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <h3 className="font-semibold text-yellow-800">Відсоток валідності</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {Math.round((report.validProducts / report.totalProducts) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Загальні проблеми */}
      {report.commonIssues.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Загальні проблеми</h2>
          <ul className="space-y-2">
            {report.commonIssues.map((issue: string, index: number) => (
              <li key={index} className="flex items-center">
                <span className="text-red-500 mr-2">❌</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Рекомендації */}
      {report.recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Рекомендації</h2>
          <ul className="space-y-2">
            {report.recommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-center">
                <span className="text-blue-500 mr-2">💡</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Детальна перевірка продуктів */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Детальна перевірка продуктів</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Назва</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Статус</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Проблеми</th>
              </tr>
            </thead>
            <tbody>
              {cultivars.slice(0, 10).map((product) => {
                const validation = validateProductSEO(product);
                return (
                  <tr key={product.id}>
                    <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        validation.isValid 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {validation.isValid ? '✅ Валідний' : '❌ Проблеми'}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {validation.errors.length > 0 && (
                        <div className="text-red-600 text-sm">
                          {validation.errors.join(', ')}
                        </div>
                      )}
                      {validation.warnings.length > 0 && (
                        <div className="text-yellow-600 text-sm">
                          {validation.warnings.join(', ')}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {cultivars.length > 10 && (
          <p className="text-gray-600 text-sm mt-4">
            Показано перші 10 продуктів з {cultivars.length}
          </p>
        )}
      </div>
    </div>
  );
}
