'use client'

import Link             from 'next/link'
import { useRouter }    from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'

/* ─────────────────────────────────────────────────────────────────────────────
   Signup — /signup
   Creates a Supabase account. Profile row is auto-created by DB trigger.
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

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [done,     setDone]     = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setDone(true)
  }

  if (done) {
    return (
      <div
        style={{
          width:      '100%',
          maxWidth:   420,
          background: 'var(--card)',
          border:     '1px solid var(--border)',
          borderTop:  '2px solid var(--gold)',
          padding:    '40px 32px',
          textAlign:  'center',
        }}
      >
        <div
          style={{
            width:          52,
            height:         52,
            borderRadius:   '50%',
            border:         '2px solid var(--gold)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       '1.2rem',
            margin:         '0 auto 20px',
            color:          'var(--gold)',
          }}
        >
          ✓
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text)', marginBottom: 12 }}>
          Check your email
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7 }}>
          A confirmation link has been sent to <strong>{email}</strong>.
          Click it to activate your account, then sign in.
        </p>
        <div style={{ marginTop: 24 }}>
          <Link
            href="/login"
            className="btn-primary"
            style={{ display: 'inline-flex', justifyContent: 'center', padding: '12px 28px' }}
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    )
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
          Create your account
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text3)', lineHeight: 1.5 }}>
          Get access to your courses and track your progress.
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
          <label htmlFor="fullName" style={labelStyle}>Full name</label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Your name"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--gold-border)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

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
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="At least 8 characters"
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
          {loading ? 'Creating account…' : 'Create Account'}
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
        Already have an account?{' '}
        <Link href="/login" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
          Sign in
        </Link>
      </div>
    </div>
  )
}
