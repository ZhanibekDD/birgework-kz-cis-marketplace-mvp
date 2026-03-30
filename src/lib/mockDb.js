export const CATEGORIES = [
  { id: 'ai', title: 'AI и автоматизация' },
  { id: 'web', title: 'Разработка сайтов' },
  { id: 'design', title: 'Дизайн и брендинг' },
  { id: 'marketing', title: 'Маркетинг' },
  { id: 'texts', title: 'Тексты и документы' },
  { id: 'analytics', title: 'Аналитика и парсинг' },
]

export const USERS = [
  {
    id: 'u-buyer-1',
    username: 'aliya_pm',
    role: 'buyer',
    fullName: 'Алия Бекенова',
    city: 'Алматы',
    bio: 'Product manager в финтехе. Заказываю UX, контент и автоматизацию.',
    rating: 4.9,
    completedOrders: 28,
  },
  {
    id: 'u-seller-1',
    username: 'nurlan_ai',
    role: 'seller',
    fullName: 'Нурлан Жумабек',
    city: 'Астана',
    bio: 'AI-инженер. Запускаю ботов, автоворонки и бизнес-автоматизацию.',
    rating: 4.95,
    completedOrders: 186,
  },
  {
    id: 'u-seller-2',
    username: 'diana_web',
    role: 'seller',
    fullName: 'Диана Каримова',
    city: 'Бишкек',
    bio: 'Frontend + WordPress разработка, лендинги с фокусом на конверсию.',
    rating: 4.87,
    completedOrders: 142,
  },
]

export const SERVICES = [
  {
    id: 'srv-1',
    slug: 'telegram-ai-sales-bot',
    title: 'Соберу Telegram AI-бота для продаж и поддержки',
    category: 'ai',
    sellerId: 'u-seller-1',
    rating: 4.9,
    reviewsCount: 67,
    tags: ['Telegram', 'OpenAI', 'CRM'],
    description:
      'Проектирую и внедряю Telegram-бота для лидогенерации, FAQ и передачи заявок в CRM. Настраиваю сценарии, автосообщения, аналитику и handoff на менеджера.',
    deliveryDays: 4,
    ordersInQueue: 6,
    packages: [
      { id: 'basic', name: 'Базовый', price: 55000, revisions: 1, features: ['1 сценарий', 'FAQ-блок', 'Интеграция Telegram'] },
      { id: 'standard', name: 'Стандарт', price: 98000, revisions: 2, features: ['3 сценария', 'CRM webhook', 'Сбор аналитики'] },
      { id: 'pro', name: 'Бизнес', price: 165000, revisions: 4, features: ['5+ сценариев', 'A/B воронки', 'Онбординг команды'] },
    ],
    faq: [
      { q: 'Подходит ли для Kaspi/Bitrix?', a: 'Да, подключаю через webhook/API при наличии доступа.' },
      { q: 'Можно ли добавить оплату?', a: 'Да, в расширенном пакете подключаю платежный модуль.' },
    ],
  },
  {
    id: 'srv-2',
    slug: 'landing-nextjs-cis',
    title: 'Разработаю быстрый лендинг на React/Next.js под рекламу',
    category: 'web',
    sellerId: 'u-seller-2',
    rating: 4.8,
    reviewsCount: 54,
    tags: ['React', 'Next.js', 'UI/UX'],
    description: 'Делаю современный адаптивный лендинг с CTA-блоками, аналитикой и SEO-базой. Подходит для лидогенерации в Казахстане и СНГ.',
    deliveryDays: 5,
    ordersInQueue: 3,
    packages: [
      { id: 'basic', name: 'Start', price: 70000, revisions: 1, features: ['До 5 блоков', 'Адаптив', 'Форма заявок'] },
      { id: 'standard', name: 'Growth', price: 120000, revisions: 2, features: ['До 8 блоков', 'A/B CTA', 'Микроанимации'] },
      { id: 'pro', name: 'Scale', price: 190000, revisions: 4, features: ['До 12 блоков', 'SEO setup', 'Подключение аналитики'] },
    ],
    faq: [{ q: 'Входит ли копирайт?', a: 'Да, редактирую ваши тексты под структуру лендинга.' }],
  },
  {
    id: 'srv-3',
    slug: 'brand-kit-logo-social',
    title: 'Сделаю бренд-кит: логотип, цвета и соцсетевые шаблоны',
    category: 'design',
    sellerId: 'u-seller-2',
    rating: 4.7,
    reviewsCount: 39,
    tags: ['Figma', 'Branding', 'SMM'],
    description: 'Собираю узнаваемый визуальный стиль и гайд, чтобы команда быстро запускала креативы без хаоса.',
    deliveryDays: 6,
    ordersInQueue: 2,
    packages: [
      { id: 'basic', name: 'Mini', price: 45000, revisions: 1, features: ['Логотип', 'Палитра', '2 шаблона'] },
      { id: 'standard', name: 'Core', price: 85000, revisions: 2, features: ['Логотип', 'Гайдлайн PDF', '6 шаблонов'] },
      { id: 'pro', name: 'Full', price: 130000, revisions: 3, features: ['Полный бренд-кит', '12 шаблонов', 'Пакет исходников'] },
    ],
    faq: [],
  },
]

export const REVIEWS = [
  { id: 'rev1', serviceSlug: 'telegram-ai-sales-bot', author: 'fintech_kz', rating: 5, text: 'Сильная экспертиза, запустили бота за 4 дня.' },
  { id: 'rev2', serviceSlug: 'landing-nextjs-cis', author: 'logistix', rating: 5, text: 'Конверсия выросла на 22% через месяц.' },
]

export const ORDERS = [
  {
    id: 'BW-2211',
    serviceSlug: 'telegram-ai-sales-bot',
    buyerId: 'u-buyer-1',
    sellerId: 'u-seller-1',
    packageId: 'standard',
    status: 'В работе',
    total: 98000,
    deadline: '2026-04-04',
  },
  {
    id: 'BW-2212',
    serviceSlug: 'landing-nextjs-cis',
    buyerId: 'u-buyer-1',
    sellerId: 'u-seller-2',
    packageId: 'basic',
    status: 'На проверке',
    total: 70000,
    deadline: '2026-04-02',
  },
]

export const CHATS = [
  {
    id: 'chat-1',
    participantIds: ['u-buyer-1', 'u-seller-1'],
    topic: 'Telegram бот для отдела продаж',
    messages: [
      { id: 'm1', senderId: 'u-buyer-1', text: 'Нужна интеграция с amoCRM.', time: '10:12' },
      { id: 'm2', senderId: 'u-seller-1', text: 'Сделаем через webhook, нужен доступ.', time: '10:15' },
    ],
  },
]

export const NOTIFICATIONS = [
  { id: 'n1', userId: 'u-buyer-1', type: 'order', title: 'Заказ BW-2212 отправлен на проверку', date: '2026-03-29', read: false },
  { id: 'n2', userId: 'u-buyer-1', type: 'message', title: 'Новое сообщение от nurlan_ai', date: '2026-03-29', read: true },
]

export const DEFAULT_AUTH_USER = USERS[0]
