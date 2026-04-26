'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { VocabEntry } from '@/types'

/* ─────────────────────────────────────────────────────────────────────────────
   Flashcards — /portal/flashcards
   SRS review session. Fetches due cards from /api/flashcards.
───────────────────────────────────────────────────────────────────────────── */

interface CardWithVocab {
  id:            string
  vocab_id:      string
  ease_factor:   number
  interval_days: number
  repetitions:   number
  next_review:   string
  vocab:         VocabEntry
}

type SessionState = 'loading' | 'empty' | 'reviewing' | 'done'

const DIFFICULTY_BUTTONS = [
  { key: 'again', label: 'Again',  color: '#e55353', sub: 'Forgot'       },
  { key: 'hard',  label: 'Hard',   color: '#d97706', sub: 'With effort'  },
  { key: 'good',  label: 'Good',   color: '#16a34a', sub: 'Recalled OK'  },
  { key: 'easy',  label: 'Easy',   color: '#2563eb', sub: 'Too easy'     },
]

export default function FlashcardsPage() {
  const [cards,       setCards]       = useState<CardWithVocab[]>([])
  const [index,       setIndex]       = useState(0)
  const [flipped,     setFlipped]     = useState(false)
  const [state,       setState]       = useState<SessionState>('loading')
  const [reviewed,    setReviewed]    = useState(0)
  const [correct,     setCorrect]     = useState(0)
  const startRef = useRef<number>(Date.now())
  const cardStartRef = useRef<number>(Date.now())

  const load = useCallback(async () => {
    setState('loading')
    const res  = await fetch('/api/flashcards')
    const data = await res.json()
    if (!data.cards?.length) {
      setState('empty')
      return
    }
    setCards(data.cards)
    setIndex(0)
    setFlipped(false)
    setState('reviewing')
    startRef.current    = Date.now()
    cardStartRef.current = Date.now()
  }, [])

  useEffect(() => { load() }, [load])

  async function handleDifficulty(difficulty: string) {
    const card = cards[index]
    if (!card) return

    const duration_seconds = Math.round((Date.now() - cardStartRef.current) / 1000)
    const wasCorrect       = difficulty !== 'again'
    if (wasCorrect) setCorrect(c => c + 1)
    setReviewed(r => r + 1)

    // Fire and forget — don't await to keep UI snappy
    fetch('/api/flashcards', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ vocab_id: card.vocab_id, difficulty, duration_seconds }),
    })

    const next = index + 1
    if (next >= cards.length) {
      setState('done')
    } else {
      setIndex(next)
      setFlipped(false)
      cardStartRef.current = Date.now()
    }
  }

  const card  = cards[index]
  const total = cards.length

  /* ── Loading ─────────────────────────────────────────────────────────────── */
  if (state === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <p style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>Loading your cards…</p>
      </div>
    )
  }

  /* ── Empty — nothing due ─────────────────────────────────────────────────── */
  if (state === 'empty') {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', paddingTop: 60 }}>
        <div style={{ fontSize: '3rem', marginBottom: 20 }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text)', marginBottom: 12 }}>
          All caught up
        </h2>
        <p style={{ color: 'var(--text3)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 32 }}>
          No cards are due for review right now. Come back tomorrow for your next session.
        </p>
        <p style={{ color: 'var(--text3)', fontSize: '0.8rem' }}>
          Tip: complete more lessons to unlock vocabulary cards.
        </p>
      </div>
    )
  }

  /* ── Session complete ────────────────────────────────────────────────────── */
  if (state === 'done') {
    const totalSeconds = Math.round((Date.now() - startRef.current) / 1000)
    const mins         = Math.floor(totalSeconds / 60)
    const secs         = totalSeconds % 60
    const accuracy     = total > 0 ? Math.round((correct / total) * 100) : 0

    return (
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', paddingTop: 60 }}>
        <div style={{ fontSize: '3rem', marginBottom: 20 }}>🎉</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text)', marginBottom: 24 }}>
          Session complete
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 36 }}>
          {[
            { label: 'Cards reviewed', value: reviewed },
            { label: 'Accuracy',       value: `${accuracy}%` },
            { label: 'Time',           value: mins > 0 ? `${mins}m ${secs}s` : `${secs}s` },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background:   'var(--card)',
                border:       '1px solid var(--border)',
                borderRadius: 3,
                padding:      '16px 12px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={load}
          className="btn-primary"
          style={{ padding: '12px 32px' }}
        >
          Review Again
        </button>
      </div>
    )
  }

  /* ── Active card ─────────────────────────────────────────────────────────── */
  if (!card) return null

  const { vocab } = card
  const progress  = Math.round((index / total) * 100)

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>

      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{ flex: 1, background: 'var(--bg2)', borderRadius: 99, height: 4, overflow: 'hidden' }}>
          <div
            style={{
              width:        `${progress}%`,
              height:       '100%',
              background:   'var(--gold)',
              borderRadius: 99,
              transition:   'width 0.3s ease',
            }}
          />
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text3)', flexShrink: 0 }}>
          {index + 1} / {total}
        </span>
      </div>

      {/* Card */}
      <div
        onClick={() => !flipped && setFlipped(true)}
        style={{
          background:   'var(--card)',
          border:       '1px solid var(--border)',
          borderTop:    '3px solid var(--gold)',
          borderRadius: 4,
          minHeight:    280,
          padding:      '40px 36px',
          display:      'flex',
          flexDirection:'column',
          alignItems:   'center',
          justifyContent:'center',
          textAlign:    'center',
          cursor:       flipped ? 'default' : 'pointer',
          userSelect:   'none',
          transition:   'box-shadow 0.2s ease',
          marginBottom: 24,
        }}
      >
        {/* Front — Arabic */}
        <div
          lang="ar"
          dir="rtl"
          style={{
            fontFamily:   'var(--font-arabic)',
            fontSize:     'clamp(2.5rem, 8vw, 4rem)',
            color:        'var(--text)',
            lineHeight:   1.2,
            marginBottom: flipped ? 24 : 0,
          }}
        >
          {vocab.ar}
        </div>

        {/* Back — revealed on flip */}
        {flipped && (
          <>
            <div
              style={{
                width:       40,
                height:      1,
                background:  'var(--border)',
                margin:      '0 auto 20px',
              }}
            />
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              {vocab.transliteration}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text)', marginBottom: 8 }}>
              {vocab.meaning}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 12 }}>
              Root: {vocab.root} · Pattern: {vocab.pattern}
            </div>
            {vocab.example_sentence && (
              <div
                style={{
                  marginTop:    8,
                  padding:      '12px 16px',
                  background:   'var(--bg2)',
                  borderRadius: 2,
                  width:        '100%',
                }}
              >
                <div lang="ar" dir="rtl" style={{ fontFamily: 'var(--font-arabic)', fontSize: '1rem', color: 'var(--text)', marginBottom: 4 }}>
                  {vocab.example_sentence}
                </div>
                {vocab.example_translation && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text3)', fontStyle: 'italic' }}>
                    {vocab.example_translation}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Tap hint */}
        {!flipped && (
          <div style={{ marginTop: 24, fontSize: '0.72rem', color: 'var(--text3)', letterSpacing: '0.08em' }}>
            TAP TO REVEAL
          </div>
        )}
      </div>

      {/* Category + level chips */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        <span
          style={{
            fontSize:      '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--text3)',
            border:        '1px solid var(--border)',
            padding:       '3px 8px',
            borderRadius:  2,
          }}
        >
          {vocab.semantic_category.replace(/_/g, ' ')}
        </span>
        <span
          style={{
            fontSize:      '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--gold)',
            border:        '1px solid var(--gold-border)',
            padding:       '3px 8px',
            borderRadius:  2,
          }}
        >
          {vocab.level}
        </span>
      </div>

      {/* Difficulty buttons — only shown after flip */}
      {flipped && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {DIFFICULTY_BUTTONS.map(btn => (
            <button
              key={btn.key}
              onClick={() => handleDifficulty(btn.key)}
              style={{
                background:   'var(--card)',
                border:       `1px solid ${btn.color}40`,
                borderRadius: 3,
                padding:      '12px 8px',
                cursor:       'pointer',
                textAlign:    'center',
                transition:   'all 0.15s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = `${btn.color}15`
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = btn.color
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--card)'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = `${btn.color}40`
              }}
            >
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: btn.color, marginBottom: 2 }}>
                {btn.label}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>
                {btn.sub}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
