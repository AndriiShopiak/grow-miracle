import Image from "next/image";
import Link from "next/link";
import { cultivars } from "@/data/products";
import DetailRight from "@/components/products/DetailRight";
import SeedlingPhotos from "@/components/SeedlingPhotos";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return cultivars.map((c) => ({ id: String(c.id) }));
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Основне фото товару */}
            <div className="relative w-full h-80 md:h-[28rem] rounded-xl overflow-hidden shadow">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            
            {/* Галерея саджанців */}
            <SeedlingPhotos product={item} />
          </div>
          <DetailRight item={item} />
        </div>
      </div>
    </div>
  );
}


