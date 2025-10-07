"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { useMemo } from "react";
import type { Cultivar } from "@/data/products";
import { UNIFIED_PRICE } from "@/data/products";

export default function DetailRight({ item }: { item: Cultivar }) {
  const { add, items } = useCart();
  const isInCart = useMemo(() => items.some((i) => i.id === item.id), [items, item.id]);
  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary mb-3">{item.title}</h1>
      <div className="text-xl font-semibold text-secondary mb-2">{UNIFIED_PRICE}</div>
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
        <div>
          <dt className="font-medium">Підщепа</dt>
          <dd>{item.rootstock}</dd>
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
        {isInCart ? (
          <button
            disabled
            className="rounded-lg border border-gray-300 px-5 py-2 text-gray-500 cursor-default"
          >
            В кошику
          </button>
        ) : (
          <button
            onClick={() => add({ id: item.id, title: item.title, image: item.image })}
            className="rounded-lg border border-primary px-5 py-2 text-primary hover:bg-light-green/40 transition-colors"
          >
            Додати до кошика
          </button>
        )}
      </div>
    </div>
  );
}


