'use client'

import Link             from 'next/link'
import { useState, type FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'

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

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/portal/reset-password`,
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
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text)', marginBottom: 12 }}>
          Email sent
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7 }}>
          Check <strong>{email}</strong> for a reset link. It expires in 1 hour.
        </p>
        <div style={{ marginTop: 24 }}>
          <Link href="/login" style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>
            Back to sign in
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
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text)', fontWeight: 600, marginBottom: 6 }}>
          Reset your password
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text3)', lineHeight: 1.5 }}>
          Enter your email and we will send you a reset link.
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

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>

      <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.78rem' }}>
        <Link href="/login" style={{ color: 'var(--text3)', textDecoration: 'none' }}>
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
