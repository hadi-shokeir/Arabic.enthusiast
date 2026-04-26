'use client'

import Link              from 'next/link'
import { useRouter }     from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { createClient }  from '@/lib/supabase/client'

/* ─────────────────────────────────────────────────────────────────────────────
   Login — /login
   Authenticates via Supabase, redirects to /portal on success.
───────────────────────────────────────────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  width:        '100%',
  background:   'var(--input-bg)',
  border:       '1px solid var(--border)',
  borderRadius: 2,
  padding:      '12px 14px',
  fontFamily:   'var(--font-body)',
  fontSize:     '0.9rem',
  color:        'var(--text)',
  outline:      'none',
  transition:   'border-color 0.2s ease',
}

const labelStyle: React.CSSProperties = {
  display:       'block',
  fontSize:      '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color:         'var(--text3)',
  marginBottom:  6,
}

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/portal')
    router.refresh()
  }

  return (
    <div
      style={{
        width:      '100%',
        maxWidth:   420,
        background: 'var(--card)',
        border:     '1px solid var(--border)',
        borderTop:  '2px solid var(--gold)',
        padding:    '36px 32px',
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontFamily:   'var(--font-heading)',
            fontSize:     '1.5rem',
            color:        'var(--text)',
            fontWeight:   600,
            marginBottom: 6,
          }}
        >
          Welcome back
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text3)', lineHeight: 1.5 }}>
          Sign in to access your courses and progress.
        </p>
      </div>

      {error && (
        <div
          style={{
            background:   'var(--danger-dim)',
            border:       '1px solid var(--danger)',
            borderRadius: 2,
            padding:      '10px 14px',
            marginBottom: 20,
            fontSize:     '0.82rem',
            color:        'var(--danger)',
            lineHeight:   1.5,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--gold-border)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label htmlFor="password" style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
            <Link
              href="/forgot-password"
              style={{ fontSize: '0.72rem', color: 'var(--text3)', textDecoration: 'none' }}
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--gold-border)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: 4, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <div
        style={{
          marginTop:  24,
          paddingTop: 20,
          borderTop:  '1px solid var(--border)',
          textAlign:  'center',
          fontSize:   '0.78rem',
          color:      'var(--text3)',
        }}
      >
        Not a student yet?{' '}
        <Link href="/consultation" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
          Book a free trial lesson
        </Link>
      </div>
    </div>
  )
}
