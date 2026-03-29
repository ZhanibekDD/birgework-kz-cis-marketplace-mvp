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
            Платформа заточена под сделки в Казахстане и СНГ: локальные валюты, понятная комиссия, безопасная оплата и
            удобный спор-центр.
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
