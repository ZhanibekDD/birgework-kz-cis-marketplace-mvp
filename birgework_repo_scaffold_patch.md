# BirgeWork — продолжение реализации

Ниже готовый стартовый scaffold, который превращает текущий одиночный JSX-файл в **запускаемый Vite + React + Tailwind проект**.

## Что меняем

Сейчас в репозитории лежит один файл-компонент. Для нормального продолжения разработки нужно привести проект к понятной структуре:

- Vite + React
- TailwindCSS
- Framer Motion
- Lucide React
- разнос данных и секций по файлам
- подготовка к добавлению роутинга, auth, backend API и кабинетов

---

## Структура проекта

```text
birgework-kz-cis-marketplace-mvp/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   └── mockData.js
│   └── components/
│       ├── layout/
│       │   ├── Header.jsx
│       │   └── Footer.jsx
│       └── sections/
│           ├── HeroSection.jsx
│           ├── CategoriesSection.jsx
│           ├── ServicesSection.jsx
│           ├── HowItWorksSection.jsx
│           ├── AudienceSection.jsx
│           ├── PricingSection.jsx
│           └── RoadmapSection.jsx
```

---

## 1) `package.json`

```json
{
  "name": "birgework-kz-cis-marketplace-mvp",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.6.3",
    "lucide-react": "^0.511.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^5.4.10"
  }
}
```

---

## 2) `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## 3) `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
```

---

## 4) `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 5) `index.html`

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BirgeWork — Фриланс-биржа Казахстан + СНГ</title>
    <meta
      name="description"
      content="Фриланс-биржа для Казахстана и СНГ: сайты, AI, парсинг, дизайн, маркетинг и автоматизация с безопасной сделкой."
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 6) `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## 7) `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-slate-50 text-slate-900 antialiased;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.container-main {
  @apply mx-auto max-w-7xl px-4 md:px-6;
}

.section-title {
  @apply text-3xl md:text-4xl font-bold tracking-tight text-slate-950;
}

.section-desc {
  @apply text-base md:text-lg text-slate-600;
}

.card-surface {
  @apply rounded-3xl border border-slate-200 bg-white shadow-soft;
}

.badge-soft {
  @apply inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700;
}

.btn-primary {
  @apply inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800;
}

.btn-secondary {
  @apply inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50;
}
```

---

## 8) `src/data/mockData.js`

```js
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

