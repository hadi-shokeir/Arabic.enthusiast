'use client'

import { useState, type FormEvent } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal         from '@/components/ui/Reveal'

/* ─────────────────────────────────────────────────────────────────────────────
   Consultation — /consultation
   Free trial booking form.
   In Phase 6, form submission will POST to /api/consultation (Supabase + Resend).
   For now, it shows a success state client-side.
───────────────────────────────────────────────────────────────────────────── */

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [form,      setForm]      = useState({
    name:           '',
    email:          '',
    whatsapp:       '',
    goals:          '',
    preferred_time: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch('/api/consultation', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(form),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Something went wrong. Please try again.')
      return
    }

    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width:       '100%',
    background:  'var(--input-bg)',
    border:      '1px solid var(--border)',
    borderRadius: 2,
    padding:     '12px 14px',
    fontFamily:  'var(--font-body)',
    fontSize:    '0.88rem',
    color:       'var(--text)',
    outline:     'none',
    transition:  'border-color 0.2s ease',
  }

  const labelStyle: React.CSSProperties = {
    display:       'block',
    fontSize:      '0.72rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color:         'var(--text3)',
    marginBottom:  6,
  }

  if (submitted) {
    return (
      <section
        style={{
          minHeight:   'calc(100vh - 64px)',
          display:     'flex',
          alignItems:  'center',
          justifyContent:'center',
          padding:     '80px 20px',
          textAlign:   'center',
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <div
            style={{
              width:          60,
              height:         60,
              borderRadius:   '50%',
              border:         '2px solid var(--gold)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       '1.4rem',
              margin:         '0 auto 24px',
              color:          'var(--gold)',
            }}
          >
            ✓
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text)', marginBottom: 16 }}>
            Request received
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Thank you, {form.name.split(' ')[0]}. Hadi will be in touch within 24 hours
            to arrange your free 30-minute consultation.
          </p>
          <p style={{ color: 'var(--text3)', fontSize: '0.82rem', marginTop: 12 }}>
            Check your inbox at {form.email} for a confirmation.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:      'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 48px',
          borderBottom: '1px solid var(--border)',
          textAlign:    'center',
        }}
      >
        <SectionHeading
          eyebrow={{ en: 'Free Trial', ar: 'درس تجريبي مجاني' }}
          heading="Book your free consultation"
          sub="A 30-minute call to find your starting point — no payment, no commitment."
          center
        />
      </section>

      {/* ── Form ─────────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <Reveal>
            {error && (
              <div
                style={{
                  background:   'var(--danger-dim)',
                  border:       '1px solid var(--danger)',
                  borderRadius: 2,
                  padding:      '12px 16px',
                  marginBottom: 24,
                  fontSize:     '0.85rem',
                  color:        'var(--danger)',
                }}
              >
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label htmlFor="name" style={labelStyle}>Full name *</label>
                <input
                  id="name" name="name" type="text" required
                  value={form.name} onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold-border)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label htmlFor="email" style={labelStyle}>Email address *</label>
                <input
                  id="email" name="email" type="email" required
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold-border)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label htmlFor="whatsapp" style={labelStyle}>WhatsApp number (optional)</label>
                <input
                  id="whatsapp" name="whatsapp" type="tel"
                  value={form.whatsapp} onChange={handleChange}
                  placeholder="+44 7700 000000"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold-border)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label htmlFor="goals" style={labelStyle}>What are your Arabic goals? *</label>
                <textarea
                  id="goals" name="goals" required rows={4}
                  value={form.goals} onChange={handleChange}
                  placeholder="e.g. I want to read the Quran with understanding, or I want to speak with my Lebanese family..."
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold-border)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label htmlFor="preferred_time" style={labelStyle}>Preferred lesson time</label>
                <select
                  id="preferred_time" name="preferred_time"
                  value={form.preferred_time} onChange={handleChange}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="">No preference</option>
                  <option value="morning">Morning (6am–12pm)</option>
                  <option value="afternoon">Afternoon (12pm–5pm)</option>
                  <option value="evening">Evening (5pm–10pm)</option>
                  <option value="weekend">Weekends only</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '16px', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Sending…' : 'Book My Free Consultation'}
              </button>

              <p style={{ fontSize: '0.75rem', color: 'var(--text3)', textAlign: 'center', lineHeight: 1.6 }}>
                Your details are only used to arrange the lesson — never sold or shared.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
