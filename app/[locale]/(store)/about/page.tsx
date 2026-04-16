'use client'

import { use } from 'react'
import Image from 'next/image'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default function AboutPage({ params }: PageProps) {
  const { locale } = use(params)

  const content = {
    en: {
      title: 'About Swiss Delight',
      subtitle: 'Our Story',
      intro: 'Crafting premium cakes since 1995',
      story1:
        'Swiss Delight was born from a passion for authentic Swiss baking traditions combined with modern culinary innovation. Our journey began in a small bakery in Zurich, where our founder, Master Baker Hans Müller, perfected recipes passed down through generations.',
      story2:
        'Today, we bring those same time-honored techniques and premium ingredients to create exceptional cakes that delight customers around the world. Each cake is handcrafted with care, using only the finest Swiss chocolate, fresh ingredients, and a dedication to excellence.',
      values: {
        title: 'Our Values',
        items: [
          {
            title: 'Quality',
            description: 'We use only premium, carefully sourced ingredients',
          },
          {
            title: 'Craftsmanship',
            description: 'Every cake is handmade by skilled artisans',
          },
          {
            title: 'Innovation',
            description: 'Traditional recipes meet modern creativity',
          },
          {
            title: 'Sustainability',
            description: 'Committed to eco-friendly practices',
          },
        ],
      },
    },
    es: {
      title: 'Acerca de Swiss Delight',
      subtitle: 'Nuestra Historia',
      intro: 'Elaborando pasteles premium desde 1995',
      story1:
        'Swiss Delight nació de la pasión por las auténticas tradiciones de repostería suiza combinadas con la innovación culinaria moderna. Nuestro viaje comenzó en una pequeña panadería en Zúrich, donde nuestro fundador, el Maestro Pastelero Hans Müller, perfeccionó recetas transmitidas a través de generaciones.',
      story2:
        'Hoy, traemos esas mismas técnicas ancestrales e ingredientes premium para crear pasteles excepcionales que deleitan a clientes de todo el mundo. Cada pastel está hecho a mano con cuidado, usando solo el mejor chocolate suizo, ingredientes frescos y una dedicación a la excelencia.',
      values: {
        title: 'Nuestros Valores',
        items: [
          {
            title: 'Calidad',
            description: 'Usamos solo ingredientes premium cuidadosamente seleccionados',
          },
          {
            title: 'Artesanía',
            description: 'Cada pastel es hecho a mano por artesanos expertos',
          },
          {
            title: 'Innovación',
            description: 'Recetas tradicionales encuentran la creatividad moderna',
          },
          {
            title: 'Sostenibilidad',
            description: 'Comprometidos con prácticas eco-amigables',
          },
        ],
      },
    },
  }

  const t = locale === 'es' ? content.es : content.en

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-wide container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <p className="font-script text-4xl text-primary mb-4">{t.subtitle}</p>
          <h1 className="text-h2 font-display text-dark mb-4">{t.title}</h1>
          <p className="text-xl text-text">{t.intro}</p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="relative h-96 lg:h-auto rounded-lg overflow-hidden">
            <Image
              src="/images/about-bakery.jpg"
              alt="Swiss Delight Bakery"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-body text-text leading-relaxed">{t.story1}</p>
            <p className="text-body text-text leading-relaxed">{t.story2}</p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-card p-8 md:p-12 mb-16">
          <h2 className="text-h3 font-display text-dark text-center mb-12">{t.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.items.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-h6 font-display text-dark mb-2">{value.title}</h3>
                <p className="text-sm text-text">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-display text-primary mb-2">25+</div>
            <div className="text-sm text-text uppercase tracking-wider">
              {locale === 'es' ? 'Años de Experiencia' : 'Years Experience'}
            </div>
          </div>
          <div>
            <div className="text-5xl font-display text-primary mb-2">100+</div>
            <div className="text-sm text-text uppercase tracking-wider">
              {locale === 'es' ? 'Recetas Únicas' : 'Unique Recipes'}
            </div>
          </div>
          <div>
            <div className="text-5xl font-display text-primary mb-2">50k+</div>
            <div className="text-sm text-text uppercase tracking-wider">
              {locale === 'es' ? 'Clientes Felices' : 'Happy Customers'}
            </div>
          </div>
          <div>
            <div className="text-5xl font-display text-primary mb-2">5★</div>
            <div className="text-sm text-text uppercase tracking-wider">
              {locale === 'es' ? 'Calificación' : 'Rating'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
