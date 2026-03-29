import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CategoriesSection({ categories }) {
  return (
    <section className="container-main py-8 md:py-12">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <motion.div key={cat.id} whileHover={{ y: -4 }}>
              <Link to={`/catalog?cat=${cat.id}`} className="block">
                <div className="card-surface p-5 transition-all hover:shadow-xl">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="font-semibold leading-snug">{cat.title}</div>
                  <div className="mt-2 text-sm text-slate-500">{cat.count.toLocaleString('ru-RU')} услуг</div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
