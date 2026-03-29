import { useMemo, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import CategoriesSection from '../components/sections/CategoriesSection'
import ServicesSection from '../components/sections/ServicesSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import AudienceSection from '../components/sections/AudienceSection'
import PricingSection from '../components/sections/PricingSection'
import RoadmapSection from '../components/sections/RoadmapSection'
import { categories, services, sellerPlans } from '../data/mockData'

export default function Home() {
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
