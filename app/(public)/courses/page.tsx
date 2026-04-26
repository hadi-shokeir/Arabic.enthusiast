import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal         from '@/components/ui/Reveal'
import Badge, { colourToVariant } from '@/components/ui/Badge'
import { courses }    from '@/data/courses'

export const metadata: Metadata = {
  title: 'Arabic Courses — Arabic Enthusiast',
  description: 'Three structured courses: Arabic Foundations, Levantine Dialect, and Quranic Arabic. Beginner-friendly with interactive tools.',
}

/* ─────────────────────────────────────────────────────────────────────────────
   Courses — /courses
   Lists all three courses with their lesson previews and free lesson markers.
───────────────────────────────────────────────────────────────────────────── */

export default function CoursesPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 48px',
          borderBottom: '1px solid var(--border)',
          textAlign:  'center',
        }}
      >
        <SectionHeading
          eyebrow={{ en: 'Curriculum', ar: 'المنهج الدراسي' }}
          heading="Three paths to Arabic"
          sub="Classical foundations, Levantine conversation, and Quranic understanding — each built from the ground up with a clear methodology."
          center
        />
      </section>

      {/* ── Course cards ─────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)' }}>
        <div
          style={{
            maxWidth:      1400,
            margin:        '0 auto',
            display:       'flex',
            flexDirection: 'column',
            gap:           40,
          }}
        >
          {courses.map((course, ci) => (
            <Reveal key={course.id} delay={ci * 60}>
              <div
                className="card"
                style={{
                  position:    'relative',
                  overflow:    'hidden',
                  padding:     0,
                }}
              >
                {/* Colour stripe */}
                <div
                  style={{
                    position:   'absolute',
                    top:        0,
                    left:       0,
                    bottom:     0,
                    width:      3,
                    background: course.color,
                  }}
                />

                <div
                  style={{
                    padding:             'clamp(28px, 4vw, 48px)',
                    paddingLeft:         'calc(clamp(28px, 4vw, 48px) + 3px)',
                    display:             'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap:                 40,
                  }}
                >
                  {/* Course info */}
                  <div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
                      <Badge variant={colourToVariant(course.color)}>{course.level}</Badge>
                      <Badge variant="muted">{course.type}</Badge>
                    </div>

                    <h2
                      style={{
                        fontFamily:   'var(--font-heading)',
                        fontSize:     'clamp(1.4rem, 3vw, 2rem)',
                        color:        'var(--text)',
                        marginBottom: 6,
                        lineHeight:   1.2,
                      }}
                    >
                      {course.title}
                    </h2>

                    <div
                      lang="ar"
                      dir="rtl"
                      style={{
                        fontFamily:   'var(--font-arabic)',
                        fontSize:     '1.4rem',
                        color:        'var(--text3)',
                        marginBottom: 16,
                      }}
                    >
                      {course.arabic}
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>
                      {course.desc}
                    </p>

                    {/* Topics */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                      {course.topics.map(t => (
                        <span
                          key={t}
                          style={{
                            fontSize:      '0.65rem',
                            color:         'var(--text3)',
                            border:        '1px solid var(--border)',
                            padding:       '4px 11px',
                            borderRadius:  2,
                            letterSpacing: '0.03em',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/courses/${course.id}`}
                      className="btn-primary"
                      style={{ display: 'inline-flex' }}
                    >
                      View Course →
                    </Link>
                  </div>

                  {/* Lesson list preview */}
                  <div>
                    <div
                      style={{
                        fontSize:      '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color:         'var(--text3)',
                        marginBottom:  16,
                      }}
                    >
                      {course.lessons.length} Lessons
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {course.lessons.map((lesson, li) => (
                        <div
                          key={lesson.id}
                          style={{
                            display:    'flex',
                            alignItems: 'center',
                            gap:        12,
                            padding:    '10px 0',
                            borderBottom: li < course.lessons.length - 1 ? '1px solid var(--border)' : 'none',
                          }}
                        >
                          {/* Number */}
                          <span
                            style={{
                              width:          22,
                              height:         22,
                              borderRadius:   '50%',
                              border:         `1px solid ${lesson.free ? course.color + '60' : 'var(--border)'}`,
                              background:     lesson.free ? course.color + '15' : 'transparent',
                              display:        'flex',
                              alignItems:     'center',
                              justifyContent: 'center',
                              fontSize:       '0.62rem',
                              color:          lesson.free ? course.color : 'var(--text3)',
                              flexShrink:     0,
                              fontFamily:     'var(--font-body)',
                              fontWeight:     600,
                            }}
                          >
                            {li + 1}
                          </span>

                          {/* Title */}
                          <span style={{ flex: 1, fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.3 }}>
                            {lesson.title}
                          </span>

                          {/* Duration + free badge */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text3)' }}>
                              {lesson.duration}m
                            </span>
                            {lesson.free && <Badge variant="free" size="xs">Free</Badge>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)',
          borderTop:  '1px solid var(--border)',
          textAlign:  'center',
          background: 'var(--bg2)',
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily:   'var(--font-heading)',
              fontSize:     'clamp(1.4rem, 3vw, 2rem)',
              color:        'var(--text)',
              marginBottom: 16,
            }}
          >
            Not sure where to start?
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Book a free 30-minute consultation and we will choose the right course and pace together.
          </p>
          <Link href="/consultation" className="btn-primary">
            Book a Free Consultation
          </Link>
        </Reveal>
      </section>
    </>
  )
}
