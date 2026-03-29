import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Briefcase,
  ShieldCheck,
  Wallet,
  Globe,
  Star,
  ChevronRight,
  CheckCircle2,
  Users,
  Laptop,
  Bot,
  FileText,
  BarChart3,
  MessageSquare,
  Sparkles,
  Filter,
  MapPin,
  Clock3,
  ArrowRight,
  BadgeCheck,
  TrendingUp,
  Layers3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  { id: "ai", title: "AI и автоматизация", icon: Bot, count: 1280 },
  { id: "dev", title: "Разработка сайтов", icon: Laptop, count: 2340 },
  { id: "design", title: "Дизайн и брендинг", icon: Layers3, count: 1910 },
  { id: "marketing", title: "Маркетинг и реклама", icon: TrendingUp, count: 1560 },
  { id: "docs", title: "Тексты и документы", icon: FileText, count: 980 },
  { id: "analytics", title: "Аналитика и Excel", icon: BarChart3, count: 740 },
];

const services = [
  {
    id: 1,
    title: "Сделаю Telegram-бота для продаж и заявок",
    seller: "Aigerim Dev",
    rating: 4.9,
    reviews: 187,
    price: 45000,
    currency: "₸",
    category: "dev",
    level: "PRO",
    location: "Алматы",
    delivery: "3 дня",
    tags: ["Telegram", "Python", "CRM"],
    featured: true,
  },
  {
    id: 2,
    title: "Настрою AI-ассистента для бизнеса под WhatsApp и сайт",
    seller: "Ruslan AI",
    rating: 5.0,
    reviews: 96,
    price: 80000,
    currency: "₸",
    category: "ai",
    level: "TOP",
    location: "Астана",
    delivery: "5 дней",
    tags: ["AI", "OpenAI", "Автоматизация"],
    featured: true,
  },
  {
    id: 3,
    title: "Сделаю лендинг под Казахстан и СНГ с высокой конверсией",
    seller: "Maksat Studio",
    rating: 4.8,
    reviews: 213,
    price: 55000,
    currency: "₸",
    category: "design",
    level: "PRO",
    location: "Шымкент",
    delivery: "4 дня",
    tags: ["Landing", "UI/UX", "Figma"],
    featured: false,
  },
  {
    id: 4,
    title: "Парсер товаров в Excel, CSV или Google Sheets",
    seller: "Data Hunter",
    rating: 4.9,
    reviews: 142,
    price: 60000,
    currency: "₸",
    category: "analytics",
    level: "TOP",
    location: "Караганда",
    delivery: "2 дня",
    tags: ["Parser", "Excel", "Google Sheets"],
    featured: true,
  },
  {
    id: 5,
    title: "Запущу таргет и performance-рекламу по СНГ",
    seller: "Olga Growth",
    rating: 4.7,
    reviews: 88,
    price: 70000,
    currency: "₸",
    category: "marketing",
    level: "PRO",
    location: "Бишкек",
    delivery: "6 дней",
    tags: ["Meta Ads", "TikTok", "Лиды"],
    featured: false,
  },
  {
    id: 6,
    title: "Напишу договор, оферту и деловые документы",
    seller: "Legal Copy Pro",
    rating: 4.9,
    reviews: 59,
    price: 30000,
    currency: "₸",
    category: "docs",
    level: "PRO",
    location: "Ташкент",
    delivery: "2 дня",
    tags: ["Документы", "Юридически", "Тексты"],
    featured: false,
  },
];

const sellerPlans = [
  {
    name: "Start",
    price: "0 ₸",
    desc: "Для новичков и первых продаж",
    features: ["До 5 услуг", "Чат с заказчиком", "Без абонплаты", "Безопасная сделка"],
  },
  {
    name: "Pro",
    price: "19 900 ₸/мес",
    desc: "Для активных фрилансеров",
    features: ["До 50 услуг", "Продвижение в каталоге", "Расширенная аналитика", "PRO-значок"],
    highlight: true,
  },
  {
    name: "Agency",
    price: "49 900 ₸/мес",
    desc: "Для студий и команд",
    features: ["Командный кабинет", "Несколько менеджеров", "White-label КП", "Личный менеджер"],
  },
];

