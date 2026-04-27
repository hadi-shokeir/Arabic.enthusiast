'use client'

import { useState, useMemo } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   Sentence Builder — /portal/practice/sentence-builder
   Tap words to assemble an Arabic sentence in the correct order.
   Uses click-based ordering (no drag library needed).
───────────────────────────────────────────────────────────────────────────── */

interface Sentence {
  words:       string[]   // correct order (Arabic, RTL)
  translation: string
  hint:        string
}

const SENTENCES: Sentence[] = [
  { words: ['أَنَا', 'طَالِبٌ', 'فِي', 'الْمَدْرَسَةِ'],        translation: 'I am a student at school.',           hint: 'Subject + noun + prepositional phrase' },
  { words: ['هَذَا', 'كِتَابٌ', 'جَمِيلٌ'],                     translation: 'This is a beautiful book.',           hint: 'Demonstrative + noun + adjective' },
  { words: ['الرَّجُلُ', 'يَكْتُبُ', 'رِسَالَةً'],               translation: 'The man is writing a letter.',        hint: 'Subject + verb + object' },
  { words: ['فِي', 'الْبَيْتِ', 'كِتَابٌ', 'كَبِيرٌ'],           translation: 'In the house there is a big book.',   hint: 'Prepositional phrase + subject + adjective' },
  { words: ['هِيَ', 'تَذْهَبُ', 'إِلَى', 'الْمَدْرَسَةِ'],       translation: 'She goes to school.',                hint: 'Subject + verb + preposition + noun' },
  { words: ['الْوَلَدُ', 'الصَّغِيرُ', 'يَلْعَبُ', 'فِي', 'الْحَدِيقَةِ'], translation: 'The little boy plays in the garden.', hint: 'Subject + adj + verb + prep + noun' },
  { words: ['مَا', 'اسْمُكَ'],                                   translation: 'What is your name?',                 hint: 'Question word + noun with pronoun suffix' },
  { words: ['أَحِبُّ', 'تَعَلُّمَ', 'اللُّغَةِ', 'الْعَرَبِيَّةِ'], translation: 'I love learning the Arabic language.', hint: 'Verb + verbal noun + noun + adjective' },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function SentenceBuilderPage() {
  const [qIndex, setQIndex]   = useState(0)
  const [built,  setBuilt]    = useState<string[]>([])
  const [checked, setChecked] = useState(false)
  const [score,  setScore]    = useState(0)
  const [done,   setDone]     = useState(false)
  const [showHint, setShowHint] = useState(false)

  const question = SENTENCES[qIndex]
  const shuffled = useMemo(() => shuffle([...question.words]), [qIndex]) // eslint-disable-line react-hooks/exhaustive-deps
  const [bank,   setBank]    = useState<string[]>(() => shuffle([...question.words]))

  // Reset bank when qIndex changes
  useMemo(() => {
    setBank(shuffle([...question.words]))
    setBuilt([])
    setChecked(false)
    setShowHint(false)
  }, [qIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const addWord = (word: string, bankIdx: number) => {
    if (checked) return
    setBuilt(prev => [...prev, word])
    setBank(prev => prev.filter((_, i) => i !== bankIdx))
  }

  const removeWord = (builtIdx: number) => {
    if (checked) return
    const word = built[builtIdx]
    setBuilt(prev => prev.filter((_, i) => i !== builtIdx))
    setBank(prev => [...prev, word])
  }

  const check = () => {
    setChecked(true)
    if (built.join(' ') === question.words.join(' ')) {
      setScore(s => s + 1)
    }
  }

  const next = () => {
    if (qIndex + 1 >= SENTENCES.length) { setDone(true); return }
    setQIndex(i => i + 1)
  }

  const restart = () => {
    setQIndex(0)
    setScore(0)
    setDone(false)
    setChecked(false)
    setBuilt([])
    setShowHint(false)
  }

  const isCorrect = checked && built.join(' ') === question.words.join(' ')

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: 4 }}>
            Sentence Builder / بناء الجملة
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text3)' }}>
            Tap words to build the correct Arabic sentence.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--gold)', fontWeight: 600 }}>
            {score}/{SENTENCES.length}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{qIndex + 1} of {SENTENCES.length}</div>
        </div>
      </div>

      {done ? (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 3, padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--gold)', marginBottom: 8 }}>{score}/{SENTENCES.length}</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text2)', marginBottom: 28 }}>
            {score === SENTENCES.length ? 'Perfect — you have great Arabic word order intuition!' : 'Arabic word order takes practice. Keep building!'}
          </div>
          <button onClick={restart} style={{ padding: '10px 28px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 2, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
            Try again →
          </button>
        </div>
      ) : (
        <div>
          {/* Progress */}
          <div style={{ background: 'var(--bg2)', borderRadius: 99, height: 3, marginBottom: 28, overflow: 'hidden' }}>
            <div style={{ width: `${(qIndex / SENTENCES.length) * 100}%`, height: '100%', background: 'var(--gold)', borderRadius: 99, transition: 'width 0.4s ease' }} />
          </div>

          {/* Translation */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 3, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              Translate this into Arabic:
            </div>
            <div style={{ fontSize: '1rem', color: 'var(--text)', fontWeight: 500 }}>{question.translation}</div>
            <button
              onClick={() => setShowHint(h => !h)}
              style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--text3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
            {showHint && (
              <div style={{ marginTop: 6, fontSize: '0.78rem', color: 'var(--gold)', fontStyle: 'italic' }}>
                {question.hint}
              </div>
            )}
          </div>

          {/* Answer zone */}
          <div style={{
            minHeight: 70, background: 'var(--bg2)', border: checked
              ? `1px solid ${isCorrect ? '#3a6a3a' : '#7a3a3a'}`
              : '1px dashed var(--border)',
            borderRadius: 3, padding: '14px 16px', marginBottom: 16,
            display: 'flex', flexWrap: 'wrap', gap: 8, direction: 'rtl', alignItems: 'center',
          }}>
            {built.length === 0 && (
              <span style={{ color: 'var(--text3)', fontSize: '0.82rem', direction: 'ltr' }}>
                Tap words below to add them here…
              </span>
            )}
            {built.map((w, i) => (
              <button
                key={`${w}-${i}`}
                onClick={() => removeWord(i)}
                disabled={checked}
                style={{
                  background: checked ? (isCorrect ? '#1a3a1a' : '#3a1a1a') : 'var(--bg)',
                  border: checked ? (isCorrect ? '1px solid #3a6a3a' : '1px solid #7a3a3a') : '1px solid var(--gold-border)',
                  borderRadius: 3, padding: '8px 14px',
                  fontFamily: 'var(--font-arabic)', fontSize: '1.2rem',
                  color: checked ? (isCorrect ? '#6c6' : '#f66') : 'var(--text)',
                  cursor: checked ? 'default' : 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {w}
              </button>
            ))}
          </div>

          {/* Word bank */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, direction: 'rtl', marginBottom: 20, minHeight: 54 }}>
            {bank.map((w, i) => (
              <button
                key={`${w}-${i}`}
                onClick={() => addWord(w, i)}
                disabled={checked}
                style={{
                  background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 3,
                  padding: '8px 14px', fontFamily: 'var(--font-arabic)', fontSize: '1.2rem',
                  color: 'var(--text)', cursor: checked ? 'default' : 'pointer',
                  transition: 'all 0.15s', opacity: checked ? 0.4 : 1,
                }}
              >
                {w}
              </button>
            ))}
          </div>

          {/* Correct answer on wrong */}
          {checked && !isCorrect && (
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 2, padding: '12px 16px', marginBottom: 16, fontSize: '0.82rem', color: 'var(--text3)' }}>
              <span style={{ color: 'var(--text2)' }}>Correct order:</span>{' '}
              <span lang="ar" style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.1rem', direction: 'rtl', display: 'inline-block' }}>
                {question.words.join(' ')}
              </span>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            {!checked ? (
              <button
                onClick={check}
                disabled={built.length !== question.words.length}
                style={{
                  padding: '9px 24px', background: 'var(--gold)', color: '#000',
                  border: 'none', borderRadius: 2, cursor: built.length !== question.words.length ? 'not-allowed' : 'pointer',
                  fontSize: '0.85rem', fontWeight: 700, opacity: built.length !== question.words.length ? 0.5 : 1,
                }}
              >
                Check →
              </button>
            ) : (
              <button
                onClick={next}
                style={{ padding: '9px 24px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 2, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
              >
                {qIndex + 1 < SENTENCES.length ? 'Next →' : 'Finish'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
