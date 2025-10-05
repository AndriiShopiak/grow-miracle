import Image from "next/image";
import { cultivars } from "@/data/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header з логотипом та навігацією */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-6">
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
      <section className="bg-gradient-to-b from-light-green to-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
            Свіжі овочі та фрукти
          </h2>
          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Натуральні продукти з власного саду для вашої родини. 
            Без хімії, з турботою.
          </p>
          <a 
            href="#products" 
            className="inline-block bg-accent text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-light-accent transition-colors shadow-lg"
          >
            Переглянути продукцію
          </a>
        </div>
      </section>

      {/* Секція продукції */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-secondary mb-12">
            Наша продукція
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cultivars.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-md ring-1 ring-black/5 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="relative h-56">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-90" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <h4 className="text-white text-xl font-semibold drop-shadow">{item.title}</h4>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-light-green/60 text-secondary text-xs font-medium px-2.5 py-1">
                      {item.species}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-accent/10 text-accent text-xs font-medium px-2.5 py-1">
                      Дозрівання: {item.ripeningTerm}
                    </span>
                  </div>
                  <p
                    className="text-gray-700 text-sm leading-6"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {item.fruits}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Морозостійкість: {item.frostResistance}</span>
                    <a
                      href={`/products/${item.id}`}
                      className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white text-sm font-medium transition-colors hover:bg-secondary"
                    >
                      Деталі
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Секція про нас */}
      <section id="about" className="bg-light-green py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-secondary mb-8">Про наш сад</h3>
            <p className="text-lg text-secondary mb-6">
              Ми вирощуємо овочі та фрукти з 2015 року. Наш сад розташований у екологічно чистому районі, 
              де ми використовуємо тільки природні методи вирощування без хімічних добрив та пестицидів.
            </p>
            <p className="text-lg text-secondary">
              Кожен продукт вирощується з та турботою, щоб забезпечити вашу родину найсвіжішими 
              та найкориснішими овочами та фруктами.
            </p>
          </div>
        </div>
      </section>

      {/* Контакти */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-secondary mb-12">Контакти</h3>
          <div className="max-w-2xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-secondary mb-4">Телефон</h4>
                <p className="text-lg text-accent">+380 50 123 45 67</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-secondary mb-4">Email</h4>
                <p className="text-lg text-accent">oleg.garden@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Сад Олега - Тут росте диво. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
