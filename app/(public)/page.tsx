import Link from 'next/link'
import HeroSection    from '@/components/home/HeroSection'
import AlphabetTeaser from '@/components/home/AlphabetTeaser'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal         from '@/components/ui/Reveal'
import Badge, { colourToVariant } from '@/components/ui/Badge'
import { courses }    from '@/data/courses'

/* ─────────────────────────────────────────────────────────────────────────────
   Home — /
   Server component. Interactive sections (hero animation, alphabet hover)
   are extracted into client components.
───────────────────────────────────────────────────────────────────────────── */

/* ── Features data ─────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon:  '٢٨',
    label: '28 Letters',
    title: 'Master the Script',
    desc:  'All 28 Arabic letters with their four positional forms — isolated, initial, medial, and final. Interactive explorer included.',
  },
  {
    icon:  '◎',
    label: 'Authentic Sounds',
    title: 'Pronunciation First',
    desc:  'Audio for every letter, word, and phrase. Learn the sounds that don\'t exist in English — ʿAin, Ḥa, Ghain, and Qaf.',
  },
  {
    icon:  '⟳',
    label: 'Spaced Repetition',
    title: 'Vocabulary That Sticks',
    desc:  'The SM-2 flashcard algorithm reviews words at the optimal moment so you build long-term memory, not short-term recall.',
  },
  {
    icon:  '◈',
    label: 'Progress Tracking',
    title: 'See Your Growth',
    desc:  'A visual dashboard tracks lessons completed, quiz scores, streaks, and skill levels across reading, writing, and speaking.',
  },
]

/* ── How it works ──────────────────────────────────────────────────────────── */
const STEPS = [
  { num: '01', title: 'Choose your path',       desc: 'Classical foundations, Levantine conversation, or Quranic understanding — pick the track that matches your goal.' },
  { num: '02', title: 'Learn through structure', desc: 'Each lesson combines written explanation, key points, and audio — then a quiz to cement what you\'ve learned.' },
  { num: '03', title: 'Practise every day',      desc: 'Flashcards, sentence builder, and root hunts keep vocabulary fresh through daily, bite-sized practice sessions.' },
  { num: '04', title: 'Track your progress',     desc: 'Your dashboard shows exactly where you are — completed lessons, quiz scores, and which words need more review.' },
]

