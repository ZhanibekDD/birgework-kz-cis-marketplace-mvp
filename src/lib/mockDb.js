export const CATEGORIES = [
  { id: 'ai', title: 'AI и автоматизация' },
  { id: 'web', title: 'Разработка сайтов' },
  { id: 'design', title: 'Дизайн и брендинг' },
  { id: 'marketing', title: 'Маркетинг' },
  { id: 'texts', title: 'Тексты и документы' },
  { id: 'analytics', title: 'Аналитика и таблицы' },
]

export const USERS = [
  { id: 'u-guest', username: 'guest', role: 'guest', fullName: 'Гость', city: 'KZ', bio: '', rating: 0, completedOrders: 0 },
  {
    id: 'u-buyer-1',
    username: 'aliya_pm',
    role: 'buyer',
    fullName: 'Алия Бекенова',
    city: 'Алматы',
    bio: 'Product manager в финтехе.',
    rating: 4.9,
    completedOrders: 31,
    stats: { spent: 1250000, activeOrders: 3, savedServices: 7 },
  },
  {
    id: 'u-seller-1',
    username: 'nurlan_ai',
    role: 'seller',
    fullName: 'Нурлан Жумабек',
    city: 'Астана',
    bio: 'AI-инженер, автоматизация продаж и поддержки.',
    rating: 4.95,
    completedOrders: 186,
    sellerMetrics: { responseRate: 98, responseTimeHours: 1, completionRate: 96, repeatBuyers: 43 },
    portfolio: ['Бот для сети клиник', 'AI FAQ для e-commerce', 'CRM связка для дилера авто'],
    earnings: { month: 840000, pending: 210000, withdrawn: 5300000 },
  },
  {
    id: 'u-seller-2',
    username: 'diana_web',
    role: 'seller',
    fullName: 'Диана Каримова',
    city: 'Бишкек',
    bio: 'Frontend/UX и конверсионные лендинги.',
    rating: 4.87,
    completedOrders: 142,
    sellerMetrics: { responseRate: 94, responseTimeHours: 3, completionRate: 93, repeatBuyers: 28 },
    portfolio: ['Лендинг SaaS', 'Редизайн личного кабинета', 'Брендинг для агентства'],
    earnings: { month: 560000, pending: 95000, withdrawn: 4100000 },
  },
]

export const SERVICES = [
  {
    id: 'srv-1', slug: 'telegram-ai-sales-bot', sellerId: 'u-seller-1', category: 'ai',
    title: 'Telegram AI-бот для продаж и поддержки',
    shortDescription: 'Сценарии лидогенерации, FAQ, handoff в менеджера.',
    rating: 4.9, reviewsCount: 67, tags: ['Telegram', 'OpenAI', 'CRM'],
    deliveryDays: 4, ordersInQueue: 6, bookmarks: 52,
    packages: [
      { id: 'basic', name: 'Базовый', price: 55000, revisions: 1, features: ['1 сценарий', 'FAQ-блок'] },
      { id: 'standard', name: 'Стандарт', price: 98000, revisions: 2, features: ['3 сценария', 'CRM webhook', 'Аналитика'] },
      { id: 'pro', name: 'Бизнес', price: 165000, revisions: 4, features: ['5+ сценариев', 'A/B воронки'] },
    ],
    faq: [{ q: 'Есть интеграция с Bitrix?', a: 'Да, при наличии API доступа.' }],
  },
  {
    id: 'srv-2', slug: 'landing-nextjs-cis', sellerId: 'u-seller-2', category: 'web',
    title: 'Конверсионный лендинг на Next.js',
    shortDescription: 'Быстрый адаптивный сайт под рекламу с аналитикой.',
    rating: 4.8, reviewsCount: 54, tags: ['React', 'Next.js', 'UI/UX'],
    deliveryDays: 5, ordersInQueue: 3, bookmarks: 39,
    packages: [
      { id: 'basic', name: 'Start', price: 70000, revisions: 1, features: ['До 5 блоков', 'Форма заявок'] },
      { id: 'standard', name: 'Growth', price: 120000, revisions: 2, features: ['До 8 блоков', 'A/B CTA'] },
      { id: 'pro', name: 'Scale', price: 190000, revisions: 4, features: ['До 12 блоков', 'SEO setup'] },
    ],
    faq: [{ q: 'Подключаете аналитики?', a: 'Да, GA4/Meta/Yandex Metrica.' }],
  },
]

export const REVIEWS = [
  { id: 'rev-1', serviceSlug: 'telegram-ai-sales-bot', authorId: 'u-buyer-1', rating: 5, text: 'Сильная экспертиза, запуск в срок.', date: '2026-03-10' },
  { id: 'rev-2', serviceSlug: 'landing-nextjs-cis', authorId: 'u-buyer-1', rating: 5, text: 'Конверсия выросла на 22%.', date: '2026-02-26' },
]

export const ORDERS = [
  {
    id: 'BW-2211', serviceSlug: 'telegram-ai-sales-bot', buyerId: 'u-buyer-1', sellerId: 'u-seller-1', packageId: 'standard',
    status: 'in_progress', total: 98000, deadline: '2026-04-04', createdAt: '2026-03-28', brief: 'Нужен бот с CRM интеграцией.',
  },
  {
    id: 'BW-2212', serviceSlug: 'landing-nextjs-cis', buyerId: 'u-buyer-1', sellerId: 'u-seller-2', packageId: 'basic',
    status: 'delivered', total: 70000, deadline: '2026-04-02', createdAt: '2026-03-25', brief: 'Лендинг под логистику.',
  },
]

export const CHATS = [
  {
    id: 'chat-1', participantIds: ['u-buyer-1', 'u-seller-1'], unreadBy: ['u-buyer-1'], topic: 'Telegram бот для отдела продаж',
    messages: [
      { id: 'm1', senderId: 'u-buyer-1', text: 'Нужна интеграция с amoCRM.', time: '10:12', date: '2026-03-29' },
      { id: 'm2', senderId: 'u-seller-1', text: 'Сделаем, отправьте доступы.', time: '10:15', date: '2026-03-29' },
    ],
  },
]

export const NOTIFICATIONS = [
  { id: 'n1', userId: 'u-buyer-1', type: 'order', title: 'Заказ BW-2212 доставлен', actionPath: '/dashboard/orders', date: '2026-03-29', read: false },
  { id: 'n2', userId: 'u-buyer-1', type: 'message', title: 'Новое сообщение от nurlan_ai', actionPath: '/dashboard/messages', date: '2026-03-29', read: false },
  { id: 'n3', userId: 'u-seller-1', type: 'payout', title: 'Выплата 210 000 ₸ ожидает подтверждения', actionPath: '/dashboard', date: '2026-03-28', read: true },
]

export const DEFAULT_SESSION = { userId: 'u-guest' }
