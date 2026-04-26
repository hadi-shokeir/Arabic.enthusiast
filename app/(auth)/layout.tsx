import Link from 'next/link'
import type { ReactNode } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   Auth layout — minimal shell for login / signup pages.
   No Nav or Footer — just a centred card with a logo link.
───────────────────────────────────────────────────────────────────────────── */

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '40px 20px',
        background:     'var(--bg)',
      }}
    >
      {/* Logo link back to home */}
      <Link
        href="/"
        style={{
          textDecoration: 'none',
          textAlign:      'center',
          marginBottom:   40,
          display:        'block',
        }}
      >
        <div
          style={{
            fontFamily:    'var(--font-brand)',
            fontSize:      '1.1rem',
            fontWeight:    600,
            color:         'var(--text)',
            letterSpacing: '0.06em',
          }}
        >
          Arabic Enthusiast
        </div>
        <div
          lang="ar"
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize:   '0.8rem',
            color:      'var(--gold)',
            marginTop:  2,
          }}
        >
          متذوق العربية
        </div>
      </Link>

      {children}
    </div>
  )
}
