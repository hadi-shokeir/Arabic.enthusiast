import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────────
   Practice Hub — /portal/practice
   Launchpad for all practice tools.
───────────────────────────────────────────────────────────────────────────── */

const TOOLS = [
  {
    href:    '/portal/flashcards',
    icon:    '🃏',
    label:   'Flashcards',
    ar:      'بطاقات',
    sub:     'Spaced repetition — review vocabulary at the right time.',
    badge:   'SRS',
    ready:   true,
  },
  {
    href:    '/portal/practice/cloze',
    icon:    '✍️',
    label:   'Cloze Fill-in',
    ar:      'ملء الفراغ',
    sub:     'Complete sentences with the missing Arabic word.',
    badge:   'New',
    ready:   true,
  },
  {
    href:    '/portal/practice/sentence-builder',
    icon:    '🧩',
    label:   'Sentence Builder',
    ar:      'بناء الجملة',
    sub:     'Tap words to build the correct Arabic word order.',
    badge:   'New',
    ready:   true,
  },
  {
    href:    '/portal/practice/root-hunt',
    icon:    '🌿',
    label:   'Root Hunt',
    ar:      'صيد الجذور',
    sub:     'Identify the trilateral root hidden inside each word.',
    badge:   'New',
    ready:   true,
  },
  {
    href:    '/portal/practice/harakat',
    icon:    '◌ّ',
    label:   'Harakat Dash',
    ar:      'الحركات',
    sub:     'Race to add the correct vowel marks before time runs out.',
    badge:   'Soon',
    ready:   false,
  },
]

export default function PracticeHubPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <h1
        style={{
          fontFamily:   'var(--font-heading)',
          fontSize:     'clamp(1.4rem, 2.5vw, 1.9rem)',
          color:        'var(--text)',
          marginBottom: 8,
        }}
      >
        Practice Hub
      </h1>
      <p style={{ color: 'var(--text3)', fontSize: '0.85rem', marginBottom: 36, lineHeight: 1.7 }}>
        Five different ways to practise — each targets a different skill.
        Start with Flashcards if you are not sure where to begin.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {TOOLS.map(tool => (
          <div
            key={tool.href}
            style={{
              background:   'var(--card)',
              border:       '1px solid var(--border)',
              borderRadius: 3,
              opacity:      tool.ready ? 1 : 0.6,
            }}
          >
            {tool.ready ? (
              <Link href={tool.href} style={{ textDecoration: 'none', display: 'block' }}>
                <ToolRow tool={tool} />
              </Link>
            ) : (
              <ToolRow tool={tool} />
            )}
          </div>
        ))}
      </div>

      {/* Tip */}
      <div
        style={{
          marginTop:    32,
          padding:      '16px 20px',
          background:   'var(--bg2)',
          border:       '1px solid var(--border)',
          borderLeft:   '3px solid var(--gold)',
          borderRadius: 3,
          fontSize:     '0.82rem',
          color:        'var(--text3)',
          lineHeight:   1.7,
        }}
      >
        <strong style={{ color: 'var(--text2)' }}>Tip:</strong> Flashcards use the SM-2 spaced repetition algorithm —
        the same method used by professional language learners. Reviewing daily for 10 minutes beats
        a 2-hour cramming session every time.
      </div>
    </div>
  )
}

function ToolRow({ tool }: { tool: typeof TOOLS[0] }) {
  return (
    <div
      style={{
        display:     'flex',
        alignItems:  'center',
        gap:         20,
        padding:     '20px 24px',
      }}
    >
      <div
        style={{
          width:          52,
          height:         52,
          borderRadius:   '50%',
          border:         '1px solid var(--border)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '1.4rem',
          flexShrink:     0,
        }}
      >
        {tool.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text)' }}>
            {tool.label}
          </span>
          <span lang="ar" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.82rem', color: 'var(--text3)' }}>
            {tool.ar}
          </span>
          <span
            style={{
              fontSize:      '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         (tool.badge === 'SRS' || tool.badge === 'New') ? 'var(--gold)' : 'var(--text3)',
              border:        `1px solid ${(tool.badge === 'SRS' || tool.badge === 'New') ? 'var(--gold-border)' : 'var(--border)'}`,
              padding:       '2px 6px',
              borderRadius:  2,
            }}
          >
            {tool.badge}
          </span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text3)', margin: 0, lineHeight: 1.5 }}>
          {tool.sub}
        </p>
      </div>

      {tool.ready && (
        <div style={{ color: 'var(--text3)', fontSize: '1rem', flexShrink: 0 }}>→</div>
      )}
    </div>
  )
}
