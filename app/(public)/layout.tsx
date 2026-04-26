import Nav    from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import type { ReactNode } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   Public layout — wraps all marketing / public pages with Nav + Footer.
   The root app/layout.tsx already handles fonts, theme script, and Providers.
───────────────────────────────────────────────────────────────────────────── */

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
