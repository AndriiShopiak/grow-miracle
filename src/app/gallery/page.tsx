import Gallery from "@/components/Gallery";

const images = Array.from({ length: 25 }, (_, i) => {
  const n = i + 1;
  return { src: `/gallery/${n}.jpg`, alt: `Сад, фото ${n}` };
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
    </main>
  );
}


