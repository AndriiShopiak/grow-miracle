import Gallery from "@/components/Gallery";
import Link from "next/link";

const imagesUrl = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
  "/gallery/7.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/10.jpg",
  "/gallery/11.jpg",
  "/gallery/12.jpg",
  "/gallery/13.jpg",
  "/gallery/14.jpg",
  "/gallery/15.jpg",
  "/gallery/16.jpg",
  "/gallery/17.jpg",
  "/gallery/18.jpg",
  "/gallery/19.jpg",
  "/gallery/20.jpg",
  "/gallery/21.jpg",
  "/gallery/22.jpg",
  "/gallery/23.jpg",
  "/gallery/24.jpg",
  "/gallery/25.jpg",
  "/gallery/26.jpg",
  "/gallery/27.jpg",
  "/gallery/28.jpg",
  "/gallery/29.jpg",
  "/gallery/30.jpg",
  "/gallery/31.jpg",
  "/gallery/32.jpg",
  "/gallery/33.jpg",
  "/gallery/34.jpg",
  "/gallery/35.jpg",
  "/gallery/36.jpg",
  "/gallery/37.jpg",
  "/gallery/38.jpg",
  "/gallery/39.jpg",
  "/gallery/40.jpg",
  "/gallery/41.jpg",
];

const images = Array.from({ length: imagesUrl.length }, (_, i) => {
  const n = i + 1;
  return { src: imagesUrl[i], alt: `Сад, фото ${n}` };
});

export const metadata = {
  title: "Галерея — Сад Олега",
  description: "Фото з нашого саду та господарства.",
};

export default function GalleryPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-secondary mb-2">Галерея</h1>
      </div>
      <Gallery images={images} columns={3} />
      <div className="text-center mt-5">
        <Link href="/" className="inline-block rounded-lg bg-accent px-5 py-2 text-white transition-colors">
          На головну
        </Link>
      </div>
    </main>
  );
}


