export default function AudienceSection() {
  return (
    <section className="container-main py-14 md:py-18">
      <div className="grid gap-6 lg:grid-cols-2">
        <div id="buyers" className="card-surface p-7">
          <div className="max-w-3xl space-y-3">
            <span className="badge-soft">Для бизнеса</span>
            <h2 className="section-title">Найти подрядчика за часы, не за бесконечные созвоны</h2>
            <p className="section-desc">
              Фиксированные пакеты снимают боль бесконечных смет и ватных обсуждений. Видно цену, сроки и объем работ
              сразу.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {[
              'Умные фильтры по нише, языку, локации и валюте',
              'ТЗ-шаблоны для типовых услуг: сайт, бот, дизайн, реклама',
              'Безопасная сделка и арбитраж по переписке и файлам',
              'Корпоративный кабинет для нескольких менеджеров',
            ].map((point) => (
              <div key={point} className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div id="sellers" className="card-surface p-7">
          <div className="max-w-3xl space-y-3">
            <span className="badge-soft">Для фрилансеров</span>
            <h2 className="section-title">Продавай услуги пакетами и масштабируйся без хаоса</h2>
            <p className="section-desc">
              Не просто отклики на проекты, а витрина готовых предложений. Это и есть магия Kwork-подхода: меньше
              болтовни, больше заказов.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {[
              'Создание 3 пакетов: Basic / Standard / Premium',
              'Поднятие в каталоге и рекламные места внутри платформы',
              'Аналитика просмотров, конверсии и повторных заказов',
              'Портфолио, достижения, бейджи и кейсы по нишам',
            ].map((point) => (
              <div key={point} className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
