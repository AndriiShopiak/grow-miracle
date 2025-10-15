import { Cultivar } from '@/data/products';
import { getProductPrice } from './productUtils';

// Генерація Schema.org розмітки для продукту
export function generateProductSchema(product: Cultivar, baseUrl: string = 'https://sad-olega.com') {
  const price = getProductPrice(product);
  const priceValue = price.toString(); // Конвертуємо число в рядок
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": `${product.species} - ${product.taste}. ${product.fruits}`,
    "image": `${baseUrl}${product.image}`,
    "brand": {
      "@type": "Brand",
      "name": "Сад Олега"
    },
    "category": product.species,
    "offers": {
      "@type": "Offer",
      "price": priceValue,
      "priceCurrency": "UAH",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Сад Олега"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Термін дозрівання",
        "value": product.ripeningTerm
      },
      {
        "@type": "PropertyValue", 
        "name": "Самоплідність",
        "value": product.selfFertility
      },
      {
        "@type": "PropertyValue",
        "name": "Врожайність", 
        "value": product.yield
      },
      {
        "@type": "PropertyValue",
        "name": "Морозостійкість",
        "value": product.frostResistance
      },
      {
        "@type": "PropertyValue",
        "name": "Підщепа",
        "value": product.rootstock
      },
      {
        "@type": "PropertyValue",
        "name": "Коренева система",
        "value": product.rootSystem === 'open' ? 'Відкрита' : 'Закрита'
      }
    ]
  };
}

// Генерація Schema.org розмітки для бізнесу
export function generateLocalBusinessSchema(baseUrl: string = 'https://sad-olega.com') {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business`,
    "name": "Сад Олега",
    "description": "Вирощування саджанців плодових і екзотичних культур: хурма, азіміна, інжир, гранат, ківі. Доставка по всій Україні.",
    "url": baseUrl,
    "logo": `${baseUrl}/logo/garden_logo.jpg`,
    "image": `${baseUrl}/products/18.jpg`,
    "telephone": "+380685249382",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "с.Бене, Берегівський р-н.",
      "addressLocality": "Закарпатська область",
      "addressCountry": "UA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.2",
      "longitude": "22.6"
    },
    "openingHours": "Mo-Su 08:00-18:00",
    "priceRange": "250-1200 грн",
    "paymentAccepted": "Cash, Bank Transfer",
    "currenciesAccepted": "UAH",
    "areaServed": {
      "@type": "Country",
      "name": "Ukraine"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Саджанці плодових культур",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Саджанці хурми"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "Саджанці персика"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product", 
            "name": "Саджанці абрикоса"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Саджанці інжиру"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Саджанці шовковиці"
          }
        }
      ]
    },
    "sameAs": [
      "https://t.me/sad_olega"
    ]
  };
}

// Генерація Schema.org розмітки для веб-сайту
export function generateWebSiteSchema(baseUrl: string = 'https://sad-olega.com') {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Сад Олега - Тут росте диво",
    "description": "Свіжі овочі та фрукти з власного саду. Натуральні продукти для вашої родини.",
    "publisher": {
      "@id": `${baseUrl}/#business`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// Генерація Schema.org розмітки для галереї
export function generateImageGallerySchema(baseUrl: string = 'https://sad-olega.com') {
  const images = Array.from({ length: 41 }, (_, i) => ({
    "@type": "ImageObject",
    "url": `${baseUrl}/gallery/${i + 1}.jpg`,
    "name": `Сад Олега - фото ${i + 1}`,
    "description": "Фото з нашого саду та господарства"
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Галерея саду",
    "description": "Фото з нашого саду та господарства",
    "url": `${baseUrl}/gallery`,
    "image": images
  };
}
