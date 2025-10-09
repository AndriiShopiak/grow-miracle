"use client";

import { useState } from "react";
import Image from "next/image";
import type { Cultivar } from "@/data/products";

interface SeedlingPhotosProps {
  product: Cultivar;
}

export default function SeedlingPhotos({ product }: SeedlingPhotosProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Функція для отримання списку фото залежно від типу продукту
  const getSeedlingImages = () => {
    const { rootSystem, species } = product;
    
    // Для інжиру
    if (species.toLowerCase().includes('інжир')) {
      return [
        { src: "/ingear/1.jpg", alt: "Саджанці інжиру" }
      ];
    }
    
    // Для шовковиці
    if (species.toLowerCase().includes('шовковиця')) {
      return [
        { src: "/shovkovitcha/1.jpg", alt: "Саджанці шовковиці" },
        { src: "/shovkovitcha/2.jpg", alt: "Саджанці шовковиці" }
      ];
    }
    
    // Для всіх інших рослин - залежно від типу кореневої системи
    if (rootSystem === 'closed') {
      return [
        { src: "/closed/1.jpg", alt: "Саджанці з закритою кореневою системою" },
        { src: "/closed/2.jpg", alt: "Саджанці з закритою кореневою системою" },
        { src: "/closed/3.jpg", alt: "Саджанці з закритою кореневою системою" },
        { src: "/closed/4.jpg", alt: "Саджанці з закритою кореневою системою" },
        { src: "/closed/5.jpg", alt: "Саджанці з закритою кореневою системою" }
      ];
    } else {
      // Для відкритої кореневої системи - використовуємо фото з папки products
      return [
        { src: "/gallery/4.jpg", alt: `Саджанці ${product.title}` },
        { src: "/gallery/19.jpg", alt: `Саджанці ${product.title}` },
        { src: "/gallery/20.jpg", alt: `Саджанці ${product.title}` },
        { src: "/gallery/21.jpg", alt: `Саджанці ${product.title}` }
      ];
    }
  };

  const images = getSeedlingImages();

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-secondary mb-4">
        Фото саджанців
      </h2>
      
      <div className="space-y-4">
        {/* Основне зображення */}
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Мініатюри (якщо є кілька фото) */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                  selectedImage === index
                    ? 'ring-2 ring-primary ring-offset-2'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Опис типу саджанців */}
        <div className="text-sm text-gray-600">
          {product.species.toLowerCase().includes('інжир') && (
            <p>Саджанці інжиру з закритою кореневою системою</p>
          )}
          {product.species.toLowerCase().includes('шовковиця') && (
            <p>Саджанці шовковиці з закритою кореневою системою</p>
          )}
          {!product.species.toLowerCase().includes('інжир') && 
           !product.species.toLowerCase().includes('шовковиця') && (
            <p>
              Саджанці з {product.rootSystem === 'open' ? 'відкритою' : 'закритою'} кореневою системою
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
