"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Gallery from "@/components/Gallery";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header з логотипом та навігацією */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-2 sm:px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
                <Image
                  src="/logo/garden_logo.jpg"
                  alt="Логотип Сад Олега"
                  width={64}
                  height={64}
                  className="object-cover"
                  priority
                  quality={85}
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-white truncate">Сад Олега</h1>
                <p className="text-white text-xs sm:text-sm truncate">Тут росте диво</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('products')} 
                className="text-white hover:text-light-green transition-colors"
              >
                Продукція
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-white hover:text-light-green transition-colors"
              >
                Про нас
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-white hover:text-light-green transition-colors"
              >
                Контакти
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-4 pt-4">
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="text-white hover:text-light-green transition-colors text-left py-2"
                >
                  Продукція
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-white hover:text-light-green transition-colors text-left py-2"
                >
                  Про нас
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-white hover:text-light-green transition-colors text-left py-2"
                >
                  Контакти
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero секція */}
      <section className="relative py-20 md:py-32 min-h-[70vh] overflow-hidden">
        {/* Фонове зображення з паралакс ефектом */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/products/18.jpg"
            alt="Саджанці хурми"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        
        {/* Покращена градієнтна підкладка */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-primary/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        
        <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
          {/* Контейнер з покращеним дизайном без hover-ефектів */}
          <div className="mx-auto bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md rounded-3xl px-8 py-12 mb-10 border border-white/20 shadow-2xl">
            {/* Декоративна лінія зверху */}
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Сад Олега — тут росте диво
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-white/95 mb-6 leading-relaxed font-light">
                Ми вирощуємо саджанці плодових і екзотичних культур: 
                <span className="text-accent font-medium"> хурму, азіміну (pawpaw), інжир, гранат, ківі</span> та багато інших.
              </p>
              <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                Наші рослини виростають із <span className="text-accent font-medium">любов&apos;ю</span> на закарпатській землі, 
                у чистому довкіллі та під пильним доглядом.
              </p>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Пропонуємо саджанці з <span className="text-accent font-medium">відкритою та закритою кореневою системою</span>, 
                щоб кожен садівник міг обрати зручний варіант.
              </p>
              <p className="text-lg md:text-xl text-white/90 mt-4 italic">
                У &quot;Саді Олега&quot; ми створюємо не просто посадковий матеріал — 
                <span className="text-accent font-medium"> ми допомагаємо вирощувати життя, красу і врожай</span>.
              </p>
            </div>
          </div>
          
          {/* Покращені кнопки з анімацією */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center overflow-hidden px-4 py-2">
            <button
              onClick={() => scrollToSection('products')}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-green-600 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-green-500 transition-all duration-300 hover:scale-105 transform"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="xs:hidden">Саджанці</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-4 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 transform"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="hidden xs:inline">Зв&apos;язатися з нами</span>
              <span className="xs:hidden">Контакти</span>
            </button>
          </div>
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

      {/* Галерея прев'ю */}
      <section className="py-16 bg-white/60">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold text-secondary mb-4">Світлини нашого саду</h3>
          </div>
          <Gallery
            images={Array.from({ length:6 }, (_, i) => ({ src: `/gallery/${i + 1}.jpg`, alt: `Сад, фото ${i + 1}` }))}
            columns={3}
            enableLightbox={false}
          />
          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-accent text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-light-accent focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 mb-1"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Переглянути всі фото</span>
              <span className="sm:hidden">Всі фото</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Секція про нас */}
      <section id="about" className="bg-light-green py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-3xl font-bold text-secondary mb-6">Про нас</h3>
                <p className="text-lg md:text-xl text-secondary leading-relaxed mb-5">
                  Сад Олега — це сімейна справа, народжена з любові до природи й землі.
                  Ми почали з кількох саджанців хурми у власному дворі, а сьогодні вирощуємо десятки сортів плодових і екзотичних дерев, 
                  серед яких <span className="text-accent font-medium">азіміна, інжир, гранат, ківі</span> та багато інших.
                </p>
                <p className="text-lg md:text-xl text-secondary leading-relaxed mb-5">
                  Ми віримо, що кожен сад може стати місцем спокою, краси та щедрого врожаю.
                  Саме тому ми з турботою доглядаємо кожен саджанець — від насінини до готової рослини.
                </p>
                <p className="text-lg md:text-xl text-secondary leading-relaxed mb-5">
                  Наш розсадник — це не просто бізнес, а <span className="text-accent font-medium">справа серця</span>, 
                  у яку вкладено любов, терпіння і душу.
                </p>
                <p className="text-lg md:text-xl text-secondary leading-relaxed font-medium">
                  Ми хочемо, щоб у вашому саду теж росло диво 🌳
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/gallery/15.jpg"
                  alt="Наш сад — галерея"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={false}
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Контакти */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-secondary mb-12">Контакти</h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
              {/* Телефон з месенджерами */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-secondary mb-4">Телефон</h4>
                  <p className="text-2xl font-bold text-accent mb-6">+380 68 524 93 82</p>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href="tel:+380685249382" 
                      className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors hover:scale-110"
                      title="Подзвонити"
                    >
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </a>
                    <a 
                      href="viber://chat?number=+380685249382" 
                      className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 transition-colors hover:scale-110"
                      title="Написати в Viber"
                    >
                      <Image
                        src="/icons/viber.png"
                        alt="Viber"
                        width={30}
                        height={30}
                        className="w-7 h-7"
                        quality={90}
                        sizes="28px"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Адреса */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-secondary mb-4">Наша адреса</h4>
                  <p className="text-lg text-secondary leading-relaxed">
                    с.Бене, Берегівський р-н., Закарпатська обл.<br />
                    Екологічно чистий район<br />
                    <span className="text-accent font-medium">Доставка по всій Україні</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Про компанію */}
            <div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
                <Image
                  src="/logo/garden_logo.jpg"
                  alt="Логотип Сад Олега"
                  width={64}
                  height={64}
                  className="object-cover"
                  quality={85}
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>
              <h4 className="text-xl font-bold mb-4">Сад Олега</h4>
            </div>

            {/* Швидкі посилання */}
            <div>
              <h4 className="text-xl font-bold mb-4">Навігація</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => scrollToSection('products')}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Продукція
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Про нас
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Контакти
                  </button>
                </li>
                <li>
                  <Link href="/gallery" className="text-white/80 hover:text-white transition-colors">
                    Галерея
                  </Link>
                </li>
              </ul>
            </div>

            {/* Контактна інформація */}
            <div>
              <h4 className="text-xl font-bold mb-4">Контакти</h4>
              <div className="space-y-2 text-white/80">
                <p>📞 +380 68 524 93 82</p>
                <p>📍 Закарпатська область</p>
                <p>🌱 Доставка по Україні</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80">
              &copy; {new Date().getFullYear()} Сад Олега - Тут росте диво. Всі права захищені.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ProductGrid moved to client component under src/components/ProductGrid.tsx