export const services = [
  {
    id: 1,
    title: 'Сделаю Telegram-бота для продаж и заявок',
    seller: 'Aigerim Dev',
    rating: 4.9,
    reviews: 187,
    price: 45000,
    currency: '₸',
    category: 'dev',
    level: 'PRO',
    location: 'Алматы',
    delivery: '3 дня',
    tags: ['Telegram', 'Python', 'CRM'],
    featured: true,
  },
  {
    id: 2,
    title: 'Настрою AI-ассистента для бизнеса под WhatsApp и сайт',
    seller: 'Ruslan AI',
    rating: 5.0,
    reviews: 96,
    price: 80000,
    currency: '₸',
    category: 'ai',
    level: 'TOP',
    location: 'Астана',
    delivery: '5 дней',
    tags: ['AI', 'OpenAI', 'Автоматизация'],
    featured: true,
  },
  {
    id: 3,
    title: 'Сделаю лендинг под Казахстан и СНГ с высокой конверсией',
    seller: 'Maksat Studio',
    rating: 4.8,
    reviews: 213,
    price: 55000,
    currency: '₸',
    category: 'design',
    level: 'PRO',
    location: 'Шымкент',
    delivery: '4 дня',
    tags: ['Landing', 'UI/UX', 'Figma'],
    featured: false,
  },
  {
    id: 4,
    title: 'Парсер товаров в Excel, CSV или Google Sheets',
    seller: 'Data Hunter',
    rating: 4.9,
    reviews: 142,
    price: 60000,
    currency: '₸',
    category: 'analytics',
    level: 'TOP',
    location: 'Караганда',
    delivery: '2 дня',
    tags: ['Parser', 'Excel', 'Google Sheets'],
    featured: true,
  },
  {
    id: 5,
    title: 'Запущу таргет и performance-рекламу по СНГ',
    seller: 'Olga Growth',
    rating: 4.7,
    reviews: 88,
    price: 70000,
    currency: '₸',
    category: 'marketing',
    level: 'PRO',
    location: 'Бишкек',
    delivery: '6 дней',
    tags: ['Meta Ads', 'TikTok', 'Лиды'],
    featured: false,
  },
  {
    id: 6,
    title: 'Напишу договор, оферту и деловые документы',
    seller: 'Legal Copy Pro',
    rating: 4.9,
    reviews: 59,
    price: 30000,
    currency: '₸',
    category: 'docs',
    level: 'PRO',
    location: 'Ташкент',
    delivery: '2 дня',
    tags: ['Документы', 'Юридически', 'Тексты'],
    featured: false,
  },
]

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
```

---

## 9) `src/components/layout/Header.jsx`

```jsx
import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="container-main flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">BirgeWork</div>
            <div className="text-xs text-slate-500">Фриланс-биржа Казахстан + СНГ</div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          <a href="#catalog" className="hover:text-slate-950">Каталог</a>
          <a href="#how" className="hover:text-slate-950">Как это работает</a>
          <a href="#buyers" className="hover:text-slate-950">Заказчикам</a>
          <a href="#sellers" className="hover:text-slate-950">Исполнителям</a>
          <a href="#pricing" className="hover:text-slate-950">Тарифы</a>
        </nav>

        <div className="flex items-center gap-2">
          <button className="btn-secondary">Войти</button>
          <button className="btn-primary">Разместить услугу</button>
        </div>
      </div>
    </header>
  )
}
```

---

## 10) `src/components/layout/Footer.jsx`

```jsx
import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-main grid gap-8 py-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold">BirgeWork</div>
              <div className="text-xs text-slate-500">Фриланс-биржа KZ + СНГ</div>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-500">
            Платформа для покупки и продажи цифровых услуг. Быстро, безопасно и по делу.
          </p>
        </div>

        <div>
          <div className="mb-3 font-semibold">Платформа</div>
          <div className="space-y-2 text-sm text-slate-500">
            <div>Каталог услуг</div>
            <div>Безопасная сделка</div>
            <div>Рейтинг исполнителей</div>
            <div>Корпоративные аккаунты</div>
          </div>
        </div>

        <div>
          <div className="mb-3 font-semibold">Для пользователей</div>
          <div className="space-y-2 text-sm text-slate-500">
            <div>Заказчикам</div>
            <div>Исполнителям</div>
            <div>Поддержка</div>
            <div>Партнерская программа</div>
          </div>
        </div>

        <div>
          <div className="mb-3 font-semibold">Юридическое</div>
          <div className="space-y-2 text-sm text-slate-500">
            <div>Пользовательское соглашение</div>
            <div>Оферта</div>
            <div>Политика конфиденциальности</div>
            <div>Правила арбитража</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## 11) `src/components/sections/HeroSection.jsx`

