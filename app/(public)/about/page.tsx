import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal         from '@/components/ui/Reveal'
import Badge          from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'About Hadi Shokeir — Arabic Enthusiast',
  description: 'Linguist, translator, and Arabic instructor with seven years of teaching experience across Classical, Levantine, and Quranic Arabic.',
}

/* ─────────────────────────────────────────────────────────────────────────────
   About — /about
───────────────────────────────────────────────────────────────────────────── */

const SPECIALISATIONS = [
  { badge: 'gold',  en: 'Classical Arabic',  ar: 'العربية الفصحى'   },
  { badge: 'green', en: 'Quranic Arabic',    ar: 'العربية القرآنية'  },
  { badge: 'teal',  en: 'Levantine Dialect', ar: 'العامية الشامية'   },
  { badge: 'muted', en: 'Linguistics',       ar: 'اللغويات'          },
  { badge: 'muted', en: 'Translation',       ar: 'الترجمة'           },
  { badge: 'muted', en: 'Islamic Studies',   ar: 'الدراسات الإسلامية'},
] as const

const CREDENTIALS = [
  { stat: '7+',  label: 'Years teaching' },
  { stat: '3',   label: 'Specialisations' },
  { stat: '1:1', label: 'Private lessons' },
]

const FAQ = [
  {
    q: 'Do you teach complete beginners?',
    a: 'Yes — most students start with zero Arabic. The Foundations course begins with the very first letter and builds systematically from there.',
  },
  {
    q: 'How long are the lessons?',
    a: 'Standard lessons are 50 minutes. Trial lessons are 30 minutes. All sessions are private and one-to-one, so the pace is entirely yours.',
  },
  {
    q: 'What dialect do you teach?',
    a: 'I teach Lebanese/Levantine Arabic for conversation, and Classical/Quranic Arabic for reading and understanding the Quran. Both tracks are available.',
  },
  {
    q: 'Do I need to learn the script first?',
    a: 'For Classical and Quranic tracks, yes — the script is part of the foundation. For Levantine conversation, we can start speaking from day one and introduce the script gradually.',
  },
  {
    q: 'Are lessons live or pre-recorded?',
    a: 'All lessons are live, private, and conducted via video call. The course materials and exercises on this platform supplement the live teaching.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap:                 80,
              alignItems:          'center',
            }}
          >
            {/* Left — bio */}
            <div>
              <SectionHeading
                eyebrow={{ en: 'About', ar: 'عني' }}
                heading="Hadi Shokeir"
                style={{ marginBottom: 24 }}
              />

              {/* Specialisation badges */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                {SPECIALISATIONS.map(s => (
                  <Badge key={s.en} variant={s.badge as 'gold' | 'green' | 'teal' | 'muted'}>
                    {s.en}
                  </Badge>
                ))}
              </div>

              {/* Bio paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid var(--border)', paddingTop: 32 }}>
                <p style={{ color: 'var(--text2)', fontSize: '1rem', lineHeight: 1.85 }}>
                  Hadi Shokeir is a{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 500 }}>
                    linguist, translator, and Arabic language instructor
                  </strong>{' '}
                  with over seven years of teaching experience. His background spans
                  Classical Arabic, Levantine dialect, and Quranic studies — three disciplines
                  that require distinct methodologies and a teacher capable of moving fluently
                  between them.
                </p>

                <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.85 }}>
                  Trained in both modern applied linguistics and classical Islamic scholarship,
                  Hadi approaches language teaching with rigour and patience. He has taught
                  students ranging from complete beginners to heritage speakers, academics,
                  and seminary students — adapting his method to each learner&apos;s goals,
                  pace, and background.
                </p>

                <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.85 }}>
                  As a student of Islamic studies, Hadi&apos;s relationship with Arabic goes beyond
                  the academic. For him, the language is a living bridge to a rich intellectual
                  and spiritual tradition — and he brings that sense of meaning to every lesson.
                  Students consistently describe his teaching as structured, clear, and deeply
                  motivating.
                </p>

                {/* Credential row */}
                <div style={{ display: 'flex', gap: 32, marginTop: 8, flexWrap: 'wrap' }}>
                  {CREDENTIALS.map(({ stat, label }) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span
                        style={{
                          fontFamily:  'var(--font-brand)',
                          fontSize:    '2rem',
                          fontWeight:  700,
                          color:       'var(--gold)',
                          lineHeight:  1,
                        }}
                      >
                        {stat}
                      </span>
                      <span
                        style={{
                          fontSize:      '0.72rem',
                          color:         'var(--text3)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — photo frame placeholder + Arabic calligraphy */}
            <div
              style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            32,
              }}
            >
              {/* Photo frame */}
              <div
                style={{
                  position:   'relative',
                  width:      320,
                  height:     380,
                  border:     '1px solid var(--border)',
                  background: 'var(--bg3)',
                  display:    'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Corner accents */}
                {[
                  { top: -4, left: -4 },
                  { top: -4, right: -4 },
                  { bottom: -4, left: -4 },
                  { bottom: -4, right: -4 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    aria-hidden
                    style={{
                      position:    'absolute',
                      width:       16,
                      height:      16,
                      border:      '2px solid var(--gold)',
                      borderRadius: 0,
                      ...pos,
                    }}
                  />
                ))}

                {/* Placeholder text until a real photo is provided */}
                <div style={{ textAlign: 'center' }}>
                  <div
                    lang="ar"
                    style={{
                      fontFamily: 'var(--font-arabic)',
                      fontSize:   '3rem',
                      color:      'var(--gold)',
                      opacity:    0.5,
                    }}
                  >
                    ح
                  </div>
                  <p
                    style={{
                      fontSize:  '0.72rem',
                      color:     'var(--text3)',
                      marginTop: 8,
                    }}
                  >
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* Arabic name */}
              <div style={{ textAlign: 'center' }}>
                <div
                  lang="ar"
                  dir="rtl"
                  style={{
                    fontFamily: 'var(--font-arabic)',
                    fontSize:   '1.8rem',
                    color:      'var(--gold)',
                    lineHeight: 1.4,
                  }}
                >
                  هادي شقير
                </div>
                <div
                  style={{
                    fontSize:      '0.68rem',
                    color:         'var(--text3)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginTop:     6,
                  }}
                >
                  Linguist · Translator · Teacher
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Teaching philosophy ───────────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
          background: 'var(--bg2)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <SectionHeading
              eyebrow={{ en: 'Teaching Philosophy', ar: 'فلسفة التدريس' }}
              heading="Language as a living tradition"
              sub="Arabic is not just a subject — it is a key to 1,400 years of knowledge, law, literature, and revelation. That is how I teach it."
              style={{ marginBottom: 48 }}
            />
          </Reveal>

          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap:                 24,
            }}
          >
            {[
              {
                title: 'Structure before speed',
                body:  'Correct foundations take time to build. I would rather you understand ten words deeply than memorise a hundred you will forget.',
              },
              {
                title: 'Grammar with purpose',
                body:  'Every grammatical rule exists for a reason. I explain the why, not just the rule — so you can infer, not only recall.',
              },
              {
                title: 'Authentic materials',
                body:  'Quranic verses, classical texts, Lebanese conversation. Real Arabic from the first lesson — not invented textbook sentences.',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div
                  className="card"
                  style={{ padding: '28px 24px' }}
                >
                  <div
                    style={{
                      width:        28,
                      height:       2,
                      background:   'var(--gold)',
                      marginBottom: 16,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily:   'var(--font-heading)',
                      fontSize:     '1rem',
                      color:        'var(--text)',
                      marginBottom: 10,
                      lineHeight:   1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7 }}>
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Reveal>
            <SectionHeading
              eyebrow={{ en: 'Common Questions', ar: 'أسئلة شائعة' }}
              heading="What students ask"
              style={{ marginBottom: 48 }}
            />
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  style={{
                    borderTop:  '1px solid var(--border)',
                    padding:    '24px 0',
                  }}
                >
                  <h3
                    style={{
                      fontFamily:   'var(--font-body)',
                      fontSize:     '0.92rem',
                      fontWeight:   600,
                      color:        'var(--text)',
                      marginBottom: 10,
                      letterSpacing:'0.01em',
                    }}
                  >
                    {item.q}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.75 }}>
                    {item.a}
                  </p>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
          background: 'var(--bg2)',
          textAlign:  'center',
          borderTop:  '1px solid var(--border)',
        }}
      >
        <Reveal>
          <p
            style={{
              fontFamily:  'var(--font-arabic)',
              fontSize:    '2.5rem',
              color:       'var(--gold)',
              marginBottom: 8,
            }}
            lang="ar"
          >
            أهلاً وسهلاً
          </p>
          <h2
            style={{
              fontFamily:   'var(--font-heading)',
              fontSize:     'clamp(1.6rem, 3vw, 2.4rem)',
              color:        'var(--text)',
              marginBottom: 16,
            }}
          >
            Ready to start?
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            Book a free 30-minute consultation and we will find the right starting point for your goals.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/consultation" className="btn-primary">
              Book a Free Consultation
            </Link>
            <Link href="/pricing" className="btn-ghost">
              View Pricing
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
