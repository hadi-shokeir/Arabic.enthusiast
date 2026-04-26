import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest }          from 'next/server'

/* ─────────────────────────────────────────────────────────────────────────────
   Auth middleware — runs on every matched request.

   Rules:
   • /portal/*  — requires logged-in student  → redirect /login if not
   • /tutor/*   — requires logged-in user      → redirect /login if not
   • /login     — redirect /portal if already logged in
   • Everything else — pass through (public)
───────────────────────────────────────────────────────────────────────────── */

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Refresh session if expired — IMPORTANT: do not remove this
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protected routes — send unauthenticated users to /login
  if ((pathname.startsWith('/portal') || pathname.startsWith('/tutor')) && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // Login page — send authenticated users to portal
  if (pathname === '/login' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/portal'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and Next.js internals.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
