'use client'

import { useState, useMemo } from 'react'
import { vocab } from '@/data/vocab'

/* ─────────────────────────────────────────────────────────────────────────────
   Root Hunt — /portal/practice/root-hunt
   Student sees an Arabic word and must identify its trilateral root from 4 options.
───────────────────────────────────────────────────────────────────────────── */

// Only entries with a real root (not "—")
const ELIGIBLE = vocab.filter(v => v.root && v.root !== '—')

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function RootHuntPage() {
  const [queue, setQueue] = useState<typeof ELIGIBLE>(() => shuffle([...ELIGIBLE]).slice(0, 10))
  const [index, setIndex]   = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const [score, setScore]   = useState(0)
  const [done, setDone]     = useState(false)

  const current = queue[index]
  const options = useMemo(() => {
    if (!current) return []
    const distractors = shuffle(ELIGIBLE.filter(v => v.root !== current.root)).slice(0, 3).map(v => v.root)
    return shuffle([current.root, ...distractors])
  }, [current])

  const choose = (opt: string) => {
    if (chosen) return
    setChosen(opt)
    if (opt === current.root) setScore(s => s + 1)
  }

  const next = () => {
    if (index + 1 >= queue.length) { setDone(true); return }
    setIndex(i => i + 1)
    setChosen(null)
  }

  const restart = () => {
    setQueue(shuffle([...ELIGIBLE]).slice(0, 10))
    setIndex(0)
    setChosen(null)
    setScore(0)
    setDone(false)
  }

  if (ELIGIBLE.length < 4) {
    return <div style={{ color: 'var(--text3)', padding: 40 }}>Not enough vocab data.</div>
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: 4 }}>
            Root Hunt / صيد الجذور
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text3)' }}>
            Identify the trilateral root of the Arabic word.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--gold)', fontWeight: 600 }}>
            {score}/{queue.length}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{index + 1} of {queue.length}</div>
        </div>
      </div>

      {done ? (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 3, padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--gold)', marginBottom: 8 }}>{score}/{queue.length}</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text2)', marginBottom: 28 }}>
            {score === queue.length ? 'Perfect! You know your roots.' : 'Root recognition takes time — keep at it!'}
          </div>
          <button onClick={restart} style={{ padding: '10px 28px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 2, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
            Try again →
          </button>
        </div>
      ) : (
        <div>
          {/* Progress */}
          <div style={{ background: 'var(--bg2)', borderRadius: 99, height: 3, marginBottom: 28, overflow: 'hidden' }}>
            <div style={{ width: `${(index / queue.length) * 100}%`, height: '100%', background: 'var(--gold)', borderRadius: 99, transition: 'width 0.4s ease' }} />
          </div>

          {/* Word card */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 3, padding: '40px 28px', marginBottom: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              What is the root of this word?
            </div>
            <div lang="ar" style={{ fontFamily: 'var(--font-arabic)', fontSize: '3rem', color: 'var(--text)', marginBottom: 12, direction: 'rtl' }}>
              {current.ar}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text3)' }}>
              {current.meaning} — {current.transliteration}
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {options.map(opt => {
              const isCorrect = opt === current.root
              const isChosen  = opt === chosen
              const isWrong   = isChosen && !isCorrect
              const showGreen = chosen && isCorrect

              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  disabled={!!chosen}
                  style={{
                    background:   showGreen ? '#1a3a1a' : isWrong ? '#3a1a1a' : 'var(--bg2)',
                    border:       showGreen ? '1px solid #3a6a3a' : isWrong ? '1px solid #7a3a3a' : '1px solid var(--border)',
                    borderRadius: 2, padding: '16px',
                    cursor:       chosen ? 'default' : 'pointer', textAlign: 'center',
                    fontFamily:   'var(--font-arabic)', fontSize: '1.4rem',
                    color:        showGreen ? '#6c6' : isWrong ? '#f66' : 'var(--text)',
                    direction:    'rtl', transition: 'all 0.2s',
                    letterSpacing: '0.15em',
                  }}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {chosen && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontSize: '0.82rem', color: chosen === current.root ? '#6c6' : '#f66' }}>
                {chosen === current.root
                  ? `✓ Correct — root ${current.root} (pattern: ${current.pattern})`
                  : `✗ Root is ${current.root} — from the same family as related words`}
              </div>
              <button onClick={next} style={{ padding: '8px 22px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 2, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}>
                {index + 1 < queue.length ? 'Next →' : 'Finish'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
