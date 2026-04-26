'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────────
   HeroSection — full-screen hero with cycling Arabic letter, floating word
   cards, and CTAs. Client component for the letter animation.
───────────────────────────────────────────────────────────────────────────── */

const LETTERS   = ['ع', 'ر', 'ب', 'ي']
const WORD_CARDS = [
  { word: 'كِتَاب', meaning: 'Book',  style: { top: '8%',   left: '-10%'  } },
  { word: 'نُور',   meaning: 'Light', style: { top: '15%',  right: '-5%'  } },
  { word: 'قَلْب', meaning: 'Heart', style: { bottom: '15%', left: '-8%' } },
]

const ORBIT_ANGLES = [0, 72, 144, 216, 288]

export default function HeroSection() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      style={{
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        position:   'relative',
        overflow:   'hidden',
        padding:    'clamp(80px, 10vw, 120px) clamp(20px, 6vw, 80px) 80px',
      }}
    >
      {/* Ambient gradient */}
      <div
        aria-hidden
        style={{
          position:    'absolute',
          inset:       0,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 55% 70% at 65% 50%, rgba(255,255,255,0.04) 0%, transparent 65%),
            radial-gradient(ellipse 40% 50% at 10% 80%, rgba(90,80,120,0.04) 0%, transparent 60%)
          `,
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        style={{
          position:         'absolute',
          inset:            0,
          pointerEvents:    'none',
          opacity:          0.025,
          backgroundImage:  'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize:   '80px 80px',
        }}
      />

      {/* Content grid */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap:                 64,
          alignItems:          'center',
          width:               '100%',
          maxWidth:            1400,
          margin:              '0 auto',
          position:            'relative',
          zIndex:              1,
        }}
      >
        {/* ── Text column ──────────────────────────────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Arabic Enthusiast
            </span>
          </div>

          <h1
            style={{
              fontFamily:    'var(--font-heading)',
              fontSize:      'clamp(2.8rem, 5vw, 5rem)',
              fontWeight:    600,
              lineHeight:    1.1,
              color:         'var(--text)',
              marginBottom:  28,
              letterSpacing: '-0.01em',
            }}
          >
            Learn Arabic<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>with Passion</em><br />
            &amp; Precision
          </h1>

          <p
            style={{
              color:         'var(--text2)',
              fontSize:      '1.05rem',
              lineHeight:    1.75,
              maxWidth:      440,
              marginBottom:  44,
            }}
          >
            From your first letter to reading the Quran and conversing in dialect —
            structured courses that honour the depth and beauty of the Arabic language.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn-primary" style={{ padding: '16px 40px' }}>
              Explore Courses
            </Link>
            <Link
              href="/about"
              className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <span
                style={{
                  width:          28,
                  height:         28,
                  border:         '1px solid currentColor',
                  borderRadius:   '50%',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontSize:       9,
                }}
              >
                ▶
              </span>
              Meet your teacher
            </Link>
          </div>

          {/* Track pills */}
          <div
            style={{
              marginTop:   48,
              paddingTop:  28,
              borderTop:   '1px solid var(--border)',
              display:     'flex',
              gap:         8,
              flexWrap:    'wrap',
            }}
          >
            {[
              { label: 'Classical Arabic',      color: 'var(--course-foundations)' },
              { label: 'Levantine Arabic',       color: 'var(--course-levantine)'   },
              { label: 'Quranic Arabic',         color: 'var(--course-quranic)'     },
            ].map(({ label, color }) => (
              <span
                key={label}
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding:       '5px 14px',
                  border:        `1px solid ${color}40`,
                  color:         color,
                  borderRadius:  2,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Visual column — animated letter orb ──────────────────────────────── */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            position:       'relative',
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              width:          420,
              height:         420,
              border:         '1px solid var(--border)',
              borderRadius:   '50%',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              position:       'relative',
              flexShrink:     0,
            }}
          >
            {/* Inner ring */}
            <div
              aria-hidden
              style={{
                position:     'absolute',
                inset:        20,
                border:       '1px solid rgba(255,255,255,0.05)',
                borderRadius: '50%',
              }}
            />

            {/* Radial glow */}
            <div
              aria-hidden
              style={{
                position:     'absolute',
                inset:        0,
                background:   'radial-gradient(circle, rgba(201,146,42,0.06) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />

            {/* Rotating dashed ring */}
            <div
              aria-hidden
              style={{
                position:     'absolute',
                inset:        -1,
                borderRadius: '50%',
                border:       '1px dashed rgba(201,146,42,0.25)',
                animation:    'spin 30s linear infinite',
              }}
            />

            {/* Cycling Arabic letter */}
            <div
              key={tick}
              aria-label={`Arabic letter: ${LETTERS[tick % LETTERS.length]}`}
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize:   '10rem',
                color:      'var(--text)',
                lineHeight: 1,
                userSelect: 'none',
                animation:  'letterFade 2.2s ease',
                textShadow: '0 0 60px var(--gold-glow), 0 0 120px rgba(201,146,42,0.1)',
              }}
            >
              {LETTERS[tick % LETTERS.length]}
            </div>

            {/* Orbit dots */}
            {ORBIT_ANGLES.map((deg, i) => {
              const r   = 210
              const rad = (deg - 90) * Math.PI / 180
              return (
                <div
                  key={deg}
                  aria-hidden
                  style={{
                    position:     'absolute',
                    left:         `calc(50% + ${r * Math.cos(rad)}px - 4px)`,
                    top:          `calc(50% + ${r * Math.sin(rad)}px - 4px)`,
                    width:        8,
                    height:       8,
                    borderRadius: '50%',
                    background:   i === 0 ? 'var(--gold)' : 'rgba(201,146,42,0.2)',
                  }}
                />
              )
            })}
          </div>

          {/* Floating word cards */}
          {WORD_CARDS.map(({ word, meaning, style }) => (
            <div
              key={word}
              aria-hidden
              style={{
                position:       'absolute',
                ...style,
                background:     'var(--card)',
                border:         '1px solid var(--border)',
                padding:        '10px 16px',
                backdropFilter: 'blur(8px)',
                animation:      'float 4s ease-in-out infinite',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-arabic)',
                  fontSize:   '1.4rem',
                  color:      'var(--text)',
                  direction:  'rtl',
                  lineHeight: 1,
                }}
              >
                {word}
              </div>
              <div
                style={{
                  fontSize:      '0.65rem',
                  color:         'var(--text3)',
                  letterSpacing: '0.08em',
                  marginTop:     4,
                }}
              >
                {meaning}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        style={{
          position:       'absolute',
          bottom:         32,
          left:           '50%',
          transform:      'translateX(-50%)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            8,
        }}
      >
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text3)' }}>
          Scroll
        </span>
        <div
          style={{
            width:      1,
            height:     40,
            background: 'linear-gradient(to bottom, var(--text3), transparent)',
            animation:  'scrollLine 1.5s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
