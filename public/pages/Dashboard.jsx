// ─── Student Dashboard ────────────────────────────────────────────────────────
const { useState, useEffect, useRef } = React;

const DEMO = {
  name: "Sarah",
  level: "Beginner",
  course: "Arabic Foundations",
  streak: 7,
  xp: 340,
  lessonsComplete: 5,
  lessonsTotal: 12,
  nextLesson: { title: "Connecting Letters", date: "Tomorrow", time: "10:00 AM" },
  skills: { Reading: 3, Writing: 2, Listening: 4, Speaking: 2, Vocabulary: 3 },
  recentActivity: [
    { type: "lesson", label: "Short Vowels (Harakat)", time: "2 hours ago", icon: "📖" },
    { type: "quiz", label: "Letter forms quiz — 8/10", time: "Yesterday", icon: "✓" },
    { type: "flashcard", label: "Vocabulary set: Basic words", time: "2 days ago", icon: "🃏" },
  ],
  homework: [
    { title: "Write all 28 letters in their isolated form", due: "Tomorrow", done: false },
    { title: "Listen to the letter pronunciation audio x3", due: "This week", done: true },
    { title: "Identify sun and moon letters in 5 words", due: "This week", done: false },
  ],
};

function SkillBar({ label, value, max = 5 }) {
  const [ref, visible] = useReveal(0.1);
  const pct = (value / max) * 100;
  const colors = { 1: '#b43c3c', 2: '#c9822a', 3: '#c9922a', 4: '#6abf80', 5: '#4a7a5a' };
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.55)', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontSize: '0.72rem', color: '#c9922a' }}>{value}/{max}</span>
      </div>
      <div style={{ height: 6, background: 'rgba(201,146,42,0.1)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 3,
          width: visible ? `${pct}%` : '0%',
          background: colors[value] || '#c9922a',
          transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        background: 'rgba(16,12,8,0.8)', border: '1px solid rgba(201,146,42,0.12)',
        padding: '28px 24px', transition: 'border-color 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,146,42,0.35)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,146,42,0.12)'}
      >
        <div style={{ fontSize: '1.2rem', marginBottom: 8 }}>{icon}</div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#c9922a', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 6 }}>{label}</div>
        {sub && <div style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.25)', marginTop: 3 }}>{sub}</div>}
      </div>
    </Reveal>
  );
}

