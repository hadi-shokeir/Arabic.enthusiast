'use client'

import { useState, useMemo } from 'react'
import { vocab } from '@/data/vocab'

/* ─────────────────────────────────────────────────────────────────────────────
   Cloze Fill-in — /portal/practice/cloze
   Shows an Arabic example sentence with one key word blanked out.
   Student selects the correct word from 4 options.
───────────────────────────────────────────────────────────────────────────── */

// Only use vocab entries that have example sentences
const ELIGIBLE = vocab.filter(v => v.example_sentence && v.example_translation)

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestion(entry: typeof vocab[0]) {
  const blanked = entry.example_sentence!.replace(
    new RegExp(entry.ar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '______'
  )

  // 3 distractor words from same course
  const distractors = shuffle(
    vocab.filter(v => v.id !== entry.id && v.course_id === entry.course_id)
  ).slice(0, 3).map(v => v.ar)

  const options = shuffle([entry.ar, ...distractors])
  return { blanked, options, answer: entry.ar, translation: entry.example_translation! }
}

export default function ClozePage() {
  const [queue, setQueue] = useState<typeof ELIGIBLE>(() => shuffle([...ELIGIBLE]).slice(0, 10))
  const [index, setIndex]   = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const [score, setScore]   = useState(0)
  const [done, setDone]     = useState(false)

  const current  = queue[index]
  const question = useMemo(() => current ? buildQuestion(current) : null, [current])

  const choose = (opt: string) => {
    if (chosen) return
    setChosen(opt)
    if (opt === question?.answer) setScore(s => s + 1)
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

  if (!question || ELIGIBLE.length < 4) {
    return <div style={{ color: 'var(--text3)', padding: 40 }}>Not enough vocab data for cloze exercises.</div>
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: 4 }}>
            Cloze Fill-in / ملء الفراغ
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text3)' }}>
            Choose the missing word to complete the sentence.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--gold)', fontWeight: 600 }}>
            {score}/{queue.length}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>
            {index + 1} of {queue.length}
          </div>
        </div>
      </div>

      {done ? (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 3, padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--gold)', marginBottom: 8 }}>
            {score}/{queue.length}
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text2)', marginBottom: 28 }}>
            {score === queue.length ? 'Perfect score! ممتاز' : score >= queue.length * 0.7 ? 'Great work! أحسنت' : 'Keep practising — you are improving! استمر'}
          </div>
          <button
            onClick={restart}
            style={{ padding: '10px 28px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 2, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
          >
            Try again →
          </button>
        </div>
      ) : (
        <div>
          {/* Progress bar */}
          <div style={{ background: 'var(--bg2)', borderRadius: 99, height: 3, marginBottom: 28, overflow: 'hidden' }}>
            <div style={{ width: `${((index) / queue.length) * 100}%`, height: '100%', background: 'var(--gold)', borderRadius: 99, transition: 'width 0.4s ease' }} />
          </div>

          {/* Sentence card */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 3, padding: '32px 28px', marginBottom: 20 }}>
            <div lang="ar" style={{
              fontFamily: 'var(--font-arabic)', fontSize: '1.8rem', textAlign: 'right',
              color: 'var(--text)', lineHeight: 1.8, marginBottom: 16, direction: 'rtl',
            }}>
              {question.blanked}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text3)', fontStyle: 'italic' }}>
              {question.translation.replace(current.meaning, '______')}
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {question.options.map(opt => {
              const isCorrect  = opt === question.answer
              const isChosen   = opt === chosen
              const isWrong    = isChosen && !isCorrect
              const showGreen  = chosen && isCorrect
              const bg = showGreen ? '#1a3a1a' : isWrong ? '#3a1a1a' : 'var(--bg2)'
              const border = showGreen ? '1px solid #3a6a3a' : isWrong ? '1px solid #7a3a3a' : '1px solid var(--border)'
              const color = showGreen ? '#6c6' : isWrong ? '#f66' : 'var(--text)'

              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  disabled={!!chosen}
                  style={{
                    background: bg, border, borderRadius: 2, padding: '14px 16px',
                    cursor: chosen ? 'default' : 'pointer', textAlign: 'center',
                    fontFamily: 'var(--font-arabic)', fontSize: '1.3rem', color, direction: 'rtl',
                    transition: 'all 0.2s',
                  }}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Feedback + Next */}
          {chosen && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontSize: '0.82rem', color: chosen === question.answer ? '#6c6' : '#f66' }}>
                {chosen === question.answer
                  ? `✓ Correct — ${current.meaning} (${current.transliteration})`
                  : `✗ The answer was: ${question.answer} — ${current.meaning}`}
              </div>
              <button
                onClick={next}
                style={{ padding: '8px 22px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 2, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}
              >
                {index + 1 < queue.length ? 'Next →' : 'Finish'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
