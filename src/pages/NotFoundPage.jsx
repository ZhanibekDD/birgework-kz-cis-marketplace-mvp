import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container-main flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm text-slate-500">Ошибка 404</p>
      <h1 className="mt-2 text-4xl font-black">Страница не найдена</h1>
      <Link to="/" className="btn-primary mt-5">Вернуться на главную</Link>
    </div>
  )
}
