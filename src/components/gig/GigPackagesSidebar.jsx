import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'

export default function GigPackagesSidebar({ gig }) {
  const defaultPkg = gig.packages.find((p) => p.popular)?.id ?? gig.packages[0]?.id
  const [selectedId, setSelectedId] = useState(defaultPkg)

  const selected = gig.packages.find((p) => p.id === selectedId) ?? gig.packages[0]

  return (
    <aside className="lg:sticky lg:top-24 h-fit space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-4 text-sm font-semibold text-slate-500">Выберите пакет</div>
        <div className="space-y-2">
          {gig.packages.map((pkg) => {
            const active = selectedId === pkg.id
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedId(pkg.id)}
                className={`relative w-full rounded-2xl border px-4 py-3 text-left transition ${
                  active
                    ? 'border-slate-950 bg-slate-950 text-white shadow-lg'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-2 right-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-950">
                    <Sparkles className="h-3 w-3" />
                    Хит
                  </span>
                )}
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold">{pkg.name}</span>
                  <span className={`text-lg font-bold ${active ? 'text-white' : 'text-slate-950'}`}>
                    {pkg.price.toLocaleString('ru-RU')} {gig.currency}
                  </span>
                </div>
                <div className={`mt-1 text-xs ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                  Срок: {pkg.delivery} · Правок: {pkg.revisions}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-4 text-sm font-semibold text-slate-900">Что входит</div>
        <ul className="space-y-3">
          {selected.features.map((f) => (
            <li key={f} className="flex gap-2 text-sm text-slate-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {f}
            </li>
          ))}
        </ul>
        <button type="button" className="btn-primary mt-6 w-full">
          Продолжить за {selected.price.toLocaleString('ru-RU')} {gig.currency}
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">Оплата резервируется до приёмки работы</p>
      </div>
    </aside>
  )
}
