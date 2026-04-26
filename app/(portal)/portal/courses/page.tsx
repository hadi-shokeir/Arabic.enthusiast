import { redirect }     from 'next/navigation'
import Link             from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { courses }      from '@/data/courses'
import type { Profile, UserProgress } from '@/types'

/* ─────────────────────────────────────────────────────────────────────────────
   Portal: My Courses — /portal/courses
───────────────────────────────────────────────────────────────────────────── */

export default async function PortalCoursesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: profile }, { data: progressRows }] = await Promise.all([
    supabase.from('profiles').select('enrolled_courses').eq('id', user.id).single(),
    supabase.from('user_progress').select('*').eq('user_id', user.id),
  ])

  const enrolledIds     = (profile as Pick<Profile, 'enrolled_courses'> | null)?.enrolled_courses ?? []
  const pr              = (progressRows ?? []) as UserProgress[]
  const progressMap     = Object.fromEntries(pr.map(r => [r.course_id, r]))

  const enrolled  = courses.filter(c => enrolledIds.includes(c.id))
  const available = courses.filter(c => !enrolledIds.includes(c.id))

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <h1
        style={{
          fontFamily:   'var(--font-heading)',
          fontSize:     'clamp(1.4rem, 2.5vw, 1.9rem)',
          color:        'var(--text)',
          marginBottom: 8,
        }}
      >
        My Courses
      </h1>
      <p style={{ color: 'var(--text3)', fontSize: '0.85rem', marginBottom: 36 }}>
        Track your progress across all enrolled courses.
      </p>

      {/* ── Enrolled ──────────────────────────────────────────────────────── */}
      {enrolled.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize:     '0.72rem',
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              color:        'var(--text3)',
              marginBottom: 16,
            }}
          >
            Enrolled
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            {enrolled.map((course, i) => {
              const prog       = progressMap[course.id]
              const completed  = prog?.completed_lessons?.length ?? 0
              const total      = course.lessons.length
              const pct        = total > 0 ? Math.round((completed / total) * 100) : 0
              const completedSet = new Set(prog?.completed_lessons ?? [])
              const nextLesson   = course.lessons.find(l => !completedSet.has(l.id))

              return (
                <div
                  key={course.id}
                  style={{
                    padding:     '24px',
                    borderBottom: i < enrolled.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      {/* Color stripe */}
                      <div style={{ width: 3, alignSelf: 'stretch', background: course.color, borderRadius: 2, flexShrink: 0 }} />
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text)', marginBottom: 2 }}>
                          {course.title}
                        </h3>
                        <div lang="ar" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.8rem', color: 'var(--text3)', marginBottom: 6 }}>
                          {course.arabic}
                        </div>
                        <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem', color: 'var(--text3)' }}>
                          <span>{course.level}</span>
                          <span>·</span>
                          <span>{total} lessons</span>
                          {completed > 0 && <><span>·</span><span>{completed} completed</span></>}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text)', lineHeight: 1, marginBottom: 4 }}>
                        {pct}%
                      </div>
                      {nextLesson ? (
                        <Link
                          href={`/courses/${course.id}/lessons/${nextLesson.id}`}
                          className="btn-primary"
                          style={{ display: 'inline-flex', padding: '7px 16px', fontSize: '0.78rem' }}
                        >
                          Continue
                        </Link>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600 }}>Complete</span>
                      )}
                    </div>
                  </div>

                  {/* Lesson list */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {course.lessons.map(lesson => {
                      const done = completedSet.has(lesson.id)
                      return (
                        <Link
                          key={lesson.id}
                          href={`/courses/${course.id}/lessons/${lesson.id}`}
                          title={lesson.title}
                          style={{
                            width:          28,
                            height:         28,
                            borderRadius:   '50%',
                            border:         `1px solid ${done ? course.color : 'var(--border)'}`,
                            background:     done ? `${course.color}25` : 'transparent',
                            display:        'flex',
                            alignItems:     'center',
                            justifyContent: 'center',
                            fontSize:       '0.62rem',
                            color:          done ? course.color : 'var(--text3)',
                            textDecoration: 'none',
                            fontWeight:     done ? 600 : 400,
                          }}
                        >
                          {lesson.id.split('-l')[1]}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Available to enrol ────────────────────────────────────────────── */}
      {available.length > 0 && (
        <div>
          <h2
            style={{
              fontSize:     '0.72rem',
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              color:        'var(--text3)',
              marginBottom: 16,
            }}
          >
            Other courses
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {available.map(course => (
              <div
                key={course.id}
                style={{
                  background:  'var(--card)',
                  border:      '1px solid var(--border)',
                  borderLeft:  `3px solid ${course.color}`,
                  borderRadius: 3,
                  padding:     '20px 24px',
                  display:     'flex',
                  justifyContent:'space-between',
                  alignItems:  'center',
                  gap:         16,
                  flexWrap:    'wrap',
                }}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text)', marginBottom: 4 }}>
                    {course.title}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>
                    {course.level} · {course.lessons.length} lessons
                  </div>
                </div>
                <Link
                  href="/consultation"
                  style={{
                    fontSize:    '0.78rem',
                    color:       'var(--gold)',
                    textDecoration:'none',
                    border:      '1px solid var(--gold-border)',
                    padding:     '6px 14px',
                    borderRadius: 2,
                    flexShrink:  0,
                  }}
                >
                  Request access
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {enrolled.length === 0 && available.length === 0 && (
        <p style={{ color: 'var(--text3)', fontSize: '0.88rem' }}>No courses found.</p>
      )}
    </div>
  )
}
