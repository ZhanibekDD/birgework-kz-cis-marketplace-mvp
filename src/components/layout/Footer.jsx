import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-main grid gap-8 py-10 md:grid-cols-4">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold">BirgeWork</div>
              <div className="text-xs text-slate-500">Фриланс-биржа KZ + СНГ</div>
            </div>
          </Link>
          <p className="text-sm leading-6 text-slate-500">
            Платформа для покупки и продажи цифровых услуг. Быстро, безопасно и по делу.
          </p>
        </div>

        <div>
          <div className="mb-3 font-semibold">Платформа</div>
          <div className="space-y-2 text-sm text-slate-500">
            <div>
              <Link to="/catalog" className="hover:text-slate-800">
                Каталог услуг
              </Link>
            </div>
            <div>Безопасная сделка</div>
            <div>Рейтинг исполнителей</div>
            <div>Корпоративные аккаунты</div>
          </div>
        </div>

        <div>
          <div className="mb-3 font-semibold">Для пользователей</div>
          <div className="space-y-2 text-sm text-slate-500">
            <div>Заказчикам</div>
            <div>
              <Link to="/dashboard" className="hover:text-slate-800">
                Кабинет исполнителя
              </Link>
            </div>
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