/* ── Featured courses ──────────────────────────────────────────────────────── */
const featured = courses.filter(c => c.featured)

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Features */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal>
            <SectionHeading
              eyebrow={{ en: 'Why Arabic Enthusiast', ar: 'لماذا متذوق العربية' }}
              heading="Everything you need to learn Arabic properly."
              sub="Structured curriculum, interactive tools, and genuine teaching — no shortcuts."
              style={{ marginBottom: 56 }}
            />
          </Reveal>

          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap:                 2,
            }}
          >
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div
                  className="card"
                  style={{
                    padding:  '36px 28px',
                    cursor:   'default',
                    height:   '100%',
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      fontFamily:  'var(--font-arabic)',
                      fontSize:    '2.2rem',
                      color:       'var(--gold-dim)',
                      marginBottom: 20,
                      lineHeight:  1,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div
                    style={{
                      fontSize:      '0.62rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color:         'var(--text3)',
                      marginBottom:  10,
                    }}
                  >
                    {f.label}
                  </div>
                  <h3
                    style={{
                      fontFamily:   'var(--font-heading)',
                      fontSize:     '1.15rem',
                      color:        'var(--text)',
                      marginBottom: 12,
                      lineHeight:   1.3,
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7 }}>
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Alphabet teaser — client component */}
      <AlphabetTeaser />

      {/* 4. Courses teaser */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal>
            <div
              style={{
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'flex-end',
                marginBottom:   56,
                gap:            20,
                flexWrap:       'wrap',
              }}
            >
              <SectionHeading
                eyebrow={{ en: 'Curriculum', ar: 'المنهج' }}
                heading="Choose your path"
              />
              <Link href="/courses" className="btn-ghost" style={{ whiteSpace: 'nowrap' }}>
                All courses →
              </Link>
            </div>
          </Reveal>

          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap:                 20,
            }}
          >
            {featured.map((course, i) => (
              <Reveal key={course.id} delay={i * 100}>
                <Link
                  href={`/courses/${course.id}`}
                  style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                >
                  <div
                    className="card"
                    style={{
                      padding:  '36px 32px',
                      cursor:   'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      height:   '100%',
                    }}
                  >
                    {/* Colour stripe */}
                    <div
                      style={{
                        position:   'absolute',
                        top:        0,
                        left:       0,
                        right:      0,
                        height:     2,
                        background: course.color,
                        opacity:    0.8,
                      }}
                    />

                    <div
                      style={{
                        display:        'flex',
                        justifyContent: 'space-between',
                        alignItems:     'flex-start',
                        marginBottom:   16,
                      }}
                    >
                      <Badge variant={colourToVariant(course.color)}>{course.level}</Badge>
                      <span
                        style={{
                          fontSize:      '0.65rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color:         'var(--text3)',
                        }}
                      >
                        {course.type}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily:   'var(--font-heading)',
                        fontSize:     '1.3rem',
                        color:        'var(--text)',
                        marginBottom: 8,
                        lineHeight:   1.3,
                      }}
                    >
                      {course.title}
                    </h3>
                    <div
                      lang="ar"
                      dir="rtl"
                      style={{
                        fontFamily:   'var(--font-arabic)',
                        fontSize:     '1.5rem',
                        color:        'var(--text3)',
                        textAlign:    'right',
                        marginBottom: 14,
                        textShadow:   '0 0 20px rgba(201,146,42,0.15)',
                      }}
                    >
                      {course.arabic}
                    </div>
                    <p
                      style={{
                        fontSize:     '0.85rem',
                        color:        'var(--text2)',
                        lineHeight:   1.65,
                        marginBottom: 24,
                      }}
                    >
                      {course.desc}
                    </p>

                    {/* Topic pills */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {course.topics.slice(0, 2).map(t => (
                        <span
                          key={t}
                          style={{
                            fontSize:      '0.65rem',
                            color:         'var(--text3)',
                            border:        '1px solid var(--border)',
                            padding:       '3px 10px',
                            letterSpacing: '0.04em',
                            borderRadius:  2,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How it works */}
      <section
        style={{
          padding:     'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
          background:  'var(--bg2)',
          borderTop:   '1px solid var(--border)',
          borderBottom:'1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal>
            <SectionHeading
              eyebrow={{ en: 'The Process', ar: 'الطريقة' }}
              heading="How it works"
              sub="Four steps from zero to confident Arabic reading and speaking."
              center
              style={{ marginBottom: 64 }}
            />
          </Reveal>

          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap:                 40,
            }}
          >
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div style={{ position: 'relative', paddingTop: 8 }}>
                  <div
                    style={{
                      fontFamily:    'var(--font-brand)',
                      fontSize:      '3rem',
                      fontWeight:    700,
                      color:         'var(--gold-dim)',
                      lineHeight:    1,
                      marginBottom:  16,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    style={{
                      fontFamily:   'var(--font-heading)',
                      fontSize:     '1.1rem',
                      color:        'var(--text)',
                      marginBottom: 10,
                      lineHeight:   1.3,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.75 }}>
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Quranic quote */}
      <section
        style={{
          padding:    'clamp(48px, 8vw, 80px) clamp(20px, 6vw, 80px)',
          textAlign:  'center',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Reveal>
          <div
            lang="ar"
            dir="rtl"
            style={{
              fontFamily:  'var(--font-arabic)',
              fontSize:    'clamp(1.8rem, 4vw, 3rem)',
              color:       'var(--text)',
              marginBottom: 16,
              lineHeight:  1.6,
              textShadow:  '0 0 40px rgba(201,146,42,0.2)',
            }}
          >
            وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا
          </div>
          <p
            style={{
              fontFamily:  'var(--font-heading)',
              fontStyle:   'italic',
              fontSize:    '1.1rem',
              color:       'var(--text2)',
              maxWidth:    480,
              margin:      '0 auto 8px',
            }}
          >
            "And He taught Adam the names of all things"
          </p>
          <p
            style={{
              fontSize:      '0.7rem',
              color:         'var(--text3)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Quran 2:31
          </p>
        </Reveal>
      </section>

      {/* 7. Final CTA */}
      <section
        style={{
          padding:   'clamp(80px, 10vw, 120px) clamp(20px, 6vw, 80px)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Reveal>
            <div
              aria-hidden
              lang="ar"
              style={{
                fontFamily:    'var(--font-arabic)',
                fontSize:      '3.5rem',
                color:         'var(--gold-dim)',
                marginBottom:  8,
                textShadow:    '0 0 40px rgba(201,146,42,0.15)',
              }}
            >
              بِسْمِ اللَّهِ
            </div>

            <h2
              style={{
                fontFamily:    'var(--font-heading)',
                fontSize:      'clamp(2rem, 4vw, 3rem)',
                color:         'var(--text)',
                fontWeight:    600,
                lineHeight:    1.2,
                marginBottom:  20,
              }}
            >
              Begin your<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Arabic journey</em> today
            </h2>

            <p
              style={{
                color:        'var(--text2)',
                fontSize:     '0.95rem',
                lineHeight:   1.7,
                marginBottom: 40,
              }}
            >
              Take the first step towards understanding one of the world&apos;s most profound languages.
              Book a free consultation and start learning this week.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/consultation" className="btn-primary" style={{ padding: '16px 44px' }}>
                Book a Free Consultation
              </Link>
              <Link href="/courses" className="btn-ghost">
                Browse Courses
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