function ServiceCard({ item }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="h-full rounded-3xl border-slate-200 shadow-sm hover:shadow-xl transition-all bg-white">
        <CardHeader className="space-y-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {item.featured && <Badge className="rounded-full">Хит</Badge>}
              <Badge variant="secondary" className="rounded-full">{item.level}</Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Star className="h-4 w-4 fill-current" />
              {item.rating}
              <span className="text-slate-400">({item.reviews})</span>
            </div>
          </div>
          <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span className="font-medium text-slate-700">{item.seller}</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{item.location}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock3 className="h-4 w-4" />{item.delivery}</span>
            <span>от</span>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-2xl font-bold tracking-tight text-slate-950">
                {item.price.toLocaleString("ru-RU")} {item.currency}
              </div>
              <div className="text-xs text-slate-500">фиксированный пакет, без сюрпризов</div>
            </div>
            <Button className="rounded-2xl">
              Заказать
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="max-w-3xl space-y-3">
      <Badge variant="secondary" className="rounded-full px-3 py-1">{eyebrow}</Badge>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950">{title}</h2>
      <p className="text-base md:text-lg text-slate-600">{desc}</p>
    </div>
  );
}

export default function BirgeWorkMarketplace() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredServices = useMemo(() => {
    let items = services.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.join(" ").toLowerCase().includes(query.toLowerCase()) ||
        item.seller.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });

    if (sortBy === "price_asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") items = [...items].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") items = [...items].sort((a, b) => b.rating - a.rating);
    if (sortBy === "popular") items = [...items].sort((a, b) => b.reviews - a.reviews);

    return items;
  }, [query, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
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
            <Button variant="ghost" className="rounded-2xl">Войти</Button>
            <Button className="rounded-2xl">Разместить услугу</Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.22),transparent_30%),radial-gradient(circle_at_left,rgba(15,23,42,0.06),transparent_25%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
            <div className="relative z-10 space-y-8">
              <Badge className="rounded-full px-4 py-1 text-sm">MVP в стиле Kwork, но адаптирован под Казахстан и СНГ</Badge>
              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                  Покупайте и продавайте цифровые услуги быстро, безопасно и по фиксированной цене
                </h1>
                <p className="max-w-2xl text-lg text-slate-600 md:text-xl">
                  Биржа для бизнеса, агентств и фрилансеров: разработка, AI, парсинг, дизайн, маркетинг,
                  тексты и автоматизация. Оплата в ₸, ₽, $, безопасная сделка и рейтинг исполнителей.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
                <div className="grid gap-3 md:grid-cols-[1fr,180px,180px,auto]">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Например: Telegram-бот, лендинг, AI-ассистент, парсер"
                      className="h-12 rounded-2xl border-0 bg-slate-50 pl-11 text-base"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-12 rounded-2xl border-0 bg-slate-50">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12 rounded-2xl border-0 bg-slate-50">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Сначала популярные</SelectItem>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                      <SelectItem value="price_asc">Цена по возрастанию</SelectItem>
                      <SelectItem value="price_desc">Цена по убыванию</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="h-12 rounded-2xl px-6">
                    Найти
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                {[
                  "Безопасная сделка",
                  "Фиксированные пакеты",
                  "Оплата в KZT/RUB/USD",
                  "Проверенные исполнители",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-slate-900" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <Card className="rounded-[32px] border-slate-200 bg-white shadow-2xl">
                <CardContent className="p-6 md:p-7">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Исполнителей", value: "12 000+", icon: Users },
                      { label: "Активных услуг", value: "48 000+", icon: Briefcase },
                      { label: "Средний чек", value: "57 000 ₸", icon: Wallet },
                      { label: "География", value: "KZ + СНГ", icon: Globe },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-3xl bg-slate-50 p-4">
                        <stat.icon className="mb-3 h-5 w-5 text-slate-700" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold">Сделка под защитой платформы</div>
                        <div className="text-sm text-slate-300">Деньги резервируются до сдачи заказа</div>
                      </div>
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <div className="grid gap-3 text-sm text-slate-200">
                      <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Антифрод и верификация профилей</div>
                      <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Арбитраж и история переписки</div>
                      <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Комиссия удерживается прозрачно</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.id} whileHover={{ y: -4 }}>
                  <Card className="rounded-3xl border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all">
                    <CardContent className="p-5">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="font-semibold leading-snug">{cat.title}</div>
                      <div className="mt-2 text-sm text-slate-500">{cat.count.toLocaleString("ru-RU")} услуг</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="catalog" className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              eyebrow="Каталог услуг"
              title="Популярные кворки для бизнеса и e-commerce"
              desc="Тут уже чувствуется вайб маркетплейса: фиксированные пакеты, понятные сроки, рейтинг и реальные кейсы исполнителей."
            />
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              <Filter className="h-4 w-4" />
              Найдено: <span className="font-semibold text-slate-900">{filteredServices.length}</span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section id="how" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
            <SectionTitle
              eyebrow="Как это работает"
              title="Логика как у Kwork, но локально сильнее"
              desc="Платформа заточена под сделки в Казахстане и СНГ: локальные валюты, понятная комиссия, безопасная оплата и удобный спор-центр."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "1. Заказчик выбирает услугу",
                  desc: "Поиск по каталогу, фильтры, рейтинг, отзывы и готовые пакеты с четким объемом работ.",
                  icon: Search,
                },
                {
                  title: "2. Деньги резервируются",
                  desc: "Платформа удерживает оплату до приемки результата. Меньше нервов, меньше цирка.",
                  icon: Wallet,
                },
                {
                  title: "3. Исполнитель сдает заказ",
                  desc: "Чат, этапы, файлы, апдейты по прогрессу и защита от недопониманий через ТЗ и чек-листы.",
                  icon: MessageSquare,
                },
                {
                  title: "4. Завершение или арбитраж",
                  desc: "Принятие, отзыв, автозавершение либо спор с разбором переписки и вложений.",
                  icon: ShieldCheck,
                },
              ].map((step) => (
                <Card key={step.title} className="rounded-3xl border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <Tabs defaultValue="buyers" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-slate-100 p-1 md:w-[420px]">
              <TabsTrigger value="buyers" className="rounded-2xl">Заказчикам</TabsTrigger>
              <TabsTrigger value="sellers" className="rounded-2xl">Исполнителям</TabsTrigger>
            </TabsList>

            <TabsContent value="buyers" id="buyers">
              <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
                <Card className="rounded-[32px] border-slate-200 shadow-sm">
                  <CardContent className="p-7">
                    <SectionTitle
                      eyebrow="Для бизнеса"
                      title="Найти подрядчика за часы, не за бесконечные созвоны"
                      desc="Фиксированные пакеты снимают боль бесконечных смет и ватных обсуждений. Видно цену, сроки и объем работ сразу."
                    />
                    <div className="mt-6 grid gap-4">
                      {[
                        "Умные фильтры по нише, языку, локации и валюте",
                        "ТЗ-шаблоны для типовых услуг: сайт, бот, дизайн, реклама",
                        "Безопасная сделка и арбитраж по переписке и файлам",
                        "Корпоративный кабинет для нескольких менеджеров",
                      ].map((point) => (
                        <div key={point} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
                          <span className="text-slate-700">{point}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button className="rounded-2xl">Создать заказ</Button>
                      <Button variant="outline" className="rounded-2xl">Посмотреть каталог</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[32px] border-slate-200 bg-slate-950 text-white shadow-sm">
                  <CardContent className="p-7">
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Сильные блоки продукта</div>
                        <div className="mt-2 text-3xl font-bold tracking-tight">Что даст платформе преимущество</div>
                      </div>
                      <div className="grid gap-4">
                        {[
                          { t: "Локальные платежи", d: "Kaspi, карты KZ, РФ/СНГ провайдеры, мультивалюта." },
                          { t: "Верификация", d: "Проверка исполнителей, бейджи, KYC для агентств и топов." },
                          { t: "Умный рейтинг", d: "Скорость ответа, доля повторных заказов, соблюдение сроков." },
                          { t: "AI-помощник", d: "Помогает создать ТЗ, оценить объем работ и сравнить офферы." },
                        ].map((item) => (
                          <div key={item.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="font-semibold">{item.t}</div>
                            <div className="mt-1 text-sm text-slate-300">{item.d}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sellers" id="sellers">
              <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
                <Card className="rounded-[32px] border-slate-200 shadow-sm">
                  <CardContent className="p-7">
                    <SectionTitle
                      eyebrow="Для фрилансеров"
                      title="Продавай услуги пакетами и масштабируйся без хаоса"
                      desc="Не просто отклики на проекты, а витрина готовых предложений. Это и есть магия Kwork‑подхода: меньше болтовни, больше заказов."
                    />
                    <div className="mt-6 grid gap-4">
                      {[
                        "Создание 3 пакетов: Basic / Standard / Premium",
                        "Поднятие в каталоге и рекламные места внутри платформы",
                        "Аналитика просмотров, конверсии и повторных заказов",
                        "Портфолио, достижения, бейджи и кейсы по нишам",
                      ].map((point) => (
                        <div key={point} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
                          <span className="text-slate-700">{point}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button className="rounded-2xl">Стать исполнителем</Button>
                      <Button variant="outline" className="rounded-2xl">Открыть кабинет</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[32px] border-slate-200 shadow-sm">
                  <CardContent className="p-7">
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        { n: "10%", t: "комиссия платформы" },
                        { n: "24/7", t: "чат и уведомления" },
                        { n: "3x", t: "рост за счёт пакетов и доп. услуг" },
                        { n: "1 кабинет", t: "для заказов, файлов, выплат" },
                      ].map((item) => (
                        <div key={item.t} className="rounded-3xl bg-slate-50 p-5">
                          <div className="text-3xl font-bold">{item.n}</div>
                          <div className="mt-2 text-sm text-slate-500">{item.t}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Реферальная и партнерская система</div>
                          <div className="text-sm text-slate-500">Приводи коллег, студии и заказчиков — получай бонусы и лиды.</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section id="pricing" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
            <SectionTitle
              eyebrow="Монетизация"
              title="Тарифы для продавцов и доход платформы"
              desc="Тут уже не просто сайт, а бизнес-модель: комиссия с заказа, платные PRO-функции, реклама услуг и корпоративные кабинеты."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {sellerPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`rounded-[32px] shadow-sm ${plan.highlight ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white"}`}
                >
                  <CardContent className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-2xl font-bold">{plan.name}</div>
                        <div className={`mt-2 text-sm ${plan.highlight ? "text-slate-300" : "text-slate-500"}`}>{plan.desc}</div>
                      </div>
                      {plan.highlight && <Badge className="rounded-full bg-white text-slate-950">Рекомендуем</Badge>}
                    </div>
                    <div className="mt-6 text-4xl font-bold tracking-tight">{plan.price}</div>
                    <div className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
                          <span className={plan.highlight ? "text-slate-100" : "text-slate-700"}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`mt-8 w-full rounded-2xl ${plan.highlight ? "bg-white text-slate-950 hover:bg-slate-100" : ""}`}
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      Выбрать тариф
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <Card className="rounded-[32px] border-slate-200 bg-slate-950 text-white shadow-sm">
              <CardContent className="p-7 md:p-9">
                <div className="max-w-2xl space-y-5">
                  <Badge className="rounded-full bg-white text-slate-950">Roadmap</Badge>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Что добавлять в следующей версии</h3>
                  <p className="text-slate-300 text-lg">
                    Этот экран уже годится как жирный MVP. Следующий уровень — личные кабинеты, backend, escrow, чат,
                    платежи, модерация, отзывы, арбитраж и SEO-страницы категорий.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {[
                    "Регистрация заказчиков и исполнителей",
                    "Профиль, портфолио и кейсы",
                    "Пакеты Basic / Standard / Premium",
                    "Оплата и холд средств",
                    "Чат и отправка файлов",
                    "Арбитраж и система тикетов",
                    "Админка, модерация и жалобы",
                    "SEO для категорий и услуг",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border-slate-200 shadow-sm">
              <CardContent className="p-7 md:p-9">
                <div className="space-y-4">
                  <Badge variant="secondary" className="rounded-full">Идея позиционирования</Badge>
                  <h3 className="text-3xl font-bold tracking-tight">Kwork для Казахстана и СНГ, только без устаревшего вайба</h3>
                  <p className="text-slate-600">
                    Главный заход: быстрое размещение услуг, локальные платежи, доверие через безопасную сделку,
                    понятные тарифы и акцент на digital-услуги с высоким спросом.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    { icon: Globe, text: "Локализация на RU / KZ / EN" },
                    { icon: Wallet, text: "KZT как базовая валюта + мультивалюта" },
                    { icon: ShieldCheck, text: "Юр. условия, оферта, защита сделки" },
                    { icon: Briefcase, text: "Фокус на AI, разработку, дизайн и automation" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                      <item.icon className="h-5 w-5" />
                      <span className="text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
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
    </div>
  );
}
