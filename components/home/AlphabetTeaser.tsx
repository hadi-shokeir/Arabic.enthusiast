'use client'

import { useState } from 'react'
import Link from 'next/link'
import { alphabet } from '@/data/alphabet'
import SectionHeading from '@/components/ui/SectionHeading'

/* ─────────────────────────────────────────────────────────────────────────────
   AlphabetTeaser — interactive grid of the first 14 Arabic letters.
   Hover to highlight; links to the Foundations course.
───────────────────────────────────────────────────────────────────────────── */

export default function AlphabetTeaser() {
  const [hovered, setHovered] = useState<number | null>(null)
  const letters = alphabet.slice(0, 14)

  return (
    <section
      style={{
        padding:    'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
        background: 'var(--bg2)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap:                 80,
            alignItems:          'center',
          }}
        >
          {/* Left — heading + CTA */}
          <div>
            <SectionHeading
              eyebrow={{ en: 'Interactive', ar: 'تفاعلي' }}
              heading={
                <>
                  Explore the<br />
                  <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Arabic Alphabet</em>
                </>
              }
              sub="Each of the 28 letters changes form depending on its position in a word. Hover any letter to discover its name and sound."
            />
            <Link
              href="/courses/arabic-foundations"
              className="btn-ghost"
              style={{ marginTop: 32, display: 'inline-flex' }}
            >
              Start the Alphabet Course →
            </Link>
          </div>

          {/* Right — 7×2 letter grid */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap:                 6,
            }}
          >
            {letters.map((letter, i) => (
              <div
                key={letter.ar}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                title={`${letter.name} (${letter.trans})`}
                style={{
                  background: hovered === i ? 'rgba(201,146,42,0.15)' : 'var(--bg3)',
                  border:     `1px solid ${hovered === i ? 'var(--gold-border)' : 'var(--border)'}`,
                  padding:    '14px 6px',
                  textAlign:  'center',
                  cursor:     'default',
                  transition: 'all 0.2s ease',
                  transform:  hovered === i ? 'translateY(-3px)' : 'none',
                  borderRadius: 2,
                }}
              >
                <div
                  lang="ar"
                  style={{
                    fontFamily: 'var(--font-arabic)',
                    fontSize:   '1.5rem',
                    color:      hovered === i ? 'var(--gold)' : 'var(--text)',
                    lineHeight: 1,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {letter.ar}
                </div>
                <div
                  style={{
                    fontSize:      '0.58rem',
                    color:         hovered === i ? 'var(--gold)' : 'var(--text3)',
                    marginTop:     5,
                    letterSpacing: '0.06em',
                    transition:    'color 0.2s ease',
                  }}
                >
                  {letter.trans}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
