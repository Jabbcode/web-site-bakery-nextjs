'use client'

import { use, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'

interface PageProps {
  params: Promise<{ locale: string }>
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage({ params }: PageProps) {
  const { locale } = use(params)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus('idle')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    }
  }

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in Touch',
      intro: 'Have a question or special request? We&apos;d love to hear from you!',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
      },
      success: 'Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.',
      error: 'Oops! Something went wrong. Please try again.',
      info: {
        title: 'Contact Information',
        address: {
          title: 'Address',
          value: '123 Baker Street, Zurich, Switzerland',
        },
        phone: {
          title: 'Phone',
          value: '+41 44 123 45 67',
        },
        email: {
          title: 'Email',
          value: 'info@swissdelight.com',
        },
        hours: {
          title: 'Hours',
          value: 'Mon-Sat: 8AM - 8PM\nSunday: 10AM - 6PM',
        },
      },
    },
    es: {
      title: 'Contáctanos',
      subtitle: 'Ponte en Contacto',
      intro: '¿Tienes una pregunta o solicitud especial? ¡Nos encantaría saber de ti!',
      form: {
        name: 'Nombre',
        email: 'Correo Electrónico',
        subject: 'Asunto',
        message: 'Mensaje',
        submit: 'Enviar Mensaje',
      },
      success:
        '¡Gracias! Tu mensaje ha sido enviado exitosamente. Te responderemos pronto.',
      error: '¡Ups! Algo salió mal. Por favor intenta de nuevo.',
      info: {
        title: 'Información de Contacto',
        address: {
          title: 'Dirección',
          value: '123 Baker Street, Zurich, Suiza',
        },
        phone: {
          title: 'Teléfono',
          value: '+41 44 123 45 67',
        },
        email: {
          title: 'Correo',
          value: 'info@swissdelight.com',
        },
        hours: {
          title: 'Horario',
          value: 'Lun-Sáb: 8AM - 8PM\nDomingo: 10AM - 6PM',
        },
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
          <p className="text-xl text-text max-w-2xl mx-auto">{t.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-card p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t.form.name}
                    {...register('name')}
                    error={errors.name?.message}
                    required
                  />
                  <Input
                    label={t.form.email}
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                  />
                </div>

                {/* Subject */}
                <Input
                  label={t.form.subject}
                  {...register('subject')}
                  error={errors.subject?.message}
                  required
                />

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                    {t.form.message} <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={6}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t.form.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-accent">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  {t.form.submit}
                </Button>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm">{t.success}</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{t.error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-8 space-y-6">
              <h3 className="text-h5 font-display text-dark mb-6">{t.info.title}</h3>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-dark mb-1">{t.info.address.title}</h4>
                  <p className="text-sm text-text">{t.info.address.value}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-dark mb-1">{t.info.phone.title}</h4>
                  <p className="text-sm text-text">{t.info.phone.value}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-dark mb-1">{t.info.email.title}</h4>
                  <p className="text-sm text-text">{t.info.email.value}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-dark mb-1">{t.info.hours.title}</h4>
                  <p className="text-sm text-text whitespace-pre-line">{t.info.hours.value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
