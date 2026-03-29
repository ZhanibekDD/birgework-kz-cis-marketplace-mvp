export default function PricingSection({ plans }) {
  return (
    <section id="pricing" className="border-y border-slate-200 bg-white">
      <div className="container-main py-14 md:py-18">
        <div className="max-w-3xl space-y-3">
          <span className="badge-soft">Монетизация</span>
          <h2 className="section-title">Тарифы для продавцов и доход платформы</h2>
          <p className="section-desc">
            Тут уже не просто сайт, а бизнес-модель: комиссия с заказа, платные PRO-функции, реклама услуг и корпоративные
            кабинеты.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[32px] p-7 shadow-soft ${
                plan.highlight ? 'border border-slate-950 bg-slate-950 text-white' : 'border border-slate-200 bg-white'
              }`}
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

              <button
                type="button"
                className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  plan.highlight
                    ? 'bg-white text-slate-950 hover:bg-slate-100'
                    : 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                Выбрать тариф
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
