// ─── Pricing Page ─────────────────────────────────────────────────────────────
const { useState } = React;

function PricingPage({ setPage }) {
  const plans = window.AE.DATA.pricing;
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Header */}
      <div style={{ padding: '60px 80px 80px', textAlign: 'center', background: 'rgba(8,6,4,0.5)' }}>
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', color: '#f5f0e8', fontWeight: 600, lineHeight: 1.15, marginBottom: 18 }}>
            Simple, honest<br /><em style={{ color: '#c9922a' }}>pricing</em>
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.45)', fontSize: '0.95rem', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>
            No hidden fees. Start free, upgrade when you're ready. Cancel anytime.
          </p>
          {/* Annual toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(16,12,8,0.8)', border: '1px solid rgba(201,146,42,0.15)', padding: '10px 20px' }}>
            <span style={{ fontSize: '0.78rem', color: annual ? 'rgba(245,240,232,0.35)' : '#f5f0e8', fontFamily: 'DM Sans, sans-serif' }}>Monthly</span>
            <button onClick={() => setAnnual(a => !a)} style={{
              width: 42, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', position: 'relative',
              background: annual ? '#c9922a' : 'rgba(201,146,42,0.2)', transition: 'background 0.3s',
            }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#f5f0e8', position: 'absolute', top: 3, left: annual ? 23 : 3, transition: 'left 0.3s' }} />
            </button>
            <span style={{ fontSize: '0.78rem', color: annual ? '#f5f0e8' : 'rgba(245,240,232,0.35)', fontFamily: 'DM Sans, sans-serif' }}>Annual</span>
            {annual && <span style={{ fontSize: '0.65rem', padding: '2px 8px', background: 'rgba(74,122,90,0.3)', color: '#6abf80', letterSpacing: '0.08em' }}>Save 20%</span>}
          </div>
        </Reveal>
      </div>

      {/* Cards */}
      <div style={{ padding: '0 80px 80px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div style={{
                background: p.popular ? 'rgba(201,146,42,0.06)' : 'rgba(16,12,8,0.8)',
                border: `1px solid ${p.popular ? '#c9922a' : 'rgba(201,146,42,0.12)'}`,
                padding: '40px 36px',
                position: 'relative',
                transform: p.popular ? 'scale(1.02)' : 'none',
              }}>
                {p.popular && (
                  <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 3, background: '#c9922a' }} />
                )}
                {p.popular && (
                  <div style={{ position: 'absolute', top: 16, right: 16, fontSize: '0.6rem', padding: '3px 10px', background: '#c9922a', color: '#0a0805', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Most Popular</div>
                )}
                <div style={{ fontFamily: 'Amiri, serif', fontSize: '1.4rem', color: p.color, marginBottom: 4 }}>{p.arabic}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#f5f0e8', marginBottom: 16 }}>{p.name}</div>
                <div style={{ marginBottom: 20 }}>
                  {p.price === 0 ? (
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#f5f0e8' }}>Free</span>
                  ) : (
                    <>
                      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: p.color }}>
                        ${annual ? Math.round(p.price * 0.8) : p.price}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.35)', marginLeft: 8 }}>{p.period}</span>
                    </>
                  )}
                </div>
                <div style={{ fontSize: '0.83rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.6, marginBottom: 28 }}>{p.desc}</div>
                <div style={{ borderTop: '1px solid rgba(201,146,42,0.1)', paddingTop: 24, marginBottom: 28 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                      <span style={{ color: p.color, fontSize: '0.75rem', marginTop: 2, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: '0.83rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setPage(p.price === 0 ? 'courses' : 'about'); window.scrollTo(0,0); }} style={{
                  width: '100%', padding: '14px', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  background: p.popular ? '#c9922a' : 'transparent',
                  border: `1px solid ${p.popular ? '#c9922a' : p.color}`,
                  color: p.popular ? '#0a0805' : p.color,
                }}
                  onMouseEnter={e => { if (!p.popular) { e.target.style.background = p.color; e.target.style.color = '#0a0805'; } else { e.target.style.background = '#e5b04a'; } }}
                  onMouseLeave={e => { if (!p.popular) { e.target.style.background = 'transparent'; e.target.style.color = p.color; } else { e.target.style.background = '#c9922a'; } }}
                >{p.cta}</button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 80 }}>
          <Reveal>
            <SectionHeading eyebrow="FAQ" heading="Common questions" center={true} />
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {[
              ['Can I change plans later?', 'Yes — upgrade or downgrade anytime. Changes take effect on your next billing date.'],
              ['Is there a free trial?', 'The Explorer plan is permanently free. You can also preview 2 lessons from each course before subscribing.'],
              ['What if I want 1-on-1 lessons?', 'The Private plan includes 4 sessions per month with Hadi. Book via the Contact page for a free intro call.'],
              ['What dialect do you teach?', 'All courses are clearly labelled — Classical, Levantine dialect, or Quranic. You choose based on your goals.'],
            ].map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.06}>
                <div style={{ background: 'rgba(16,12,8,0.8)', border: '1px solid rgba(201,146,42,0.1)', padding: '24px 28px' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: '#f5f0e8', marginBottom: 10, lineHeight: 1.4 }}>{q}</div>
                  <div style={{ fontSize: '0.83rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.65 }}>{a}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.PricingPage = PricingPage;
