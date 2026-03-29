import {
  Bot,
  Laptop,
  Layers3,
  TrendingUp,
  FileText,
  BarChart3,
} from 'lucide-react'

export const categories = [
  { id: 'ai', title: 'AI и автоматизация', icon: Bot, count: 1280 },
  { id: 'dev', title: 'Разработка сайтов', icon: Laptop, count: 2340 },
  { id: 'design', title: 'Дизайн и брендинг', icon: Layers3, count: 1910 },
  { id: 'marketing', title: 'Маркетинг и реклама', icon: TrendingUp, count: 1560 },
  { id: 'docs', title: 'Тексты и документы', icon: FileText, count: 980 },
  { id: 'analytics', title: 'Аналитика и Excel', icon: BarChart3, count: 740 },
]

/** Полные карточки услуг: пакеты как у Kwork + текст для страницы услуги */
export const gigs = [
  {
    id: 1,
    title: 'Сделаю Telegram-бота для продаж и заявок',
    seller: {
      name: 'Aigerim Dev',
      rating: 4.9,
      reviews: 187,
      level: 'PRO',
      location: 'Алматы',
      responseTime: 'в течение часа',
      ordersDone: 420,
      avatarColor: 'from-violet-500 to-fuchsia-600',
    },
    rating: 4.9,
    reviews: 187,
    currency: '₸',
    category: 'dev',
    level: 'PRO',
    location: 'Алматы',
    delivery: '3 дня',
    tags: ['Telegram', 'Python', 'CRM'],
    featured: true,
    description: `Соберу бота под ваши сценарии: приём заявок, оплата, напоминания, интеграция с CRM и Google Sheets. Подойдёт для e-commerce, услуг и лидогенерации.

Перед стартом уточню воронку, тексты кнопок и сценарии диалогов. После запуска дам инструкцию для менеджеров и 14 дней правок по мелочи.`,
    requirements: [
      'Доступ к боту в BotFather или готовый токен',
      'Тексты сообщений и ссылки на оплату / CRM',
      'Логотип и стиль общения (опционально)',
    ],
    faq: [
      { q: 'Нужен ли сервер?', a: 'Для MVP хостим на облаке, доступ к серверу не обязателен.' },
      { q: 'Можно ли оплату в тенге?', a: 'Да, подключаем эквайринг или платёжку по вашему региону.' },
    ],
    packages: [
      {
        id: 'basic',
        name: 'Basic',
        price: 35000,
        delivery: '5 дней',
        revisions: 1,
        features: ['До 10 экранов диалога', 'Приём заявок в Telegram', 'Файл с инструкцией'],
      },
      {
        id: 'standard',
        name: 'Standard',
        price: 45000,
        delivery: '3 дня',
        revisions: 2,
        popular: true,
        features: ['Всё из Basic', 'Интеграция с Google Sheets', 'Уведомления менеджеру', 'Мини-CRM в таблице'],
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 65000,
        delivery: '4 дня',
        revisions: 3,
        features: ['Всё из Standard', 'Интеграция с вашей CRM', 'Оплата в боте', '30 дней поддержки'],
      },
    ],
  },
  {
    id: 2,
    title: 'Настрою AI-ассистента для бизнеса под WhatsApp и сайт',
    seller: {
      name: 'Ruslan AI',
      rating: 5.0,
      reviews: 96,
      level: 'TOP',
      location: 'Астана',
      responseTime: 'до 2 часов',
      ordersDone: 210,
      avatarColor: 'from-emerald-500 to-teal-600',
    },
    rating: 5.0,
    reviews: 96,
    currency: '₸',
    category: 'ai',
    level: 'TOP',
    location: 'Астана',
    delivery: '5 дней',
    tags: ['AI', 'OpenAI', 'Автоматизация'],
    featured: true,
    description: `Подключу LLM к вашим каналам: ответы на типовые вопросы, квалификация лида, передача оператору. Снижаем нагрузку на поддержку и ускоряем ответ.

Документация по промптам и базе знаний — в комплекте.`,
    requirements: ['База FAQ или примеры переписок', 'Доступ к API мессенджера или виджету на сайте'],
    faq: [
      { q: 'Какие модели?', a: 'OpenAI / аналоги по согласованию и бюджету.' },
    ],
    packages: [
      { id: 'basic', name: 'Basic', price: 55000, delivery: '7 дней', revisions: 1, features: ['1 канал', 'До 50 Q&A', 'Промпты'] },
      { id: 'standard', name: 'Standard', price: 80000, delivery: '5 дней', revisions: 2, popular: true, features: ['2 канала', 'Сценарии ветвления', 'Передача оператору'] },
      { id: 'premium', name: 'Premium', price: 120000, delivery: '6 дней', revisions: 3, features: ['Интеграция с CRM', 'Аналитика запросов', '60 дней сопровождения'] },
    ],
  },
  {
    id: 3,
    title: 'Сделаю лендинг под Казахстан и СНГ с высокой конверсией',
    seller: {
      name: 'Maksat Studio',
      rating: 4.8,
      reviews: 213,
      level: 'PRO',
      location: 'Шымкент',
      responseTime: 'в течение дня',
      ordersDone: 340,
      avatarColor: 'from-amber-500 to-orange-600',
    },
    rating: 4.8,
    reviews: 213,
    currency: '₸',
    category: 'design',
    level: 'PRO',
    location: 'Шымкент',
    delivery: '4 дня',
    tags: ['Landing', 'UI/UX', 'Figma'],
    featured: false,
    description: `Лендинг в Figma + вёрстка на стеке под ваш хостинг. Акцент на скорость загрузки, доверие и локальный платёж.

Включаю адаптив, микротексты и блоки под UTP.`,
    requirements: ['Брендбук или референсы', 'Тексты или ТЗ на копирайт'],
    faq: [],
    packages: [
      { id: 'basic', name: 'Basic', price: 40000, delivery: '5 дней', revisions: 1, features: ['1 экран Figma', 'Статичная вёрстка'] },
      { id: 'standard', name: 'Standard', price: 55000, delivery: '4 дня', revisions: 2, popular: true, features: ['До 6 блоков', 'Адаптив', 'Формы'] },
      { id: 'premium', name: 'Premium', price: 75000, delivery: '5 дней', revisions: 3, features: ['Анимации', 'Интеграция форм', 'Настройка аналитики'] },
    ],
  },
  {
    id: 4,
    title: 'Парсер товаров в Excel, CSV или Google Sheets',
    seller: {
      name: 'Data Hunter',
      rating: 4.9,
      reviews: 142,
      level: 'TOP',
      location: 'Караганда',
      responseTime: 'до 3 часов',
      ordersDone: 500,
      avatarColor: 'from-sky-500 to-indigo-600',
    },
    rating: 4.9,
    reviews: 142,
    currency: '₸',
    category: 'analytics',
    level: 'TOP',
    location: 'Караганда',
    delivery: '2 дня',
    tags: ['Parser', 'Excel', 'Google Sheets'],
    featured: true,
    description: `Соберу данные с каталогов и маркетплейсов по правилам: без дублей, с нормализацией цен и валют. Выгрузка в удобном формате.

Оговариваем лимиты и легальность источников.`,
    requirements: ['Пример ссылки и полей', 'Формат выгрузки'],
    faq: [{ q: 'Есть лимиты?', a: 'Да, фиксируем объём в ТЗ.' }],
    packages: [
      { id: 'basic', name: 'Basic', price: 45000, delivery: '3 дня', revisions: 1, features: ['До 500 позиций', '1 источник'] },
      { id: 'standard', name: 'Standard', price: 60000, delivery: '2 дня', revisions: 2, popular: true, features: ['До 3000 позиций', '2 источника', 'Дедупликация'] },
      { id: 'premium', name: 'Premium', price: 90000, delivery: '3 дня', revisions: 2, features: ['По расписанию', 'API / webhook', 'Мониторинг ошибок'] },
    ],
  },
  {
    id: 5,
    title: 'Запущу таргет и performance-рекламу по СНГ',
    seller: {
      name: 'Olga Growth',
      rating: 4.7,
      reviews: 88,
      level: 'PRO',
      location: 'Бишкек',
      responseTime: 'в течение дня',
      ordersDone: 160,
      avatarColor: 'from-rose-500 to-red-600',
    },
    rating: 4.7,
    reviews: 88,
    currency: '₸',
    category: 'marketing',
    level: 'PRO',
    location: 'Бишкек',
    delivery: '6 дней',
    tags: ['Meta Ads', 'TikTok', 'Лиды'],
    featured: false,
    description: `Настройка воронки: креативы, посадки, пиксели, события. Отчёт по CPL и рекомендации по масштабированию.`,
    requirements: ['Доступ к рекламным кабинетам', 'Бюджет на тест'],
    faq: [],
    packages: [
      { id: 'basic', name: 'Basic', price: 55000, delivery: '7 дней', revisions: 0, features: ['Аудит', '1 воронка', 'Отчёт'] },
      { id: 'standard', name: 'Standard', price: 70000, delivery: '6 дней', revisions: 0, popular: true, features: ['2 канала', 'A/B заголовки', 'Оптимизация 2 недели'] },
      { id: 'premium', name: 'Premium', price: 95000, delivery: '8 дней', revisions: 0, features: ['Полный фид', 'Креативы', 'Сопровождение 30 дней'] },
    ],
  },
  {
    id: 6,
    title: 'Напишу договор, оферту и деловые документы',
    seller: {
      name: 'Legal Copy Pro',
      rating: 4.9,
      reviews: 59,
      level: 'PRO',
      location: 'Ташкент',
      responseTime: 'до 1 дня',
      ordersDone: 120,
      avatarColor: 'from-slate-600 to-slate-800',
    },
    rating: 4.9,
    reviews: 59,
    currency: '₸',
    category: 'docs',
    level: 'PRO',
    location: 'Ташкент',
    delivery: '2 дня',
    tags: ['Документы', 'Юридически', 'Тексты'],
    featured: false,
    description: `Юридически выверенные шаблоны под IT и услуги: оферта, договор, политика, акты. Язык — RU/KZ по запросу.`,
    requirements: ['Модель монетизации', 'Регион применения'],
    faq: [],
    packages: [
      { id: 'basic', name: 'Basic', price: 22000, delivery: '3 дня', revisions: 1, features: ['1 документ'] },
      { id: 'standard', name: 'Standard', price: 30000, delivery: '2 дня', revisions: 2, popular: true, features: ['Пакет из 3 документов', 'Согласование 1 раунд'] },
      { id: 'premium', name: 'Premium', price: 45000, delivery: '3 дня', revisions: 3, features: ['Индивидуальная доработка', 'Консультация 1 час'] },
    ],
  },
]

