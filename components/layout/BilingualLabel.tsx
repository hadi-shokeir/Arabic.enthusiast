'use client'

import type { CSSProperties } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   BilingualLabel — core visual identity component.
   English (DM Sans, small-caps tracking) + Arabic (Amiri, RTL, muted).
   Used everywhere: nav links, section headings, dashboard labels, tabs.

   Usage:
     <BilingualLabel en="Courses" ar="الدورات" />
     <BilingualLabel en="Progress" ar="التقدم" size="lg" gold />
     <BilingualLabel en="Skills Overview" ar="نظرة عامة على المهارات" eyebrow />
───────────────────────────────────────────────────────────────────────────── */

type LabelSize = 'xs' | 'sm' | 'md' | 'lg'

interface BilingualLabelProps {
  en:       string
  ar:       string
  size?:    LabelSize
  gold?:    boolean      // make English text gold
  eyebrow?: boolean      // eyebrow style (with flanking lines)
  center?:  boolean
  className?: string
  style?:   CSSProperties
}

const sizeMap: Record<LabelSize, { en: string; ar: string }> = {
  xs: { en: '0.6rem',  ar: '0.65rem' },
  sm: { en: '0.68rem', ar: '0.75rem' },
  md: { en: '0.78rem', ar: '0.85rem' },
  lg: { en: '0.9rem',  ar: '1rem'    },
}

export default function BilingualLabel({
  en,
  ar,
  size = 'sm',
  gold = false,
  eyebrow = false,
  center = false,
  className = '',
  style,
}: BilingualLabelProps) {
  const sz = sizeMap[size]

  if (eyebrow) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: center ? 'center' : 'flex-start',
          marginBottom: 16,
          ...style,
        }}
      >
        <span
          style={{
            display: 'block',
            width: 28,
            height: 1,
            background: gold ? 'var(--gold)' : 'var(--text3)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: sz.en,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: gold ? 'var(--gold)' : 'var(--text3)',
            whiteSpace: 'nowrap',
          }}
        >
          {en}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: sz.ar,
            color: gold ? 'var(--gold)' : 'var(--text3)',
            opacity: 0.8,
            whiteSpace: 'nowrap',
          }}
          dir="rtl"
          lang="ar"
        >
          {ar}
        </span>
        {center && (
          <span
            style={{
              display: 'block',
              width: 28,
              height: 1,
              background: gold ? 'var(--gold)' : 'var(--text3)',
              flexShrink: 0,
            }}
          />
        )}
      </div>
    )
  }

  return (
    <span
      className={`bilingual ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 8,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: sz.en,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: gold ? 'var(--gold)' : 'var(--text2)',
          fontWeight: 500,
        }}
      >
        {en}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: sz.ar,
          color: gold ? 'var(--gold)' : 'var(--text3)',
          fontWeight: 400,
        }}
        dir="rtl"
        lang="ar"
      >
        {ar}
      </span>
    </span>
  )
}