function FlashcardDeck() {
  const cards = [
    { ar: 'كِتَاب', en: 'Book', trans: 'kitāb' },
    { ar: 'قَلَم', en: 'Pen', trans: 'qalam' },
    { ar: 'بَيْت', en: 'House', trans: 'bayt' },
    { ar: 'مَاء', en: 'Water', trans: 'māʾ' },
    { ar: 'نُور', en: 'Light', trans: 'nūr' },
  ];
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [done, setDone] = useState(false);

  function answer(correct) {
    if (correct) setKnown(k => k + 1);
    if (idx < cards.length - 1) { setIdx(i => i + 1); setFlipped(false); }
    else setDone(true);
  }

  if (done) return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#c9922a', marginBottom: 8 }}>{known}/{cards.length}</div>
      <div style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.88rem', marginBottom: 20 }}>Great work! Keep practising daily.</div>
      <button onClick={() => { setIdx(0); setFlipped(false); setKnown(0); setDone(false); }} style={{ padding: '10px 24px', background: 'transparent', border: '1px solid #c9922a', color: '#c9922a', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Practice Again</button>
    </div>
  );

  const card = cards[idx];
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Card {idx + 1} of {cards.length}</div>
        <div style={{ fontSize: '0.65rem', color: '#c9922a' }}>{known} known</div>
      </div>
      <div onClick={() => setFlipped(f => !f)} style={{
        minHeight: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: flipped ? 'rgba(201,146,42,0.08)' : 'rgba(20,16,10,0.8)',
        border: `1px solid ${flipped ? 'rgba(201,146,42,0.35)' : 'rgba(201,146,42,0.12)'}`,
        cursor: 'pointer', transition: 'all 0.3s', padding: 24, marginBottom: 14,
      }}>
        {!flipped ? (
          <>
            <div style={{ fontFamily: 'Amiri, serif', fontSize: '3.5rem', color: '#f5f0e8', lineHeight: 1 }}>{card.ar}</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.25)', marginTop: 8, letterSpacing: '0.08em' }}>Tap to reveal</div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: 'Amiri, serif', fontSize: '2rem', color: '#c9922a', marginBottom: 6 }}>{card.ar}</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#f5f0e8' }}>{card.en}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)', marginTop: 4 }}>/{card.trans}/</div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button onClick={() => answer(false)} style={{ padding: '12px', background: 'rgba(180,60,60,0.15)', border: '1px solid rgba(180,60,60,0.3)', color: '#e08080', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', transition: 'all 0.2s' }}>✗ Still learning</button>
          <button onClick={() => answer(true)} style={{ padding: '12px', background: 'rgba(74,122,90,0.15)', border: '1px solid rgba(74,122,90,0.3)', color: '#6abf80', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', transition: 'all 0.2s' }}>✓ I know this</button>
        </div>
      )}
    </div>
  );
}

function DashboardPage({ setPage }) {
  const [tab, setTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'homework', label: 'Homework' },
    { id: 'progress', label: 'Progress' },
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Header */}
      <div style={{ padding: '48px 80px 0', borderBottom: '1px solid rgba(201,146,42,0.1)', background: 'rgba(8,6,4,0.6)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9922a', marginBottom: 10 }}>Student Portal</div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: '#f5f0e8', fontWeight: 600 }}>
                مرحباً, <em style={{ fontStyle: 'italic' }}>{DEMO.name}</em>
              </h1>
              <div style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.4)', marginTop: 6 }}>Welcome back — keep up the great work</div>
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Amiri, serif', fontSize: '2rem', color: '#c9922a' }}>{DEMO.streak}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Day Streak 🔥</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Amiri, serif', fontSize: '2rem', color: '#c9922a' }}>{DEMO.xp}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>XP Earned</div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: '12px 24px', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                background: 'transparent', border: 'none', borderBottom: `2px solid ${tab === t.id ? '#c9922a' : 'transparent'}`,
                color: tab === t.id ? '#c9922a' : 'rgba(245,240,232,0.4)', transition: 'all 0.2s',
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '40px 80px', maxWidth: 1400, margin: '0 auto' }}>
        {tab === 'overview' && (
          <div>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
              <StatCard label="Lessons Complete" value={DEMO.lessonsComplete} sub={`of ${DEMO.lessonsTotal}`} icon="📖" delay={0} />
              <StatCard label="Current Course" value={DEMO.lessonsComplete} sub={DEMO.course} icon="🎯" delay={0.06} />
              <StatCard label="Day Streak" value={DEMO.streak} sub="Keep going!" icon="🔥" delay={0.12} />
              <StatCard label="XP Earned" value={DEMO.xp} sub="Level: Beginner" icon="⭐" delay={0.18} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
              {/* Next lesson */}
              <Reveal style={{ gridColumn: '1 / 2' }}>
                <div style={{ background: 'rgba(201,146,42,0.08)', border: '1px solid rgba(201,146,42,0.25)', padding: 28 }}>
                  <div style={{ fontSize: '0.62rem', color: '#c9922a', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>Next Lesson</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: '#f5f0e8', marginBottom: 6 }}>{DEMO.nextLesson.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.4)' }}>{DEMO.nextLesson.date} · {DEMO.nextLesson.time}</div>
                  <button onClick={() => { setPage('lesson'); window.scrollTo(0,0); }} style={{ marginTop: 20, width: '100%', padding: '12px', background: '#c9922a', border: 'none', color: '#0a0805', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}>Go to Lesson →</button>
                </div>
              </Reveal>

              {/* Progress */}
              <Reveal delay={0.08}>
                <div style={{ background: 'rgba(16,12,8,0.8)', border: '1px solid rgba(201,146,42,0.12)', padding: 28 }}>
                  <div style={{ fontSize: '0.62rem', color: '#c9922a', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 20 }}>Course Progress</div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.5)' }}>{DEMO.course}</span>
                      <span style={{ fontSize: '0.8rem', color: '#c9922a' }}>{Math.round((DEMO.lessonsComplete / DEMO.lessonsTotal) * 100)}%</span>
                    </div>
                    <div style={{ height: 8, background: 'rgba(201,146,42,0.1)', borderRadius: 4 }}>
                      <div style={{ height: '100%', width: `${(DEMO.lessonsComplete / DEMO.lessonsTotal) * 100}%`, background: '#c9922a', borderRadius: 4, transition: 'width 1s' }} />
                    </div>
                  </div>
                  {Object.entries(DEMO.skills).map(([k, v]) => <SkillBar key={k} label={k} value={v} />)}
                </div>
              </Reveal>

              {/* Recent activity */}
              <Reveal delay={0.12}>
                <div style={{ background: 'rgba(16,12,8,0.8)', border: '1px solid rgba(201,146,42,0.12)', padding: 28 }}>
                  <div style={{ fontSize: '0.62rem', color: '#c9922a', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 20 }}>Recent Activity</div>
                  {DEMO.recentActivity.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16, paddingBottom: 16, borderBottom: i < DEMO.recentActivity.length - 1 ? '1px solid rgba(201,146,42,0.08)' : 'none' }}>
                      <span style={{ fontSize: '1rem' }}>{a.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.83rem', color: 'rgba(245,240,232,0.7)' }}>{a.label}</div>
                        <div style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.3)', marginTop: 2 }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        )}

        {tab === 'flashcards' && (
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <Reveal>
              <SectionHeading eyebrow="Daily Practice" heading="Flashcards" sub="Tap a card to reveal its meaning, then mark whether you knew it." />
              <div style={{ background: 'rgba(16,12,8,0.8)', border: '1px solid rgba(201,146,42,0.12)', padding: 32 }}>
                <FlashcardDeck />
              </div>
            </Reveal>
          </div>
        )}

        {tab === 'homework' && (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <Reveal>
              <SectionHeading eyebrow="Assignments" heading="Homework" sub="Tasks assigned by your instructor. Mark them complete as you finish." />
              {DEMO.homework.map((hw, i) => {
                const [done, setDone] = useState(hw.done);
                return (
                  <div key={i} style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    background: 'rgba(16,12,8,0.8)', border: `1px solid ${done ? 'rgba(74,122,90,0.3)' : 'rgba(201,146,42,0.12)'}`,
                    padding: '20px 24px', marginBottom: 12, transition: 'all 0.2s',
                  }}>
                    <button onClick={() => setDone(d => !d)} style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      background: done ? 'rgba(74,122,90,0.4)' : 'transparent',
                      border: `1px solid ${done ? '#4a7a5a' : 'rgba(201,146,42,0.3)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontSize: '0.6rem', color: done ? '#6abf80' : 'transparent', transition: 'all 0.2s',
                    }}>✓</button>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', color: done ? 'rgba(245,240,232,0.35)' : 'rgba(245,240,232,0.75)', textDecoration: done ? 'line-through' : 'none', lineHeight: 1.5 }}>{hw.title}</div>
                      <div style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.25)', marginTop: 4 }}>Due: {hw.due}</div>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        )}

        {tab === 'progress' && (
          <div>
            <Reveal>
              <SectionHeading eyebrow="Your Journey" heading="Progress Overview" sub="A detailed view of your skills and learning history." />
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Reveal>
                <div style={{ background: 'rgba(16,12,8,0.8)', border: '1px solid rgba(201,146,42,0.12)', padding: 32 }}>
                  <div style={{ fontSize: '0.62rem', color: '#c9922a', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>Skill Breakdown</div>
                  {Object.entries(DEMO.skills).map(([k, v]) => <SkillBar key={k} label={k} value={v} />)}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ background: 'rgba(16,12,8,0.8)', border: '1px solid rgba(201,146,42,0.12)', padding: 32 }}>
                  <div style={{ fontSize: '0.62rem', color: '#c9922a', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>Learning Stats</div>
                  {[['Total Lessons Done', DEMO.lessonsComplete], ['Current Streak', `${DEMO.streak} days`], ['XP Earned', DEMO.xp], ['Quizzes Passed', 4], ['Flashcards Reviewed', 48]].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid rgba(201,146,42,0.06)' }}>
                      <span style={{ fontSize: '0.83rem', color: 'rgba(245,240,232,0.45)' }}>{l}</span>
                      <span style={{ fontFamily: 'Playfair Display, serif', color: '#c9922a', fontSize: '1.05rem' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.DashboardPage = DashboardPage;
