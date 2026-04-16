'use client'

import { use } from 'react'
import { HeroSlider } from '@/features/home/components/HeroSlider'
import { FeaturedProducts } from '@/features/home/components/FeaturedProducts'
import { CategoryShowcase } from '@/features/home/components/CategoryShowcase'
import { Testimonials } from '@/features/home/components/Testimonials'
import { Newsletter } from '@/features/home/components/Newsletter'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default function HomePage({ params }: PageProps) {
  const { locale } = use(params)

  // Hardcoded currency for now - should come from global state/context
  const currency: 'USD' | 'MXN' | 'EUR' = 'MXN'

  // Hero slider data
  const slides = [
    {
      id: 1,
      title: locale === 'es' ? 'Pasteles Artesanales' : 'Artisan Cakes',
      subtitle: locale === 'es' ? 'Hechos con Amor' : 'Made with Love',
      description:
        locale === 'es'
          ? 'Descubre nuestros deliciosos pasteles hechos con ingredientes premium'
          : 'Discover our delicious cakes made with premium ingredients',
      image: '/images/hero-1.jpg',
      cta: {
        text: locale === 'es' ? 'Ver Productos' : 'Shop Now',
        href: `/${locale}/shop`,
      },
    },
    {
      id: 2,
      title: locale === 'es' ? 'Chocolate Suizo' : 'Swiss Chocolate',
      subtitle: locale === 'es' ? 'Auténtico' : 'Authentic',
      description:
        locale === 'es'
          ? 'Experimenta el sabor del auténtico chocolate suizo en cada bocado'
          : 'Experience the taste of authentic Swiss chocolate in every bite',
      image: '/images/hero-2.jpg',
      cta: {
        text: locale === 'es' ? 'Explorar' : 'Explore',
        href: `/${locale}/shop?category=chocolate-cakes`,
      },
    },
    {
      id: 3,
      title: locale === 'es' ? 'Ocasiones Especiales' : 'Special Occasions',
      subtitle: locale === 'es' ? 'Celebra' : 'Celebrate',
      description:
        locale === 'es'
          ? 'Pasteles perfectos para bodas, cumpleaños y eventos especiales'
          : 'Perfect cakes for weddings, birthdays, and special events',
      image: '/images/hero-3.jpg',
      cta: {
        text: locale === 'es' ? 'Ver Más' : 'Learn More',
        href: `/${locale}/shop`,
      },
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider slides={slides} locale={locale} />

      {/* Featured Products */}
      <FeaturedProducts locale={locale} currency={currency} />

      {/* Category Showcase */}
      <CategoryShowcase locale={locale} />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
