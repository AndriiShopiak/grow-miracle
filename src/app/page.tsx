import Image from "next/image";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header з логотипом та навігацією */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
                <Image
                  src="/logo/garden_logo.jpg"
                  alt="Логотип Сад Олега"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Сад Олега</h1>
                <p className="text-white text-sm">Тут росте диво</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#products" className="text-white hover:text-light-green transition-colors">Продукція</a>
              <a href="#about" className="text-white hover:text-light-green transition-colors">Про нас</a>
              <a href="#contact" className="text-white hover:text-light-green transition-colors">Контакти</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero секція */}
      <section className="relative py-20 md:py-28 min-h-[60vh]">
        {/* Фонове зображення */}
        <Image
          src="/products/18.jpg"
          alt="Саджанці хурми"
          fill
          priority
          className="object-cover z-0"
          sizes="100vw"
        />
        {/* Градієнтна підкладка для контрасту тексту */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-primary/60 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center max-w-3xl">
          <div className="mx-auto bg-black/20 backdrop-blur-sm rounded-2xl px-6 py-8 mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Саджанці хурми з відкритою кореневою системою
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Вибрані сорти для українського клімату: солодкі без в&apos;яжучості, ранні та пізні.
              Саджанці з відкритою кореневою системою — найкращий вибір для успішної посадки.
              Допоможемо підібрати саджанець під вашу ділянку та догляд.
            </p>
          </div>
          <a
            href="#products"
            className="inline-block bg-accent text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-light-accent transition-colors shadow-lg"
          >
            Переглянути саджанці
          </a>
        </div>
      </section>

      {/* Секція продукції */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-secondary mb-12">
            Наша продукція
          </h3>
          <ProductGrid />
        </div>
      </section>

      {/* Галерея прев’ю */}
      <section className="py-16 bg-white/60">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-center text-secondary">Світлини</h3>
          </div>
          <Gallery
            images={Array.from({ length:6 }, (_, i) => ({ src: `/gallery/${i + 1}.jpg`, alt: `Сад, фото ${i + 1}` }))}
            columns={3}
            enableLightbox={false}
          />
          <div className="mt-8 text-center">
            <Link
              href="/gallery"
              className="inline-block bg-accent text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-light-accent focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-white transition"
            >
              Більше фото
            </Link>
          </div>
        </div>
      </section>

      {/* Секція про нас */}
      <section id="about" className="bg-light-green py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-secondary mb-8">Про наш сад</h3>
            <p className="text-lg text-secondary mb-6">
              Ми вирощуємо саджанці хурми з 2015 року. Наш сад розташований у екологічно чистому районі, 
              де ми використовуємо тільки природні методи вирощування без хімічних добрив та пестицидів.
            </p>
            <p className="text-lg text-secondary mb-6">
              Всі наші саджанці мають відкриту кореневу систему, що забезпечує кращу приживаність 
              та швидший розвиток рослин після посадки. Це перевага перед саджанцями в контейнерах.
            </p>
            <p className="text-lg text-secondary">
              Кожен саджанець вирощується з турботою, щоб забезпечити вашу родину найкращими 
              та найздоровішими рослинами для вашого саду.
            </p>
          </div>
        </div>
      </section>

      {/* Контакти */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-secondary mb-12">Контакти</h3>
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-1 gap-8">
              {/* Телефон з месенджерами */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-secondary mb-4">Телефон</h4>
                <p className="text-lg text-accent mb-4">+380 68 524 93 82</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="tel:+380685249382" 
                    className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
                    title="Подзвонити"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </a>
                  <a 
                    href="viber://chat?number=+380685249382" 
                    className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 transition-colors"
                    title="Написати в Viber"
                  >
                    <Image
                      src="/icons/viber.png"
                      alt="Viber"
                      width={30}
                      height={30}
                      className="w-7 h-7"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Сад Олега - Тут росте диво. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}

// ProductGrid moved to client component under src/components/ProductGrid.tsx
