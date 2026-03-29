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
            <h3 className="text-3xl font-bold tracking-tight md:text-4xl">Что добавлять в следующей версии</h3>
            <p className="text-lg text-slate-300">
              Этот экран уже годится как жирный MVP. Следующий уровень — личные кабинеты, backend, escrow, чат, платежи,
              модерация, отзывы, арбитраж и SEO-страницы категорий.
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
              Главный заход: быстрое размещение услуг, локальные платежи, доверие через безопасную сделку, понятные тарифы
              и акцент на digital-услуги с высоким спросом.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
