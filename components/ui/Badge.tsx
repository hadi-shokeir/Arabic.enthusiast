import type { ReactNode } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   Badge — small pill label.
   Used for: course level, lesson type (Free/Premium), course track colour.
───────────────────────────────────────────────────────────────────────────── */

type BadgeVariant =
  | 'gold'       // Foundations / gold accent
  | 'teal'       // Levantine
  | 'green'      // Quranic
  | 'success'
  | 'danger'
  | 'muted'      // default / grey
  | 'free'       // green pill for free lesson

interface BadgeProps {
  children:  ReactNode
  variant?:  BadgeVariant
  size?:     'xs' | 'sm'
  dot?:      boolean     // coloured dot before text
}

const colours: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  gold:    { bg: 'rgba(201,146,42,0.12)',  text: '#C9922A',  border: 'rgba(201,146,42,0.35)' },
  teal:    { bg: 'rgba(107,158,143,0.12)', text: '#6B9E8F',  border: 'rgba(107,158,143,0.35)' },
  green:   { bg: 'rgba(74,122,106,0.12)',  text: '#4A7A6A',  border: 'rgba(74,122,106,0.35)' },
  success: { bg: 'rgba(74,122,90,0.12)',   text: '#4a7a5a',  border: 'rgba(74,122,90,0.3)' },
  danger:  { bg: 'rgba(180,60,60,0.12)',   text: '#b43c3c',  border: 'rgba(180,60,60,0.3)' },
  muted:   { bg: 'rgba(255,255,255,0.05)', text: 'var(--text3)', border: 'var(--border)' },
  free:    { bg: 'rgba(74,122,90,0.15)',   text: '#5fa370',  border: 'rgba(74,122,90,0.4)' },
}

/** Map a course accent colour string to a variant */
export function colourToVariant(color: string): BadgeVariant {
  if (color === '#C9922A') return 'gold'
  if (color === '#6B9E8F') return 'teal'
  if (color === '#4A7A6A') return 'green'
  return 'muted'
}

export default function Badge({
  children,
  variant = 'muted',
  size    = 'sm',
  dot     = false,
}: BadgeProps) {
  const c = colours[variant]
  return (
    <span
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           dot ? 5 : 0,
        background:    c.bg,
        color:         c.text,
        border:        `1px solid ${c.border}`,
        borderRadius:  2,
        padding:       size === 'xs' ? '2px 7px' : '4px 10px',
        fontFamily:    'var(--font-body)',
        fontSize:      size === 'xs' ? '0.62rem' : '0.68rem',
        fontWeight:    600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        whiteSpace:    'nowrap',
      }}
    >
      {dot && (
        <span
          style={{
            display:      'block',
            width:        5,
            height:       5,
            borderRadius: '50%',
            background:   c.text,
            flexShrink:   0,
          }}
        />
      )}
      {children}
    </span>
  )
}
