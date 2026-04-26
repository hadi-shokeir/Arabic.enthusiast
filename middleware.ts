import { NextResponse, type NextRequest } from 'next/server'

/* ─────────────────────────────────────────────────────────────────────────────
   Auth middleware — cookie-only check, no Supabase SDK calls.
   The SDK is not compatible with Vercel's Edge runtime.

   Security note: each portal page also calls supabase.auth.getUser()
   server-side, so a forged cookie still can't access real data.
   This middleware is purely for redirect UX.
───────────────────────────────────────────────────────────────────────────── */

// Supabase stores the session in a cookie named sb-{project-ref}-auth-token
const PROJECT_REF = 'aojfgnpzfqkkvfdtaegd'
const AUTH_COOKIE  = `sb-${PROJECT_REF}-auth-token`

function hasSession(request: NextRequest): boolean {
  // Check the exact cookie name first
  if (request.cookies.has(AUTH_COOKIE)) return true
  // Fallback: any Supabase auth cookie (handles chunked cookies too)
  return request.cookies.getAll().some(
    c => c.name.startsWith('sb-') && c.name.includes('-auth-token'),
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const loggedIn = hasSession(request)

  // Protected routes → redirect to /login if no session cookie
  if ((pathname.startsWith('/portal') || pathname.startsWith('/tutor')) && !loggedIn) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // Login page → redirect to /portal if already logged in
  if (pathname === '/login' && loggedIn) {
    const url = request.nextUrl.clone()
    url.pathname = '/portal'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path*', '/tutor/:path*', '/login'],
}
