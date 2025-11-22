'use client'

import { useState, useEffect } from 'react'
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' })

  useEffect(() => {
    if (submitStatus.type === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus.type])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Option 1: Using API route (requires Resend setup)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'ayoubharati987@gmail.com'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. I will get back to you soon!'
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.'
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later or contact me directly at ayoubharati987@gmail.com'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 bg-[#F0FDF4]">
      <div className="max-w-[980px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[42px] md:text-[72px] font-heading text-primary-dark mb-4">
            Contact <span className="font-accent">Me</span>
          </h2>
          <p className="text-base text-primary-dark font-body max-w-2xl mx-auto">
            Get in touch with me to discover how I can elevate your business. I'm here to answer your inquiries and discuss your tech needs.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-[758px] mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base font-body text-primary-dark mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-primary-dark bg-transparent text-primary-dark font-body focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-body text-primary-dark mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-primary-dark bg-transparent text-primary-dark font-body focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-base font-body text-primary-dark mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-primary-dark bg-transparent text-primary-dark font-body focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] resize-none transition-all"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Status Message */}
            {submitStatus.type && (
              <div className={`flex items-center gap-2 p-4 rounded-lg border-2 ${submitStatus.type === 'success'
                ? 'bg-[#FFD700]/10 border-[#FFD700] text-primary-dark'
                : 'bg-red-50 border-red-300 text-red-700'
                }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 size={20} className="text-[#FFD700]" />
                ) : (
                  <AlertCircle size={20} className="text-red-600" />
                )}
                <p className="text-sm font-body">{submitStatus.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 rounded-[12px] border-2 border-[#FFD700] bg-[#FFD700] text-primary-dark font-body text-base md:text-lg font-semibold hover:bg-[#FFA500] hover:border-[#FFA500] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send size={18} />
                  Submit
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