```jsx
import { Search, ArrowRight, CheckCircle2, Wallet, Globe, Briefcase, Users } from 'lucide-react'

export default function HeroSection({ query, setQuery, selectedCategory, setSelectedCategory, sortBy, setSortBy, categories }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.22),transparent_30%),radial-gradient(circle_at_left,rgba(15,23,42,0.06),transparent_25%)]" />

      <div className="container-main relative z-10 grid gap-10 py-14 md:py-20 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
        <div className="space-y-8">
          <span className="badge-soft">MVP в стиле Kwork, но адаптирован под Казахстан и СНГ</span>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Покупайте и продавайте цифровые услуги быстро, безопасно и по фиксированной цене
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 md:text-xl">
              Биржа для бизнеса, агентств и фрилансеров: разработка, AI, парсинг, дизайн, маркетинг,
              тексты и автоматизация. Оплата в ₸, ₽, $, безопасная сделка и рейтинг исполнителей.
            </p>
          </div>

          <div className="card-surface p-3">
            <div className="grid gap-3 md:grid-cols-[1fr,180px,180px,auto]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Например: Telegram-бот, лендинг, AI-ассистент, парсер"
                  className="h-12 w-full rounded-2xl border-0 bg-slate-50 pl-11 pr-4 text-base outline-none"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 rounded-2xl border-0 bg-slate-50 px-4 outline-none"
              >
                <option value="all">Все категории</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 rounded-2xl border-0 bg-slate-50 px-4 outline-none"
              >
                <option value="popular">Сначала популярные</option>
                <option value="rating">По рейтингу</option>
                <option value="price_asc">Цена по возрастанию</option>
                <option value="price_desc">Цена по убыванию</option>
              </select>

              <button className="btn-primary h-12">
                Найти
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            {['Безопасная сделка', 'Фиксированные пакеты', 'Оплата в KZT/RUB/USD', 'Проверенные исполнители'].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-slate-900" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-6 md:p-7">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Исполнителей', value: '12 000+', icon: Users },
              { label: 'Активных услуг', value: '48 000+', icon: Briefcase },
              { label: 'Средний чек', value: '57 000 ₸', icon: Wallet },
              { label: 'География', value: 'KZ + СНГ', icon: Globe },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-slate-50 p-4">
                <stat.icon className="mb-3 h-5 w-5 text-slate-700" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 12) `src/components/sections/CategoriesSection.jsx`

```jsx
import { motion } from 'framer-motion'

