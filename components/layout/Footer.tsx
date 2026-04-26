'use client'

import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────────
   Footer — site-wide footer.
   Three columns: logo+tagline, courses, quick links.
   Social links row at bottom.
───────────────────────────────────────────────────────────────────────────── */

const COURSE_LINKS = [
  { href: '/courses/arabic-foundations',  label: 'Arabic Foundations',  ar: 'أساسيات العربية'   },
  { href: '/courses/levantine-dialect',   label: 'Levantine Arabic',     ar: 'العامية الشامية'   },
  { href: '/courses/quranic-arabic',      label: 'Quranic Arabic',       ar: 'العربية القرآنية'  },
]

const QUICK_LINKS = [
  { href: '/about',        label: 'About Hadi'   },
  { href: '/pricing',      label: 'Pricing'       },
  { href: '/blog',         label: 'Blog'          },
  { href: '/resources',    label: 'Resources'     },
  { href: '/consultation', label: 'Book a Lesson' },
  { href: '/login',        label: 'Student Login' },
]

/* ── Instagram icon ─────────────────────────────────────────────────────────── */
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ── TikTok icon ─────────────────────────────────────────────────────────────── */
function TikTokIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.09a8.16 8.16 0 0 0 4.77 1.52V7.16a4.85 4.85 0 0 1-1-.47z" />
    </svg>
  )
}

/* ── Facebook icon ──────────────────────────────────────────────────────────── */
function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

/* ── YouTube icon ───────────────────────────────────────────────────────────── */
function YouTubeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080808" />
    </svg>
  )
}

/* ── WhatsApp icon ──────────────────────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

const SOCIALS = [
  { href: 'https://instagram.com', icon: <InstagramIcon />, label: 'Instagram' },
  { href: 'https://tiktok.com',    icon: <TikTokIcon />,    label: 'TikTok'    },
  { href: 'https://facebook.com',  icon: <FacebookIcon />,  label: 'Facebook'  },
  { href: 'https://youtube.com',   icon: <YouTubeIcon />,   label: 'YouTube'   },
  { href: 'https://wa.me',         icon: <WhatsAppIcon />,  label: 'WhatsApp'  },
]

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color:          'var(--text3)',
  fontSize:       '0.8rem',
  fontFamily:     'var(--font-body)',
  letterSpacing:  '0.03em',
  transition:     'color 0.2s ease',
  display:        'block',
  padding:        '3px 0',
}

export default function Footer() {
  return (
    <footer
      style={{
        background:   'var(--bg2)',
        borderTop:    '1px solid var(--border)',
        padding:      '64px 80px 40px',
        position:     'relative',
        overflow:     'hidden',
      }}
    >
      {/* Decorative Arabic background text */}
      <span
        aria-hidden
        style={{
          position:     'absolute',
          right:        '5%',
          bottom:       '-20px',
          fontFamily:   'var(--font-arabic)',
          fontSize:     '9rem',
          color:        'rgba(255,255,255,0.025)',
          lineHeight:   1,
          pointerEvents:'none',
          userSelect:   'none',
        }}
      >
        علم
      </span>

      {/* ── Main grid ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap:                 64,
          marginBottom:        56,
        }}
      >
        {/* Column 1 — Logo + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div
              style={{
                fontFamily:    'var(--font-brand)',
                fontSize:      '1.05rem',
                fontWeight:    600,
                color:         'var(--text)',
                letterSpacing: '0.06em',
              }}
            >
              Arabic Enthusiast
            </div>
            <div
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize:   '0.8rem',
                color:      'var(--gold)',
                direction:  'rtl',
                marginTop:  2,
              }}
            >
              متذوق العربية
            </div>
          </Link>

          <p
            style={{
              color:      'var(--text3)',
              fontSize:   '0.82rem',
              lineHeight: 1.75,
              maxWidth:   240,
            }}
          >
            Structured Arabic language courses taught by Hadi Shokeir — linguist,
            translator, and Islamic seminary student with seven years of teaching experience.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  width:          34,
                  height:         34,
                  border:         '1px solid var(--border)',
                  borderRadius:   4,
                  color:          'var(--text3)',
                  textDecoration: 'none',
                  transition:     'border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold-border)'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text3)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Courses */}
        <div>
          <div
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'var(--text3)',
              marginBottom:  20,
            }}
          >
            Courses
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {COURSE_LINKS.map(link => (
              <Link key={link.href} href={link.href} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
              >
                <span>{link.label}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-arabic)',
                    fontSize:   '0.75rem',
                    color:      'var(--text3)',
                    marginRight: 6,
                    opacity:    0.7,
                  }}
                >
                  — {link.ar}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 — Quick links */}
        <div>
          <div
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'var(--text3)',
              marginBottom:  20,
            }}
          >
            Navigation
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {QUICK_LINKS.map(link => (
              <Link key={link.href} href={link.href} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop:     '1px solid var(--border)',
          paddingTop:    24,
          display:       'flex',
          alignItems:    'center',
          justifyContent:'space-between',
          flexWrap:      'wrap',
          gap:           12,
        }}
      >
        <p style={{ color: 'var(--text3)', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} Arabic Enthusiast · Hadi Shokeir. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { href: '/privacy', label: 'Privacy' },
            { href: '/terms',   label: 'Terms'   },
          ].map(l => (
            <Link key={l.href} href={l.href}
              style={{ ...linkStyle, fontSize: '0.72rem' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text2)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Mobile responsive overrides ────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          footer > div:first-of-type {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          footer {
            padding: 48px 20px 32px !important;
          }
        }
      `}</style>
    </footer>
  )
}
