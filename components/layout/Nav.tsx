'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import BilingualLabel from './BilingualLabel'

/* ─────────────────────────────────────────────────────────────────────────────
   Nav — main site navigation.
   Transparent on load, solid on scroll (nav-scrolled class).
   Theme toggle reads/writes localStorage + sets data-theme on <html>.
   Mobile drawer slides in at ≤768px.
───────────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: '/courses',   en: 'Courses',  ar: 'الدورات'   },
  { href: '/about',     en: 'About',    ar: 'عني'        },
  { href: '/pricing',   en: 'Pricing',  ar: 'الأسعار'   },
  { href: '/blog',      en: 'Blog',     ar: 'المدوّنة'   },
  { href: '/resources', en: 'Resources',ar: 'الموارد'    },
]

/* ── Sun icon ───────────────────────────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5"  />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  />
    </svg>
  )
}

/* ── Moon icon ──────────────────────────────────────────────────────────────── */
function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

/* ── Hamburger icon ─────────────────────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {open ? (
        <>
          <line x1="18" y1="6"  x2="6" y2="18" />
          <line x1="6"  y1="6"  x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6"  x2="21" y2="6"  />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  )
}

export default function Nav() {
  const pathname            = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme]       = useState<'dark' | 'light'>('dark')

  /* Sync initial theme from DOM (blocking script set it before hydration) */
  useEffect(() => {
    const stored = localStorage.getItem('ae-theme')
    if (stored === 'light') setTheme('light')
  }, [])

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close drawer on viewport resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* Close drawer on route change */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  /* Toggle theme */
  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('ae-theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }, [theme])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <nav
        className={scrolled ? 'nav-scrolled' : ''}
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         100,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 40px',
          height:         64,
          background:     scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom:   scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          transition:     'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* ── Logo ─────────────────────────────────────────────────────────────── */}
        <Link
          href="/"
          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 1 }}
        >
          <span
            style={{
              fontFamily:    'var(--font-brand)',
              fontSize:      '1rem',
              fontWeight:    600,
              color:         'var(--text)',
              letterSpacing: '0.06em',
              lineHeight:    1.1,
            }}
          >
            Arabic Enthusiast
          </span>
          <span
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize:   '0.7rem',
              color:      'var(--text3)',
              direction:  'rtl',
              lineHeight: 1,
            }}
          >
            متذوق العربية
          </span>
        </Link>

        {/* ── Desktop links ─────────────────────────────────────────────────────── */}
        <div
          className="nav-desktop"
          style={{ alignItems: 'center', gap: 4 }}
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                padding:        '8px 14px',
                borderRadius:   2,
                borderBottom:   isActive(link.href)
                  ? '1px solid var(--gold)'
                  : '1px solid transparent',
                transition: 'border-color 0.2s ease',
              }}
            >
              <BilingualLabel
                en={link.en}
                ar={link.ar}
                size="sm"
                gold={isActive(link.href)}
              />
            </Link>
          ))}
        </div>

        {/* ── Right cluster ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background:    'transparent',
              border:        '1px solid var(--border)',
              borderRadius:  4,
              padding:       '7px 9px',
              cursor:        'pointer',
              color:         'var(--text2)',
              display:       'flex',
              alignItems:    'center',
              transition:    'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold-border)'
              ;(e.currentTarget as HTMLButtonElement).style.color       = 'var(--gold)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
              ;(e.currentTarget as HTMLButtonElement).style.color       = 'var(--text2)'
            }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Login — desktop only */}
          <Link
            href="/login"
            className="nav-desktop btn-ghost"
            style={{ padding: '8px 20px', fontSize: '0.72rem' }}
          >
            Login
          </Link>

          {/* Book a lesson CTA — desktop only */}
          <Link
            href="/consultation"
            className="nav-desktop btn-primary"
            style={{ padding: '10px 22px', fontSize: '0.72rem' }}
          >
            Book a Lesson
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="nav-mobile"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background:   'transparent',
              border:       'none',
              cursor:       'pointer',
              color:        'var(--text)',
              padding:      4,
              display:      'none', /* overridden by .nav-mobile in CSS */
              alignItems:   'center',
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          style={{
            position:       'fixed',
            top:            64,
            left:           0,
            right:          0,
            zIndex:         99,
            background:     'var(--nav-bg)',
            backdropFilter: 'blur(20px)',
            borderBottom:   '1px solid var(--border)',
            padding:        '24px 24px 32px',
            animation:      'slideDown 0.2s ease forwards',
            display:        'flex',
            flexDirection:  'column',
            gap:            4,
          }}
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                padding:        '14px 16px',
                borderBottom:   '1px solid var(--border)',
              }}
            >
              <BilingualLabel
                en={link.en}
                ar={link.ar}
                size="md"
                gold={isActive(link.href)}
              />
            </Link>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
            <Link href="/login" className="btn-ghost" style={{ textAlign: 'center' }}>
              Login
            </Link>
            <Link href="/consultation" className="btn-primary" style={{ textAlign: 'center' }}>
              Book a Lesson
            </Link>
          </div>
        </div>
      )}

      {/* ── Spacer so page content starts below nav ───────────────────────────── */}
      <div style={{ height: 64 }} />
    </>
  )
}
