'use client'

import type { ReactNode } from 'react'
import { ToastProvider } from '@/components/ui/Toast'

/* ─────────────────────────────────────────────────────────────────────────────
   Providers — client-side context wrappers for the whole app.
   Imported into the server-component layout.tsx.
   Add more providers here as needed (auth context in Phase 6, etc.).
───────────────────────────────────────────────────────────────────────────── */

export default function Providers({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
