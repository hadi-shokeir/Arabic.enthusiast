import type { Metadata } from 'next'
import { notFound }    from 'next/navigation'
import Link            from 'next/link'
import Badge, { colourToVariant } from '@/components/ui/Badge'
import Reveal          from '@/components/ui/Reveal'
import { courses }     from '@/data/courses'
import type { CourseId } from '@/types'

/* ─────────────────────────────────────────────────────────────────────────────
   Course Detail — /courses/[courseId]
   Shows the full course description and all lessons.
───────────────────────────────────────────────────────────────────────────── */

interface Props {
  params: { courseId: CourseId }
}

export async function generateStaticParams() {
  return courses.map(c => ({ courseId: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = courses.find(c => c.id === params.courseId)
  if (!course) return { title: 'Course not found' }
  return {
    title:       `${course.title} — Arabic Enthusiast`,
    description: course.desc,
  }
}

export default function CourseDetailPage({ params }: Props) {
  const course = courses.find(c => c.id === params.courseId)
  if (!course) notFound()

  const freeLessons = course.lessons.filter(l => l.free).length

  return (
    <>
      <style>{`.lesson-row:hover { background: var(--bg2) !important; }`}</style>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:      'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)',
          borderBottom: '1px solid var(--border)',
          position:     'relative',
          overflow:     'hidden',
        }}
      >
        {/* Top colour stripe */}
        <div
          style={{
            position:   'absolute',
            top:        0,
            left:       0,
            right:      0,
            height:     3,
            background: course.color,
          }}
        />

        {/* Decorative Arabic title background */}
        <div
          aria-hidden
          lang="ar"
          style={{
            position:     'absolute',
            right:        '3%',
            top:          '50%',
            transform:    'translateY(-50%)',
            fontFamily:   'var(--font-arabic)',
            fontSize:     'clamp(5rem, 12vw, 10rem)',
            color:        `${course.color}10`,
            lineHeight:   1,
            pointerEvents:'none',
            userSelect:   'none',
          }}
        >
          {course.arabic}
        </div>

        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24 }}>
            <Link
              href="/courses"
              style={{ fontSize: '0.78rem', color: 'var(--text3)', textDecoration: 'none' }}
            >
              Courses
            </Link>
            <span style={{ color: 'var(--text3)', fontSize: '0.78rem' }}>›</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>{course.title}</span>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <Badge variant={colourToVariant(course.color)}>{course.level}</Badge>
            <Badge variant="muted">{course.type}</Badge>
            <Badge variant="muted">{course.lessons.length} lessons</Badge>
            {freeLessons > 0 && (
              <Badge variant="free">{freeLessons} free</Badge>
            )}
          </div>

          <h1
            style={{
              fontFamily:    'var(--font-heading)',
              fontSize:      'clamp(2rem, 4vw, 3.5rem)',
              color:         'var(--text)',
              fontWeight:    600,
              lineHeight:    1.15,
              marginBottom:  12,
            }}
          >
            {course.title}
          </h1>

          <div
            lang="ar"
            dir="rtl"
            style={{
              fontFamily:   'var(--font-arabic)',
              fontSize:     '1.6rem',
              color:        `${course.color}cc`,
              marginBottom: 20,
            }}
          >
            {course.arabic}
          </div>

          <p
            style={{
              fontSize:   '1rem',
              color:      'var(--text2)',
              lineHeight: 1.75,
              maxWidth:   640,
              marginBottom: 32,
            }}
          >
            {course.desc}
          </p>

          {/* Topics */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {course.topics.map(t => (
              <span
                key={t}
                style={{
                  fontSize:      '0.68rem',
                  color:         'var(--text2)',
                  border:        `1px solid ${course.color}40`,
                  padding:       '5px 12px',
                  borderRadius:  2,
                  letterSpacing: '0.03em',
                  background:    `${course.color}08`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lessons list ─────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(20px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div
            style={{
              fontSize:      '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         'var(--text3)',
              marginBottom:  24,
            }}
          >
            Course Content
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {course.lessons.map((lesson, li) => (
              <Reveal key={lesson.id} delay={li * 50}>
                <Link
                  href={`/courses/${course.id}/lessons/${lesson.id}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    className="lesson-row"
                    style={{
                      display:     'flex',
                      alignItems:  'center',
                      gap:         16,
                      padding:     '18px 20px',
                      borderBottom:'1px solid var(--border)',
                      borderRadius: 0,
                      transition:  'background 0.2s ease',
                      cursor:      'pointer',
                    }}
                  >
                    {/* Lesson number circle */}
                    <div
                      style={{
                        width:          36,
                        height:         36,
                        borderRadius:   '50%',
                        border:         `1px solid ${lesson.free ? course.color + '50' : 'var(--border)'}`,
                        background:     lesson.free ? `${course.color}12` : 'var(--bg3)',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        fontSize:       '0.72rem',
                        fontWeight:     700,
                        color:          lesson.free ? course.color : 'var(--text3)',
                        flexShrink:     0,
                        fontFamily:     'var(--font-brand)',
                      }}
                    >
                      {li + 1}
                    </div>

                    {/* Lesson info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500, marginBottom: 3 }}>
                        {lesson.title}
                      </div>
                      <div lang="ar" dir="rtl" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.82rem', color: 'var(--text3)' }}>
                        {lesson.arabic}
                      </div>
                    </div>

                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>
                        {lesson.duration} min
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.05em' }}>
                        {lesson.type}
                      </span>
                      {lesson.free
                        ? <Badge variant="free" size="xs">Free</Badge>
                        : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>🔒</span>
                        )
                      }
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enrol CTA ────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(48px, 6vw, 72px) clamp(20px, 6vw, 80px)',
          textAlign:  'center',
          background: 'var(--bg2)',
          borderTop:  '1px solid var(--border)',
        }}
      >
        <Reveal>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--text)', marginBottom: 16 }}>
            Ready to enrol in {course.title}?
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
            Book a free consultation to discuss your goals and get started this week.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/consultation" className="btn-primary">Book a Free Consultation</Link>
            <Link href="/courses" className="btn-ghost">All Courses</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
