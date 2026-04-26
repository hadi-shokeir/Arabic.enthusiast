import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal         from '@/components/ui/Reveal'
import Badge          from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Pricing — Arabic Enthusiast',
  description: 'Private Arabic lessons tailored to your goals. Classical, Levantine, and Quranic tracks available.',
}

/* ─────────────────────────────────────────────────────────────────────────────
   Pricing — /pricing
───────────────────────────────────────────────────────────────────────────── */

const PACKAGES = [
  {
    name:   'Trial Lesson',
    arabic: 'درس تجريبي',
    price:  null,
    badge:  'free' as const,
    label:  'Free',
    desc:   'A 30-minute conversation to find the right starting point — no commitment, no payment.',
    features: [
      '30-minute video call',
      'Level assessment',
      'Personalised roadmap',
      'No obligation',
    ],
    cta:   'Book your trial',
    href:  '/consultation',
    color: '#4A7A6A',
  },
  {
    name:   'Per Lesson',
    arabic: 'الدرس الواحد',
    price:  'Contact for pricing',
    badge:  'gold' as const,
    label:  'Flexible',
    desc:   'Individual 50-minute sessions. Ideal if you want to start without committing to a block.',
    features: [
      '50-minute lesson',
      '1:1 private teaching',
      'Session notes emailed',
      'Flexible scheduling',
    ],
    cta:   'Enquire now',
    href:  '/consultation',
    color: '#C9922A',
  },
  {
    name:   'Block of 10',
    arabic: 'عشرة دروس',
    price:  'Contact for pricing',
    badge:  'teal' as const,
    label:  'Best value',
    desc:   'Ten lessons at a reduced rate. Recommended for learners committed to real progress.',
    features: [
      '10 × 50-minute lessons',
      'Priority scheduling',
      'Supplementary materials',
      'Progress review at lesson 5',
      'Discounted rate vs. single lessons',
    ],
    cta:   'Enquire now',
    href:  '/consultation',
    color: '#6B9E8F',
  },
]

const INCLUDED = [
  { icon: '◎', label: 'Platform access — courses, exercises, flashcards, and practice tools' },
  { icon: '📊', label: 'Progress dashboard tracking your lessons, scores, and streaks' },
  { icon: '📄', label: 'Lesson resources — key points, vocab lists, and grammar notes' },
  { icon: '🎧', label: 'Audio for vocabulary and example sentences' },
]

