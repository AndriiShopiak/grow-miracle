"use client";

import Image from "next/image";
import { useState, useMemo, useCallback, useEffect } from "react";

type GalleryProps = {
  images: { src: string; alt?: string; width?: number; height?: number }[];
  columns?: 2 | 3 | 4;
  gapClassName?: string;
  enableLightbox?: boolean;
};

export default function Gallery({
  images,
  columns = 3,
  gapClassName = "gap-3",
  enableLightbox = true,
}: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const columnCount = columns;

  const columnsData = useMemo(() => {
    const cols: { src: string; alt?: string }[][] = Array.from(
      { length: columnCount },
      () => []
    );
    images.forEach((img, idx) => {
      cols[idx % columnCount].push({ src: img.src, alt: img.alt });
    });
    return cols;
  }, [images, columnCount]);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i + 1) % images.length
      ),
    [images.length]
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (!enableLightbox || activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, enableLightbox, close, next, prev]);

  return (
    <div>
      <div className={`grid ${gapClassName}`} style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
        {columnsData.map((col, colIdx) => (
          <div key={colIdx} className="space-y-3">
            {col.map((img, idx) => {
              const globalIdx = colIdx + idx * columnCount;
              return (
                <button
                  key={`${img.src}-${idx}`}
                  className="block w-full overflow-hidden rounded-xl bg-white/60 shadow hover:shadow-lg transition-shadow"
                  onClick={() => enableLightbox && setActiveIndex(globalIdx)}
                  aria-label="Переглянути зображення"
                >
                  <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={img.src}
                      alt={img.alt || "Галерея саду"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {enableLightbox && activeIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full px-3 py-1" onClick={close}>
            Закрити
          </button>
          <button className="absolute left-4 md:left-8 text-white bg-black/40 rounded-full px-3 py-2" onClick={prev} aria-label="Попереднє">‹</button>
          <div className="relative w-full max-w-5xl aspect-[16/10]">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt || "Галерея саду"}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button className="absolute right-4 md:right-8 text-white bg-black/40 rounded-full px-3 py-2" onClick={next} aria-label="Наступне">›</button>
        </div>
      )}
    </div>
  );
}