export default function CategoriesSection({ categories }) {
  return (
    <section className="container-main py-8 md:py-12">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <motion.div key={cat.id} whileHover={{ y: -4 }}>
              <div className="card-surface p-5 transition-all hover:shadow-xl">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-semibold leading-snug">{cat.title}</div>
                <div className="mt-2 text-sm text-slate-500">{cat.count.toLocaleString('ru-RU')} услуг</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
```

---

## 13) `src/components/sections/ServicesSection.jsx`

```jsx
import { motion } from 'framer-motion'
import { Clock3, Star, MapPin, ChevronRight } from 'lucide-react'

function ServiceCard({ item }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="card-surface h-full p-6 hover:shadow-xl transition-all">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {item.featured && <span className="badge-soft">Хит</span>}
              <span className="badge-soft">{item.level}</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Star className="h-4 w-4 fill-current" />
              {item.rating}
              <span className="text-slate-400">({item.reviews})</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>

          <div className="flex items-center justify-between text-sm text-slate-500">
            <span className="font-medium text-slate-700">{item.seller}</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {item.location}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Clock3 className="h-4 w-4" />
              {item.delivery}
            </span>
            <span>от</span>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-2xl font-bold tracking-tight text-slate-950">
                {item.price.toLocaleString('ru-RU')} {item.currency}
              </div>
              <div className="text-xs text-slate-500">фиксированный пакет, без сюрпризов</div>
            </div>

            <button className="btn-primary">
              Заказать
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection({ services }) {
  return (
    <section id="catalog" className="container-main py-12 md:py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-3">
          <span className="badge-soft">Каталог услуг</span>
          <h2 className="section-title">Популярные кворки для бизнеса и e-commerce</h2>
          <p className="section-desc">
            Тут уже чувствуется вайб маркетплейса: фиксированные пакеты, понятные сроки, рейтинг и реальные кейсы исполнителей.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          Найдено: <span className="font-semibold text-slate-900">{services.length}</span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
```

---

## 14) `src/components/sections/HowItWorksSection.jsx`

```jsx
import { Search, Wallet, MessageSquare, ShieldCheck } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    {
      title: '1. Заказчик выбирает услугу',
      desc: 'Поиск по каталогу, фильтры, рейтинг, отзывы и готовые пакеты с четким объемом работ.',
      icon: Search,
    },
    {
      title: '2. Деньги резервируются',
      desc: 'Платформа удерживает оплату до приемки результата. Меньше нервов, меньше цирка.',
      icon: Wallet,
    },
    {
      title: '3. Исполнитель сдает заказ',
      desc: 'Чат, этапы, файлы, апдейты по прогрессу и защита от недопониманий через ТЗ и чек-листы.',
      icon: MessageSquare,
    },
    {
      title: '4. Завершение или арбитраж',
      desc: 'Принятие, отзыв, автозавершение либо спор с разбором переписки и вложений.',
      icon: ShieldCheck,
    },
  ]

  return (
    <section id="how" className="border-y border-slate-200 bg-white">
      <div className="container-main py-14 md:py-18">
        <div className="max-w-3xl space-y-3">
          <span className="badge-soft">Как это работает</span>
          <h2 className="section-title">Логика как у Kwork, но локально сильнее</h2>
          <p className="section-desc">
            Платформа заточена под сделки в Казахстане и СНГ: локальные валюты, понятная комиссия, безопасная оплата и удобный спор-центр.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <div key={step.title} className="card-surface p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 15) `src/components/sections/AudienceSection.jsx`

```jsx
export default function AudienceSection() {
  return (
    <section className="container-main py-14 md:py-18">
      <div className="grid gap-6 lg:grid-cols-2">
        <div id="buyers" className="card-surface p-7">
          <div className="max-w-3xl space-y-3">
            <span className="badge-soft">Для бизнеса</span>
            <h2 className="section-title">Найти подрядчика за часы, не за бесконечные созвоны</h2>
            <p className="section-desc">
              Фиксированные пакеты снимают боль бесконечных смет и ватных обсуждений. Видно цену, сроки и объем работ сразу.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {[
              'Умные фильтры по нише, языку, локации и валюте',
              'ТЗ-шаблоны для типовых услуг: сайт, бот, дизайн, реклама',
              'Безопасная сделка и арбитраж по переписке и файлам',
              'Корпоративный кабинет для нескольких менеджеров',
            ].map((point) => (
              <div key={point} className="rounded-2xl bg-slate-50 p-4 text-slate-700">{point}</div>
            ))}
          </div>
        </div>

        <div id="sellers" className="card-surface p-7">
          <div className="max-w-3xl space-y-3">
            <span className="badge-soft">Для фрилансеров</span>
            <h2 className="section-title">Продавай услуги пакетами и масштабируйся без хаоса</h2>
            <p className="section-desc">
              Не просто отклики на проекты, а витрина готовых предложений. Это и есть магия Kwork-подхода: меньше болтовни, больше заказов.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {[
              'Создание 3 пакетов: Basic / Standard / Premium',
              'Поднятие в каталоге и рекламные места внутри платформы',
              'Аналитика просмотров, конверсии и повторных заказов',
              'Портфолио, достижения, бейджи и кейсы по нишам',
            ].map((point) => (
              <div key={point} className="rounded-2xl bg-slate-50 p-4 text-slate-700">{point}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 16) `src/components/sections/PricingSection.jsx`

```jsx
export default function PricingSection({ plans }) {
  return (
    <section id="pricing" className="border-y border-slate-200 bg-white">
      <div className="container-main py-14 md:py-18">
        <div className="max-w-3xl space-y-3">
          <span className="badge-soft">Монетизация</span>
          <h2 className="section-title">Тарифы для продавцов и доход платформы</h2>
          <p className="section-desc">
            Тут уже не просто сайт, а бизнес-модель: комиссия с заказа, платные PRO-функции, реклама услуг и корпоративные кабинеты.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[32px] p-7 shadow-soft ${plan.highlight ? 'border border-slate-950 bg-slate-950 text-white' : 'border border-slate-200 bg-white'}`}
            >
              <div>
                <div className="text-2xl font-bold">{plan.name}</div>
                <div className={`mt-2 text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{plan.desc}</div>
              </div>

              <div className="mt-6 text-4xl font-bold tracking-tight">{plan.price}</div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className={plan.highlight ? 'text-slate-100' : 'text-slate-700'}>
                    • {feature}
                  </div>
                ))}
              </div>

              <button className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${plan.highlight ? 'bg-white text-slate-950 hover:bg-slate-100' : 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50'}`}>
                Выбрать тариф
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 17) `src/components/sections/RoadmapSection.jsx`

```jsx
export default function RoadmapSection() {
  const items = [
    'Регистрация заказчиков и исполнителей',
    'Профиль, портфолио и кейсы',
    'Пакеты Basic / Standard / Premium',
    'Оплата и холд средств',
    'Чат и отправка файлов',
    'Арбитраж и система тикетов',
    'Админка, модерация и жалобы',
    'SEO для категорий и услуг',
  ]

  return (
    <section className="container-main py-14 md:py-18">
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-7 text-white md:p-9">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950">Roadmap</span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Что добавлять в следующей версии</h3>
            <p className="text-lg text-slate-300">
              Этот экран уже годится как жирный MVP. Следующий уровень — личные кабинеты, backend, escrow, чат, платежи, модерация, отзывы, арбитраж и SEO-страницы категорий.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-7 md:p-9">
          <div className="space-y-4">
            <span className="badge-soft">Идея позиционирования</span>
            <h3 className="text-3xl font-bold tracking-tight">Kwork для Казахстана и СНГ, только без устаревшего вайба</h3>
            <p className="text-slate-600">
              Главный заход: быстрое размещение услуг, локальные платежи, доверие через безопасную сделку, понятные тарифы и акцент на digital-услуги с высоким спросом.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 18) `src/App.jsx`

```jsx
import { useMemo, useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import CategoriesSection from './components/sections/CategoriesSection'
import ServicesSection from './components/sections/ServicesSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import AudienceSection from './components/sections/AudienceSection'
import PricingSection from './components/sections/PricingSection'
import RoadmapSection from './components/sections/RoadmapSection'
import { categories, services, sellerPlans } from './data/mockData'

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const filteredServices = useMemo(() => {
    let items = services.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.join(' ').toLowerCase().includes(query.toLowerCase()) ||
        item.seller.toLowerCase().includes(query.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      return matchesQuery && matchesCategory
    })

    if (sortBy === 'price_asc') items = [...items].sort((a, b) => a.price - b.price)
    if (sortBy === 'price_desc') items = [...items].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') items = [...items].sort((a, b) => b.rating - a.rating)
    if (sortBy === 'popular') items = [...items].sort((a, b) => b.reviews - a.reviews)

    return items
  }, [query, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <Header />

      <main>
        <HeroSection
          query={query}
          setQuery={setQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />
        <CategoriesSection categories={categories} />
        <ServicesSection services={filteredServices} />
        <HowItWorksSection />
        <AudienceSection />
        <PricingSection plans={sellerPlans} />
        <RoadmapSection />
      </main>

      <Footer />
    </div>
  )
}
```

---

## Команды запуска

```bash
npm install
npm run dev
```

---

## Что делать с текущим файлом `birgework_kz_cis_marketplace_mvp.jsx`

Его лучше:

- либо удалить,
- либо оставить как архивный reference,
- либо перенести в `src/legacy/`.

Я бы удалил, чтобы не плодить зоопарк.

---

## Что логично реализовать следующим коммитом

### Этап 2
- страница списка услуг с отдельным route
- страница карточки услуги
- страница логина / регистрации
- форма создания услуги
- mock dashboard исполнителя

### Этап 3
- backend API
- PostgreSQL
- auth
- роли: заказчик / исполнитель / админ
- заявки, заказы, отзывы
- чат

### Этап 4
- безопасная сделка
- платежи KZT/RUB/USD
- moderation panel
- SEO-страницы категорий

---

## Самый практичный следующий шаг

Если продолжать без тормозов, следующим сообщением лучше уже собрать **второй пакет файлов**:

- React Router
- страницы `Catalog`, `GigDetails`, `Login`, `Register`, `Dashboard`
- mock layout личного кабинета
- карточку услуги с sidebar как у Kwork

Это уже будет не просто лендинг, а нормальный зачаток маркетплейса.