export default function PricingPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 48px',
          borderBottom: '1px solid var(--border)',
          textAlign:  'center',
        }}
      >
        <SectionHeading
          eyebrow={{ en: 'Pricing', ar: 'الأسعار' }}
          heading="Simple, transparent pricing"
          sub="All lessons are private and 1:1. Exact rates are discussed during your free trial — tailored to your goals and session frequency."
          center
        />
      </section>

      {/* ── Packages ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)' }}>
        <div
          style={{
            maxWidth:            1200,
            margin:              '0 auto',
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap:                 20,
          }}
        >
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 80}>
              <div
                className="card"
                style={{
                  padding:     '36px 32px',
                  position:    'relative',
                  overflow:    'hidden',
                  display:     'flex',
                  flexDirection:'column',
                  height:      '100%',
                }}
              >
                {/* Colour stripe */}
                <div
                  style={{
                    position: 'absolute',
                    top:      0,
                    left:     0,
                    right:    0,
                    height:   2,
                    background: pkg.color,
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <h3
                      style={{
                        fontFamily:   'var(--font-heading)',
                        fontSize:     '1.2rem',
                        color:        'var(--text)',
                        marginBottom: 4,
                      }}
                    >
                      {pkg.name}
                    </h3>
                    <div
                      lang="ar"
                      dir="rtl"
                      style={{
                        fontFamily: 'var(--font-arabic)',
                        fontSize:   '0.9rem',
                        color:      'var(--text3)',
                      }}
                    >
                      {pkg.arabic}
                    </div>
                  </div>
                  <Badge variant={pkg.badge}>{pkg.label}</Badge>
                </div>

                <div
                  style={{
                    fontFamily:   'var(--font-heading)',
                    fontSize:     '1.1rem',
                    color:        'var(--text)',
                    marginBottom: 12,
                    fontStyle:    'italic',
                  }}
                >
                  {pkg.price ?? 'Free'}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>
                  {pkg.desc}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    display:   'flex',
                    flexDirection:'column',
                    gap:       8,
                    marginBottom: 32,
                    flex:      1,
                  }}
                >
                  {pkg.features.map(f => (
                    <li
                      key={f}
                      style={{
                        display:    'flex',
                        alignItems: 'flex-start',
                        gap:        10,
                        fontSize:   '0.82rem',
                        color:      'var(--text2)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: pkg.color, marginTop: 1, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={pkg.href} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {pkg.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── What's included with all lessons ─────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)',
          background: 'var(--bg2)',
          borderTop:  '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <SectionHeading
              eyebrow={{ en: 'Included', ar: 'مشمول' }}
              heading="Platform access with every lesson"
              sub="Every student gets full access to the Arabic Enthusiast platform — courses, exercises, flashcards, and progress tracking."
              style={{ marginBottom: 40 }}
            />
          </Reveal>
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap:                 16,
            }}
          >
            {INCLUDED.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <div
                  style={{
                    display:    'flex',
                    alignItems: 'flex-start',
                    gap:        14,
                    padding:    '16px 0',
                    borderBottom:'1px solid var(--border)',
                  }}
                >
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <Reveal>
            <SectionHeading
              eyebrow={{ en: 'Questions', ar: 'أسئلة' }}
              heading="Common questions about lessons"
              style={{ marginBottom: 40 }}
            />
          </Reveal>
          {[
            {
              q: 'How do I pay?',
              a: 'Payment is arranged directly after your trial lesson — via bank transfer, PayPal, or other method depending on your location.',
            },
            {
              q: 'How often should I take lessons?',
              a: 'Most students do one or two lessons per week. The platform exercises keep vocabulary and grammar fresh between sessions.',
            },
            {
              q: 'Can I pause or reschedule?',
              a: 'Yes — lessons are rescheduled with 24-hour notice. Block lesson expiry and rescheduling terms are agreed during the trial.',
            },
          ].map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <div style={{ borderTop: '1px solid var(--border)', padding: '20px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text2)', lineHeight: 1.75 }}>
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </section>

      {/* ── Arabic decoration + CTA ───────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(60px, 8vw, 80px) clamp(20px, 6vw, 80px)',
          textAlign:  'center',
          background: 'var(--bg2)',
          borderTop:  '1px solid var(--border)',
          position:   'relative',
          overflow:   'hidden',
        }}
      >
        <div
          aria-hidden
          lang="ar"
          style={{
            position:    'absolute',
            top:         '50%',
            left:        '50%',
            transform:   'translate(-50%, -50%)',
            fontFamily:  'var(--font-arabic)',
            fontSize:    '16rem',
            color:       'rgba(201,146,42,0.04)',
            pointerEvents:'none',
            userSelect:  'none',
            lineHeight:  1,
            whiteSpace:  'nowrap',
          }}
        >
          قريباً
        </div>
        <Reveal>
          <h2
            style={{
              fontFamily:   'var(--font-heading)',
              fontSize:     'clamp(1.5rem, 3vw, 2.2rem)',
              color:        'var(--text)',
              marginBottom: 16,
              position:     'relative',
            }}
          >
            Ready to begin?
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px', position: 'relative' }}>
            Start with a free 30-minute trial. No commitment — just a conversation about your goals.
          </p>
          <Link href="/consultation" className="btn-primary" style={{ position: 'relative' }}>
            Book a Free Trial
          </Link>
        </Reveal>
      </section>
    </>
  )
}
