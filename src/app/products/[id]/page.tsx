import Image from "next/image";
import Link from "next/link";
import { cultivars } from "@/data/products";
import DetailRight from "@/components/products/DetailRight";
import SeedlingPhotos from "@/components/SeedlingPhotos";
import { generateProductSchema } from "@/utils/schemaUtils";
import { generateProductOGTags } from "@/utils/ogUtils";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return cultivars.map((c) => ({ id: String(c.id) }));
}

// Генерація мета-даних для кожної сторінки продукту
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const product = cultivars.find((c) => c.id === id);

  if (!product) {
    return {
      title: "Товар не знайдено | Сад Олега",
      description: "Запитаний товар не знайдено.",
    };
  }

  const productOGTags = generateProductOGTags(product);

  return {
    title: productOGTags.title,
    description: productOGTags.description,
    keywords: `саджанці, ${product.species}, ${product.title}, сад, Закарпаття, доставка`,
    openGraph: {
      title: productOGTags.title,
      description: productOGTags.description,
      url: productOGTags.url,
      siteName: productOGTags.siteName,
      images: [
        {
          url: productOGTags.image,
          width: 1200,
          height: 630,
          alt: productOGTags.imageAlt,
        },
      ],
      locale: productOGTags.locale,
      type: productOGTags.type,
    },
    twitter: {
      card: "summary_large_image",
      title: productOGTags.title,
      description: productOGTags.description,
      images: [productOGTags.image],
    },
    other: {
      "og:image:alt": productOGTags.imageAlt,
      "product:price:amount": productOGTags.product.price,
      "product:price:currency": productOGTags.product.currency,
      "product:availability": productOGTags.product.availability,
      "product:condition": productOGTags.product.condition,
      "product:brand": productOGTags.product.brand,
    },
  };
}

export default async function ProductDetail({ params }: Props) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const item = cultivars.find((c) => c.id === id);

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold text-secondary mb-4">Товар не знайдено</h1>
        <Link href="/" className="text-accent hover:underline">На головну</Link>
      </div>
    );
  }

  const productSchema = generateProductSchema(item);

  return (
    <>
      {/* Schema.org розмітка для продукту */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Основне фото товару */}
              <div className="relative w-full h-80 md:h-[28rem] rounded-xl overflow-hidden shadow">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover" 
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              
              {/* Галерея саджанців */}
              <SeedlingPhotos product={item} />
            </div>
            <DetailRight item={item} />
          </div>
        </div>
      </div>
    </>
  );
}