export function getGigById(rawId) {
  const id = Number(rawId)
  return gigs.find((g) => g.id === id) ?? null
}

/** Карточки каталога: минимальные поля + цена от минимального пакета */
export const services = gigs.map((g) => {
  const minPrice = Math.min(...g.packages.map((p) => p.price))
  return {
    id: g.id,
    title: g.title,
    seller: g.seller.name,
    rating: g.rating,
    reviews: g.reviews,
    price: minPrice,
    currency: g.currency,
    category: g.category,
    level: g.level,
    location: g.location,
    delivery: g.delivery,
    tags: g.tags,
    featured: g.featured,
  }
})

export const sellerPlans = [
  {
    name: 'Start',
    price: '0 ₸',
    desc: 'Для новичков и первых продаж',
    features: ['До 5 услуг', 'Чат с заказчиком', 'Без абонплаты', 'Безопасная сделка'],
  },
  {
    name: 'Pro',
    price: '19 900 ₸/мес',
    desc: 'Для активных фрилансеров',
    features: ['До 50 услуг', 'Продвижение в каталоге', 'Расширенная аналитика', 'PRO-значок'],
    highlight: true,
  },
  {
    name: 'Agency',
    price: '49 900 ₸/мес',
    desc: 'Для студий и команд',
    features: ['Командный кабинет', 'Несколько менеджеров', 'White-label КП', 'Личный менеджер'],
  },
]

export const dashboardMockOrders = [
  { id: 'BW-1042', gig: 'Telegram-бот для продаж', buyer: 'ТОО «Старт»', status: 'В работе', sum: '45 000 ₸', due: '2 дня' },
  { id: 'BW-1038', gig: 'AI-ассистент WhatsApp', buyer: 'ИП Нурлан', status: 'Сдача', sum: '80 000 ₸', due: '5 дней' },
  { id: 'BW-1021', gig: 'Парсер в Google Sheets', buyer: 'Marketplace KZ', status: 'Завершён', sum: '60 000 ₸', due: '—' },
]
