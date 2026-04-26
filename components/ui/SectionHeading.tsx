import type { ReactNode } from 'react'
import BilingualLabel from '@/components/layout/BilingualLabel'

/* ─────────────────────────────────────────────────────────────────────────────
   SectionHeading — consistent section title block.
   eyebrow (bilingual label) → h2 heading → optional subtitle.
   Used on every public page above a content section.

   Usage:
     <SectionHeading
       eyebrow={{ en: 'Courses', ar: 'الدورات' }}
       heading="Three paths to Arabic"
       sub="Classical, Levantine, and Quranic — each with its own methodology."
       center
     />
───────────────────────────────────────────────────────────────────────────── */

interface SectionHeadingProps {
  eyebrow?: { en: string; ar: string }
  heading:  ReactNode
  sub?:     ReactNode
  center?:  boolean
  gold?:    boolean    // gold eyebrow accent
  style?:   React.CSSProperties
  className?: string
}

export default function SectionHeading({
  eyebrow,
  heading,
  sub,
  center = false,
  gold   = false,
  style,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth:  center ? 640 : 'none',
        margin:    center ? '0 auto' : undefined,
        textAlign: center ? 'center' : 'left',
        ...style,
      }}
    >
      {eyebrow && (
        <BilingualLabel
          en={eyebrow.en}
          ar={eyebrow.ar}
          eyebrow
          center={center}
          gold={gold}
          size="sm"
        />
      )}

      <h2
        style={{
          fontFamily:    'var(--font-heading)',
          fontSize:      'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight:    600,
          color:         'var(--text)',
          lineHeight:    1.2,
          letterSpacing: '-0.01em',
          marginBottom:  sub ? 16 : 0,
        }}
      >
        {heading}
      </h2>

      {sub && (
        <p
          style={{
            fontFamily:  'var(--font-body)',
            fontSize:    '1rem',
            color:       'var(--text2)',
            lineHeight:  1.75,
            maxWidth:    center ? 520 : 600,
            margin:      center ? '0 auto' : undefined,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
