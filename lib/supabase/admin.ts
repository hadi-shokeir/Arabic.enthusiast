import { createClient } from '@supabase/supabase-js'

/* ─────────────────────────────────────────────────────────────────────────────
   Admin (service-role) Supabase client.
   Bypasses Row Level Security — use ONLY in server-side API routes.
   NEVER expose this to the browser or import from 'use client' files.
   Not typed with Database generic — service-role operations don't need it
   and supabase-js v2.49 requires Relationships in hand-written types.
───────────────────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession:   false,
      },
    },
  )
}
