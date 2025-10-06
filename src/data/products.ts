// Centralized product data and cultivar details

export type BasicProduct = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
};

export type Cultivar = {
  id: number;
  title: string; // e.g. "Соснівська"
  species: string; // Вид
  ripeningTerm: string; // Термін дозрівання
  fruits: string; // Плоди
  taste: string; // Смак
  selfFertility: string; // Самоплідність
  yield: string; // Врожайність
  frostResistance: string; // Морозостійкість
  rootstock: string; // Підщепа
  cultivation: {
    planting: string; // Посадка
    care: string; // Догляд
    bearingPeriod: string; // Період плодоношення
  };
  image: string; // Зображення
  // Optional extended fields
  tree?: string; // Дерево
  site?: string; // Вибір місця
  soil?: string; // Ґрунт
  diseaseResistance?: string; // Стійкість до хвороб
};

export const products: BasicProduct[] = [
  {
    id: 1,
    name: "Помідори черрі",
    price: "45 грн/кг",
    description: "Солодкі черрі помідори з власного саду",
    image: "/tomatoes.jpg",
  },
  {
    id: 2,
    name: "Огірки",
    price: "35 грн/кг",
    description: "Хрусткі свіжі огірки",
    image: "/cucumbers.jpg",
  },
  {
    id: 3,
    name: "Морква",
    price: "25 грн/кг",
    description: "Солодка морква без хімії",
    image: "/carrots.jpg",
  },
  {
    id: 4,
    name: "Яблука",
    price: "40 грн/кг",
    description: "Соковиті яблука різних сортів",
    image: "/apples.jpg",
  },
  {
    id: 5,
    name: "Картопля",
    price: "20 грн/кг",
    description: "Молода картопля з власного поля",
    image: "/potatoes.jpg",
  },
  {
    id: 6,
    name: "Цибуля",
    price: "30 грн/кг",
    description: "Свіжа цибуля для приготування",
    image: "/onions.jpg",
  },
];

// Example cultivar based on the provided description
export const cultivars: Cultivar[] = [
  {
    id: 1,
    title: "Соснівська",
    species: "хурма гібридна",
    ripeningTerm: "ранній, плоди дозрівають у перших числах жовтня",
    fruits:
      "середнього розміру, маса плодів (70-90 г), жовто-помаранчеві з рожевим рум'янцем",
    taste:
      "солодкий, соковитий з незначною терпкістю, яка зникає при повному дозріванні",
    selfFertility:
      "сорт партенокарпічний, запилювачів не потребує",
    yield: "дуже висока",
    frostResistance: "висока (до -29 C°)",
    rootstock: "хурма вірджинська",
    cultivation: {
      planting:
        "Для посадки потрібне сонячне місце, захищене від вітру.",
      care:
        "Дерево невибагливе, але для кращого врожаю рекомендується мульчування ґрунту під кроною та своєчасна обрізка.",
      bearingPeriod:
        "Плодоношення починається на 2-4 рік після посадки.",
    },
    image: "/products/1.jpg",
  },
  {
    id: 2,
    title: "Дар Софіївки",
    species: "хурма гібридна",
    ripeningTerm: "ранній, перша декада жовтня",
    fruits:
      "округлі, злегка плескатої форми, вагою 90-150 г, з оранжево-червоною м'якоттю та солодким смаком",
    taste: "солодкий",
    selfFertility:
      "сорт самоплідний, але наявність запилювачів покращує врожайність і розмір плодів",
    yield: "—",
    frostResistance:
      "висока, до -28°C, у перші роки бажано зимове укриття",
    rootstock: "хурма вірджинська",
    cultivation: {
      planting: "—",
      care: "—",
      bearingPeriod: "—",
    },
    image: "/products/2.jpg",
    tree:
      "середньоросле, широка округла крона, висота 3–3,5 м",
    site: "сонячна, захищена від вітру ділянка",
    soil: "невибаглива, краще росте на легких, родючих ґрунтах",
  },
  {
    id: 3,
    title: "Чучупака",
    species: "хурма гібридна",
    ripeningTerm: "дозрівають плоди разом з Росіянкою",
    fruits:
      "малонасінні, м'якоть червоно-коричнева, маса 60–90 г",
    taste: "приємний смак плодів",
    selfFertility:
      "— (конкретні дані про партенокарпічність відсутні)",
    yield: "— (конкретні дані відсутні)",
    frostResistance:
      "висока зимостійкість (заслуговує уваги завдяки стійкості)",
    rootstock: "хурма вірджинська",
    cultivation: {
      planting: "—",
      care: "—",
      bearingPeriod: "ранній вступ у плодоношення",
    },
    image: "/products/3.jpg",
  },
  {
    id: 4,
    title: "Росіянка",
    species: "хурма гібридна",
    ripeningTerm: "—",
    fruits:
      "середні, 90–130 г, смачні, соковиті, майже без насіння",
    taste: "солодкий, соковитий",
    selfFertility:
      "сорт партенокарпічний, запилювачів не потребує",
    yield: "дуже висока",
    frostResistance:
      "доросле дерево витримує морози до -27°C",
    rootstock: "хурма вірджинська",
    cultivation: {
      planting: "Для посадки потрібне сонячне місце, захищене від вітру.",
      care:
        "Дерево невибагливе, для кращого врожаю — мульчування ґрунту під кроною та своєчасна обрізка.",
      bearingPeriod: "Плодоношення починається на 2–4 рік після посадки.",
    },
    image: "/products/4.jpg",
  },
  {
    id: 5,
    title: "Божий дар",
    species: "хурма гібридна",
    ripeningTerm: "середнього строку, кінець жовтня",
    fruits:
      "округлі, яскраво-оранжеві, м'якоть соковита; маса 80–120 г",
    taste: "солодка, соковита",
    selfFertility:
      "сорт однодомний, плодоносить без запилення; гарний запилювач для інших",
    yield: "висока, до ~50 кг з дерева",
    frostResistance:
      "висока, витримує морози до -26°C",
    rootstock: "хурма вірджинська",
    cultivation: {
      planting: "сонячне, захищене від вітру місце",
      care:
        "помірний полив, особливо в перші роки; весною формувальна та санітарна обрізка",
      bearingPeriod: "—",
    },
    image: "/products/5.jpg",
    site: "сонячне, захищене від вітру",
    diseaseResistance: "висока",
  },
  {
    id: 6,
    title: "Нікітська бордова",
    species: "хурма гібридна",
    ripeningTerm: "середній, кінець жовтня — початок листопада",
    fruits:
      "середнього розміру, 110–150 г; червоно-помаранчева шкірка з восковим нальотом; бордово-червона солодка м'якоть",
    taste:
      "солодкий, соковитий з незначною терпкістю, яка зникає при повному дозріванні",
    selfFertility:
      "сорт партенокарпічний, запилювачів не потребує",
    yield: "дуже висока",
    frostResistance: "висока (до -26°C)",
    rootstock: "хурма вірджинська",
    cultivation: {
      planting: "Для посадки потрібне сонячне місце, захищене від вітру.",
      care:
        "Дерево невибагливе, але для кращого врожаю — мульчування ґрунту під кроною та своєчасна обрізка.",
      bearingPeriod: "Плодоношення починається на 2–4 рік після посадки.",
    },
    image: "/products/6.jpg",
  },
];


