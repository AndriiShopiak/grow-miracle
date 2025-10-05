import Image from "next/image";
import { products, cultivars } from "@/data/products";

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
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-light-green flex items-center justify-center">
                  <span className="text-6xl">🥕</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-secondary mb-2">{product.name}</h4>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-accent">{product.price}</span>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                      Замовити
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секція сортів/культур з детальним описом */}
      <section id="cultivars" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-secondary mb-12">
            Детальні описи сортів
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {cultivars.map((item) => (
              <article key={item.title} className="bg-light-green/40 border border-light-green rounded-lg shadow-sm p-6">
                <header className="mb-4">
                  <h4 className="text-2xl font-semibold text-secondary">{item.title}</h4>
                  <p className="text-sm text-gray-700">Вид: {item.species}</p>
                </header>
                <dl className="space-y-2 text-gray-800">
                  <div>
                    <dt className="font-medium">Термін дозрівання</dt>
                    <dd>{item.ripeningTerm}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Плоди</dt>
                    <dd>{item.fruits}</dd>
                  </div>
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
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h5 className="text-lg font-semibold text-secondary mb-2">Особливості вирощування</h5>
                  <ul className="list-disc pl-5 space-y-1 text-gray-800">
                    <li><span className="font-medium">Посадка:</span> {item.cultivation.planting}</li>
                    <li><span className="font-medium">Догляд:</span> {item.cultivation.care}</li>
                    <li><span className="font-medium">Період плодоношення:</span> {item.cultivation.bearingPeriod}</li>
                  </ul>
                </div>
              </article>
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
