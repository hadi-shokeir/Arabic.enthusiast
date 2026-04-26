'use client'

import { useState }   from 'react'
import { notFound }   from 'next/navigation'
import Link           from 'next/link'
import Badge, { colourToVariant } from '@/components/ui/Badge'
import { courses }    from '@/data/courses'
import type { CourseId, Lesson } from '@/types'

/* ─────────────────────────────────────────────────────────────────────────────
   Lesson Page — /courses/[courseId]/lessons/[lessonId]
   Client component for the interactive quiz state.
   Sidebar shows all lessons; main area shows lesson content + quiz.
───────────────────────────────────────────────────────────────────────────── */

interface Props {
  params: { courseId: CourseId; lessonId: string }
}

/* ── Quiz component ─────────────────────────────────────────────────────────── */
function QuizBlock({ lesson, courseId, courseColor }: { lesson: Lesson; courseId: string; courseColor: string }) {
  const [selected, setSelected]   = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [xpNotice, setXpNotice]   = useState<number | null>(null)
  const correct = selected === lesson.quiz.answer

  async function handleCheck() {
    if (!selected) return
    setSubmitted(true)
    // Fire and forget — saves progress + awards XP
    const score = selected === lesson.quiz.answer ? 100 : 0
    const res = await fetch('/api/progress', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ course_id: courseId, lesson_id: lesson.id, quiz_score: score }),
    }).catch(() => null)
    if (res?.ok) {
      const data = await res.json().catch(() => ({}))
      if (data.xp_earned) setXpNotice(data.xp_earned)
    }
  }

  return (
    <div
      style={{
        background:   'var(--bg2)',
        border:       '1px solid var(--border)',
        borderTop:    `2px solid ${courseColor}`,
        padding:      '28px 32px',
        marginTop:    40,
      }}
    >
      <div
        style={{
          fontSize:      '0.62rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         'var(--text3)',
          marginBottom:  16,
        }}
      >
        Quiz
      </div>

      <p
        style={{
          fontFamily:   'var(--font-body)',
          fontSize:     '0.95rem',
          color:        'var(--text)',
          fontWeight:   500,
          lineHeight:   1.6,
          marginBottom: 20,
        }}
      >
        {lesson.quiz.question}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {lesson.quiz.options.map(option => {
          const isSelected = selected === option
          const isCorrect  = option === lesson.quiz.answer
          let borderColor  = 'var(--border)'
          let bg           = 'var(--bg3)'
          let textColor    = 'var(--text2)'

          if (submitted) {
            if (isCorrect)              { borderColor = 'var(--success)'; bg = 'var(--success-dim)'; textColor = 'var(--text)' }
            else if (isSelected)        { borderColor = 'var(--danger)';  bg = 'var(--danger-dim)';  textColor = 'var(--text)' }
          } else if (isSelected) {
            borderColor = `${courseColor}80`; bg = `${courseColor}12`; textColor = 'var(--text)'
          }

          return (
            <button
              key={option}
              onClick={() => { if (!submitted) setSelected(option) }}
              disabled={submitted}
              style={{
                display:    'flex',
                alignItems: 'center',
                gap:        12,
                padding:    '12px 16px',
                border:     `1px solid ${borderColor}`,
                background: bg,
                color:      textColor,
                cursor:     submitted ? 'default' : 'pointer',
                textAlign:  'left',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-body)',
                fontSize:   '0.85rem',
                lineHeight: 1.4,
                borderRadius: 2,
              }}
            >
              <span
                style={{
                  width:          18,
                  height:         18,
                  border:         `1px solid ${isSelected ? courseColor : 'var(--border)'}`,
                  borderRadius:   '50%',
                  flexShrink:     0,
                  background:     isSelected ? `${courseColor}30` : 'transparent',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontSize:       '0.65rem',
                  color:          courseColor,
                }}
              >
                {submitted && isCorrect ? '✓' : submitted && isSelected && !isCorrect ? '✕' : ''}
              </span>
              {option}
            </button>
          )
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleCheck}
          disabled={!selected}
          className="btn-primary"
          style={{ marginTop: 20, opacity: selected ? 1 : 0.4 }}
        >
          Check Answer
        </button>
      ) : (
        <div
          style={{
            marginTop:    20,
            padding:      '16px 20px',
            background:   correct ? 'var(--success-dim)' : 'var(--danger-dim)',
            border:       `1px solid ${correct ? 'var(--success)' : 'var(--danger)'}`,
            borderRadius: 2,
          }}
        >
          <p
            style={{
              fontSize:     '0.72rem',
              fontWeight:   700,
              color:        correct ? 'var(--success)' : 'var(--danger)',
              textTransform:'uppercase',
              letterSpacing:'0.1em',
              marginBottom: 8,
            }}
          >
            {correct ? '✓ Correct' : '✕ Incorrect'}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7 }}>
            {lesson.quiz.explanation}
          </p>
          {xpNotice && (
            <div style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600 }}>
              +{xpNotice} XP earned
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────────── */
export default function LessonPage({ params }: Props) {
  const course = courses.find(c => c.id === params.courseId)
  if (!course) notFound()

  const lessonIndex = course.lessons.findIndex(l => l.id === params.lessonId)
  if (lessonIndex === -1) notFound()

  const lesson   = course.lessons[lessonIndex]
  const prevLesson = course.lessons[lessonIndex - 1] ?? null
  const nextLesson = course.lessons[lessonIndex + 1] ?? null

  return (
    <div
      style={{
        display:             'grid',
        gridTemplateColumns: '280px 1fr',
        minHeight:           'calc(100vh - 64px)',
        maxWidth:            1400,
        margin:              '0 auto',
      }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        style={{
          borderRight:  '1px solid var(--border)',
          background:   'var(--bg2)',
          padding:      '32px 0',
          position:     'sticky',
          top:          64,
          height:       'calc(100vh - 64px)',
          overflowY:    'auto',
        }}
      >
        {/* Course title */}
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--border)' }}>
          <Link href={`/courses/${course.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
              Course
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text)' }}>
              {course.title}
            </div>
          </Link>
        </div>

        {/* Lesson list */}
        <nav style={{ padding: '12px 0' }}>
          {course.lessons.map((l, i) => {
            const isActive = l.id === lesson.id
            return (
              <Link
                key={l.id}
                href={`/courses/${course.id}/lessons/${l.id}`}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          10,
                  padding:      '10px 20px',
                  textDecoration:'none',
                  background:   isActive ? `${course.color}12` : 'transparent',
                  borderLeft:   isActive ? `3px solid ${course.color}` : '3px solid transparent',
                  transition:   'background 0.15s ease',
                }}
              >
                <span
                  style={{
                    width:          22,
                    height:         22,
                    borderRadius:   '50%',
                    border:         `1px solid ${isActive ? course.color + '60' : 'var(--border)'}`,
                    background:     isActive ? `${course.color}20` : 'var(--bg3)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontSize:       '0.6rem',
                    color:          isActive ? course.color : 'var(--text3)',
                    flexShrink:     0,
                    fontWeight:     700,
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize:    '0.78rem',
                      color:       isActive ? 'var(--text)' : 'var(--text2)',
                      fontWeight:  isActive ? 500 : 400,
                      lineHeight:  1.3,
                      overflow:    'hidden',
                      textOverflow:'ellipsis',
                      whiteSpace:  'nowrap',
                    }}
                  >
                    {l.title}
                  </div>
                  {l.free && (
                    <Badge variant="free" size="xs">Free</Badge>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <main style={{ padding: 'clamp(32px, 4vw, 56px) clamp(20px, 5vw, 64px)', maxWidth: 760 }}>
        {/* Lesson header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <Badge variant={colourToVariant(course.color)}>Lesson {lessonIndex + 1}</Badge>
            <Badge variant="muted">{lesson.duration} min</Badge>
            <Badge variant="muted">{lesson.type}</Badge>
            {lesson.free && <Badge variant="free">Free</Badge>}
          </div>

          <h1
            style={{
              fontFamily:   'var(--font-heading)',
              fontSize:     'clamp(1.5rem, 3.5vw, 2.5rem)',
              color:        'var(--text)',
              fontWeight:   600,
              lineHeight:   1.2,
              marginBottom: 10,
            }}
          >
            {lesson.title}
          </h1>

          <div lang="ar" dir="rtl" style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.2rem', color: 'var(--text3)' }}>
            {lesson.arabic}
          </div>
        </div>

        {/* Intro paragraph */}
        <p
          style={{
            fontSize:     '1rem',
            color:        'var(--text2)',
            lineHeight:   1.85,
            marginBottom: 36,
            paddingBottom: 36,
            borderBottom: '1px solid var(--border)',
          }}
        >
          {lesson.intro}
        </p>

        {/* Key points */}
        <div style={{ marginBottom: 8 }}>
          <div
            style={{
              fontSize:      '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         'var(--text3)',
              marginBottom:  20,
            }}
          >
            Key Points
          </div>

          <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {lesson.keyPoints.map((point, i) => (
              <li
                key={i}
                style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    width:          28,
                    height:         28,
                    borderRadius:   '50%',
                    border:         `1px solid ${course.color}50`,
                    background:     `${course.color}10`,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontSize:       '0.68rem',
                    fontWeight:     700,
                    color:          course.color,
                    flexShrink:     0,
                    fontFamily:     'var(--font-brand)',
                    marginTop:      2,
                  }}
                >
                  {i + 1}
                </span>
                <p style={{ fontSize: '0.92rem', color: 'var(--text2)', lineHeight: 1.8, margin: 0 }}>
                  {point}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Quiz */}
        <QuizBlock lesson={lesson} courseId={course.id} courseColor={course.color} />

        {/* Prev / Next navigation */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            gap:            16,
            marginTop:      48,
            paddingTop:     32,
            borderTop:      '1px solid var(--border)',
            flexWrap:       'wrap',
          }}
        >
          {prevLesson ? (
            <Link
              href={`/courses/${course.id}/lessons/${prevLesson.id}`}
              className="btn-ghost"
              style={{ fontSize: '0.75rem' }}
            >
              ← {prevLesson.title}
            </Link>
          ) : (
            <Link href={`/courses/${course.id}`} className="btn-ghost" style={{ fontSize: '0.75rem' }}>
              ← Course overview
            </Link>
          )}

          {nextLesson ? (
            <Link
              href={`/courses/${course.id}/lessons/${nextLesson.id}`}
              className="btn-primary"
              style={{ fontSize: '0.75rem' }}
            >
              {nextLesson.title} →
            </Link>
          ) : (
            <Link href="/consultation" className="btn-primary" style={{ fontSize: '0.75rem' }}>
              Enrol for full access →
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
