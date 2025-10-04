import Image from "next/image";

// Дані про продукцію
const products = [
  {
    id: 1,
    name: "Помідори черрі",
    price: "45 грн/кг",
    description: "Солодкі черрі помідори з власного саду",
    image: "/tomatoes.jpg"
  },
  {
    id: 2,
    name: "Огірки",
    price: "35 грн/кг",
    description: "Хрусткі свіжі огірки",
    image: "/cucumbers.jpg"
  },
  {
    id: 3,
    name: "Морква",
    price: "25 грн/кг",
    description: "Солодка морква без хімії",
    image: "/carrots.jpg"
  },
  {
    id: 4,
    name: "Яблука",
    price: "40 грн/кг",
    description: "Соковиті яблука різних сортів",
    image: "/apples.jpg"
  },
  {
    id: 5,
    name: "Картопля",
    price: "20 грн/кг",
    description: "Молода картопля з власного поля",
    image: "/potatoes.jpg"
  },
  {
    id: 6,
    name: "Цибуля",
    price: "30 грн/кг",
    description: "Свіжа цибуля для приготування",
    image: "/onions.jpg"
  }
];

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
