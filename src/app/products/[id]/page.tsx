import Image from "next/image";
import Link from "next/link";
import { cultivars } from "@/data/products";

type Props = {
  params: { id: string };
};

export function generateStaticParams() {
  return cultivars.map((c) => ({ id: String(c.id) }));
}

export default function ProductDetail({ params }: Props) {
  const id = Number(params.id);
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
          <div className="relative w-full h-80 md:h-[28rem] rounded-xl overflow-hidden shadow">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-3">{item.title}</h1>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-light-green/60 text-secondary text-xs font-medium px-3 py-1">
                {item.species}
              </span>
              <span className="inline-flex items-center rounded-full bg-accent/10 text-accent text-xs font-medium px-3 py-1">
                Дозрівання: {item.ripeningTerm}
              </span>
            </div>
            <p className="text-gray-700 leading-7 mb-6">{item.fruits}</p>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
              <div>
                <dt className="font-medium">Смак</dt>
                <dd>{item.taste}</dd>
              </div>
              <div>
                <dt className="font-medium">Самоплідність</dt>
                <dd>{item.selfFertility}</dd>
              </div>
              <div>
                <dt className="font-medium">Врожайність</dt>
                <dd>{item.yield}</dd>
              </div>
              <div>
                <dt className="font-medium">Морозостійкість</dt>
                <dd>{item.frostResistance}</dd>
              </div>
            </dl>

            <div className="mt-8 border-t border-gray-200 pt-5">
              <h2 className="text-lg font-semibold text-secondary mb-2">Особливості вирощування</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                <li><span className="font-medium">Посадка:</span> {item.cultivation.planting}</li>
                <li><span className="font-medium">Догляд:</span> {item.cultivation.care}</li>
                <li><span className="font-medium">Період плодоношення:</span> {item.cultivation.bearingPeriod}</li>
              </ul>
            </div>

            <div className="mt-8 flex gap-3">
              <Link href="/" className="rounded-lg bg-primary px-5 py-2 text-white hover:bg-secondary transition-colors">
                На головну
              </Link>
              <Link href="#contact" className="rounded-lg border border-primary px-5 py-2 text-primary hover:bg-light-green/40 transition-colors">
                Замовити
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


