import { createBrowserClient } from '@supabase/ssr'

/* ─────────────────────────────────────────────────────────────────────────────
   Browser (client component) Supabase client.
   Call this inside 'use client' components that need Supabase.
   Not typed with the Database generic — results are cast at call sites
   using the shared types in @/types to avoid supabase-js v2.49 compat issues.
───────────────────────────────────────────────────────────────────────────── */

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
